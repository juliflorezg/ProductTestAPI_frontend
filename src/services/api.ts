import axios from "axios";

const API_URL = import.meta.env.PROD
  ? "https://dotnetproductsapi1234.azurewebsites.net/api/products"
  : "http://localhost:5297/api/products";;

export const api = axios.create({
  baseURL: API_URL
  ,
});