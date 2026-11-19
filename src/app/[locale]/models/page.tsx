import { notFound } from "next/navigation";
import Catalog from "@/components/Catalog";
import { corporate, isLocale, copy, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: `${copy[locale].models} | ahmetuygur`, description: copy[locale].heroText };
}

export default async function Models({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = copy[locale];
  const factory = corporate[locale];

  return (
    <>
      <section className="mt-20 bg-[#800021] px-5 py-20 text-white lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs uppercase tracking-[0.25em] text-[#FFE4D8]">ahmetuygur collection</p>
          <h1 className="mt-5 font-serif text-5xl lg:text-7xl">{c.models}</h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-white/75">{factory.direct}</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#FFE4D8]">{factory.custom} {factory.moq}</p>
        </div>
      </section>
      <Catalog locale={locale} />
    </>
  );
}
