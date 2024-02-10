import { formatInputNum } from "../../../oscar-pos-core/constants";
import { BASE_URL, themeStyleSheet } from "../../../constants";
import React, { useState, useEffect } from "react";
import loader from "../../../assets/03_Loader.gif";
import TopHeader from "../../common/TopHeader";
import AppDialog from "../../common/AppDialog";
import Skeleton from "react-loading-skeleton";
import { Dropdown } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import Slider from "../../common/Slider";
import { connect } from "react-redux";
import "./style.css";
import {
  updateDukaanProductToCloud,
  UpdateProductToRedux,
  addImageForProduct,
} from "../../../oscar-pos-core/actions";

const { innerHeight } = window;
const EditProduct = ({
  setEditToggle,
  setEditItems,
  allProducts,
  editToggle,
  categories,
  productId,
  setId,
  user,
}) => {
  const [continueSellingWithoutStock, setContinueSellingWithoutStock] =
    useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("");
  const [addCategory, setAddCategory] = useState(false);
  const [showVariant, setShowVar] = useState(false);
  const [description, setDescription] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isActive, setIsActive] = useState();
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");
  const [item, setItem] = useState("");

  const [variants, setVariants] = useState({
    color: [],
    sizes: [],
  });

  const setValueToInput = (product) => {
    setName(product.name);
    setPrice(Number(product.price));
    setUnit(product.perUnit);
    setImages(product.photo);
    setIsActive(product.isActive);
    setVariants(product.variants);
    setDescription(product.description);
    setDiscountPrice(product.discountPrice || "");
    setStock(product.stock == null ? "" : product.stock);
    setContinueSellingWithoutStock(product.continue_without_stock);
    setCostPrice(product.costPrice == null ? "" : product.costPrice);
    setCategory(product.categories.length > 0 ? product.categories[0] : []);
  };

  useEffect(() => {
    let myArr = allProducts.find((x) => x._id === productId);

    if (myArr) {
      setValueToInput(myArr);
      setItem(myArr);
    }
  }, [editToggle]);

  const isValidInput = () => {
    // setLoading(true);
    let isValid = true;
    let obj = {};

    if (!name) {
      obj = {
        ...obj,
        name: "Product name is required",
      };
      isValid = false;
    }
    if (!price) {
      obj = {
        ...obj,
        price: "Price is required",
      };
      isValid = false;
    }
    // if (!Number(price)) {
    //   obj = {
    //     ...obj,
    //     price: 'Price should be in number format',
    //   };
    //   isValid = false;
    // }
    if (discountPrice && Number(discountPrice >= Number(price))) {
      obj = {
        ...obj,
        discountPrice: "Discounted price can not be higher than selling price",
      };
      isValid = false;
    }
    if (!unit) {
      obj = {
        ...obj,
        unit: "Product unit is required",
      };
      isValid = false;
    }
    if (!category) {
      obj = {
        ...obj,
        category: "Product category is required",
      };
      isValid = false;
    }
    if (isValid == false) {
      return obj;
    } else {
      return true;
    }
    // setLoading(false)
  };

  const onChange = (type, value) => {
    if (type === "name" && value !== " ") {
      setName(value);
    } else if (type === "quantity") {
      if (/^[0-9]+$/.test(+value) && value !== " ") {
        setStock(+value);
      }
    } else if (type === "costPrice") {
      if (value !== " ") {
        setCostPrice(formatInputNum(value));
      }
    } else if (type === "sellPrice") {
      if (value !== " ") {
        setPrice(Number(formatInputNum(value)));
      }
    } else if (type === "discount") {
      if (value !== " ") {
        setDiscountPrice(formatInputNum(value));
      }
    } else if (type === "desc") {
      setDescription(value);
    }
  };

  const getBase64 = (photos) => {
    setImageLoading(true);
    for (let img of photos) {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function () {
        let params = {
          image_type: "jpeg",
          photo: reader.result,
          phone_number: user.phone_number,
          user_id: user.phone_number,
          activation_code: user.activation_code,
        };
        addImageForProduct(params, BASE_URL)
          .then((res) => {
            setImages((prev) => [...prev, res.url]);
            setImageLoading(false);
          })
          .catch((err) => {
            setImageLoading(false);
            console.log("err", err);
          });
      };
      reader.onerror = function (error) {
        setImageLoading(false);
        console.log("see error", error);
      };
    }
  };

  const submitProduct = () => {
    setLoading(false);
    if (isValidInput() != true) {
      setLoading(false);
      setErrors(isValidInput());
      return;
    } else {
      let params = {
        _id: productId,
        name,
        stock,
        discountPrice: parseFloat(discountPrice),
        price: parseFloat(price),
        costPrice: isNaN(parseFloat(costPrice)) ? null : parseFloat(costPrice),
        description,
        variants,
        categories: [category],
        photo: images,
        isActive,
        perUnit: unit,
        phone_number: user.phone_number,
        continue_without_stock: continueSellingWithoutStock,
        stockable: stock == "" ? false : true,
      };
      setLoading(true);
      updateDukaanProductToCloud(params, user, BASE_URL)
        .then((res) => {
          UpdateProductToRedux(params)
            .then((res) => {
              setLoading(false);
              setSuccess("ITEM EDITED SUCCESSFULLY");
              setTimeout(() => {
                setSuccess(false);
                backAction();
              }, 2000);
            })
            .catch((err) => {
              console.log("err", err);
            });

          setLoading(false);
          setSuccess("ITEMS EDITED SUCCESSFULLY");
          setTimeout(() => {
            setSuccess(false);
            backAction();
          }, 2000);
        })
        .catch((err) => {
          console.log("CATCH at edit product", err);
        })
        .finally(() => setLoading(false));
    }
  };

  const deletingImages = (picture) => {
    let picArray = images.filter((x) => x != picture);
    setImages(picArray);
  };

  const handleVariants = () => {
    setShowVar(true);
    setTimeout(() => {
      setToggle(true);
    });
  };

  const backAction = () => {
    if (open) setOpen(false);
    setEditToggle(false);
    setTimeout(() => {
      setEditItems(false);
      setId("");
    }, 500);
  };

  const checkChanges = () => {
    if (
      name !== item.name ||
      price !== item.price ||
      stock !== item.stock ||
      unit !== item.perUnit ||
      isActive !== item.isActive ||
      (item.costPrice !== null && costPrice !== item.costPrice) ||
      (item.costPrice === null && costPrice) ||
      description !== item.description ||
      images.length !== item.photo.length ||
      (item.discountPrice !== null && discountPrice !== item.discountPrice) ||
      (item.discountPrice === null && discountPrice) ||
      variants.color.length !== item.variants.color.length ||
      variants.sizes.length !== item.variants.sizes.length ||
      continueSellingWithoutStock !== item.continue_without_stock ||
      item?.categories?.indexOf(category) === -1
    ) {
      return true;
    } else return false;
  };

  const handleAddCategory = () => {
    setAddCategory(true);
    setTimeout(() => {
      setToggle(true);
    });
  };
  console.log("images", images);
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
          if (checkChanges()) setOpen(true);
          else backAction();
        }}
        title={"Edit Item"}
      />

      <div
        className="addItemMainContainer"
        style={{ height: innerHeight * 0.8 }}
      >
        {images && images?.length > 0 ? (
          <div className="multiImageUploadBox">
            <div className="box">
              <input
                id="file-2"
                className="inputfile inputfile-2 inuptStepOne"
                data-multiple-caption="{count} files selected"
                name="image"
                type="file"
                multiple
                accept=".jpeg, .png, .jpg"
                onChange={(e) => getBase64(e.target.files)}
              />
              <label htmlFor="file-2">
                <span className="upldIconimg">
                  <i className="uploadImageIcon"></i>
                </span>
                <span>{imageLoading ? "Uploading" : "Add an image"}</span>
              </label>
            </div>

            {images.map((item, index) => {
              return (
                <div className="multiImageInner" key={index}>
                  <img src={item} height={110} width={125} key={index} alt="" />
                  <button
                    className="multiImageInnerRemoveIcon"
                    onClick={() => deletingImages(item)}
                  >
                    x
                  </button>
                </div>
              );
            })}

            {imageLoading && (
              <Skeleton
                height={110}
                width={125}
                style={{ marginTop: 30, marginRight: 28 }}
              />
            )}
          </div>
        ) : (
          <div className="multiImageUploadBox">
            <div className="box">
              <input
                id="file-2"
                className="inputfile inputfile-2 inuptStepOne"
                data-multiple-caption="{count} files selected"
                name="image"
                type="file"
                multiple
                accept=".jpeg, .png, .jpg"
                onChange={(e) => getBase64(e.target.files)}
              />
              <label htmlFor="file-2">
                <span className="upldIconimg">
                  <i className="uploadImageIcon"></i>
                </span>
                <span>{imageLoading ? "Uploading" : "Add an image"}</span>
              </label>
            </div>
          </div>
        )}
        <form className="" id="editForm">
          <div className="addItemINputRowCont firstRowInput">
            <div className="form-group addItemInupt">
              <input
                className="form-control"
                placeholder="Enter Item Name"
                value={name}
                onChange={(e) => onChange("name", e.target.value)}
              />

              <label className="control-label" htmlFor="name">
                Item Name
              </label>
              {errors.name ? (
                <p className="inpurErrors">{errors.name}</p>
              ) : (
                <p className="inpurErrors" />
              )}
            </div>

            <div className="selctCategoryMain">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {category?.name ? category.name : "Select Category"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {categories &&
                    categories
                      .sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                          return -1;
                        }
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((categ) => {
                        return (
                          <Dropdown.Item
                            key={categ.name}
                            onSelect={() => setCategory(categ)}
                          >
                            {categ.name}
                          </Dropdown.Item>
                        );
                      })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="addItemINputRowCont">
            <div className="form-group addItemInupt">
              <input
                className="form-control"
                placeholder="Enter Cost Price"
                value={costPrice}
                onChange={(e) => onChange("costPrice", e.target.value)}
              />
              <label className="control-label" htmlFor="costPrice">
                Cost Price
              </label>
              {errors.costPrice ? (
                <p className="inpurErrors">{errors.costPrice}</p>
              ) : (
                <p className="inpurErrors" />
              )}
            </div>

            <div className="form-group addItemInupt">
              <input
                className="form-control"
                placeholder="Enter Selling Price"
                value={price}
                onChange={(e) => onChange("sellPrice", e.target.value)}
              />
              <label className="control-label" htmlFor="price">
                Selling Price
              </label>
              {errors.price ? (
                <p className="inpurErrors">{errors.price}</p>
              ) : (
                <p className="inpurErrors" />
              )}
            </div>
          </div>

          <div className="addItemINputRowCont">
            <div className="form-group addItemInupt">
              <input
                className="form-control"
                placeholder="Enter Discounted Price"
                value={discountPrice}
                onChange={(e) => onChange("discount", e.target.value)}
              />
              <label className="control-label" htmlFor="price">
                Discounted Price
              </label>
              {errors.discountedPrice ? (
                <p className="inpurErrors">{errors.discountedPrice}</p>
              ) : (
                <p className="inpurErrors" />
              )}
            </div>

            <div className="form-group addItemInupt">
              <input
                className="form-control"
                placeholder="Enter Quantity"
                value={stock}
                onChange={(e) => onChange("quantity", e.target.value)}
              />
              <label className="control-label" htmlFor="stock">
                Quantity
              </label>
              {errors.name ? (
                <p className="inpurErrors">{errors.name}</p>
              ) : (
                <p className="inpurErrors" />
              )}
            </div>
          </div>

          <div className="addItemINputRowCont">
            <div className="form-group unitandCategoryMain">
              <div className="selectUnitDrop">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {unit == "" ? "Select Unit" : unit}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onSelect={() => setUnit("Unit")}>
                      Unit
                    </Dropdown.Item>
                    <Dropdown.Item onSelect={() => setUnit("kg")}>
                      kg
                    </Dropdown.Item>
                    <Dropdown.Item onSelect={() => setUnit("gm")}>
                      gm
                    </Dropdown.Item>
                    <Dropdown.Item onSelect={() => setUnit("ltr")}>
                      ltr
                    </Dropdown.Item>
                    <Dropdown.Item onSelect={() => setUnit("ml")}>
                      ml
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <span style={{ color: themeStyleSheet.red }}>{errors.unit}</span> */}
              </div>
            </div>
          </div>

          <div className="addItemINputRowCont">
            <div className="form-group textAreaField">
              <textarea
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => onChange("desc", e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="buttonContEditDtl" style={{ height: innerHeight * 0.11 }}>
        <button
          type="submit"
          form="editForm"
          value="Next"
          className="login_btn_next"
          style={{
            backgroundColor: checkChanges()
              ? themeStyleSheet.brightGreen
              : themeStyleSheet.lightGray,
            border: `1px solid ${checkChanges()
              ? themeStyleSheet.brightGreen
              : themeStyleSheet.lightGray
              }`,
          }}
          disabled={loading || success}
          onClick={(e) => {
            e.preventDefault();
            submitProduct();
          }}
        >
          {loading ? (
            <Spinner
              className="loaderCircle Products"
              animation="border"
              role="status"
            ></Spinner>
          ) : (
            "Update"
          )}
        </button>
      </div>

      {showVariant && (
        <Slider
          toggle={toggle}
          variants={variants}
          setToggle={setToggle}
          setShowVar={setShowVar}
          showVariant={showVariant}
          setVariants={setVariants}
        />
      )}

      {addCategory && (
        <Slider
          isEdit={true}
          toggle={toggle}
          setToggle={setToggle}
          setCategory={setCategory}
          addCategory={addCategory}
          setAddCategory={setAddCategory}
        />
      )}

      <AppDialog
        handleClose={() => setOpen(false)}
        handleAction={backAction}
        setOpen={setOpen}
        type="discard"
        open={open}
      />
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
    // products: state.products,
    categories: state.categories.mainCategories,
  };
})(EditProduct);
