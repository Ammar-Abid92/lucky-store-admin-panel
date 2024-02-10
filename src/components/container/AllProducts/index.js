import CSVListItem from "../../container/AddBulkProducts/ListItem";
import React, { useState, useEffect } from "react";
import DashboardAction from "../../common/DashboardAction";
import Pagination from "@mui/material/Pagination";
import AppDialog from "../../common/AppDialog";
import { analytics } from "../../../firebase";
import { Spinner } from "react-bootstrap";
import Header from "../../common/Header";
import Slider from "../../common/Slider";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import "./style.css";
import firebase from '../../../firebase';

const AllProducts = ({ history, location }) => {
  const [selected, setSelected] = useState("AllProducts");
  const [bulkProducts, setBulkProducts] = useState([]);
  // const [allProducts, setAllProducts] = useState([]);
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
  const [allProducts, setAllProducts] = useState([]);


  const keys = [
    "Image",
    "Name",
    "Selling Price",
    "Discount Price",
    "Cost Price",
    "Unit",
    "Category",
    "Quantity",
    "Weight",
    "",
  ];

  const db = firebase.firestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const returnedPromise = db.collection('items').get();
        const [snapshot] = await Promise.all([returnedPromise]);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (val) => {
    if (allProducts.length) {
      let res = allProducts.filter(x => x.name.toLowerCase().includes(val.toLowerCase()))
      setSearch(res);
    }
  }

  const clearSearch = () => {
    setSearch("");
    // setAllProducts(products);
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

  const handleEdit = (e, productId) => {
    e.stopPropagation();
    e.preventDefault();

    setEditItems(true);
    setTimeout(() => {
      setId(productId);
      setToggle(true);
    }, 100);
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
                  <h1 style={{ marginBottom: '10px' }}>All Items</h1>
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
                                  // user={user}
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
                )
                  : allProducts.length > 0 ? (
                    <>
                      <div className="productScreenMainCont">
                        <div className="viewsTopActionSection">
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="form-group searchBartop">
                                <input
                                  type="search"
                                  className="form-control"
                                  placeholder={`${allProducts.length} Items (Search Items by name)`}
                                  aria-label="Search"
                                  aria-describedby="search-addon"
                                  onChange={(e) => handleSearch(e.target.value)}
                                />

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
                                  onClick={handleCSV}
                                >
                                  Import Items
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="newCardBox">
                        <table className="table table-hover table-fixed table-bordered viewOrderTable productViewtbl">
                          <thead>
                            <tr>
                              <th>Sr #</th>
                              <th>&nbsp;</th>
                              <th>Item Name</th>
                              <th>Category</th>
                              <th>Quantity</th>
                              <th>Cost Price</th>
                              <th>Selling Price</th>
                              <th>Discounted Price</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(search.length ? search : allProducts)
                              .sort((a, b) =>
                                a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                              )
                              .map((product, index) => {
                                return (
                                  <ListItem
                                    search={search}
                                    product={product}
                                    key={product.id}
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
                    </>
                  )
                    :
                    (
                      <div className="placeHolderContMain">
                        <p>
                          <i className="productPlaceholderIcon"></i>
                        </p>
                        <p>Add Your Item</p>
                        <p className="placeholderParagraph">
                          Create Item with names, photos and prices to speed-up
                          checkout.
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
    // user: state.user,
    products: state.products,
  };
})(AllProducts);
