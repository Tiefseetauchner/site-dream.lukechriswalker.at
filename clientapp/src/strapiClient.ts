import { strapi } from "@strapi/client";

const API_URL = import.meta.env.VITE_API_URL;

export const client = strapi({
  baseURL: API_URL,
  auth: "4b7e34d5be586f5771334b2876dad0cfbf3775a871f743f0d0d79d8e80d684628502fe72a91d8762944c7360946e72c8be7b75675f093dfefc9e2d4b90e25ebb1771947fbe51ef4f3e70c3c8b00ab81e263825ab805a6b9096d8cfa77c5c3cdcca5bc6c6c95a3b07fcf9b5a064a69a5eca0605864f9ce5a35020b1f5702f599b",
});
