import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { formatBRL, type Product } from "@/lib/menu";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={600}
          height={450}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl text-foreground">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{formatBRL(product.price)}</span>
          <button
            onClick={() => {
              add(product);
              toast.success(`${product.name} adicionado ao carrinho`);
            }}
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
