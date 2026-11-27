import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/menu";

export type CartItem = { product: Product; quantity: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (p: Product) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartCtx>(() => {
    const setQty = (id: number, qty: number) =>
      setItems((prev) =>
        qty <= 0
          ? prev.filter((i) => i.product.id !== id)
          : prev.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i)),
      );
    return {
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      total: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      add: (p) =>
        setItems((prev) => {
          const found = prev.find((i) => i.product.id === p.id);
          return found
            ? prev.map((i) => (i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i))
            : [...prev, { product: p, quantity: 1 }];
        }),
      setQty,
      remove: (id) => setQty(id, 0),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
