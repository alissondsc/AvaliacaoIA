import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="" className="h-9 w-9" />
          <span className="font-display text-xl tracking-wide text-foreground">
            BURGUER <span className="text-primary">HOUSE</span>
          </span>
        </a>
        <button
          onClick={onOpenCart}
          aria-label={`Abrir carrinho (${count} itens)`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
