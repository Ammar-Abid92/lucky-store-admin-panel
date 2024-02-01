import { addImageForProduct } from "../../../oscar-pos-core/actions";
import AppDialog from "../../common/AppDialog";
import { BASE_URL } from "../../../constants";
import { Spinner } from "react-bootstrap";
import React, { useState } from "react";
import "./style.css";
import {
  formatInputNum,
  formatWeightNum,
} from "../../../oscar-pos-core/constants";

const ListItem = ({
  setBulkProducts,
  bulkProducts,
  setErrors,
  loading,
  index,
  error,
  data,
  user,
}) => {
  const [discountPrice, setDiscountPrice] = useState(data["discountPrice"]);
  const [costPrice, setCostPrice] = useState(data["costPrice"]);
  const [category, setCategory] = useState(data["categories"]);
  const [weight, setWeight] = useState(data["weight"]);
  const [imgLoading, setImgLoading] = useState(false);
  const [price, setPrice] = useState(data["price"]);
  const [stock, setStock] = useState(data["stock"]);
  const [unit, setUnit] = useState(data["perUnit"]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [name, setName] = useState(data["name"]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState([]);

  const handleInput = (value, type) => {
    if (
      type === "costPrice" ||
      type === "price" ||
      type === "discountPrice" ||
      type === "stock" ||
      type === "weight"
    ) {
      if (/^\d*\.?\d*$/.test(value)) {
        let errObj = error;
        if (type === "costPrice") {
          setCostPrice(formatInputNum(value));
          errObj[index] = {
            ...errObj,
            costPrice: "",
          };
        } else if (type === "price") {
          setPrice(formatInputNum(value));
          errObj[index] = {
            ...errObj,
            price: "",
          };
        } else if (type === "discountPrice") {
          setDiscountPrice(formatInputNum(value));
          errObj[index] = {
            ...errObj,
            discount: "",
          };
        } else if (type === "stock") {
          setStock(+value);
          errObj[index] = {
            ...errObj,
            stock: "",
          };
        } else if (type === "weight") {
          setWeight(formatWeightNum(value));
          errObj[index] = {
            ...errObj,
            weight: "",
          };
        }

        let arr = bulkProducts;
        let obj = arr[index];
        obj = {
          ...obj,
          [type]: value,
        };
        arr[index] = obj;
        setBulkProducts([...arr]);
        setErrors(errObj);
      }
    } else {
      let arr = bulkProducts;
      let obj = arr[index];
      obj = {
        ...obj,
        [type]: value,
      };
      arr[index] = obj;
      setBulkProducts([...arr]);
    }
  };

  const getBase64 = (img, cb) => {
    setImgLoading(true);
    let reader = new FileReader();
    if (img) {
      reader.readAsDataURL(img);
    }
    if (!img) {
      setImgLoading(false);
    }
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
          setImage([res.url]);
          let arr = bulkProducts;
          let obj = arr[index];
          obj = {
            ...obj,
            Image: [res.url],
          };
          arr[index] = obj;
          setBulkProducts([...arr]);
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

    reader.onabort = () => console.log("User Cancelled Upload");
  };

  const removeImgFromProduct = () => {
    let arr = bulkProducts;
    let obj = arr[index];
    obj = {
      ...obj,
      Image: [],
    };
    arr[index] = obj;
    setBulkProducts([...arr]);
    setImage([]);
    setImgLoading(false);
  };

  const handleDelereItem = () => {
    let arr = bulkProducts;
    arr.splice(index, 1);
    setBulkProducts([...arr]);
    setOpen(false);
  };

  return (
    <>
      <tr onClick={() => setIsEnabled(false)} className=" multipileProducttr">
        <td scope="row">{index + 1}</td>
        <td className="multiProductCol">
          {image.length === 0 &&
            (data.photo.length == 0 || data.photo[0] == "") ? (
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
                <img src={image[0] || data.photo[0]} height={100} width={100} />
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
              value={name}
              disabled={loading}
              readOnly={isEnabled}
              onChange={(e) => {
                handleInput(e.target.value, "name");
                setName(e.target.value);
              }}
            />
            {error && error[index]?.name ? (
              <p className="tableInputFieldErrorMsg">{error[index]?.name}</p>
            ) : (
              <p className="tableInputFieldErrorMsg"></p>
            )}
          </div>
        </td>
        <td className="form-group">
          <input
            className="form-control"
            value={price}
            disabled={loading}
            readOnly={isEnabled}
            onChange={(e) => {
              handleInput(e.target.value, "price");
            }}
          />
          {error && error[index]?.price ? (
            <p className="tableInputFieldErrorMsg">{error[index]?.price}</p>
          ) : (
            <p className="tableInputFieldErrorMsg"></p>
          )}
        </td>
        <td className="form-group">
          <input
            className="form-control"
            value={discountPrice}
            disabled={loading}
            readOnly={isEnabled}
            onChange={(e) => {
              handleInput(e.target.value, "discountPrice");
            }}
          />
          {error && error[index]?.discount ? (
            <p className="tableInputFieldErrorMsg">{error[index]?.discount}</p>
          ) : (
            <p className="tableInputFieldErrorMsg"></p>
          )}
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <div className="form-group">
            <input
              className="form-control"
              value={costPrice}
              disabled={loading}
              readOnly={isEnabled}
              onChange={(e) => {
                handleInput(e.target.value, "costPrice");
              }}
            />
            {error && error[index]?.costPrice ? (
              <p className="tableInputFieldErrorMsg">
                {error[index]?.costPrice}
              </p>
            ) : (
              <p className="tableInputFieldErrorMsg"></p>
            )}
          </div>
        </td>
        <td>
          <div className="form-group">
            <input
              className="form-control"
              value={unit}
              disabled={loading}
              readOnly={isEnabled}
              onChange={(e) => {
                handleInput(e.target.value, "perUnit");
                setUnit(e.target.value);
              }}
            />
            {error && error[index]?.unit ? (
              <p className="tableInputFieldErrorMsg">{error[index]?.unit}</p>
            ) : (
              <p className="tableInputFieldErrorMsg"></p>
            )}
          </div>
        </td>
        <td>
          <div className="form-group">
            <input
              className="form-control"
              value={category}
              disabled={loading}
              readOnly={isEnabled}
              onChange={(e) => {
                handleInput(e.target.value, "categories");
                setCategory(e.target.value);
              }}
            />
            {error && error[index]?.category ? (
              <p className="tableInputFieldErrorMsg">
                {error[index]?.category}
              </p>
            ) : (
              <p className="tableInputFieldErrorMsg"></p>
            )}
          </div>
        </td>

        <td>
          <div className="form-group">
            <input
              className="form-control"
              value={stock}
              disabled={loading}
              readOnly={isEnabled}
              onChange={(e) => {
                handleInput(e.target.value, "stock");
              }}
            />
            {error && error[index]?.stock ? (
              <p className="tableInputFieldErrorMsg">{error[index]?.stock}</p>
            ) : (
              <p className="tableInputFieldErrorMsg"></p>
            )}
          </div>
        </td>

        <td>
          <div className="form-group">
            <input
              className="form-control"
              value={weight}
              disabled={loading}
              readOnly={isEnabled}
              onChange={(e) => {
                handleInput(e.target.value, "weight");
              }}
            />
            {error && error[index]?.weight ? (
              <p className="tableInputFieldErrorMsg">{error[index]?.weight}</p>
            ) : (
              <p className="tableInputFieldErrorMsg"></p>
            )}
          </div>
        </td>

        <td>
          {bulkProducts.length > 1 && (
            <div className="productItemRowDelete">
              <button
                className="prdDltBtn"
                disabled={loading}
                onClick={() => {
                  if (loading) return;
                  else setOpen(true);
                }}
              >
                <span>
                  <i className="dltIcon"></i>
                </span>
              </button>
            </div>
          )}
        </td>
      </tr>

      <AppDialog
        handleClose={() => setOpen(false)}
        handleAction={handleDelereItem}
        setOpen={setOpen}
        type="delete"
        open={open}
      />
    </>
  );
};

export default ListItem;
