"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { copy, type Locale } from "@/lib/i18n";
import { products, type Product } from "@/lib/products";
import { useQuote } from "./QuoteProvider";

export default function Catalog({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [style, setStyle] = useState("all");
  const [color, setColor] = useState("all");
  const [limit, setLimit] = useState(24);
  const [selected, setSelected] = useState<Product | null>(null);
  const { add } = useQuote();

  const styles = [...new Set(products.map((p) => p.style))].sort();
  const colors = [...new Set(products.map((p) => p.color))].sort();
  const filtered = useMemo(
    () => products.filter((p) =>
      (style === "all" || p.style === style) &&
      (color === "all" || p.color === color)
    ),
    [style, color]
  );

  return (
    <>
      <div className="sticky top-20 z-30 border-y border-neutral-200 bg-white/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-3">
          <select
            value={style}
            onChange={(event) => { setStyle(event.target.value); setLimit(24); }}
            className="border border-neutral-200 px-4 py-3 text-sm"
          >
            <option value="all">{c.all} {c.style}</option>
            {styles.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select
            value={color}
            onChange={(event) => { setColor(event.target.value); setLimit(24); }}
            className="border border-neutral-200 px-4 py-3 text-sm"
          >
            <option value="all">{c.all} {c.color}</option>
            {colors.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <span className="ml-auto self-center text-xs font-semibold text-neutral-500">
            {filtered.length} MODELS
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.slice(0, limit).map((product) => (
            <article id={product.id} key={product.id}>
              <button onClick={() => setSelected(product)} className="group w-full text-left">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <Image
                    src={product.image}
                    alt={product.translations[locale].alt}
                    fill
                    sizes="(max-width:768px) 50vw, 20vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                  <span className="absolute left-3 top-3 bg-white/90 px-2.5 py-2 text-[10px] font-bold">
                    {product.id}
                  </span>
                </div>
                <div className="flex items-start justify-between border-b border-neutral-200 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#800021]">
                      {product.style}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{product.color}</p>
                  </div>
                  <span className="text-xl text-[#C24366]">+</span>
                </div>
              </button>
            </article>
          ))}
        </div>

        {limit < filtered.length && (
          <button
            onClick={() => setLimit((value) => value + 24)}
            className="mx-auto mt-14 block rounded-full border border-[#800021] px-8 py-4 text-sm font-semibold text-[#800021]"
          >
            {c.loadMore}
          </button>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-end bg-black/45"
          onMouseDown={() => setSelected(null)}
        >
          <div
            className="grid h-[92vh] w-full max-w-5xl overflow-y-auto bg-white md:grid-cols-2"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[420px] md:h-full">
              <Image
                src={selected.image}
                alt={selected.translations[locale].alt}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-7 md:p-12">
              <button onClick={() => setSelected(null)} className="ml-auto text-sm">
                {c.close} ×
              </button>
              <p className="mt-8 text-xs font-bold tracking-[0.2em] text-[#C24366]">
                {selected.id}
              </p>
              <h2 className="mt-3 font-serif text-4xl text-[#800021]">
                {selected.style} · {selected.color}
              </h2>
              <p className="mt-6 text-sm leading-7 text-neutral-600">
                {selected.translations[locale].description}
              </p>
              <h3 className="mt-8 border-t border-neutral-200 pt-6 text-xs font-bold uppercase tracking-[0.18em]">
                {c.technical}
              </h3>
              <dl className="mt-5 grid grid-cols-2 gap-y-4 text-sm">
                <dt className="text-neutral-500">Surface</dt><dd>Silk velvet</dd>
                <dt className="text-neutral-500">Inner</dt><dd>Cushioned</dd>
                <dt className="text-neutral-500">Backing</dt><dd>Black felt dot</dd>
                <dt className="text-neutral-500">Weights</dt><dd>700 / 850 g/m²</dd>
                <dt className="text-neutral-500">Care</dt><dd>Machine washable</dd>
              </dl>
              <button
                onClick={() => add(selected)}
                className="mt-auto rounded-full bg-[#800021] px-6 py-4 text-sm font-semibold text-white"
              >
                + {c.add}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
