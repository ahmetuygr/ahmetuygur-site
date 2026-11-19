"use client";

import { useQuote } from "./QuoteProvider";
import type { Locale } from "@/lib/i18n";

export default function WhatsAppButton({ locale }: { locale: Locale }) {
  const { items } = useQuote();
  const messages = {
    en: "Hello ahmetuygur, I would like to request an export quote for your digitally printed rugs.",
    de: "Hallo ahmetuygur, ich möchte ein Exportangebot für Ihre digital bedruckten Teppiche anfordern.",
    fr: "Bonjour ahmetuygur, je souhaite recevoir une offre d'exportation pour vos tapis imprimés numériquement.",
    tr: "Merhaba ahmetuygur, dijital baskılı halılarınız için ihracat teklifi almak istiyorum.",
  };
  const modelLabels = {
    en: "Selected models",
    de: "Ausgewählte Modelle",
    fr: "Modèles sélectionnés",
    tr: "Seçili modeller",
  };
  const modelText = items.length
    ? ` ${modelLabels[locale]}: ${items.map((item) => item.id).join(", ")}.`
    : "";
  const phone = "905536850811";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(messages[locale] + modelText)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-white transition hover:-translate-y-1"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16 3A13 13 0 0 0 5.1 22.8L3 29l6.4-2A13 13 0 1 0 16 3zm0 23.6a10.5 10.5 0 0 1-5.4-1.5l-.4-.2-3.8 1.2 1.2-3.7-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-1.9-.9-3.2-1.7-4.5-3.8-.3-.6.3-.6.9-1.8.1-.2 0-.5 0-.7l-1-2.3c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.5-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.7 5.9 5.1 2.2.9 3.1 1 4.2.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.5z" />
      </svg>
    </a>
  );
}
