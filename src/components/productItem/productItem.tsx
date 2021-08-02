import React from "react";
import { Link } from "react-router-dom";

import "./productItem.css";
import { ProductFactory } from "../../__types__/Product.model";
import { Button } from "@material-ui/core";

function ProductItem(product: ProductFactory) {
  return (
    <div className="Product__container">
      {/* Image Container */}
      <div className="image__container">
        <img
          className="product__small__image"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="meta__container">
        <p>{product.title}</p>
        <h5> $ {product.price}</h5>
        <Link
          to={"product-details/" + product.id}
          style={{ textDecoration: "none" }}
        >
          <Button>View Details</Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
