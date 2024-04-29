import { formatInputNum } from "../../../oscar-pos-core/constants";
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
import firebase from '../../../firebase';
import { addDocToCollection } from "../../../firebase/utils";

const { innerHeight } = window;

const AddProduct = ({ setAddItems, setAddToggle }) => {
  const [addCategory, setAddCategory] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [showVariant, setShowVar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [costPrice, setCostPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [quantity, setQuantity] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [isMounted, setIsMounted] = useState(true);

  const db = firebase.firestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const returnedPromise = db.collection('categories').get();
        const [snapshot] = await Promise.all([returnedPromise]);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (isMounted) setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setIsMounted(false);
    }
  }, []);

  const disableState = () => {
    if (!name || !unit || !price || !discountPrice || !costPrice || !description || !quantity) {
      return true;
    } else return false;
  };

  const createProduct = async (e) => {
    e.preventDefault();
    let params = {
      item_name: name,
      selling_price: Number(price),
      discount_price: Number(discountPrice),
      cost_price: Number(costPrice),
      description,
      category_name: category?.name,
      images: ['https://cdnprod.mafretailproxy.com/sys-master-root/hc4/h85/50402663137310/480Wx480H_272468_main.jpg'],
      quantity: Number(quantity),
      unit,
    };

    addDocToCollection('items', params).then(() => {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }).catch((error) => {
      console.log('error', error);
    })
  };

  const getBase64 = (photos) => {
    setImgLoading(true);

    for (let img of photos) {
      let reader = new FileReader();

      reader.readAsDataURL(img);
      reader.onerror = function (error) {
        setImgLoading(false);
        console.log("see error", error);
      };
    }
  };

  const onChange = (type, value) => {
    if (type === "name") {
      setName(value);
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
    } else if (type === "quantity") {
      setQuantity(value);
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
      price ||
      costPrice ||
      description ||
      image.length ||
      discountPrice ||
      category.length
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
        <form className="" onSubmit={createProduct} id="form">
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
                        .map((categ) => {
                          return (
                            <Dropdown.Item
                              key={categ.id}
                              onSelect={() => setCategory(categ)}
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
                value={quantity}
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
          setToggle={setToggle}
          setShowVar={setShowVar}
          showVariant={showVariant}
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
