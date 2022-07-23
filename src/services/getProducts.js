import http from "./httpService";
export const getProducts = () => {
  return http.get("http://localhost:5000/api/product");
};
