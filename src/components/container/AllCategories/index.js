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
import useGetCollectionData from "../../../hooks/getData";

const AllCategories = ({ history, location }) => {
  const [selected, setSelected] = useState("AllCategories");
  const [addCategory, setAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [categoryId, setCatId] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [numOfPages, setNumOfPages] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const allCategories = useGetCollectionData('categories');

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

  const onSearchChange = (val) => {
    if (allCategories.length) {
      let res = allCategories.filter(x => x.name.toLowerCase().includes(val.toLowerCase()))
      setSearch(res)
    }
  }


  useEffect(() => {
    if (allCategories?.length > 0) {
      setLoading(false);
    }
    else {
      if (allCategories?.length === 0) setLoading(true);
    }
  }, [allCategories]);

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
                ) : allCategories.length > 0 ? (
                  <div className="productScreenMainCont">
                    <div className="viewsTopActionSection">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group searchBartop">
                            <input
                              type="search"
                              className="form-control"
                              placeholder={`${allCategories.length} Categoris (Search Categories by name)`}
                              aria-label="Search"
                              aria-describedby="search-addon"
                              onChange={(e) => onSearchChange(e.target.value)}
                            />
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
                    <div className="newCardBox">
                      <table className="table table-hover table-fixed table-bordered viewOrderTable categoryViewtbl">
                        <thead>
                          <tr>
                            <th>Categories</th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          { (search.length ? search : allCategories)
                            .sort((a, b) =>
                              a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                            )
                            .map((category, index) => {
                              return (
                                <ListItem
                                  key={index}
                                  category={category}
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
    // user: state.user,
    categories: state.categories.mainCategories,
  };
})(AllCategories);
