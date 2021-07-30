import axios from "axios";
const baseUrl = "https://fakestoreapi.com/";

export class ProductService {
  async getAllProduct() {
    const response = await axios.get(`${baseUrl}/products`);
    return response;
  }

  async getAllCategory() {
    const response = await axios.get(`${baseUrl}/products/categories`);
    return response;
  }
  async getProductById(productId: number) {
    const response =  await axios.get(baseUrl + "products/" + productId);
    return response
  }
  async getProductsByCategoryName(categoryName: string) {
    const response = await axios.get(baseUrl + "products/category/" + categoryName);
    return response
   }
}
