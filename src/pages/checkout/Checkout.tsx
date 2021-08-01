import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartFactory } from "../../__types__/Cart.model";
import "./Checkout.css";

// ! Heart
function Checkout() {
  // * States
  const [cart, setCart] = useState<CartFactory>({} as CartFactory);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [modeOfPayment, setModeOfPayment] = useState<string>("Cash On Delivery");
  const getCurrentCartProducts = () => {
    setCart(JSON.parse(localStorage.getItem("cart") || "{}"));
  };
  
  useEffect(() => {
    // * Get Products
    getCurrentCartProducts();
  }, [finalPrice]);

// * Side Effects
useEffect(() => {
  // * Calculate Price
  calculateFinalPrice(cart);
}, [cart ]);

 
  const calculateFinalPrice = (cart: CartFactory) => {
    let price = 0;

    Object.keys(cart).map((key) => {
      price = price + cart[key].finalPrice;
      return key;
    });
    setFinalPrice(Number(price.toFixed(2)));
  };

 
  const incrementQuantity = (productId: string) => {
    cart[productId].quantity = cart[productId].quantity + 1;
    const temp = cart[productId].quantity * cart[productId].price;
    cart[productId].finalPrice = Number(temp.toFixed(2));
    localStorage.setItem("cart", JSON.stringify(cart));
    getCurrentCartProducts();
  };
  const decreaseQuantity = (productId: string) => {
    if (cart[productId].quantity - 1 === 0) {
      const removeProduct = window.confirm(
        "Do you want to Remove this from cart ?"
      );
      if (removeProduct) {
        delete cart[productId];
        localStorage.setItem("cart", JSON.stringify(cart));
        getCurrentCartProducts();
      }
    } else {
      cart[productId].quantity = cart[productId].quantity - 1;
      cart[productId].finalPrice =
        cart[productId].quantity * cart[productId].price;
      localStorage.setItem("cart", JSON.stringify(cart));
      getCurrentCartProducts();
    }
  };
const ClearCart = () =>{
  alert("Flow Completed")
  localStorage.clear();
  setCart({} as  CartFactory)
}
  const handleChange = (event: any, tag: string) => {
    switch (tag) {
      case "modeOfPayment":
        setModeOfPayment(event.target.value);
        break;
      case "clearCart":
        ClearCart();
      break;

      default:
        break;
    }
  };
  return (
    <div>
      {Object.keys(cart).length !== 0 &&
      <div className="checkout__wrapper">
        <div className="table-wrappper">
          <h1>Checkout Page</h1>
          <div className="table__header">
            <span className="table__header__cell">Image</span>
            <span className="table__header__cell">Tittle</span>
            <span className="table__header__cell">Quantity</span>
            <span className="table__header__cell">Price</span>
          </div>

          {Object.keys(cart).length > 0 &&
            Object.keys(cart).map((key) => (
              <div key={key} className="table__row">
                <div className="product__image__container table__content__cell">
                  <img
                    className="product__image"
                    src={cart[key].image}
                    alt=""
                  />
                </div>
                <div className="product__image__container table__content__cell">
                  <p> {cart[key].tittle}</p>
                </div>
                <div className="quantity__container table__content__cell">
                  <button
                    className="Add"
                    onClick={() => incrementQuantity(cart[key].id)}
                  >
                    +
                  </button>
                  <p>{cart[key].quantity}</p>
                  <button
                    className="Remove"
                    onClick={() => decreaseQuantity(cart[key].id)}
                  >
                    -
                  </button>
                </div>
                <div className="table__content__cell">
                  <p>{cart[key].finalPrice}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="table__price">
          <h1>Summary </h1>
          Total Cost - $ {finalPrice}
          <select
            value={modeOfPayment}
            onChange={(ev) => handleChange(ev, "modeOfPayment")}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
          {modeOfPayment === "Cash On Delivery" && (
            <button onClick={(ev)=> handleChange(ev,'clearCart')} className="payNow"> <Link to="/">Buy Now</Link></button>
          )}
          {modeOfPayment !== "Cash On Delivery" && (
            <span>COD is only option available at the moment </span>
          )}
        </div>
      </div>
    }
      {/* No Items in Cart */}
      {Object.keys(cart).length === 0 && <h1>Add Products to view</h1>}
    </div>
  );
}

export default Checkout;
