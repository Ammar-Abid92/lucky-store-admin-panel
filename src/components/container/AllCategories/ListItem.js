import { deleteDukaanCategoryToCloud } from "../../../oscar-pos-core/actions";
import { CATEGORY } from "../../../oscar-pos-core/actions/types";
import placeholder from "../../../assets/icons/placeholder.png";
import AppDialog from "../../common/AppDialog";
import { analytics } from "../../../firebase";
import { BASE_URL } from "../../../constants";
import React, { useState } from "react";
import { store } from "../../../store";
import "./style.css";

const ListItem = ({ category, user, handleEditCat }) => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteCategory = () => {
    setLoading(true);
    deleteDukaanCategoryToCloud(category, user, BASE_URL)
      .then((res) => {
        analytics.logEvent('category_deleted');

        store.dispatch({
          type: CATEGORY.REMOVE_CATEGORY,
          id: category.id,
        });
        window.location.reload();
        setLoading(false);
      })
      .catch((err) => {
        console.log("error, ", err);
        setLoading(false);
      });
  };

  const capitalizeName = () => {
    return category.name.replace(/\b(\w)/g, (s) => s.toUpperCase());
  };

  return (
    <tr
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <td className="prdImageBox">
        <div className="catFirstCell">
          {category.image != 0 ? <img src={category.image} alt='category' /> : <img src={placeholder} />}
          <p className="productScreenproductName">{capitalizeName()}</p>
        </div>
      </td>
      <td className="">
        <div className="categoryTableAction">
          <button
            className="btn categoryTblButton"
            onClick={() => handleEditCat(category._id)}
          >
            <span>
              <svg
                fill="var(--brightGreen"
                height="20"
                width="20"
                viewBox="0 0 37 37"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill=""
                  d="M27.378,5.576l-1.831-1.831c-1.361-1.361-3.734-1.361-5.096,0l-2.366,2.368
                                            c-0.002,0.001-0.005,0.005-0.008,0.006c0,0.002-0.005,0.005-0.007,0.006L3.972,20.223c-0.155,0.154-0.255,0.356-0.286,0.573
                                            l-0.915,6.406c-0.046,0.315,0.059,0.635,0.283,0.858c0.191,0.193,0.45,0.301,0.717,0.301c0.049,0,0.098-0.006,0.145-0.012
                                            l6.408-0.914c0.217-0.029,0.419-0.135,0.572-0.285L24.992,13.05c0-0.001,0.005-0.005,0.005-0.006
                                            c0.003-0.002,0.005-0.006,0.008-0.009l2.368-2.368c0.682-0.681,1.057-1.583,1.057-2.545S28.057,6.256,27.378,5.576z
                                            M9.704,25.477l-4.736,0.682l0.676-4.738L18.792,8.273l4.06,4.059L9.704,25.477z M25.941,9.236l-1.655,1.66l-4.06-4.059
                                            l1.66-1.66c0.594-0.597,1.631-0.597,2.227,0l1.83,1.83c0.302,0.299,0.463,0.694,0.463,1.116
                                            C26.404,8.544,26.242,8.941,25.941,9.236z"
                />
              </svg>
            </span>
            <span>Edit</span>
          </button>

          <button
            className="btn categoryTblDeletButton"
            onClick={() => setOpen(true)}
          >
            <span>
              <svg
                fill="var(--red"
                height="21"
                width="21"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill=""
                  d="M14.977,18.341V8.129c0-0.375-0.305-0.679-0.68-0.679s-0.679,0.303-0.679,0.679v10.211
		c0,0.376,0.304,0.68,0.679,0.68S14.977,18.717,14.977,18.341z M11.263,18.341V8.129c0-0.375-0.304-0.679-0.679-0.679
		c-0.376,0-0.68,0.303-0.68,0.679v10.211c0,0.376,0.304,0.68,0.68,0.68C10.959,19.021,11.263,18.717,11.263,18.341z M18.762,7.451
		c-0.376,0-0.679,0.303-0.679,0.679v12.334c0,0.405-0.331,0.735-0.735,0.735H7.535c-0.406,0-0.736-0.33-0.736-0.735V8.129
		c0-0.375-0.304-0.679-0.679-0.679c-0.374,0-0.68,0.303-0.68,0.679v12.334c0,1.154,0.938,2.094,2.095,2.094h9.813
		c1.153,0,2.093-0.939,2.093-2.094V8.129C19.44,7.754,19.135,7.451,18.762,7.451z M20.57,4.912h-3.824V2.803
		c0-0.376-0.306-0.679-0.68-0.679H8.814c-0.374,0-0.679,0.302-0.679,0.679v2.109H4.311c-0.374,0-0.679,0.302-0.679,0.679
		c0,0.374,0.305,0.679,0.679,0.679h16.26c0.374,0,0.679-0.305,0.679-0.679C21.249,5.214,20.944,4.912,20.57,4.912z M15.388,4.912
		H9.494V3.483h5.894V4.912L15.388,4.912z"
                />
              </svg>
            </span>
            <span>Delete</span>
          </button>
        </div>
      </td>

      <AppDialog
        handleClose={() => setOpen(false)}
        handleAction={deleteCategory}
        setOpen={setOpen}
        type="deleteCat"
        open={open}
      />
    </tr>
  );
};

export default ListItem;
