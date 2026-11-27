import { afterEach, describe, expect, it, vi } from "vitest";
import { buildOrderPayload, createOrder, getProducts } from "./api";
import type { Product } from "./menu";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("API client", () => {
  it("loads the backend catalog and adapts its categories for the menu", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            id: 1,
            name: "Classic Burger",
            description: "Burger description",
            price: 25.9,
            category: "Hambúrgueres",
          },
        ]),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const products = await getProducts();

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/products", {});
    expect(products[0]).toMatchObject({
      id: 1,
      name: "Classic Burger",
      category: "hamburgueres",
    });
  });

  it("posts product IDs and quantities and returns the complete server order", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          message: "Pedido realizado com sucesso!",
          order: {
            id: 42,
            items: [
              {
                productId: 1,
                name: "Classic Burger",
                price: 30,
                quantity: 2,
                subtotal: 60,
              },
            ],
            total: 60,
            status: "Confirmado",
          },
        }),
        { status: 201 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const product: Product = {
      id: 1,
      name: "Classic Burger",
      description: "Burger description",
      price: 25.9,
      category: "hamburgueres",
      image: "/classic.jpg",
    };
    const payload = buildOrderPayload([{ product, quantity: 2 }]);
    const order = await createOrder(payload);

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/api/orders",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ productId: 1, quantity: 2 }] }),
      }),
    );
    expect(order).toEqual({
      message: "Pedido realizado com sucesso!",
      order: {
        id: 42,
        items: [{ productId: 1, name: "Classic Burger", price: 30, quantity: 2, subtotal: 60 }],
        total: 60,
        status: "Confirmado",
      },
    });
  });
});
