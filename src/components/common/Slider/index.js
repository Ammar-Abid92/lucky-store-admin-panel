import CatalogProducts from "../../container/CatalogProducts";
import AddBulkProducts from "../../container/AddBulkProducts";
import CatalogScreen from "../../container/CatalogScreen";
import EditCategory from "../../container/EditCategory";
import AddCategory from "../../container/AddCategory";
import EditProduct from "../../container/EditProduct";
import AddVariant from "../../container/AddVariants";
import AddProduct from "../../container/AddProduct";
import React from "react";
import "./styles.css";
import ShippingService from "../../container/ShippingService";

const Slider = ({
  setEditCategory,
  setBulkProducts,
  setAddCategory,
  setCatProduct,
  bulkProducts,
  editCategory,
  setEditItems,
  setProgress,
  addCategory,
  setVariants,
  showVariant,
  setAddItems,
  setCategory,
  categoryId,
  setViewCsv,
  catProduct,
  setShowVar,
  setCatalog,
  backAction,
  productId,
  setToggle,
  editItems,
  variants,
  addItems,
  viewCsv,
  catalog,
  isEdit,
  toggle,
  setId,
  allProducts,
  allCategories,
  shippingService,
  setShippingService,
  orderId,
}) => {
  return (
    <div
      style={{
        backgroundColor: toggle ? "rgba(0,0,0,0.65)" : "",
        position: toggle ? "fixed" : "null",
        left: toggle ? "0" : null,
        top: toggle ? "0" : null,
        height: toggle ? "100%" : null,
        width: toggle ? "100%" : null,
        transition: toggle ? "background-color 0.3s ease-in" : "",
        zIndex: 99,
      }}
    >
      <div
        className="sidepanel"
        style={{ height: window.innerHeight, width: toggle ? "40%" : "0" }}
      >
        {catalog && (
          <CatalogScreen
            setCatalog={setCatalog}
            setToggle={setToggle}
            catalog={catalog}
            toggle={toggle}
          />
        )}

        {catProduct && (
          <CatalogProducts
            setCatProduct={setCatProduct}
            catProduct={catProduct}
            backAction={backAction}
            setToggle={setToggle}
            toggle={toggle}
          />
        )}

        {showVariant && (
          <AddVariant
            setVariants={setVariants}
            setShowVar={setShowVar}
            setToggle={setToggle}
            variants={variants}
            isEdit={isEdit}
          />
        )}

        {viewCsv && (
          <AddBulkProducts
            setBulkProducts={setBulkProducts}
            bulkProducts={bulkProducts}
            setProgress={setProgress}
            setViewCsv={setViewCsv}
            setToggle={setToggle}
            toggle={toggle}
          />
        )}

        {addItems && (
          <AddProduct
            setAddItems={setAddItems}
            setAddToggle={setToggle}
            addItems={addItems}
            addToggle={toggle}
          />
        )}

        {editItems && (
          <EditProduct
            setEditItems={setEditItems}
            allProducts={allProducts}
            setEditToggle={setToggle}
            productId={productId}
            editToggle={toggle}
            setId={setId}
          />
        )}

        {addCategory && (
          <AddCategory
            setAddCategory={setAddCategory}
            addCategory={addCategory}
            setCategory={setCategory}
            setToggle={setToggle}
            fromProduct={isEdit}
            toggle={toggle}
          />
        )}

        {editCategory && (
          <EditCategory
            setEditCategory={setEditCategory}
            categoryId={categoryId}
            setToggle={setToggle}
            setId={setId}
            allCategories={allCategories}
          />
        )}
        {shippingService && (
          <ShippingService
            setShippingService={setShippingService}
            shippingService={shippingService}
            toggle={toggle}
            setToggle={setToggle}
            orderId={orderId}
          />
        )}
      </div>
    </div>
  );
};

export default Slider;
