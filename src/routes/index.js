import AddBusinessDetails from "../components/container/AddBusinessDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import DeliveryCharges from "../components/container/DeliveryCharges";
import AddBulkProducts from "../components/container/AddBulkProducts";
import CatalogProducts from "../components/container/CatalogProducts";
import AllCategories from "../components/container/AllCategories";
import CatalogScreen from "../components/container/CatalogScreen";
import EditCategory from "../components/container/EditCategory";
import OrderDetails from "../components/container/OrderDetails";
import AddCategory from "../components/container/AddCategory";
import AllProducts from "../components/container/AllProducts";
import EditProduct from "../components/container/EditProduct";
import Onboarding from "../components/container/Onboarding";
import AddProduct from "../components/container/AddProduct";
import ViewOrders from "../components/container/ViewOrders";
import Login from "../components/container/Login";
import Home from "../components/container/Home";
import { connect } from "react-redux";
import React, { useEffect } from "react";

const Routes = ({ user }) => {
  useEffect(() => {
    console.log('useEffect of routes component called!');
  }, [user]);

  return (
    <Router>
      <>
        {!user ? (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Login" component={Login} />
            <Route path="/AddBusinessDetails" component={AddBusinessDetails} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Home" exact component={Home} />
            <Route path="/AddProduct" component={AddProduct} />
            <Route path="/AddCategory" component={AddCategory} />
            <Route path="/AllItems" component={AllProducts} />
            <Route path="/EditProduct" component={EditProduct} />
            <Route path="/AllCategories" component={AllCategories} />
            <Route path="/EditCategory" component={EditCategory} />
            <Route path="/AddBulkProducts" component={AddBulkProducts} />
            <Route path="/ViewOrders" component={ViewOrders} />
            <Route path="/OrderDetails/:order_id" component={OrderDetails} />
            <Route path="/DeliveryCharges" component={DeliveryCharges} />
            <Route path="/CatalogScreen" component={CatalogScreen} />
            <Route path="/CatalogProducts" component={CatalogProducts} />
            <Route path="/Onboarding" component={Onboarding} />
            <Redirect to="/" />
          </Switch>
        )}
      </>
    </Router>
  );
};

export default connect((state) => {
  return {
    user: state.user,
  };
})(Routes);
