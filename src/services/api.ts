import axios from "axios";

export const api = axios.create({
  baseURL: 'https://http://localhost:5297/api/products',
});