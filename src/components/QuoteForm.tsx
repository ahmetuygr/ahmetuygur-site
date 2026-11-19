"use client";

import { useState } from "react";
import { useQuote } from "./QuoteProvider";
import { copy, corporate, type Locale } from "@/lib/i18n";

export default function QuoteForm({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const { items } = useQuote();
  const [status, setStatus] = useState("");
  const [mailto, setMailto] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const data = new FormData(event.currentTarget);
    const body = {
      company: data.get("company"),
      country: data.get("country"),
      email: data.get("email"),
      area: data.get("area"),
      weight: data.get("weight"),
      models: items.map((item) => item.id),
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        setStatus(
          locale === "tr"
            ? "Teklif talebiniz başarıyla gönderildi."
            : locale === "de"
              ? "Ihre Angebotsanfrage wurde erfolgreich gesendet."
              : locale === "fr"
                ? "Votre demande de devis a été envoyée avec succès."
                : "Your quote request was sent successfully."
        );
        setMailto("");
      } else if (result.mailto) {
        setStatus(result.message);
        setMailto(result.mailto);
      } else {
        setStatus(result.message || "The quote request could not be sent.");
      }
    } catch {
      setStatus("The quote request could not be sent. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <aside>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C24366]">{c.quoteDrawer}</p>
        <h1 className="mt-5 font-serif text-5xl text-[#800021]">{c.sendEmail}</h1>
        <div className="mt-10 border-t border-neutral-200">
          {items.length ? items.map((product) => (
            <div key={product.id} className="flex justify-between border-b border-neutral-200 py-4 text-sm">
              <span>{product.id}</span>
              <span className="text-neutral-500">{product.style}</span>
            </div>
          )) : (
            <p className="py-6 text-sm text-neutral-500">No models selected</p>
          )}
        </div>
      </aside>

      <div>
        {status && (
          <div className="mb-5 rounded-sm bg-[#FFF9F6] p-5 text-sm leading-6 text-[#800021]">
            {status}
          </div>
        )}
        {mailto && (
          <a href={mailto} className="mb-5 block w-fit rounded-full border border-[#800021] px-6 py-3 text-sm font-semibold text-[#800021]">
            Open e-mail app
          </a>
        )}
        <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
          <label className="text-xs font-semibold">
            {c.company}
            <input name="company" required className="mt-2 w-full border border-neutral-300 px-4 py-4 text-sm font-normal" />
          </label>
          <label className="text-xs font-semibold">
            {c.country}
            <input name="country" required className="mt-2 w-full border border-neutral-300 px-4 py-4 text-sm font-normal" />
          </label>
          <label className="text-xs font-semibold">
            {c.email}
            <input name="email" type="email" required className="mt-2 w-full border border-neutral-300 px-4 py-4 text-sm font-normal" />
          </label>
          <label className="text-xs font-semibold">
            {c.area}
            <input name="area" required placeholder="m²" className="mt-2 w-full border border-neutral-300 px-4 py-4 text-sm font-normal" />
          </label>
          <label className="text-xs font-semibold md:col-span-2">
            {c.weight}
            <select name="weight" required className="mt-2 w-full border border-neutral-300 px-4 py-4 text-sm font-normal">
              <option value="700 g/m²">700 g/m²</option>
              <option value="850 g/m²">850 g/m²</option>
            </select>
          </label>
          <button disabled={loading} className="mt-3 rounded-full bg-[#800021] px-7 py-4 text-sm font-semibold text-white md:col-span-2">
            {loading ? c.sending : c.submit}
          </button>
        </form>

        <p className="mt-6 text-sm leading-7 text-neutral-600">{corporate[locale].direct}</p>
        <p className="mt-3 text-sm leading-7 text-neutral-600">{corporate[locale].custom}</p>
        <p className="mt-3 text-sm font-bold text-[#800021]">{corporate[locale].moq}</p>
      </div>
    </div>
  );
}
