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

const AddBulkProducts = ({
  bulkProducts,
}) => {
  const [csvError, setCsvError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [open, setOpen] = useState(false);

  const allItems = useGetCollectionData('items');
  useEffect(() => {
    console.log('useEffect of Bulk Products called!');
  }, [allItems]);

  // Function to handle CSV file upload
  const handleCSVFileUpload = async (files) => {
    const file = files[0];
    if (file.type !== 'application/vnd.ms-excel' && file.type !== 'text/csv') {
      console.log('Please upload a valid CSV file.');
      return;
    }
    else {
      // Read the CSV file
      const text = await file.text();
      const jsonData = await csvtojson().fromString(text);

      // Validate header columns
      const requiredColumns = ['name', 'category_id', 'quantity', 'cost_price', 'selling_price', 'discount_price'];
      const fileColumns = Object.keys(jsonData[0]);

      if (!requiredColumns.every((col) => fileColumns.includes(col))) {
        console.log('Invalid CSV file format!');
        return;
      }
      else {
        if (allItems?.length > 0) {
          allItems.forEach((doc) => {
            deleteDocFromCollection('items', doc.id);
          });
        }

        // Upload data to Firebase Firestore
        jsonData?.forEach((item) => {
          addDocToCollection('items', item);
        })

        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };
  }

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
          if (bulkProducts.length) {
            setDiscard(true);
            setOpen(true);
            return;
          } else {
            return;
          }
        }}
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
