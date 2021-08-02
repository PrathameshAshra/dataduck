import { useEffect, useState } from "react";

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
  const [category, setCategory] = useState("Hot Products");
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState<
    ProductFactory[] | undefined | null
  >(null);
  const [categoryList, setCategoryList] = useState<string[] | undefined | null>(
    null
  );

  // Defining Side Effects first time
  useEffect(() => {
    // *Product Hot List
    getHotProducts();
    getAllCategory();
  }, []);

  // * List Of Hot Products
  const getHotProducts = () => {
    setLoading(true);
    setCategory("Hot Products");
    _productService
      .getAllProduct()
      .then((res) => {
        setProductList(res.data);
        setLoading(false);
      })
      .catch((error) => {});
  };
  // * List Of Categories
  const getAllCategory = () => {
    setLoading(true);
    _productService
      .getAllCategory()
      .then((res) => {
        setCategoryList(res.data);
        setLoading(false);
      })
      .catch((error) => {});
  };
  // * List Of Products by CategoryId
  const getProductsByCategoryName = (categoryName: string) => {
    setLoading(true);
    setCategory(categoryName);
    _productService.getProductsByCategoryName(categoryName).then((res) => {
      setProductList(res.data);
      setLoading(false);
    });
  };
  return (
    <div className="ProductPage__Wrapper">
      {/* Sidebar */}
      <div className="Sidebar__container">
        <h1>Category</h1>
        <span
          onClick={getHotProducts}
          className={`${
            category === "Hot Products"
              ? "category__label active"
              : "category__label"
          }`}
        >
          Hot Products
        </span>
        {/* ! If Category List is Mapped */}
        {categoryList &&
          categoryList?.map((cat) => (
            <span
              key={cat}
              onClick={() => getProductsByCategoryName(cat)}
              className={`${
                cat === category ? "category__label active" : "category__label"
              }`}
            >
              {cat}
            </span>
          ))}
        {!categoryList && (
          // If it is not loaded
          <span>Loading Category List</span>
        )}
      </div>

      <div className="body__wrapper">
        <h1 className="breadcrumbs">{category}</h1>
        <div className="products__wrapper">
          {loading ? (
            <div>Please wait...</div>
          ) : (
            <>
              {/* If Product List is Mapped */}
              {productList &&
                productList?.map((product) => (
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
              {
                // if Product List is Unmapped
                !productList && <span>Products are loading</span>
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
