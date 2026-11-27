import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/hooks/use-cart";
import { type Category, type Product } from "@/lib/menu";
import { getProducts } from "@/lib/api";
import { Header } from "@/components/menu/Header";
import { Hero } from "@/components/menu/Hero";
import { Categories } from "@/components/menu/Categories";
import { ProductCard } from "@/components/menu/ProductCard";
import { CartSheet } from "@/components/menu/CartSheet";
import { CheckoutDialog } from "@/components/menu/CheckoutDialog";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BURGUER HOUSE — Cardápio digital" },
      {
        name: "description",
        content:
          "Hambúrgueres, porções e bebidas. Monte seu pedido no cardápio digital da BURGUER HOUSE.",
      },
      { property: "og:title", content: "BURGUER HOUSE — Cardápio digital" },
      { property: "og:description", content: "Sabor, qualidade e praticidade em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<Category | "todos">("todos");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getProducts(controller.signal)
      .then(setProducts)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setProductsError(
            error instanceof Error ? error.message : "Não foi possível carregar o cardápio.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const visibleProducts =
    category === "todos" ? products : products.filter((product) => product.category === category);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onOpenCart={() => setCartOpen(true)} />
        <main>
          <Hero />
          <section id="cardapio" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Nosso <span className="text-primary">cardápio</span>
            </h2>
            <div className="mt-6">
              <Categories active={category} onChange={setCategory} />
            </div>
            {loading && <p className="mt-8 text-muted-foreground">Carregando cardápio...</p>}
            {productsError && (
              <p
                className="mt-8 rounded-lg border border-destructive/40 p-4 text-sm text-destructive"
                role="alert"
              >
                {productsError} Verifique se a API está em execução e recarregue a página.
              </p>
            )}
            {!loading && !productsError && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </main>
        <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          © 2026 BURGUER HOUSE. Todos os direitos reservados.
        </footer>
        <CartSheet
          open={cartOpen}
          onOpenChange={setCartOpen}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
        <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
        <Toaster position="bottom-center" />
      </div>
    </CartProvider>
  );
}
