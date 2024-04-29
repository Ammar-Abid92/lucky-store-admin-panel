import loader from "../../../assets/03_Loader.gif";
import ErrorAlert from "../../common/ErrorAlert";
import TopHeader from "../../common/TopHeader";
import AppDialog from "../../common/AppDialog";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./style.css";
import CsvReader from 'react-file-reader';
import csvtojson from 'csvtojson';
import { addDocToCollection, deleteDocFromCollection } from "../../../firebase/utils";
import useGetCollectionData from "../../../hooks/getData";
import { message } from "antd";

const AddBulkProducts = ({
  setToggle,
  setViewCsv,
  bulkProducts,
}) => {
  const [csvError, setCsvError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [open, setOpen] = useState(false);

  const allItems = useGetCollectionData('items');
  const allCategories = useGetCollectionData('categories');

  useEffect(() => {
    console.log('useEffect of Bulk Products called!');
  }, [allItems, allCategories]);

  const validateHeader = (headerRow) => {
    // Validate header using regex
    const headerRowRegex = /^(item_name|category_name|selling_price|cost_price|discount_price|quantity|description|images)$/i;
    return headerRowRegex.test(headerRow);
  };

  const validateData = (data) => {
    const numberRegex = /^\d+(\.\d+)?$/; // Matches numbers, including decimals

    return data.every((item) => {
      item.cost_price = Number(item.cost_price);
      item.discount_price = Number(item.discount_price);
      item.selling_price = Number(item.selling_price);
      item.quantity = Number(item.quantity);
      item.images = item.images?.split(',');

      return (
        numberRegex.test(item.selling_price) &&
        numberRegex.test(item.cost_price) &&
        numberRegex.test(item.discount_price) &&
        numberRegex.test(item.discount_price) &&
        typeof item.item_name === 'string' &&
        typeof item.category_name === 'string' &&
        typeof item.description === 'string' &&
        (Array.isArray(item.images) && item.images?.length && item.images?.length > 0)
      );
    });
  };

  // Function to handle CSV file upload
  const handleCSVFileUpload = async (files) => {
    const file = files[0];
    if (file.type !== 'application/vnd.ms-excel' && file.type !== 'text/csv') {
      message.error('Please upload a valid CSV file.');
      return;
    }
    else {
      // Read the CSV file
      const text = await file.text();
      const jsonData = await csvtojson().fromString(text);

      const headerRow = Object.keys(jsonData[0]);
      if (!headerRow.every(validateHeader)) {
        message.error('Invalid Header Format. Please Upload Correct CSV File.');
        return;
      }
      else if (!validateData(jsonData)) {
        message.error('Invalid Data Format. Please Upload Correct CSV File.');
        return;
      }
      else {
        if (allItems?.length > 0) {
          allItems.forEach(async (doc) => {
            await deleteDocFromCollection('items', doc.id);
          });
        }

        // Upload items to firestore database and check if catgeory not exists then create it but make sure it is not duplicated
        let categoryFound = false;
        let prevCategoryName = "";
        jsonData?.forEach(async (jsonItem) => {
          allCategories?.forEach((categoryItem) => {
            if (jsonItem?.category_name?.toLowerCase() === categoryItem?.name?.toLowerCase()) {
              categoryFound = true;
            }
          });

          if (!categoryFound && prevCategoryName !== jsonItem?.category_name) {
            let params = {
              name: jsonItem?.category_name,
              description: `This is ${jsonItem?.category_name} description`,
              image: ''
            }
            prevCategoryName = jsonItem?.category_name;
            await addDocToCollection('categories', params);
          }
          await addDocToCollection('items', jsonItem);
        });

        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    };
  }

  const backAction = () => {
    setToggle(false);
    setTimeout(() => {
      setViewCsv(false);
    }, 100);
  };

  return success ? (
    <div className="successfulCont">
      <img
        src={loader}
        alt="Check mark"
        title="check mark"
        style={{ resizeMode: "cover", width: 150, height: 150 }}
      />
      <p>{success}</p>
    </div>
  ) : (
    <>
      <TopHeader
        onAction={() => {
          setDiscard(true);
          setOpen(true);
        }
        }
        title={"Add Items Using CSV"}
      />

      <div className="addItemMainContainer catalogPlaceHolder">
        {bulkProducts.length == 0 && (
          <div
            className="placeHolderContMain"
          >
            <p>
              <i className="uploadcsvIcn"></i>
            </p>
            <p
            >
              Drag &#38; Drop to Upload CSV
            </p>
            <p className="placeholderParagraph">
              Import items directly from CSV file to speed-up the checkout.
            </p>
            <div className="uploadFIleCont uploadCSVButton">
              <CsvReader handleFiles={handleCSVFileUpload} fileTypes={['.csv']}>
                <button>Upload CSV</button>
              </CsvReader>
            </div>
          </div>
        )}
      </div>

      <AppDialog
        type={discard ? "discard" : "cancelItem"}
        handleClose={() => setOpen(false)}
        setOpen={setOpen}
        handleAction={backAction}
        open={open}
      />

      <ErrorAlert
        open={csvError}
        error={"The data file you uploaded is not in required format."}
        onClose={() => {
          setCsvError(false);
        }}
      />
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
  };
})(AddBulkProducts);
