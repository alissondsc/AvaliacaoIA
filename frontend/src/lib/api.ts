import { PRODUCTS, type Product } from "./menu";
import type { CartItem } from "@/hooks/use-cart";

const API_URL = (import.meta.env["VITE_API_URL"] ?? "http://localhost:3000/api").replace(
  /\/+$/,
  "",
);

type ApiProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

export type OrderPayload = { items: { productId: number; quantity: number }[] };
export type OrderItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
};
export type Order = {
  id: number;
  items: OrderItem[];
  total: number;
  status: string;
};
export type OrderResponse = { message: string; order: Order };

const categories: Record<string, Product["category"]> = {
  Hambúrgueres: "hamburgueres",
  Porções: "porcoes",
  Bebidas: "bebidas",
};

function isApiProduct(value: unknown): value is ApiProduct {
  if (typeof value !== "object" || value === null) return false;
  const product = value as Record<string, unknown>;
  return (
    typeof product["id"] === "number" &&
    typeof product["name"] === "string" &&
    typeof product["description"] === "string" &&
    typeof product["price"] === "number" &&
    typeof product["category"] === "string"
  );
}

function isOrderItem(value: unknown): value is OrderItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item["productId"] === "number" &&
    typeof item["name"] === "string" &&
    typeof item["price"] === "number" &&
    typeof item["quantity"] === "number" &&
    typeof item["subtotal"] === "number"
  );
}

function isOrder(value: unknown): value is Order {
  if (typeof value !== "object" || value === null) return false;
  const order = value as Record<string, unknown>;
  return (
    typeof order["id"] === "number" &&
    Array.isArray(order["items"]) &&
    order["items"].every(isOrderItem) &&
    typeof order["total"] === "number" &&
    typeof order["status"] === "string"
  );
}

function isOrderResponse(value: unknown): value is OrderResponse {
  if (typeof value !== "object" || value === null) return false;
  const response = value as Record<string, unknown>;
  return typeof response["message"] === "string" && isOrder(response["order"]);
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, signal ? { signal } : {});
  if (!res.ok) throw new Error(`Falha ao carregar produtos (HTTP ${res.status}).`);

  const data: unknown = await res.json();
  if (!Array.isArray(data) || !data.every(isApiProduct)) {
    throw new Error("A API retornou um catálogo de produtos inválido.");
  }

  return data.map((product) => {
    const localProduct = PRODUCTS.find((item) => item.id === product.id);
    const category = categories[product.category];
    if (!localProduct || !category) {
      throw new Error(
        `O produto ${product.id} não possui imagem ou categoria configurada no frontend.`,
      );
    }

    return { ...localProduct, ...product, category };
  });
}

export function buildOrderPayload(items: CartItem[]): OrderPayload {
  return {
    items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })),
  };
}

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result: unknown = await res.json();
  if (!res.ok) {
    const message =
      typeof result === "object" &&
      result !== null &&
      "message" in result &&
      typeof result.message === "string"
        ? result.message
        : `Falha ao enviar pedido (HTTP ${res.status}).`;
    throw new Error(message);
  }

  if (!isOrderResponse(result)) {
    throw new Error("A API retornou uma confirmação de pedido inválida.");
  }
  return result;
}
