import { strapi } from "@strapi/client";

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const client = strapi({
  baseURL: API_URL,
  auth: API_TOKEN,
});
