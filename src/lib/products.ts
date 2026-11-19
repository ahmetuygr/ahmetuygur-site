import productsData from "../../data/products.json";

export type Translation = { alt: string; description: string };
export type Product = {
  id: string;
  image: string;
  style: string;
  color: string;
  translations: Record<"en" | "de" | "fr" | "tr", Translation>;
};

export const products = productsData as Product[];
