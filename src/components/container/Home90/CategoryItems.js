import React, { useState } from "react";
import { BASE_URL } from "../../../constants";
import { deleteDukaanProductToCloud } from "../../../oscar-pos-core/actions";
import { PRODUCT } from "../../../oscar-pos-core/actions/types";
import { store } from "../../../store";
import AppDialog from "../../common/AppDialog";

const categoryItems = ({
  product,
  index,
  user,
  open,
  setOpen,
  setDeleteLoad,
  deleteLoad,
  loading,
  catalogItems,
}) => {
  const deleteProduct = () => {
    setDeleteLoad(true);
    deleteDukaanProductToCloud(product, user, BASE_URL)
      .then((res) => {
        setOpen(false);
        setDeleteLoad(false);
        store.dispatch({
          type: PRODUCT.REMOVE_PRODUCT,
          id: product._id,
        });
      })
      .catch((err) => {
        console.log("Error deleting product on cloud", err);
        setDeleteLoad(false);
      });
  };

  return (
    <>
      <tr className="multipileProducttr">
        <td scope="row">{index + 1}</td>
        <td className="multiProductCol">
          <div className="productImageThumbnail">
            <div className="prdtImgThumbInner">
              <img src={product.photo[0]} height={100} width={100} />
            </div>
          </div>
        </td>
        <td>
          <div className="form-group">
            <input
              className="form-control"
              name="name"
              value={product.name}
              placeholder={"Product name"}
              readOnly
            />
            <p className="tableInputFieldErrorMsg"></p>
          </div>
        </td>

        <td className="form-group">
          <p className="catalogItemPriceInput">
            <span>
              {user ? (user.currency ? user.currency : "Rs. ") : "Rs. "}
            </span>
            <input
              className="form-control"
              name="price"
              value={product.price}
              placeholder={"Product Price"}
              readOnly
            />
          </p>
          <p className="tableInputFieldErrorMsg"></p>
        </td>

        <td>
          <div className="form-group">
            <input
              className="form-control"
              name="price"
              value={product.categories[0].name}
              placeholder={"Category"}
              readOnly
            />
            <p className="tableInputFieldErrorMsg"></p>
          </div>
        </td>
        <td>
          <button
            className="prdDltBtn"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <span>
              <i className="dltIcon"></i>
            </span>
          </button>
        </td>
      </tr>

      <AppDialog
        handleClose={() => setOpen(false)}
        handleAction={deleteProduct}
        setOpen={setOpen}
        load={deleteLoad}
        type={"delete"}
        open={open}
      />

      {/* <div className="col-sm-12">
        <div className="productItemMain catalogProductitemlList">
          <div className="productItemImageMain">
            <div className="productImageThumbnail">
              <div className="prdtImgThumbInner">
                <img src={product.photo[0]} height={100} width={100} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="name"
              value={product.name}
              placeholder={"Product name"}
              readOnly
            />
          </div>

          <div className="form-group withRsBox">
            <p>
              <span>
                {user ? (user.currency ? user.currency : "Rs. ") : "Rs. "}
              </span>
              <input
                className="form-control"
                name="price"
                value={product.price}
                placeholder={"Product Price"}
                readOnly
              />
            </p>
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="price"
              value={product.categories[0].name}
              placeholder={"Category"}
              readOnly
            />
          </div>

          <div className="productItemRowDelete">
            <button
              className="prdDltBtn"
              disabled={loading}
              onClick={() => setOpen(true)}
            >
              <span>
                <i className="dltIcon"></i>
              </span>
            </button>
          </div>
        </div>

        <AppDialog
          handleClose={() => setOpen(false)}
          handleAction={deleteProduct}
          setOpen={setOpen}
          load={deleteLoad}
          type={"delete"}
          open={open}
        />
      </div> */}
    </>
  );
};

export default categoryItems;
