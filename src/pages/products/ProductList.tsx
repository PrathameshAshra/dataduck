import React, { useEffect, useState } from "react";

import { ProductService } from "../../api/product.service";
import ProductItem from "../../components/productItem/productItem";
import { ProductFactory } from "../../__types__/Product.model";
// CSS
import "./ProductList.css";

// create instance of  Service
const _productService = new ProductService();

// Defining API calls

// ! Heart
function ProductList() {
  // Defining States
  const [productList, setProductList] = useState<
    ProductFactory[] | undefined | null
  >(null);
  const [categoryList, setcategoryList] = useState<string[] | undefined | null>(
    null
  );

  
  // Defining Side Effects first time
  useEffect(() => {
    // *Product Hot List
    getHotProducts();
    getAllCategory();
   
  }, []);

 // * List Of Hot Products
  const getHotProducts = () =>{
    _productService.getAllProduct()
    .then((res) => {
      setProductList(res.data);
    })
    .catch((error) => {
    });
  }
   // * List Of Cateogries
  const getAllCategory = () =>{
    _productService.getAllCategory()
    .then((res) => {
      setcategoryList(res.data);
    })
    .catch((error) => {
    });
  }
  // * List Of Products by CategoryId
  const getProductsByCategoryName  = (categoryName: string) =>{
    _productService.getProductsByCategoryName(categoryName).then((res)=>{
      setProductList(res.data)
    })
  }
  return (
    <div className="ProductPage__Wrapper">
      {/* Sidebar */}
      <div className="Sidebar__container">
        <h1>Category</h1>
        <span onClick={getHotProducts} className='category__label'>Hot Products</span>
        {categoryList?.map((category) => (
          <span key={category} onClick={()=>(getProductsByCategoryName(category))} className='category__label'>{category}</span>
        ))}
      </div>
      <div className="body__wrapper">
        <h1 className='breadcrumbs'>Hot Products</h1>
        <div className="products__wrapper">
          {productList?.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              image={product.image}
              description={product.description}
              category={product.category}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
