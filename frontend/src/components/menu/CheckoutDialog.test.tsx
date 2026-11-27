import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCart, CartProvider } from "@/hooks/use-cart";
import type { Product } from "@/lib/menu";
import { CheckoutDialog } from "./CheckoutDialog";

const product: Product = {
  id: 1,
  name: "Classic Burger",
  description: "Burger description",
  price: 25.9,
  category: "hamburgueres",
  image: "/classic.jpg",
};

function CheckoutHarness() {
  const { add } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => add(product)}>Adicionar ao carrinho de teste</button>
      <button onClick={() => setOpen(true)}>Abrir checkout</button>
      <CheckoutDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function renderCheckout() {
  return render(
    <CartProvider>
      <CheckoutHarness />
    </CartProvider>,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CheckoutDialog", () => {
  it("shows the order details and total returned by the backend", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
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
      ),
    );
    renderCheckout();

    fireEvent.click(screen.getByRole("button", { name: "Adicionar ao carrinho de teste" }));
    fireEvent.click(screen.getByRole("button", { name: "Adicionar ao carrinho de teste" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir checkout" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirmar pedido" }));

    expect(await screen.findByText("Pedido realizado com sucesso!")).toBeInTheDocument();
    expect(screen.getByText(/Pedido nº 42/)).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Itens confirmados" })).toHaveTextContent(
      /2\s*x\s*Classic Burger/,
    );
    expect(screen.getAllByText(/60,00/)).toHaveLength(2);
    expect(screen.queryByText(/51,80/)).not.toBeInTheDocument();
  });

  it("keeps the cart contents when the order request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ message: "Pedido inválido." }), { status: 400 }),
        ),
    );
    renderCheckout();

    fireEvent.click(screen.getByRole("button", { name: "Adicionar ao carrinho de teste" }));
    fireEvent.click(screen.getByRole("button", { name: "Adicionar ao carrinho de teste" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir checkout" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirmar pedido" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Pedido inválido.");
    expect(screen.getByRole("dialog")).toHaveTextContent(/2\s*x\s*Classic Burger/);
  });
});
