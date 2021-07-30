import React, { useEffect, useState } from "react";
import { CartFactory } from "../../__types__/Cart.model";
import "./Checkout.css";

// ! Heart
function Checkout() {
  // * States
  const [cart, setCart] = useState<CartFactory>({} as CartFactory);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  // * Side Effects
  useEffect(() => {
    // * Get Cart
    getCurrentCartProducts();
  }, [finalPrice]);

  // * Side Effects
  useEffect(() => {
    // * Get Cart
    calculateFinalPrice(cart);
  }, [cart]);

  const calculateFinalPrice = (cart: CartFactory) => {
    let price = 0;

    Object.keys(cart).map((key) => {
      price = price + cart[key].finalPrice;
      console.log(price, "Here");
      return key
    });
    setFinalPrice(price);
  };

  const getCurrentCartProducts = () => {
    setCart(JSON.parse(localStorage.getItem("cart") || "{}"));
  };
  const incrementQuantity = (productId: string) => {
    cart[productId].quantity = cart[productId].quantity + 1;
    cart[productId].finalPrice =
      cart[productId].quantity * cart[productId].price;
    cart[productId].finalPrice.toFixed(2);
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

  return (
    <div>
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
                  <button onClick={() => incrementQuantity(cart[key].id)}>
                    +
                  </button>
                  <p>{cart[key].quantity}</p>
                  <button onClick={() => decreaseQuantity(cart[key].id)}>
                    -
                  </button>
                </div>
                <div className="table__content__cell"><p>{cart[key].finalPrice}</p></div>
              </div>
            ))}
        </div>

        <div className="table__price">
          <h1>Summary </h1>
          Total Cost - $ {finalPrice}
          <button>Pay Now</button>
        </div>
      </div>

      {/* No Items in Cart */}
      {Object.keys(cart).length === 0 && <h1>Add Masala</h1>}
    </div>
  );
}

export default Checkout;
