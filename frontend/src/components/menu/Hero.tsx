import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-foreground">
        <img
          src={hero}
          alt="Hambúrguer artesanal"
          fetchPriority="high"
          width={1774}
          height={887}
          className="absolute inset-0 h-full w-full object-cover object-right opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-r from-foreground via-foreground/80 to-transparent" />
        <div className="relative max-w-xl px-6 py-16 sm:px-12 sm:py-24">
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
            Cardápio digital
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-background sm:text-6xl">
            Seu hambúrguer favorito está <span className="text-primary">aqui!</span>
          </h1>
          <p className="mt-4 text-lg text-background/75">
            Sabor, qualidade e praticidade em um só lugar.
          </p>
          <a
            href="#cardapio"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Ver cardápio
          </a>
        </div>
      </div>
    </section>
  );
}
