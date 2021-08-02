import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Checkout from "./pages/checkout/Checkout";
import ProductDetails from "./pages/productDetails/ProductDetail";
import ProductList from "./pages/products/ProductList";
import { CartFactory } from "./__types__/Cart.model";
// ! Layout

const verifyCartItems = () => {
  // * checks time if more than 24 hours deletes the item
  const cart: CartFactory = JSON.parse(localStorage.getItem("cart") || "{}");
  Object.keys(cart).map((product) => {
    if (!(Date.now() - cart[product].updatedAt < 86400000)) {
      delete cart[product];
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return product;
  });
};
function App() {
  verifyCartItems();
  return (
    <div className="App">
      {/* Header */}
      <Header />
      {/* Router Based navigation's */}
      <div className="content__wrapper">
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/product-details/:id" component={ProductDetails} />
          <Route exact path="/cart" component={Checkout} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
