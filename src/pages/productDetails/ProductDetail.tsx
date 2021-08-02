import { Button, Snackbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { ProductService } from "../../api/product.service";
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
  const history = useHistory();

  // Defining States
  const [productInfo, setProductInfo] = useState<ProductFactory>(
    {} as ProductFactory
  );
  const [cart, setCart] = useState<LooseObject>({});
  const [open, setOpen] = useState(false);

  const params: any = useParams();
  const id = params.id;
  // Defining Side Effects first time
  useEffect(() => {
    // *Product Hot List
    getProductById(id);
    getCurrentCartProducts();
  }, [id]);

  // Snackbar Events Starts
  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //Ends

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
    setCart(JSON.parse(localStorage.getItem("cart") || "{}"));
  };

  const addProductToCart = () => {
    let currentProducts = cart;
    currentProducts[id] = {
      updatedAt: Date.now(),
      quantity: 1,
      image: productInfo.image,
      tittle: productInfo.title,
      id: id,
      price: productInfo.price,
      finalPrice: productInfo.price,
    };
    setCart(currentProducts);
    localStorage.setItem("cart", JSON.stringify(cart));
    // alert("Product added to cart ! ");
    handleClick();
  };

  return (
    <div
      className={
        productInfo && productInfo?.id
          ? "ProductDetailPage__Wrapper"
          : "ProductDetailPage__Wrapper loading"
      }
    >
      {productInfo && productInfo?.id && (
        <div className="body__wrapper">
          <h1 className="breadcrumbs">Product Details</h1>
          <div className="product__wrapper">
            <div className="productImage__container">
              <img
                className="productImage__large"
                src={productInfo?.image}
                alt={productInfo?.title}
              />
            </div>
            <div className="productInfo__container">
              <h1 className="productInfo__title">{productInfo?.title}</h1>
              <p className="productInfo__description">
                {productInfo?.description}
              </p>
              <h4 className="productInfo__category">{productInfo?.category}</h4>
              <h5 className="productInfo__price"> $ {productInfo?.price}</h5>
              {/* <Link to={"/"} style={{ textDecoration: "none" }}> */}
              <Button onClick={() => addProductToCart()}>Add To Cart</Button>
              {/* </Link> */}
            </div>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Product added successfully!"
          />
        </div>
      )}
      {(!productInfo || !productInfo?.id) && (
        <div className="loading__wrapper">
          <h5 className="loader">Loading...</h5>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
