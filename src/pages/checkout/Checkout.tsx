import { Button, Snackbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartFactory } from "../../__types__/Cart.model";

import "./Checkout.css";

// ! Heart
function Checkout() {
  // * States
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartFactory>({} as CartFactory);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [modeOfPayment, setModeOfPayment] =
    useState<string>("Cash On Delivery");

  // Snackbar Events Starts
  const handleClick = () => {
    setOpen(true);
    alert("Flow Completed");
    setTimeout(() => {
      localStorage.clear();
      setCart({} as CartFactory);
    }, 1000);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //Ends
  const getCurrentCartProducts = () => {
    setCart(JSON.parse(localStorage.getItem("cart") || "{}"));
  };

  const deleteItem = (productId: any) => {
    delete cart[productId];
    localStorage.setItem("cart", JSON.stringify(cart));
    getCurrentCartProducts();
  };

  useEffect(() => {
    // * Get Products
    getCurrentCartProducts();
  }, [finalPrice]);

  // * Side Effects
  useEffect(() => {
    // * Calculate Price
    calculateFinalPrice(cart);
  }, [cart]);

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
  const ClearCart = () => {
    handleClick();
  };
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
    <div
      className={`${
        Object.keys(cart).length === 0
          ? "checkout__wrapper checkout__wrapper-empty"
          : "checkout__wrapper"
      }`}
    >
      {Object.keys(cart).length !== 0 && (
        <>
          <div className="table-wrappper">
            <h1>Checkout Page</h1>
            <div className="table__header">
              <span className="table__header__cell">Image</span>
              <span className="table__header__cell">Title</span>
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
                    {/* Subtract */}
                    <Button
                      variant="outlined"
                      color="error"
                      className="Remove"
                      onClick={() => decreaseQuantity(cart[key].id)}
                    >
                      -
                    </Button>

                    <p>{cart[key].quantity}</p>

                    {/* Add */}
                    <Button
                      variant="outlined"
                      color="success"
                      className="Add"
                      onClick={() => incrementQuantity(cart[key].id)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="table__content__cell">
                    <p>$ {Number(cart[key].finalPrice).toFixed(2)}</p>
                  </div>
                  <div className="table__content__cell">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteItem(cart[key].id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          <div className="table__price">
            <h1>Summary </h1>
            <div className="cart-cost">
              Total Cost - $ {Number(finalPrice).toFixed(2)}
            </div>
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
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(ev) => handleChange(ev, "clearCart")}
                  className="payNow"
                >
                  {" "}
                  Buy Now
                </Button>
              </Link>
            )}
            {modeOfPayment !== "Cash On Delivery" && (
              <span>COD is only option available at the moment </span>
            )}
          </div>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Thanks for ordering!"
          />
        </>
      )}
      {/* No Items in Cart */}
      {Object.keys(cart).length === 0 && (
        <div className="empty">
          <div className="empty_message">
            <h1>Cart is empty!</h1>
            <Link to="/">Back to products</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
