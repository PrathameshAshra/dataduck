import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ProductService } from "../../api/product.service";
import { CartFactory } from "../../__types__/Cart.model";
import { ProductFactory } from "../../__types__/Product.model";
// CSS
import "./ProductDetail.css";

// create instance of  Service
const _productService = new ProductService();
interface LooseObject {
  [key: string]: any;
  updatedAt?: any;
}
// ! Heart
function ProductDetails() {
  // Defining States
  const [productInfo, setProductInfo] = useState<ProductFactory>(
    {} as ProductFactory
  );
  const [cart, setCartInfo] = useState<LooseObject>({});
  const { id }: any = useParams();

  // Defining Side Effects first time
  useEffect(() => {
    // *Product Hot List
    getProductById(id);
    getCurrentCartProducts();
  }, [id]);

  // * Get Product By Product ID
  const getProductById = (productId: number) => {
    _productService
      .getProductById(productId)
      .then((res) => {
        setProductInfo(res.data);
      })
      .catch((error) => {});
  };
  const getCurrentCartProducts = () => {
    setCartInfo(JSON.parse(localStorage.getItem("cart") || "{}"));
    return cart;
  };

  const addProductToCart = () => {
    let currentProducts: CartFactory = getCurrentCartProducts();
    currentProducts[id] = {
      updatedAt: Date.now(),
      quantity: 1,
      image: productInfo.image,
      tittle: productInfo.title,
      id: id,
      price: productInfo.price,
      finalPrice: productInfo.price,
    };
    console.log(currentProducts);
    setCartInfo(currentProducts);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart ! ");
  };

  return (
    <div className="ProductPage__Wrapper">
      {/* Sidebar */}

      <div className="body__wrapper">
        <h1 className="breadcrumbs">Products Details</h1>
        <div className="product__wrapper">
          <div className="productImage__container">
            <img
              className="productImage__large"
              src={productInfo?.image}
              alt={productInfo?.title}
            />
          </div>
          <div className="productInfo__container">
            <h1>{productInfo?.title}</h1>
            <h2>{productInfo?.description}</h2>
            <h4>{productInfo?.category}</h4>
            <h5> $ {productInfo?.price}</h5>

            <button onClick={() => addProductToCart()}>
              <Link to={"/"}>Add To Cart </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
