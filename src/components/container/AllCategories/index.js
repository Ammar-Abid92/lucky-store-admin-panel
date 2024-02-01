import { getDukaanCategoryFromCloud } from "../../../oscar-pos-core/actions";
import DashboardAction from "../../common/DashboardAction";
import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination'
import { BASE_URL } from "../../../constants";
import { Spinner } from "react-bootstrap";
import Slider from "../../common/Slider";
import Header from "../../common/Header";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import Cookies from 'js-cookie';
import axios from "axios";
import "./style.css";

const AllCategories = ({ history, user, categories, location }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [selected, setSelected] = useState("AllCategories");
  const [addCategory, setAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [categoryId, setCatId] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [numOfPages, setNumOfPages] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)



  const clearSearch = () => {
    setSearch("");
    setAllCategories(categories);
  };
  useEffect(() => {
    setAllCategories([...(categories || [])]);
  }, [categories]);

  const handleAddCategory = () => {
    setAddCategory(true);
    setTimeout(() => {
      setToggle(true);
    });
  };

  const handleEditCat = (id) => {
    setCatId(id);
    setEditCategory(true);
    setTimeout(() => {
      setToggle(true);
    });
  };
  const handleChange = (event, value) => {
    setActivePage(value);
  };
  useEffect(() => {
    getDukaanCategoryFromCloud(user.vanity_url, BASE_URL, { pageNumber: activePage })
      .then((res) => {
        setLoading(false);

        setNumOfPages(Math.ceil((res.total / 10)))
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [activePage]);

  const onSearchChange = (e) => {
    setActivePage(1)
    let text = e.target.value;
    setSearch(text);
  }
  useEffect(() => {
    if (search === '') {
      getDukaanCategoryFromCloud(user.vanity_url, BASE_URL, { pageNumber: activePage })
        .then((res) => {
          setTotalItems(res.total)
          setLoading(false);

          setNumOfPages(Math.ceil((res.total / 10)))
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      let url = `${BASE_URL}api/toko/v3/merchant/${user.vanity_url}/categories/?page_size=10&page_number=${activePage}&name=${search}`;

      axios
        .get(url, {
          headers: {
            'Authorization': 'JWT ' + Cookies.get('token'),
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          setAllCategories(res.data.data.results)
        }).catch((e) => console.log(e))
    }
  }, [activePage, search, user.vanity_url]);

  if (search.length && !allCategories.length) {
    console.log("No Search Found");
  }

  return (
    <>
      <Header />
      <section className="body_Content_Section dashboardInnerSection">
        <div className="container-fluid">
          <div className="row">
            <DashboardAction
              type="AllCategories"
              history={history}
              location={location}
              toggleExpanded={setExpanded}
              currentSelection={selected}
            />
            <div className={"col-sm-10"}>
              <div className="RightSectionMain">
                <div className="viewFirstHeading">
                  <h1>All Categories</h1>
                </div>
                {loading == true ? (
                  <div className="spinnerContainer">
                    <Spinner
                      className="loaderCircle ProductsList"
                      animation="border"
                      role="status"
                    ></Spinner>
                  </div>
                ) : categories.length > 0 ? (
                  <div className="productScreenMainCont">
                    <div className="viewsTopActionSection">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group searchBartop">
                            <input
                              type="search"
                              value={search}
                              className="form-control"
                              placeholder={`${totalItems} Categoris (Search Categories by name)`}
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

                        <div className="col-sm-3 addItemBtnMain">
                          <div className="addItemBtn">
                            <button
                              className="btn btn-primary login_btn_next"
                              type="submit"
                              onClick={() => handleAddCategory()}
                            >
                              Create a Category
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {search.length && !allCategories.length ? (
                      <div className="placeHolderContMain">
                        <p>
                          <i className="categoryPlaceholderIcon"></i>
                        </p>
                        <p>No Categories found</p>
                        <p className="placeholderParagraph">
                          You don't have any category with that name
                        </p>
                      </div>
                    ) : (
                      <div className="newCardBox">
                        <table className="table table-hover table-fixed table-bordered viewOrderTable categoryViewtbl">
                          <thead>
                            <tr>
                              <th>Categories</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allCategories
                              .sort((a, b) =>
                                a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                              )
                              .map((category, index) => {
                                return (
                                  <ListItem
                                    key={index}
                                    category={category}
                                    key={category._id}
                                    user={user}
                                    handleEditCat={handleEditCat}
                                    activePage={activePage}
                                  />
                                );
                              })}
                          </tbody>
                        </table>
                        <div className='paginationContainer'>
                          {numOfPages > 1 && !search && <Pagination count={numOfPages} shape="rounded" onChange={handleChange} color='secondary' />}

                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="placeHolderContMain">
                    <p>
                      <i className="categoryPlaceholderIcon"></i>
                    </p>
                    <p>Add Your Category</p>
                    <p className="placeholderParagraph">
                      Categories help you arrange and organize items, report on
                      item sales, and route items to specific printers.
                    </p>
                    <div className="placeholderButtonSection">
                      <button
                        className="btn btn-primary login_btn_next"
                        type="submit"
                        onClick={() => handleAddCategory()}
                      >
                        Create a Category
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {addCategory && (
        <Slider
          toggle={toggle}
          setToggle={setToggle}
          addCategory={addCategory}
          setAddCategory={setAddCategory}
        />
      )}

      {editCategory && (
        <Slider
          setEditCategory={setEditCategory}
          editCategory={editCategory}
          categoryId={categoryId}
          setToggle={setToggle}
          toggle={toggle}
          setId={setCatId}
          allCategories={allCategories}
        />
      )}
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
    categories: state.categories.mainCategories,
  };
})(AllCategories);
