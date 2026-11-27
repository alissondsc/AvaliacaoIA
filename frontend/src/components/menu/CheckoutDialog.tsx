import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/use-cart";
import { formatBRL } from "@/lib/menu";
import { buildOrderPayload, createOrder, type OrderResponse } from "@/lib/api";

type Props = { open: boolean; onOpenChange: (o: boolean) => void };

export function CheckoutDialog({ open, onOpenChange }: Props) {
  const { items, total, clear } = useCart();
  const [confirmation, setConfirmation] = useState<OrderResponse | null>(null);
  const [sending, setSending] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const confirm = async () => {
    setSending(true);
    setSubmissionError(null);
    try {
      const res = await createOrder(buildOrderPayload(items));
      setConfirmation(res);
      clear();
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Não foi possível enviar o pedido.",
      );
    } finally {
      setSending(false);
    }
  };

  const handleOpen = (o: boolean) => {
    onOpenChange(o);
    if (!o) {
      setConfirmation(null);
      setSubmissionError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-md">
        {confirmation ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <DialogTitle className="mt-4 font-display text-2xl">{confirmation.message}</DialogTitle>
            <DialogDescription className="mt-2">
              Pedido nº {confirmation.order.id}. Já estamos preparando tudo com carinho.
            </DialogDescription>
            <ul
              aria-label="Itens confirmados"
              className="mt-4 max-h-60 w-full divide-y divide-border overflow-y-auto text-left"
            >
              {confirmation.order.items.map((item) => (
                <li key={item.productId} className="flex justify-between gap-4 py-3 text-sm">
                  <span>
                    <span className="font-semibold text-primary">{item.quantity}x</span> {item.name}
                  </span>
                  <span className="shrink-0 font-semibold">{formatBRL(item.subtotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex w-full justify-between border-t border-border pt-4 text-lg">
              <span className="font-semibold">Total do pedido</span>
              <span className="font-bold text-primary">{formatBRL(confirmation.order.total)}</span>
            </div>
            <button
              onClick={() => handleOpen(false)}
              className="mt-6 rounded-full bg-foreground px-6 py-3 font-semibold text-background hover:bg-primary hover:text-primary-foreground"
            >
              Voltar ao cardápio
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Resumo do pedido</DialogTitle>
              <DialogDescription>Confira os itens antes de confirmar.</DialogDescription>
            </DialogHeader>
            <ul className="divide-y divide-border">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="min-w-0">
                    <span className="font-semibold text-primary">{quantity}x</span> {product.name}
                  </span>
                  <span className="shrink-0 font-semibold">
                    {formatBRL(product.price * quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-border pt-4 text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary">{formatBRL(total)}</span>
            </div>
            <button
              disabled={sending || items.length === 0}
              onClick={confirm}
              className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground shadow-glow disabled:opacity-50"
            >
              {sending ? "Enviando..." : "Confirmar pedido"}
            </button>
            {submissionError && (
              <p className="text-sm text-destructive" role="alert">
                {submissionError}
              </p>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
