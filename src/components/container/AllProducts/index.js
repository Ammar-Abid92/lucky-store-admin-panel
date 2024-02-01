import CSVListItem from "../../container/AddBulkProducts/ListItem";
import React, { useState, useEffect, useCallback } from "react";
import DashboardAction from "../../common/DashboardAction";
import Pagination from "@mui/material/Pagination";
import AppDialog from "../../common/AppDialog";
import { BASE_URL } from "../../../constants";
import { analytics } from "../../../firebase";
import { Spinner } from "react-bootstrap";
import Header from "../../common/Header";
import Slider from "../../common/Slider";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import Cookies from "js-cookie";
import axios from "axios";
import "./style.css";
import {
  addBulkProductsFromCSV,
  getDukaanProductFromCloud,
} from "../../../oscar-pos-core/actions";

const AllProducts = ({ history, user, products, location }) => {

  const [selected, setSelected] = useState("AllProducts");
  const [bulkProducts, setBulkProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [editItems, setEditItems] = useState(false);
  const [toggleItem, setToggleItem] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [addItems, setAddItems] = useState(false);
  const [viewCsv, setViewCsv] = useState(false);
  const [catalog, setCatalog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const keys = [
    "Image",
    "Name",
    "Selling Price",
    "Discount Price",
    "Cost Price",
    "Unit",
    "Category",
    "Stock",
    "Weight",
    "",
  ];

  const getProducts = useCallback(async () => {
    if (search === "") {
      getDukaanProductFromCloud(user.vanity_url, BASE_URL, {
        pageNumber: activePage,
      })
        .then((res) => {
          setTotalItems(res.data.data.total);
          setNumOfPages(Math.ceil(res.data.data.total / 10));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      let url = `${BASE_URL}api/toko/v3/merchant/${user.vanity_url
        }/products?page_number=${activePage}&page_size=${10}&name=${search}`;

      axios
        .get(url, {
          headers: {
            Authorization: "JWT " + Cookies.get("token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setNumOfPages(Math.ceil(res.data.data.total / 10));
          setAllProducts(res.data.data.results);
        });
    }
  }, [activePage, search, user.vanity_url]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  const clearSearch = () => {
    setSearch("");
    setAllProducts(products);
    setActivePage(1);
  };

  const handleAddItems = () => {
    setAddItems(true);
    setTimeout(() => {
      setToggle(true);
    });
  };

  const handleCSV = () => {
    setErrors({});
    setViewCsv(true);
    setTimeout(() => {
      setToggle(true);
    });
  };

  const handleCatalog = () => {
    setCatalog(true);
    setTimeout(() => {
      setToggle(true);
    });
  };

  const handleEdit = (e, productId) => {
    e.stopPropagation();
    e.preventDefault();

    setEditItems(true);
    setTimeout(() => {
      setId(productId);
      setToggle(true);
    }, 100);
  };

  const handleLoadMore = (isMore) => {
    if (isMore) {
      setAllProducts(products);
    } else {
      setAllProducts(products.slice(0, 5));
    }
  };

  const validateInput = () => {
    setLoading(true);
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

  const getProcessedDataOfCSV = () => {
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

  const handleUploadCSVItems = () => {
    if (validateInput() == false) {
      setLoading(false);
      return;
    } else {
      let processedData = getProcessedDataOfCSV();

      addBulkProductsFromCSV(processedData, user.vanity_url, BASE_URL)
        .then((res) => {
          setBulkProducts([]);
          getProducts();
          setErrors({});
        })
        .catch((err) => {
          setLoading(false);
          console.log("catch", err);
        });
    }
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
  const handleChange = (event, value) => {
    setActivePage(value);
  };

  const onSearchChange = (e) => {
    analytics.logEvent('product_search');
    setActivePage(1);
    setSearch(e.target.value);
  };

  return (
    <>
      <Header />
      <section className="body_Content_Section dashboardInnerSection">
        <div className="container-fluid" onClick={() => setToggleItem("")}>
          <div className="row">
            <DashboardAction
              type="AllProducts"
              history={history}
              location={location}
              toggleExpanded={setExpanded}
              currentSelection={selected}
            />
            <div className={"col-sm-10"}>
              <div className="RightSectionMain">
                <div className="viewFirstHeading">
                  <h1>All Items</h1>
                </div>
                {loading == true ? (
                  <div className="spinnerContainer">
                    <Spinner
                      className="loaderCircle ProductsList"
                      animation="border"
                      role="status"
                    ></Spinner>
                  </div>
                ) : bulkProducts.length > 0 ? (
                  <div className="mt25">
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
                                {keys.map((val, index) => {
                                  return (
                                    <th scope="col" key={index}>
                                      {val.charAt(0).toUpperCase() +
                                        val.slice(1)}
                                    </th>
                                  );
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              {bulkProducts.map((entry, index) => {
                                return (
                                  <CSVListItem
                                    setBulkProducts={setBulkProducts}
                                    bulkProducts={bulkProducts}
                                    setErrors={setErrors}
                                    loading={loading}
                                    error={errors}
                                    index={index}
                                    data={entry}
                                    user={user}
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

                    <div className="tableBottomButton">
                      <button
                        className="btn btn-primary appBorderBtn"
                        disabled={loading}
                        onClick={() => setOpen(true)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary login_btn_next"
                        disabled={loading}
                        onClick={() => handleUploadCSVItems()}
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
                  </div>
                ) : products.length > 0 ? (
                  <div className="productScreenMainCont">
                    <div className="viewsTopActionSection">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group searchBartop">
                            <input
                              type="search"
                              value={search}
                              className="form-control"
                              placeholder={`${totalItems} Items (Search Items by name)`}
                              aria-label="Search"
                              aria-describedby="search-addon"
                              onChange={onSearchChange}
                            />
                            {search.length ? (
                              <span
                                className="textStyling closeBtnStyling pointerCursor"
                                onClick={clearSearch}
                              >
                                <svg
                                  fill="var(--mediumGray)"
                                  height="18"
                                  width="18"
                                  viewBox="0 0 30 30"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill=""
                                    d="M17.555,15.438l9.293-9.293c0.232-0.233,0.36-0.542,0.36-0.871c0-0.329-0.128-0.639-0.36-0.871
                                                                c-0.466-0.465-1.277-0.465-1.742,0l-9.293,9.292L6.521,4.402c-0.465-0.464-1.277-0.465-1.743,0c-0.233,0.232-0.36,0.542-0.36,0.871
                                                                c0,0.329,0.127,0.638,0.36,0.871l9.293,9.292L4.777,24.73c-0.48,0.479-0.48,1.262,0,1.742c0.464,0.466,1.276,0.466,1.743,0
                                                                l9.292-9.293l9.294,9.293c0.465,0.466,1.275,0.465,1.741,0c0.479-0.48,0.479-1.263,0-1.742L17.555,15.438z"
                                  />
                                </svg>
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-sm-7 addItemBtnMain">
                          <div className="addItemBtn">
                            <button
                              className="btn btn-primary login_btn_next"
                              type="submit"
                              onClick={handleAddItems}
                            >
                              Add an Item
                            </button>
                            <button
                              className="btn btn-primary appBorderBtn"
                              type="submit"
                              onClick={handleCatalog}
                            >
                              Add from Catalog
                            </button>
                            <button
                              className="btn btn-primary appBorderBtn"
                              type="submit"
                              onClick={handleCSV}
                            >
                              Import Items
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {search.length && !allProducts.length ? (
                      <div className="placeHolderContMain">
                        <p>
                          <i className="productPlaceholderIcon"></i>
                        </p>
                        <p>No Items found</p>
                        <p className="placeholderParagraph">
                          You don't have any Item with that name
                        </p>
                      </div>
                    ) : (
                      <div className="newCardBox">
                        <table className="table table-hover table-fixed table-bordered viewOrderTable productViewtbl">
                          <thead>
                            <tr>
                              <th>Sr #</th>
                              <th>&nbsp;</th>
                              <th>Item Name</th>
                              <th>Category</th>
                              <th>Stock</th>
                              <th>Units</th>
                              <th>Active</th>
                              <th>Price</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allProducts
                              .sort((a, b) =>
                                a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                              )
                              .map((product, index) => {
                                return (
                                  <ListItem
                                    search={search}
                                    product={product}
                                    key={product._id}
                                    user={user}
                                    handleEdit={handleEdit}
                                    index={index}
                                    activePage={activePage}
                                    toggleItem={toggleItem}
                                    setToggleItem={setToggleItem}
                                  />
                                );
                              })}
                          </tbody>
                        </table>
                        <div className="paginationContainer">
                          {numOfPages > 1 && (
                            <Pagination
                              count={numOfPages}
                              shape="rounded"
                              onChange={handleChange}
                              color="secondary"
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* {products.length > 5 && allProducts.length ? (
                      <div className="showMoreButton">
                        <button
                          className="login_btn_next"
                          onClick={() =>
                            handleLoadMore(
                              allProducts.length === products.length
                                ? false
                                : true
                            )
                          }
                        >
                          {allProducts.length === products.length
                            ? "show less"
                            : "show more"}
                        </button>
                      </div>
                    ) : null} */}
                  </div>
                ) : (
                  <div className="placeHolderContMain">
                    <p>
                      <i className="productPlaceholderIcon"></i>
                    </p>
                    <p>Add Your Item</p>
                    <p className="placeholderParagraph">
                      Create Item with names, photos and prices to speed-up
                      checkout. <a href="">Download our template</a> to create
                      and update your items with import.
                    </p>
                    <div className="placeholderButtonSection">
                      <button
                        className="btn btn-primary login_btn_next"
                        type="submit"
                        onClick={handleAddItems}
                      >
                        Add an Item
                      </button>
                      <button
                        className="btn btn-primary login_btn_next"
                        type="submit"
                        onClick={handleCSV}
                      >
                        Import Items
                      </button>
                      <button
                        className="btn btn-primary login_btn_next"
                        type="submit"
                        onClick={handleCatalog}
                      >
                        Add from Catalog
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AppDialog
        open={open}
        setOpen={setOpen}
        handleAction={() => {
          setBulkProducts([]);
          setOpen(false);
        }}
        type={"discard"}
        handleClose={setOpen}
      />
      {addItems && (
        <Slider
          setAddItems={setAddItems}
          setToggle={setToggle}
          addItems={addItems}
          toggle={toggle}
        />
      )}

      {editItems && (
        <Slider
          setEditItems={setEditItems}
          setToggle={setToggle}
          editItems={editItems}
          toggle={toggle}
          productId={id}
          setId={setId}
          allProducts={allProducts}
        />
      )}

      {viewCsv && (
        <Slider
          setBulkProducts={setBulkProducts}
          bulkProducts={bulkProducts}
          setViewCsv={setViewCsv}
          setToggle={setToggle}
          viewCsv={viewCsv}
          toggle={toggle}
        />
      )}

      {catalog && (
        <Slider
          setCatalog={setCatalog}
          setToggle={setToggle}
          catalog={catalog}
          toggle={toggle}
        />
      )}
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
    products: state.products,
  };
})(AllProducts);
