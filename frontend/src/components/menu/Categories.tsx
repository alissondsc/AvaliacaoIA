import { CATEGORIES, type Category } from "@/lib/menu";
import { cn } from "@/lib/utils";

type Props = { active: Category | "todos"; onChange: (c: Category | "todos") => void };

export function Categories({ active, onChange }: Props) {
  return (
    <div role="tablist" aria-label="Categorias" className="flex gap-2 overflow-x-auto pb-2">
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          role="tab"
          aria-selected={active === c.id}
          onClick={() => onChange(c.id)}
          className={cn(
            "shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
            active === c.id
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-background text-foreground hover:border-primary hover:text-primary",
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
