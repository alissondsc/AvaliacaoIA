import classic from "@/assets/classic.jpg";
import bacon from "@/assets/bacon.jpg";
import double from "@/assets/double.jpg";
import fries from "@/assets/fries.jpg";
import soda from "@/assets/soda.jpg";
import shake from "@/assets/shake.jpg";

export type Category = "hamburgueres" | "porcoes" | "bebidas";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
};

export const CATEGORIES: { id: Category | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "hamburgueres", label: "Hambúrgueres" },
  { id: "porcoes", label: "Porções" },
  { id: "bebidas", label: "Bebidas" },
];

// Local menu data. Shape mirrors what a future Express REST API (GET /api/products) should return.
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Pão brioche, blend 150g, queijo, alface, tomate e molho da casa.",
    price: 25.9,
    category: "hamburgueres",
    image: classic,
  },
  {
    id: 2,
    name: "Bacon Burger",
    description: "Blend 150g, cheddar derretido e tiras crocantes de bacon.",
    price: 32.9,
    category: "hamburgueres",
    image: bacon,
  },
  {
    id: 3,
    name: "Double Cheese",
    description: "Dois blends de 120g com camadas duplas de queijo cheddar.",
    price: 35.9,
    category: "hamburgueres",
    image: double,
  },
  {
    id: 4,
    name: "Batata Frita",
    description: "Porção de batatas douradas e crocantes, temperadas na hora.",
    price: 15,
    category: "porcoes",
    image: fries,
  },
  {
    id: 5,
    name: "Refrigerante",
    description: "Lata 350ml bem gelada. Consulte os sabores disponíveis.",
    price: 7,
    category: "bebidas",
    image: soda,
  },
  {
    id: 6,
    name: "Milkshake",
    description: "Cremoso milkshake de baunilha com chantilly e cereja.",
    price: 14.9,
    category: "bebidas",
    image: shake,
  },
];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
