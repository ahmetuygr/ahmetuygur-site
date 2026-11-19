import { notFound } from "next/navigation";
import { corporate, isLocale, type Locale } from "@/lib/i18n";

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const factory = corporate[locale];

  const title = locale === "tr" ? "Uluslararası iş için doğrudan üretim." : locale === "de" ? "Direkte Produktion für internationales Geschäft." : locale === "fr" ? "Production directe pour les affaires internationales." : "Direct manufacturing for international business.";

  return (
    <>
      <section className="mt-20 px-5 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] items-end gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C24366]">About ahmetuygur</p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight text-[#800021] lg:text-8xl">{title}</h1>
          </div>
          <div className="space-y-5 text-lg leading-8 text-neutral-600">
            <p>{factory.direct}</p>
            <p>{factory.factory}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#800021] px-5 py-24 text-white lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl lg:text-6xl">{locale === "tr" ? "Özel koleksiyon ve toptan iş ortaklığı" : locale === "de" ? "Maßkollektionen und Großhandelspartnerschaft" : locale === "fr" ? "Collections sur mesure et partenariat de gros" : "Custom collections and wholesale partnerships"}</h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75">{factory.custom}</p>
            <p className="mt-5 font-bold text-[#FFE4D8]">{factory.moq}</p>
          </div>
          <address className="border-l border-white/20 pl-8 not-italic">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFE4D8]">Contact & address</p>
            <p className="mt-6 leading-8 text-white/85">İstanbul Bağcılar 15 Temmuz Mahallesi Gülbahar Caddesi 1488 Sokak No 70/72</p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a href="mailto:info@ahmetuygur.com">info@ahmetuygur.com</a>
              <a href="mailto:sales@ahmetuygur.com">sales@ahmetuygur.com</a>
            </div>
          </address>
        </div>
      </section>
    </>
  );
}
