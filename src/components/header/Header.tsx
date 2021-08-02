import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <div className="header__container ">
      {/* Brand Header */}
      <div className="brand__container">
        <Link to={"/"}>
          <span className="brand">Prathamesh Ashra - The Data Duck</span>
        </Link>
      </div>

      {/* Input Search with button */}
      {/* <div className="search__container">
        <input type="text" name="search" placeholder="search by name" />
        <button>Search</button>
      </div> */}

      {/* Cart Button */}
      <div className="cart__container">
        <Link to={"/cart"}>
          <span>Cart</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
