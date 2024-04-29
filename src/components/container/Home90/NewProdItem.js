import React, { useState, usestate } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { BASE_URL } from "../../../constants";
import { addImageForProduct } from "../../../oscar-pos-core/actions";
import Loader from "../../common/Loader";
import "./style.css";

const NewProdItem = ({
  products,
  product,
  setProducts,
  index,
  user,
  error,
  setErrors,
  errors,
  loading,
}) => {
  const [imgLoading, setImgLoading] = useState(false);

  const handleChange = (value, type) => {
    if (type == "price" && value.length > 0 && !Number(value)) {
      return;
    }
    let arr = products;
    let obj = {
      ...arr[index],
      [type]: value,
    };
    arr[index] = obj;
    setProducts([...arr]);
    let errObj = {};
    if (type == "price") {
      errObj = {
        ...error,
        price: "",
      };
    } else {
      errObj = {
        ...error,
        name: "",
      };
    }
    setErrors({
      ...errors,
      [index]: errObj,
    });
  };

  const getBase64 = (img) => {
    setImgLoading(true);
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function () {
      let params = {
        image_type: "jpg",
        photo: reader.result,
        phone_number: user.phone_number,
        user_id: user.phone_number,
        activation_code: user.activation_code,
      };
      addImageForProduct(params, BASE_URL)
        .then((res) => {
          let arr = products;
          let obj = {
            ...arr[index],
            photo: [res.url],
          };
          arr[index] = obj;
          setProducts([...arr]);
          setImgLoading(false);
        })
        .catch((err) => {
          setImgLoading(false);
          console.log("err", err);
        });
    };
    reader.onerror = function (error) {
      setImgLoading(false);
      console.log("see error", error);
    };
  };

  const deleteItem = () => {
    let arr = products;
    arr.splice(index, 1);
    setProducts([...arr]);
  };

  const removeImgFromProduct = () => {
    let arr = products;
    let obj = {
      ...arr[index],
      photo: [],
    };
    arr[index] = obj;
    setProducts([...arr]);
  };

  return (
    <>
      <tr className="multipileProducttr">
        <td scope="row">{index + 1}</td>
        <td className="multiProductCol">
          {product.photo.length == 0 ? (
            <div className="uploadFIleCont">
              <button className="">
                {imgLoading == true ? (
                  <div className="productImageLoader">
                    <Spinner animation="border" className="loaderCircle" />
                  </div>
                ) : (
                  <span>
                    <i className="uploadImageIcon"></i>
                  </span>
                )}
                <input
                  name="image"
                  type="file"
                  accept=".jpeg, .png, .jpg"
                  disabled={loading}
                  onChange={(e) => getBase64(e.target.files[0])}
                />
              </button>
            </div>
          ) : (
            <div className="productImageThumbnail">
              <div className="prdtImgThumbInner">
                <img src={product.photo[0]} height={100} width={100} />
              </div>
              <span
                disabled={loading}
                onClick={() => removeImgFromProduct()}
                className="imgRemoveIconMain"
              >
                <i className="imgRemoveIcon"></i>
              </span>
            </div>
          )}
        </td>
        <td>
          <div className="form-group">
            <input
              className="form-control"
              name="name"
              value={product.name}
              placeholder={"Item name"}
              disabled={loading}
              onChange={(e) => handleChange(e.target.value, "name")}
            />
            {error && error.name ? (
              <p className="tableInputFieldErrorMsg">{error.name}</p>
            ) : (
              <p className="tableInputFieldErrorMsg"></p>
            )}
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
              value={product["price"]}
              placeholder={"Item Price"}
              disabled={loading}
              onChange={(e) => handleChange(e.target.value, "price")}
            />
          </p>
          {error && error.price ? (
            <p className="tableInputFieldErrorMsg">{error.price}</p>
          ) : (
            <p className="tableInputFieldErrorMsg"></p>
          )}
        </td>

        <td>
          <div className="form-group">
            <input
              className="form-control"
              name="price"
              value={product.categories}
              placeholder={"Category"}
              disabled={loading}
              onChange={(e) => handleChange(e.target.value, "categories")}
            />
            {error && error.category ? (
              <p className="tableInputFieldErrorMsg">{error.category}</p>
            ) : (
              <p className="tableInputFieldErrorMsg"></p>
            )}
          </div>
        </td>
        <td>
          {products.length > 1 && (
            <div className="productItemRowDelete">
              <button
                className="prdDltBtn"
                disabled={loading}
                onClick={() => deleteItem()}
              >
                <span>
                  <i className="dltIcon"></i>
                </span>
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* <div className="col-sm-12">
        <div className="productItemMain">
          <div className="productItemImageMain">
            {product.Image.length == 0 ? (
              <div className="uploadFIleCont">
                <button className="">
                  <span>
                    <i className="uploadImageIcon"></i>
                  </span>
                  {imgLoading == true ? (
                    <span>Loading...</span>
                  ) : (
                    <span>Add images</span>
                  )}
                </button>
                <input
                  name="image"
                  type="file"
                  accept=".jpeg, .png, .jpg"
                  disabled={loading}
                  onChange={(e) => getBase64(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="productImageThumbnail">
                <div className="prdtImgThumbInner">
                  <img src={product.Image[0]} height={100} width={100} />
                </div>
                <div
                  className="prdtImgThumbInnerText"
                  disabled={loading}
                  onClick={() => removeImgFromProduct()}
                >
                  <p>Remove</p>
                  <span className="imgRemoveIconMain">
                    <i className="imgRemoveIcon"></i>
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="name"
              value={product.Name}
              placeholder={"Item name"}
              disabled={loading}
              onChange={(e) => handleChange(e.target.value, "Name")}
            />
            {error && error.name ? (
              <p className="inputFieldErrorMsg">{error.name}</p>
            ) : (
              <p className="inputFieldErrorMsg"></p>
            )}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="price"
              value={product["Selling Price"]}
              placeholder={"Item Price"}
              disabled={loading}
              onChange={(e) => handleChange(e.target.value, "Selling Price")}
            />
            {error && error.price ? (
              <p className="inputFieldErrorMsg">{error.price}</p>
            ) : (
              <p className="inputFieldErrorMsg"></p>
            )}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="price"
              value={product.Category}
              placeholder={"Category"}
              disabled={loading}
              onChange={(e) => handleChange(e.target.value, "Category")}
            />
            {error && error.category ? (
              <p className="inputFieldErrorMsg">{error.category}</p>
            ) : (
              <p className="inputFieldErrorMsg"></p>
            )}
          </div>

          {products.length > 1 && (
            <div className="productItemRowDelete">
              <button
                className="prdDltBtn"
                disabled={loading}
                onClick={() => deleteItem()}
              >
                <span>
                  <i className="dltIcon"></i>
                </span>
              </button>
            </div>
          )}
        </div>
      </div> */}
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
  };
})(NewProdItem);
