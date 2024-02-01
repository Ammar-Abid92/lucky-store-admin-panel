import loader from "../../../assets/03_Loader.gif";
import CSVFileValidator from "csv-file-validator";
import ErrorAlert from "../../common/ErrorAlert";
import CSVFile from "../../../assets/jlmenu.csv";
import TopHeader from "../../common/TopHeader";
import AppDialog from "../../common/AppDialog";
import React, { useState } from "react";
import { connect } from "react-redux";
import "./style.css";

const AddBulkProducts = ({
  user,
  setViewCsv,
  setToggle,
  setBulkProducts,
  setProgress,
  bulkProducts,
}) => {
  const [fileInZone, setFileInZone] = useState(false);
  const [csvError, setCsvError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const config = {
    headers: [
      { name: "Name", inputName: "name" },
      {
        name: "Cost Price",
        inputName: "costPrice",
        headerError: (headerValue, headerName, rowNumber, columnNumber) => {
          // if (
          //   !headerName.replaceAll(" ", "").toLowerCase() ===
          //   headerValue.replaceAll(" ", "").toLowerCase()
          // ) {
          //   return "costPrice";
          // }
          return true;
        },
      },
      {
        name: "Selling Price",
        inputName: "price",
        headerError: (headerValue, headerName, rowNumber, columnNumber) => {
          // if (
          //   !headerName.replaceAll(" ", "").toLowerCase() ===
          //   headerValue.replaceAll(" ", "").toLowerCase()
          // ) {
          //   return "sellingprice";
          // }
          return true;
        },
      },
      {
        name: "Discount Price",
        inputName: "discountPrice",
        optional: true,
        headerError: (headerValue, headerName, rowNumber, columnNumber) => {
          // if (
          //   !headerName.replaceAll(" ", "").toLowerCase() ===
          //   headerValue.replaceAll(" ", "").toLowerCase()
          // ) {
          //   return "discountprice";
          // }
          return true;
        },
      },
      {
        name: "Unit",
        inputName: "perUnit",
        headerError: (headerValue, headerName, rowNumber, columnNumber) => {
          // if (
          //   !headerName.replaceAll(" ", "").toLowerCase() ===
          //   headerValue.replaceAll(" ", "").toLowerCase()
          // ) {
          //   return "unit";
          // }
          return true;
        },
      },
      {
        name: "Category",
        inputName: "categories",
        headerError: (headerValue, headerName, rowNumber, columnNumber) => {
          // if (
          //   !headerName.replaceAll(" ", "").toLowerCase() ===
          //   headerValue.replaceAll(" ", "").toLowerCase()
          // ) {
          //   return "category";
          // }
          return true;
        },
      },
      {
        name: "Description",
        inputName: "description",
        headerError: (headerValue, headerName, rowNumber, columnNumber) => {
          // if (
          //   !headerName.replaceAll(" ", "").toLowerCase() ===
          //   headerValue.replaceAll(" ", "").toLowerCase()
          // ) {
          //   return "description";
          // }
          return true;
        },
      },
      // {
      //   name: "Size",
      //   inputName: "size",
      //   headerError: (headerValue, headerName, rowNumber, columnNumber) => {
      //     // if (
      //     //   !headerName.replaceAll(" ", "").toLowerCase() ===
      //     //   headerValue.replaceAll(" ", "").toLowerCase()
      //     // ) {
      //     //   return "size";
      //     // }
      //     return true;
      //   },
      // },
      // {
      //   name: "Color",
      //   inputName: "color",
      //   headerError: (headerValue, headerName, rowNumber, columnNumber) => {
      //     // if (
      //     //   !headerName.replaceAll(" ", "").toLowerCase() ===
      //     //   headerValue.replaceAll(" ", "").toLowerCase()
      //     // ) {
      //     //   return "color";
      //     // }
      //     return true;
      //   },
      // },
      {
        name: "Image",
        inputName: "photo",

        headerError: (headerValue, headerName, rowNumber, columnNumber) => {
          // if (
          //   !headerName.replaceAll(" ", "").toLowerCase() ===
          //   headerValue.replaceAll(" ", "").toLowerCase()
          // ) {
          //   return "photo";
          // }
          return true;
        },
      },
      {
        name: "Quantity in Stock",
        inputName: "stock",

        headerError: (headerValue, headerName, rowNumber, columnNumber) => {
          // if (
          //   !headerName.replaceAll(" ", "").toLowerCase() ===
          //   headerValue.replaceAll(" ", "").toLowerCase()
          // ) {
          //   return "photo";
          // }
          return true;
        },
      },
      {
        name: "Weight",
        inputName: "weight",

        headerError: (headerValue, headerName, rowNumber, columnNumber) => {
          return true;
        },
      },
    ],
  };

  const csvUpload = (e, any) => {
    CSVFileValidator(e.target.files[0], config)
      .then(async (csvData) => {
        if (csvData.inValidMessages.every((item) => item === Boolean(true))) {
          const parseCSV = csvData.data.map((dataItem) => {
            return {
              ...dataItem,
              photo:
                dataItem.photo.indexOf(",") > -1
                  ? dataItem.photo.split(",").length &&
                  dataItem.photo.split(",").map((item) => {
                    if (item.includes("https")) return item;
                    else return "";
                  })
                  : dataItem.photo.includes("https")
                    ? [dataItem.photo]
                    : [],
            };
          });

          setBulkProducts(parseCSV);
          setProgress && setProgress(2);
          setSuccess("ITEMS UPLOADED SUCCESSFULLY");
          setTimeout(() => {
            setSuccess(false);
            backAction();
          }, 2000);
          return;
        }
        setCsvError(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateInput = () => {
    setLoading(true);
    let invalidData = false;
    let obj = errors;

    bulkProducts.filter((x, index) => {
      if (x["Discount Price"] && x["Discount Price"] > x["Selling Price"]) {
        invalidData = true;
        obj = {
          ...obj,
          [index]: {
            discount: "Discount can't be more than the selling price",
          },
        };
      }
      if (x["Name"] == "") {
        invalidData = true;
        obj = {
          ...obj,
          [index]: {
            name: "Name is required",
          },
        };
      }

      if (x["Selling Price"] === "") {
        invalidData = true;
        obj = {
          ...obj,
          [index]: {
            price: "Price is required",
          },
        };
      }

      if (!/^\d*\.?\d*$/.test(x["Selling Price"])) {
        invalidData = true;
        obj = {
          ...obj,
          [index]: {
            price: "price must be a number",
          },
        };
      }
      if (x["Unit"] === "") {
        invalidData = true;
        obj = {
          ...obj,
          [index]: {
            unit: "Item unit is required",
          },
        };
      }
      if (x["Category"] === "") {
        invalidData = true;
        obj = {
          ...obj,
          [index]: {
            category: "Item category is required",
          },
        };
      }
    });

    if (invalidData == false) {
      return true;
    } else {
      setErrors(obj);
      return false;
    }
  };

  const getProcessedData = () => {
    let myArr = bulkProducts.map((x) => {
      return {
        ...x,
        variants: {
          color: [],
          sizes: [],
        },
        stock: 10,
      };
    });
    let params = {
      phone_number: user.phone_number,
      products: myArr,
    };
    return params;
  };

  const dragOver = (e) => {
    setFileInZone(true);

    e.preventDefault();
  };

  const dragEnter = (e) => {
    setFileInZone(true);
    e.preventDefault();
  };

  const dragLeave = (e) => {
    setFileInZone(false);
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    var reader = new FileReader();
    CSVFileValidator(files[0], config)
      .then((csvData) => {
        if (csvData.inValidMessages.includes(true)) {
          reader.onload = function (e) {
            parseCSV(reader.result);
          };

          reader.readAsText(files[0]);
          return;
        }
        setCsvError(true);
      })
      .catch((e) => console.log(e));
  };

  const parseCSV = (rawCsv) => {
    var lines = rawCsv.split("\n");

    var result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    setFileInZone(false);
    setBulkProducts(result);
    setProgress && setProgress(2);
    setSuccess("ITEMS UPLOADED SUCCESSFULLY");
    setTimeout(() => {
      setSuccess(false);
      backAction();
    }, 2000);
  };

  const backAction = () => {
    setToggle(false);
    setTimeout(() => {
      setViewCsv(false);
    }, 500);
  };

  const handleAction = () => {
    setBulkProducts([]);
    setOpen(false);
    if (discard) {
      setDiscard(false);
      backAction();
    }
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
          if (bulkProducts.length) {
            setDiscard(true);
            setOpen(true);
            return;
          } else {
            backAction();
            return;
          }
        }}
        title={"Add Items Using CSV"}
      />

      <div className="addItemMainContainer catalogPlaceHolder">
        {bulkProducts.length == 0 && (
          <div
            className="placeHolderContMain"
            style={{
              borderColor: fileInZone == true ? "#3b0c36" : "#ddd",
              background: fileInZone == true ? "#efefef" : null,
            }}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
          >
            <p>
              <i className="uploadcsvIcn"></i>
            </p>
            <p
              style={{
                color: fileInZone == true ? "#3b0c36" : null,
              }}
            >
              Drag &#38; Drop to Upload CSV
            </p>
            <p className="placeholderParagraph">
              Create item with names, photos and prices to speed-up checkout.{" "}
              <a href={`${CSVFile}`}>Download our template</a> to create and
              update your item with import.
            </p>
            <div className="uploadFIleCont uploadCSVButton">
              <button className="">
                <input type="file" accept=".csv" onChange={csvUpload} />
                <span>Upload CSV</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <AppDialog
        type={discard ? "discard" : "cancelItem"}
        handleClose={() => setOpen(false)}
        handleAction={() => handleAction()}
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
