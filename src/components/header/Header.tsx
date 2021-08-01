import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <div className="header__container ">
      {/* Brand Header */}
      <div className="brand__container">
        <span className="brand">
          <Link to={"/"}>Prathamesh Ashra - The Data Duck </Link>
        </span>
      </div>

      {/* Input Search with button */}
      {/* <div className="search__container">
        <input type="text" name="search" placeholder="search by name" />
        <button>Search</button>
      </div> */}

      {/* Cart Button */}
      <div className="cart__container">
     

        <span> <Link to={"/cart"}>Cart </Link> </span>
      </div>
    </div>
  );
}

export default Header;
