import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { formatBRL } from "@/lib/menu";

type Props = { open: boolean; onOpenChange: (o: boolean) => void; onCheckout: () => void };

export function CartSheet({ open, onOpenChange, onCheckout }: Props) {
  const { items, total, setQty, remove } = useCart();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-display text-2xl">Seu carrinho</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground">
            <ShoppingBag className="h-12 w-12 text-primary" />
            <p>Seu carrinho está vazio.</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 py-4">
                  <img
                    src={product.image}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-semibold">{product.name}</p>
                      <button
                        onClick={() => remove(product.id)}
                        aria-label={`Remover ${product.name}`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatBRL(product.price)} cada</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          onClick={() => setQty(product.id, quantity - 1)}
                          aria-label="Diminuir"
                          className="p-2 hover:text-primary"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                        <button
                          onClick={() => setQty(product.id, quantity + 1)}
                          aria-label="Aumentar"
                          className="p-2 hover:text-primary"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-semibold">{formatBRL(product.price * quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border p-5">
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">{formatBRL(total)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="mt-4 w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                Finalizar pedido
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
