import { addBulkProductsFromCSV } from "../../../oscar-pos-core/actions";
import ListItem from "../../container/AddBulkProducts/ListItem";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../constants";
import CategoryItems from "./CategoryItems";
import { Spinner } from "react-bootstrap";
import Slider from "../../common/Slider";
import NewProdItem from "./NewProdItem";
import { connect } from "react-redux";

const Home90 = ({ history, location, user, catalogPr }) => {

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([
    {
      "name": "",
      "price": "",
      "photo": [],
      "costPrice": "",
      "perUnit": "Unit",
      "categories": "",
      "description": "",
      "discountPrice": "",
      "stock": "1",
      "weight": "0",
      "variants": {
        "color": [],
        "sizes": [],
      },
    },
  ]);

  const [catalogItems, setCatalogItems] = useState(
    catalogPr.filter((x) => x.catalog_id)
  );
  const [bulkProducts, setBulkProducts] = useState([]);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [catalog, setCatalog] = useState(false);
  const [viewCsv, setViewCsv] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const CSVHeader = [
    "Image",
    "Name",
    "Selling Price",
    "Discount Price",
    "Cost Price",
    "Unit",
    "Category",
    "Stock",
    "Weight"
  ];

  const productHeader = [
    "Image",
    "Name",
    "Selling Price",
    "Category",
    "",
  ];

  const catalogHeader = ["Image", "Name", "Selling Price", "Category", ""];

  const addNewProductToArray = () => {
    let arr = products;
    let obj = {
      "name": "",
      "price": "",
      "photo": [],
      "costPrice": "",
      "perUnit": "Unit",
      "categories": "",
      "description": "",
      "discountPrice": "",
      "stock": "1",
      "weight": "0",
      "variants": {
        "color": [],
        "sizes": [],
      },
    };
    arr.push(obj);
    setProducts([...arr]);
  };

  const addNewProductToArrayCSV = () => {
    let arr = bulkProducts;
    let obj = {
      name: "",
      costPrice: "",
      price: "",
      discountPrice: "",
      perUnit: "",
      categories: "",
      description: "",
      photo: [],
      stock: "",
      weight: "",
    };
    arr.push(obj);
    setBulkProducts([...arr]);
  };

  useEffect(() => {
    setCatalogItems(catalogPr.filter((x) => x.catalog_id));
  }, [catalogPr]);

  const getDataToAddProduct = () => {
    let params = {
      phone_number: user.phone_number,
      activation_code: user.activation_code,
      products,
    };
    return params;
  };

  const getDataToAddCSVProduct = () => {
    let myArr = bulkProducts.map((x) => {
      return {
        ...x,
        price: parseFloat(x.price),
        discountPrice: isNaN(parseFloat(x.discountPrice)) ? '' : parseFloat(x.discountPrice),
        costPrice: isNaN(parseFloat(x.costPrice))
          ? ""
          : parseFloat(x.costPrice),
        stock: parseInt(x.stock),
        weight: parseFloat(x.weight || 0),
        variants: {
          color: [],
          sizes: [],
        },
      };
    });
    let params = {
      phone_number: user.phone_number,
      products: myArr,
    };
    return params;
  };

  const handleAdd = (type) => {
    if (!loading) {
      if (type === "create") {
        setProgress(0);
      } else if (type === "catalog") {
        if (catalogItems.length) {
          setProgress(1);
        } else {
          setCatalog((prev) => !prev);
          setTimeout(() => {
            setToggle(true);
          });
        }
      } else {
        if (bulkProducts.length) {
          setProgress(2);
        } else {
          setViewCsv(true);
          setTimeout(() => {
            setToggle(true);
          });
        }
      }
    }
  };

  const isValidDataForProduct = (data) => {
    let invalidData = false;
    let obj = errors;

    data.filter((x, index) => {
      if (x["name"] == "") {
        invalidData = true;
        obj = {
          ...obj,
          [index]: {
            name: "Name is required",
          },
        };
      }
      if (x["price"] == "") {
        invalidData = true;
        obj = {
          ...obj,
          [index]: {
            ...obj[index],
            price: "Price is required",
          },
        };
      }
      if (x["categories"] == "") {
        invalidData = true;
        obj = {
          ...obj,
          [index]: {
            ...obj[index],
            category: "Category is required",
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

  const validateCSVInput = () => {
    let obj = {};
    bulkProducts.map((x, index) => {
      if (x["name"] === "") {
        obj[index] = {
          name: "Name is required",
        };
      }
      if (x["price"]) {
        if (isNaN(x["price"]) || Number(x["price"]) === 0) {
          obj[index] = {
            price: "Enter a valid price",
          };
        }
      } else {
        obj[index] = {
          price: "Price is required",
        };
      }
      if (x["costPrice"]) {
        if (isNaN(x["costPrice"]) || Number(x["costPrice"]) === 0) {
          obj[index] = {
            costPrice: "Enter a valid price",
          };
        }
      }
      if (x["discountPrice"]) {
        if (isNaN(x["discountPrice"]) || Number(x["discountPrice"]) === 0) {
          obj[index] = {
            discount: "Enter a valid price",
          };
        }
      }
      if (x["discountPrice"]) {
        if (Number(x["discountPrice"]) >= Number(x["price"])) {
          obj[index] = {
            discount: "Discount price must be less than selling price",
          };
        }
      }
      if (x["stock"]) {
        if (isNaN(x["stock"]) || Number(x["stock"]) === 0) {
          obj[index] = {
            stock: "Enter a valid Stock",
          };
        }
      } else {
        obj[index] = {
          stock: "Stock is required",
        };
      }
      if (
        !x["perUnit"] ||
        x["perUnit"] === null ||
        x["perUnit"] === undefined
      ) {
        obj[index] = {
          unit: "Item unit is required",
        };
      }
      if (x["categories"] == "") {
        obj[index] = {
          category: "Item category is required",
        };
      }
      if (x["weight"]) {
        if (isNaN(x["weight"]) || Number(x["weight"]) === 0) {
          obj[index] = {
            weight: "Enter valid weight",
          };
        }
      }
    });

    if (Object.keys(obj).length) {
      setErrors(obj);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleSubmitProduct = () => {

    let dataToAddProduct = getDataToAddProduct();

    if (isValidDataForProduct(dataToAddProduct.products) == false) {
      setLoading(false);
      setProgress(0)
      return false
    } else {
      addBulkProductsFromCSV(dataToAddProduct, user.vanity_url, BASE_URL)
        .then((res) => {
          if (!bulkProducts.length && !catalogItems.length) {
            history.push({
              pathname: "/Home",
            });
          }
        })
        .catch((err) => {
          console.log("catch", err);
          setLoading(false);
          return false;
        });
    }
  };

  const handleUploadCSVItems = () => {
    if (validateCSVInput() == false) {
      setLoading(false);
      setProgress(2)
      return false;
    } else {
      let dataToAddCSVProduct = getDataToAddCSVProduct();

      addBulkProductsFromCSV(dataToAddCSVProduct, user.vanity_url, BASE_URL)
        .then((res) => {
          if (!catalogItems.length) {
            history.push({
              pathname: "/Home",
            });
          }
        })
        .catch((err) => {
          console.log("catch", err);
          setLoading(false);
          return false;
        });
    }
  };

  const handleSubmit = async () => {

    setLoading(true);
    setErrors({});

    const isValid = (products[0].name.length || products[0].price > 0 || products[0].categories.length) ? true : false

    if (
      (!bulkProducts.length && !catalogItems.length && isValid === false) ||
      (!bulkProducts.length && !catalogItems.length && isValid) ||
      (bulkProducts.length && catalogItems.length && isValid) ||
      (bulkProducts.length && !catalogItems.length && isValid) ||
      (!bulkProducts.length && catalogItems.length && isValid)
    ) {
      let result = await handleSubmitProduct();
      if (result === false) return
    }
    if (bulkProducts.length) {
      let result = await handleUploadCSVItems();
      if (result === false) return
    }
    if (catalogItems.length) {
      setLoading(false);
      history.push({
        pathname: "/Home",
      });
    }
  }

  return (
    <section className="body_Content_Section">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-sm-3">
            <div className="agentImage">
              <span className="avatar_img med"></span>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="login_page_top_content">
              <h1>Your online store is 90% complete.</h1>
              <h1 className="customMargin">
                List your item, and start selling in seconds
              </h1>
            </div>
          </div>

          <div className="col-sm-12">
            <div className="itemsMainContiner">
              <div
                className={
                  progress === 0
                    ? "createitemsMainBox createitemsMainBoxLeft active"
                    : "createitemsMainBox "
                }
                onClick={() => handleAdd("create")}
              >
                <p className="itemIconBox">
                  <svg
                    fill="var(--mediumGray)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                  >
                    <path
                      fill=""
                      d="M15.86,21.215c0.103-0.001,0.18-0.019,0.25-0.056c0.07-0.029,0.11-0.051,0.113-0.053l9.55-4.803
                                            c1.438-0.627,1.221-1.133,1.127-1.348c-0.128-0.291-0.336-0.426-0.659-0.426c-0.527,0-1.123,0.373-1.129,0.377l-7.151,3.415
                                            l-0.018-0.019l-1.47,0.706c0.001,0,0.001,0,0.001,0s-0.255,0.168-0.599,0.191l-0.02,0.001l-0.04-0.002
                                            c-0.341-0.022-0.605-0.199-0.617-0.207l-8.592-4.074c-0.025-0.016-0.623-0.389-1.149-0.389c-0.322,0-0.531,0.136-0.658,0.426
                                            c-0.096,0.219-0.09,0.396,0.016,0.574c0.154,0.26,0.524,0.52,1.102,0.771l9.55,4.802c0.014,0.007,0.052,0.029,0.105,0.051
                                            c0.087,0.044,0.164,0.062,0.243,0.063l0.034,0.203l-0.009-0.202L15.86,21.215z"
                    />
                    <path
                      fill=""
                      d="M15.862,26.25c0.1-0.001,0.177-0.02,0.248-0.057c0.07-0.029,0.11-0.051,0.113-0.053l9.55-4.804
                                            c1.438-0.628,1.221-1.132,1.127-1.347c-0.128-0.292-0.336-0.427-0.659-0.427c-0.53,0-1.123,0.373-1.129,0.377l-7.153,3.416
                                            l-0.017-0.019l-1.469,0.705c0.001,0,0.001,0,0.001,0s-0.255,0.168-0.599,0.192h-0.02l-0.04-0.001
                                            c-0.341-0.024-0.605-0.198-0.617-0.207l-1.442-0.69l-0.151-0.044l-6.998-3.34c-0.025-0.016-0.623-0.389-1.149-0.389
                                            c-0.322,0-0.531,0.135-0.658,0.427c-0.096,0.218-0.09,0.395,0.016,0.572c0.154,0.261,0.524,0.521,1.102,0.77l9.55,4.805
                                            c0.014,0.007,0.052,0.028,0.105,0.05c0.089,0.045,0.164,0.063,0.241,0.063l0.036,0.203l-0.01-0.201L15.862,26.25z"
                    />
                    <path
                      fill=""
                      d="M15.864,16.016c0.101,0,0.176-0.02,0.248-0.056c0.07-0.029,0.109-0.051,0.113-0.053l9.55-4.803
                                            c0.411-0.18,0.716-0.365,0.921-0.556l0.038-0.033c0.02-0.021,0.045-0.052,0.071-0.083c0.118-0.158,0.166-0.288,0.161-0.412
                                            c0.005-0.142-0.043-0.272-0.142-0.403c-0.046-0.058-0.071-0.09-0.104-0.122c-0.229-0.213-0.535-0.397-0.937-0.572l-9.55-4.803
                                            c-0.012-0.007-0.051-0.028-0.109-0.052c-0.085-0.043-0.161-0.062-0.24-0.063l-0.049-0.201l-0.005,0.201
                                            c-0.093,0.001-0.17,0.02-0.242,0.055c-0.07,0.031-0.109,0.052-0.112,0.053l-9.55,4.804C5.51,9.1,5.213,9.279,5.007,9.472
                                            C4.95,9.526,4.926,9.557,4.901,9.585c-0.124,0.164-0.17,0.29-0.166,0.417c-0.004,0.144,0.042,0.271,0.142,0.404
                                            c0.053,0.063,0.076,0.091,0.104,0.121c0.232,0.217,0.53,0.396,0.937,0.573l9.55,4.802c0.016,0.008,0.052,0.029,0.107,0.051
                                            c0.087,0.043,0.163,0.063,0.239,0.063l0.036,0.202l-0.008-0.201L15.864,16.016z M15.199,13.793l-1.438-0.692l-0.019,0.021
                                            l-6.52-3.111l6.516-3.109l0.019,0.019l1.47-0.708c0,0,0.255-0.168,0.6-0.191h0.051c0.349,0.025,0.614,0.199,0.625,0.207
                                            l7.978,3.783l-6.52,3.111l-0.017-0.021l-1.466,0.707c0,0-0.256,0.168-0.601,0.192h-0.051C15.476,13.975,15.212,13.8,15.199,13.793
                                            z"
                    />
                  </svg>
                </p>
                <p className="textStyling17 darkGrayColor itemHeadingBox">
                  Add Your Item
                </p>
                <p className="textStyling14 f300 mediumGrayColor itemParaBox">
                  Create Item with names, photos and prices to speed-up
                  checkout.
                </p>
              </div>
              <div className="createitemsBorderLeft"></div>
              <div
                className={
                  progress === 1
                    ? "createitemsMainBox createitemsCenterBox active"
                    : "createitemsMainBox createitemsCenterBox"
                }
                onClick={() => handleAdd("catalog")}
              >
                <p className="itemIconBox">
                  <svg
                    fill="var(--mediumGray)"
                    height="35"
                    viewBox="0 0 40 40"
                    width="35"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="st0"
                      d="M27.9,14c0-0.5-0.4-0.9-0.9-0.9h-5.4V1.8c0-0.5-0.4-0.9-0.9-0.9H8.1C7.6,1,7.2,1.3,7.2,1.8v11.3H1.8
                                            c-0.5,0-0.9,0.4-0.9,0.9v11.3V27h27v-1.7V14z M9,2.7h4.5v2.6h1.8V2.7h4.5v10.4H9V2.7z M13.5,25.2H2.7V14.8h4.5v2.6H9v-2.6h4.5
                                            L13.5,25.2z M26.1,25.2H15.3V14.8h4.5v2.6h1.8v-2.6h4.5V25.2z"
                    />
                  </svg>
                </p>
                <p className="textStyling17 darkGrayColor itemHeadingBox">
                  Upload items form catalog
                </p>
                <p className="textStyling14 f300 mediumGrayColor itemParaBox">
                  Upload items form catalog
                </p>
              </div>
              <div className="createitemsBorderRight"></div>

              <div
                className={
                  progress === 2
                    ? "createitemsMainBox createitemsMainBoxRight active"
                    : "createitemsMainBox"
                }
                onClick={() => handleAdd()}
              >
                <p className="itemIconBox">
                  <svg
                    fill="var(--mediumGray)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                  >
                    <path
                      fill=""
                      d="M20.525,6.467l-4.222-4.222c-0.063-0.066-0.152-0.107-0.245-0.105H5.808
                                            C5.059,2.145,4.455,2.75,4.451,3.499v6.733c0,0.193,0.155,0.351,0.352,0.351c0.193,0,0.352-0.158,0.352-0.351V3.499
                                            c0-0.362,0.293-0.654,0.653-0.654h9.897v3.87c0,0.194,0.159,0.351,0.354,0.351h3.868v14.12c0,0.361-0.292,0.653-0.653,0.653l0,0
                                            H5.808c-0.36,0-0.653-0.292-0.653-0.653l0,0v-1.809c0-0.192-0.158-0.352-0.352-0.352c-0.196,0-0.352,0.159-0.352,0.352v1.809
                                            c0.004,0.747,0.607,1.354,1.356,1.357h13.466c0.748-0.003,1.353-0.61,1.357-1.357V6.714C20.632,6.621,20.594,6.531,20.525,6.467z
                                            M16.41,3.343l3.019,3.019H16.41V3.343z"
                    />
                    <path
                      fill=""
                      d="M17.817,17.182v-4.756c0.003-0.626-0.501-1.135-1.127-1.14c-0.004,0-0.01,0-0.013,0H4.184
                                            c-0.627-0.003-1.136,0.501-1.14,1.126c-0.001,0.004-0.001,0.01,0,0.014v4.756c-0.004,0.626,0.5,1.136,1.125,1.14
                                            c0.005,0,0.01,0,0.015,0h12.494c0.626,0.004,1.135-0.501,1.14-1.126C17.817,17.19,17.817,17.187,17.817,17.182z M6.209,15.725
                                            c0.231,0.241,0.552,0.377,0.888,0.374c0.178,0.001,0.355-0.037,0.521-0.105c0.177-0.089,0.337-0.206,0.478-0.345l0.4,0.407
                                            c-0.351,0.413-0.866,0.649-1.406,0.647c-0.523,0.025-1.032-0.169-1.407-0.534c-0.735-0.756-0.735-1.961,0-2.717
                                            c0.375-0.365,0.882-0.563,1.407-0.548c0.539-0.007,1.053,0.224,1.406,0.634l-0.394,0.428c-0.141-0.148-0.307-0.268-0.491-0.351
                                            c-0.175-0.073-0.362-0.105-0.55-0.101c-0.317,0.014-0.62,0.142-0.852,0.36c-0.253,0.234-0.392,0.568-0.379,0.914
                                            C5.821,15.141,5.958,15.479,6.209,15.725z M11.437,16.429c-0.271,0.208-0.608,0.313-0.95,0.296
                                            c-0.565,0.004-1.109-0.209-1.526-0.591l0.388-0.472c0.311,0.299,0.722,0.472,1.152,0.485c0.17,0.01,0.338-0.035,0.479-0.126
                                            c0.115-0.078,0.181-0.207,0.176-0.346c0.006-0.132-0.059-0.257-0.168-0.331c-0.175-0.104-0.369-0.175-0.569-0.211
                                            c-0.207-0.049-0.412-0.11-0.613-0.183c-0.135-0.047-0.262-0.119-0.372-0.211c-0.228-0.183-0.347-0.463-0.324-0.753
                                            c-0.019-0.31,0.123-0.605,0.373-0.789c0.268-0.189,0.588-0.284,0.914-0.273c0.239,0,0.478,0.038,0.703,0.113
                                            c0.22,0.07,0.422,0.184,0.598,0.33l-0.33,0.465c-0.129-0.111-0.279-0.192-0.442-0.239c-0.176-0.063-0.361-0.097-0.549-0.099
                                            c-0.155-0.004-0.308,0.036-0.443,0.112c-0.112,0.071-0.177,0.198-0.169,0.33c-0.007,0.137,0.057,0.268,0.169,0.346
                                            c0.233,0.118,0.481,0.203,0.739,0.253c0.309,0.06,0.6,0.19,0.851,0.379c0.193,0.183,0.298,0.439,0.289,0.705
                                            c0.003,0.308-0.138,0.6-0.381,0.787L11.437,16.429z M14.251,16.682h-0.705l-1.469-3.665h0.703l1.132,2.736l1.126-2.736h0.704
                                            L14.251,16.682z"
                    />
                  </svg>
                </p>
                <p className="textStyling17 darkGrayColor itemHeadingBox">
                  Upload CSV
                </p>
                <p className="textStyling14 f300 mediumGrayColor itemParaBox">
                  Download our template to create and update your items with
                  import.
                </p>
              </div>
            </div>
          </div>

          {progress === 0 ? (
            <>
              <div className="col-sm-12 mb20">
                <span className="textStyling17 darkGrayColor headingSpace">
                  Create items
                </span>
              </div>

              <div className="col-sm-12">
                {/* <div className="row justify-content-md-center"> */}
                <div className="newCardBox">
                  <div className="productItemListMain">
                    <table className="table table-hover table-bordered viewOrderTable catalogItemListTable">
                      <thead className="thead-dark">
                        <tr className="text-center align-middle">
                          <th scope="col">{"No."}</th>
                          {productHeader.map((val, index) => {
                            return (
                              <th scope="col" key={index}>
                                {val.charAt(0).toUpperCase() + val.slice(1)}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((value, index) => {
                          return (
                            <NewProdItem
                              setProducts={setProducts}
                              error={errors[index]}
                              setErrors={setErrors}
                              products={products}
                              loading={loading}
                              product={value}
                              errors={errors}
                              index={index}
                              user={user}
                              key={index}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <button
                    className="addProductBtn"
                    disabled={loading}
                    onClick={() => addNewProductToArray()}
                  >
                    <span>
                      <i className="addproductIcon"></i>
                    </span>
                    <span>Add another Item</span>
                  </button>
                </div>

                <button
                  className={"login_btn_next saveandCont"}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <Spinner
                      className="loaderCircle Products"
                      animation="border"
                      role="status"
                    ></Spinner>
                  ) : (
                    "Save & continue"
                  )}
                </button>
              </div>
            </>
          ) : progress === 1 ? (
            <div className="col-sm-12">
              <div className="newCardBox">
                <div className="productItemListMain">
                  <table className="table table-hover table-bordered viewOrderTable catalogItemListTable">
                    <thead className="thead-dark">
                      <tr className="text-center align-middle">
                        <th scope="col">{"No."}</th>
                        {catalogHeader.map((val, index) => {
                          return (
                            <th scope="col" key={index}>
                              {val.charAt(0).toUpperCase() + val.slice(1)}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {catalogItems.map((value, index) => {
                        return (
                          <CategoryItems
                            setDeleteLoad={setDeleteLoad}
                            deleteLoad={deleteLoad}
                            disabled={loading}
                            setOpen={setOpen}
                            product={value}
                            user={user}
                            open={open}
                            index={index}
                            key={index}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button
                  className="addProductBtn"
                  disabled={loading}
                  onClick={() => {
                    setCatalog(true);
                    setTimeout(() => {
                      setToggle(true);
                    });
                  }}
                >
                  <span>
                    <i className="addproductIcon"></i>
                  </span>
                  <span>Add another product</span>
                </button>
              </div>


              <button
                className={"login_btn_next saveandCont"}
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <Spinner
                    className="loaderCircle Products"
                    animation="border"
                    role="status"
                  ></Spinner>
                ) : (
                  "Save & continue"
                )}
              </button>
            </div>
          ) : (
            <div className="col-sm-12">
              {/* <div className="row justify-content-md-center"> */}
              {bulkProducts.length > 0 && (
                <div className="newCardBox">
                  <div className="productItemListMain">
                    <table
                      className="table table-hover table-bordered viewOrderTable bulkProductable"
                      id="LogRecord"
                    >
                      <thead className="thead-dark">
                        <tr className="text-center align-middle">
                          <th scope="col">{"No."}</th>
                          {CSVHeader.map((val, index) => {
                            return (
                              <th scope="col" key={index}>
                                {val.charAt(0).toUpperCase() + val.slice(1)}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {bulkProducts.map((entry, index) => {
                          return (
                            <ListItem
                              data={entry}
                              user={user}
                              index={index}
                              key={index}
                              setBulkProducts={setBulkProducts}
                              bulkProducts={bulkProducts}
                              error={errors}
                              setErrors={setErrors}
                              loading={loading}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <button
                    className="addProductBtn"
                    disabled={loading}
                    onClick={() => addNewProductToArrayCSV()}
                  >
                    <span>
                      <i className="addproductIcon"></i>
                    </span>
                    <span>Add another Item</span>
                  </button>
                </div>
              )}
              <button
                className={"login_btn_next saveandCont"}
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <Spinner
                    className="loaderCircle Products"
                    animation="border"
                    role="status"
                  ></Spinner>
                ) : (
                  "Save & continue"
                )}
              </button>
            </div>
          )}

          {catalog && (
            <Slider
              setCatalog={setCatalog}
              setToggle={setToggle}
              location={location}
              catalog={catalog}
              history={history}
              toggle={toggle}
            />
          )}

          {viewCsv && (
            <Slider
              setBulkProducts={setBulkProducts}
              bulkProducts={bulkProducts}
              setProgress={setProgress}
              setViewCsv={setViewCsv}
              setToggle={setToggle}
              viewCsv={viewCsv}
              toggle={toggle}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default connect((state) => {
  return {
    user: state.user,
    catalogPr: state.products,
  };
})(Home90);
