import { formatInputNum } from "../../../oscar-pos-core/constants";
import { BASE_URL, themeStyleSheet } from "../../../constants";
import React, { useEffect, useState } from "react";
import loader from "../../../assets/03_Loader.gif";
import AppDialog from "../../common/AppDialog";
import TopHeader from "../../common/TopHeader";
import Skeleton from "react-loading-skeleton";
import { Dropdown } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import Slider from "../../common/Slider";
import { connect } from "react-redux";
import "./style.css";
import {
  getDukaanCategoryFromCloud,
  addDukaanProductToCloud,
  addImageForProduct,
  addProductToRedux,
} from "../../../oscar-pos-core/actions";

const { innerHeight } = window;

const AddProduct = ({
  user,
  categories,
  setAddItems,
  setAddToggle,
  addToggle,
}) => {
  const [continueSellingWithoutStock, setContinueSellingWithoutStock] =
    useState(true);
  const [variants, setVariants] = useState({ color: [], sizes: [] });
  const [discountPrice, setDiscountPrice] = useState("");
  const [addCategory, setAddCategory] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [showVariant, setShowVar] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [costPrice, setCostPrice] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getDukaanCategoryFromCloud(user.vanity_url, BASE_URL, {
      pageNumber: 1,
      pageSize: 500,
    });
  }, [user.vanity_url]);

  const validatation = () => {
    setLoading(true);
    setErrors({});

    var errObj = {};
    var isError = false;

    if (!name || name.toString().length < 1) {
      errObj = {
        name: "Item name is required",
      };
      isError = true;
    }
    if (!price || price === null || price === undefined) {
      errObj = {
        ...errObj,
        price: "Price is required",
      };
      isError = true;
    }
    if (!unit || unit === null || unit === undefined) {
      errObj = {
        ...errObj,
        unit: "Item unit is required",
      };
      isError = true;
    }
    if (category.length == 0) {
      errObj = {
        ...errObj,
        category: "Category is required",
      };
      isError = true;
    }
    if (continueSellingWithoutStock == true && !stock) {
      errObj = {
        ...errObj,
        quantity: "Qty is required",
      };
      isError = true;
    }
    if (discountPrice) {
      if (Number(discountPrice) >= Number(price)) {
        errObj = {
          ...errObj,
          discountPrice: "Discount price should be less than selling price",
        };
        isError = true;
      }
    }
    if (isError == true) {
      setLoading(false);
      setErrors(errObj);
    }
    return isError;
  };

  const disableState = () => {
    if (!name || !unit || !price || category.length == 0) {
      return true;
    } else return false;
  };

  const addProductToCloud = (e) => {
    e.preventDefault();
    if (validatation() === false) {
      let params = {
        name,
        price: parseFloat(price),
        discountPrice: parseFloat(discountPrice),
        costPrice: isNaN(parseFloat(costPrice)) ? null : parseFloat(costPrice),
        description,
        stock: parseInt(stock),
        variants,
        categories: [category],
        photo: image,
        isActive: true,
        perUnit: unit,
        phone_number: user.phone_number,
        continue_without_stock: continueSellingWithoutStock,
        stockable: stock == "" ? false : true,
      };
      addDukaanProductToCloud(params, user.vanity_url, BASE_URL)
        .then((res) => {
          params._id = res.id.toString();
          params.slug = res.slug;
          addProductToRedux(params)
            .then((resres) => {
              setLoading(false);
              setSuccess("ITEM ADDED SUCCESSFULLY");
              setTimeout(() => {
                setSuccess(false);
                backAction();
              }, 2000);
            })
            .catch((err) => {
              console.log("err", err);
            });
        })
        .catch((err) => {
          console.log("Error pushing product to cloud", err);
          setLoading(false);
        });
    }
  };

  const getBase64 = (photos) => {
    setImgLoading(true);

    for (let img of photos) {
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
            setImage((prev) => [...prev, res.url]);
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
    }
  };

  const onChange = (type, value) => {
    if (type === "name") {
      setName(value);
    } else if (type === "quantity") {
      if (/^[0-9]+$/.test(+value)) {
        setStock(+value);
      }
    } else if (type === "costPrice") {
      // if (/^[0-9]+$/.test(+value)) {
      setCostPrice(formatInputNum(value));
      // }
    } else if (type === "sellPrice") {
      // if (/^[0-9]+$/.test(+value)) {
      setPrice(formatInputNum(value));
      // }
    } else if (type === "discount") {
      // if (/^[0-9]+$/.test(+value)) {
      setDiscountPrice(formatInputNum(value));
      // }
    } else if (type === "desc") {
      setDescription(value);
    }
  };

  const deletingImages = (picture) => {
    let picArray = image.filter((x) => x != picture);
    setImage(picArray);
  };

  const handleVariants = () => {
    setShowVar(true);
    setTimeout(() => {
      setToggle(true);
    });
  };

  const backAction = () => {
    if (open) setOpen(false);
    setAddToggle(false);
    setTimeout(() => {
      setAddItems(false);
    }, 500);
  };

  const handleAddCategory = () => {
    setAddCategory(true);
    setTimeout(() => {
      setToggle(true);
    });
  };

  const checkChanges = () => {
    if (
      name ||
      unit ||
      stock ||
      price ||
      costPrice ||
      description ||
      image.length ||
      discountPrice ||
      category.length ||
      variants.color.length ||
      variants.sizes.length
    ) {
      return true;
    } else return false;
  };

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
        title={"Add Item"}
      />

      <div
        className="addItemMainContainer"
        style={{ height: innerHeight * 0.8 }}
      >
        {image.length > 0 ? (
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
                <span>{imgLoading ? "Uploading" : "Add an image"}</span>
              </label>
            </div>
            {image.map((item, index) => {
              return (
                <div className="multiImageInner" key={index}>
                  <img
                    src={item}
                    height={110}
                    width={125}
                    key={item}
                    atl="upload"
                  />
                  <button
                    className="multiImageInnerRemoveIcon"
                    onClick={() => deletingImages(item)}
                  >
                    x
                  </button>
                </div>
              );
            })}

            {imgLoading && (
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
                <span>{imgLoading ? "Uploading" : "Add an image"}</span>
              </label>
            </div>
          </div>
        )}
        <form className="" onSubmit={addProductToCloud} id="form">
          <div className="addItemINputRowCont firstRowInput">
            <div className="form-group addItemInupt">
              <input
                className="form-control"
                value={name}
                placeholder="Enter Item Name"
                onChange={(e) => {
                  if (e.target.value[0] !== " ")
                    onChange("name", e.target.value);
                }}
              />
              <label className="control-label" htmlFor="name">
                Item Name
              </label>
              <span className="inpurErrors">{errors.name}</span>
            </div>

            <div className="selctCategoryMain">
              {categories?.length ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {category.name ? category.name : "Select Category"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {categories
                        .sort((a, b) => {
                          if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                          }
                          if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                          }
                          return 0;
                        })
                        .map((categ, index) => {
                          return (
                            <Dropdown.Item
                              key={categ.id}
                              onSelect={() => setCategory(categ)}
                              key={index}
                            >
                              {categ.name}
                            </Dropdown.Item>
                          );
                        })}
                    </Dropdown.Menu>
                  </Dropdown>
                  <span className="inpurErrors">{errors.category}</span>
                </>
              ) : null}
              <div
                className="addNewCategoryProduct"
                onClick={handleAddCategory}
              >
                <span>Add new category</span>
              </div>
            </div>
          </div>

          <div className="addItemINputRowCont">
            <div className="form-group addItemInupt">
              <input
                className="form-control"
                value={costPrice}
                placeholder="Enter Cost Price"
                onChange={(e) => onChange("costPrice", e.target.value)}
              />
              <label className="control-label" htmlFor="price">
                Cost Price
              </label>
            </div>

            <div className="form-group addItemInupt">
              <input
                className="form-control"
                value={price}
                placeholder="Enter Selling Price"
                onChange={(e) => onChange("sellPrice", e.target.value)}
              />
              <label className="control-label" htmlFor="price">
                Selling Price
              </label>
              <span className="inpurErrors">{errors.price}</span>
            </div>
          </div>

          <div className="addItemINputRowCont">
            <div className="form-group addItemInupt">
              <input
                className="form-control"
                value={discountPrice}
                placeholder="Enter Discounted Price"
                onChange={(e) => onChange("discount", e.target.value)}
              />
              <label className="control-label" htmlFor="price">
                Discounted Price
              </label>
              <span className="inpurErrors">{errors.discountPrice}</span>
            </div>
            <div className="form-group addItemInupt">
              <input
                className="form-control"
                value={stock}
                placeholder="Enter Quantity"
                onChange={(e) => onChange("quantity", e.target.value)}
              />
              <label className="control-label" htmlFor="stock">
                Quantity
              </label>
              <span className="inpurErrors">{errors.quantity}</span>
            </div>
          </div>

          <div className="addItemINputRowCont">
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
              <span className="inpurErrors">{errors.unit}</span>
            </div>
          </div>

          <div className="addItemINputRowCont">
            <div className="form-group textAreaField">
              <textarea
                className="form-control"
                value={description}
                placeholder=" Enter Description"
                onChange={(e) => onChange("desc", e.target.value)}
              />
            </div>
          </div>

          <div className="sizeandColorBox">
            <div onClick={handleVariants} className="sizeandColorBoxInner">
              <span>
                {(variants.color.length || variants.sizes.length) > 0 ? (
                  <svg
                    fill="var(--skyBlue"
                    height="24"
                    width="24"
                    viewBox="0 0 35 35"
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
                ) : (
                  <svg
                    fill="var(--skyBlue"
                    height="24"
                    width="24"
                    viewBox="0 0 35 35"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill=""
                      d="M26.296,15.401c-0.006-0.072-0.01-0.148-0.021-0.219c-0.021-0.093-0.049-0.181-0.081-0.267l-0.006-0.022
                                            c-0.236-0.582-0.799-0.984-1.477-0.984h-7.617l0.002-7.617c0-0.787-0.541-1.421-1.277-1.563
                                            c-0.075-0.015-0.152-0.02-0.229-0.025c-0.029,0-0.059-0.008-0.089-0.008c-0.033,0-0.064,0.008-0.096,0.01
                                            c-0.075,0.002-0.149,0.007-0.221,0.022c-0.094,0.014-0.182,0.045-0.27,0.078l-0.021,0.008c-0.582,0.234-0.984,0.797-0.984,1.477
                                            v7.615H6.291c-0.786,0-1.42,0.54-1.563,1.275c-0.016,0.076-0.018,0.149-0.022,0.227c-0.002,0.031-0.01,0.058-0.01,0.091
                                            c0,0.036,0.01,0.068,0.011,0.103c0.004,0.071,0.007,0.144,0.021,0.215c0.018,0.09,0.045,0.179,0.077,0.262l0.004,0.021
                                            c0.24,0.589,0.803,0.993,1.481,0.993h7.616v7.616c0,0.785,0.54,1.42,1.276,1.563c0.073,0.015,0.149,0.019,0.226,0.023
                                            c0.03,0,0.06,0.007,0.091,0.007c0.036,0,0.068-0.007,0.103-0.01c0.074-0.002,0.145-0.008,0.216-0.021
                                            c0.091-0.018,0.179-0.046,0.263-0.08c0,0,0.019-0.005,0.027-0.005c0.583-0.235,0.985-0.8,0.985-1.479v-7.616h7.617
                                            c0.785,0,1.419-0.54,1.563-1.276c0.012-0.076,0.019-0.152,0.022-0.23c0.002-0.028,0.008-0.058,0.008-0.088
                                            C26.305,15.464,26.297,15.434,26.296,15.401z"
                    />
                  </svg>
                )}
              </span>
              <span>
                {(variants.color.length || variants.sizes.length) > 0
                  ? "Edit"
                  : "Add"}{" "}
                Size / Color
              </span>
            </div>
            {(variants.color.length || variants.sizes.length) > 0 ? (
              <div onClick={handleVariants} className="sizeandColorBoxInner">
                <span className="marginLeft2">
                  {variants.color.length + variants.sizes.length + "Variant(s)"}
                </span>
              </div>
            ) : null}
          </div>

          <div
            className="itemCheckMark"
            onClick={() => setContinueSellingWithoutStock((prev) => !prev)}
          >
            <div
              className="stock_managmentCheckbox"
              style={{
                backgroundColor: continueSellingWithoutStock
                  ? themeStyleSheet.brightGreen
                  : themeStyleSheet.white,
              }}
            >
              {continueSellingWithoutStock ? (
                <span>
                  <svg
                    fill="#fff"
                    height="20"
                    width="20"
                    viewBox="0 0 45 60"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill=""
                      d="M43.081,11.959c-1.087-0.357-2.046-0.075-2.999,0.887L20.154,32.799l-4.233-4.238
                                        c-1.614-1.604-3.229-3.216-4.833-4.833c-0.582-0.579-1.216-0.874-1.882-0.874c-0.179,0-0.364,0.021-0.549,0.063
                                        c-1.13,0.26-1.903,0.979-2.233,2.081c-0.302,0.994-0.013,1.913,0.882,2.813l10.829,10.815c1.194,1.199,2.916,1.215,4.162-0.017
                                        l11.717-11.781c3.395-3.415,6.791-6.832,10.191-10.238c0.718-0.719,0.993-1.623,0.773-2.546
                                        C44.75,13.083,44.005,12.265,43.081,11.959z"
                    />
                  </svg>
                </span>
              ) : null}
            </div>
            <span>Continue selling after stock runs out</span>
          </div>
        </form>
      </div>

      <div className="buttonContEditDtl" style={{ height: innerHeight * 0.11 }}>
        <button
          form="form"
          type="submit"
          value="Next"
          className={
            disableState() === false
              ? "login_btn_next"
              : "login_btn_next addItemDisable"
          }
          disabled={loading || success}
        // style={{
        //     backgroundColor: disableState() === false ? themeStyleSheet.brightGreen : themeStyleSheet.white,
        //     color: disableState() === false ? themeStyleSheet.white : themeStyleSheet.lightGray,
        //     border: `1px solid ${disableState() === false ? themeStyleSheet.brightGreen : themeStyleSheet.lightGray}`
        // }}
        // onClick={() => addProductToCloud()}
        >
          <span>
            {loading ? (
              <Spinner
                className="loaderCircle Products"
                animation="border"
                role="status"
              ></Spinner>
            ) : (
              "Create"
            )}
          </span>
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
          isEdit={variants.color.length || variants.sizes.length ? true : false}
        />
      )}

      {addCategory && (
        <Slider
          toggle={toggle}
          isEdit={true}
          setToggle={setToggle}
          addCategory={addCategory}
          setCategory={setCategory}
          setAddCategory={setAddCategory}
        />
      )}

      <AppDialog
        open={open}
        type="discard"
        setOpen={setOpen}
        handleAction={backAction}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
    categories: state.categories.mainCategories,
  };
})(AddProduct);
