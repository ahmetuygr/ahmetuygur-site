import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import QuoteProvider from "@/components/QuoteProvider";
import Footer from "@/components/Footer";
import { isLocale, locales, copy, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const titles = { en:"ahmetuygur | Global Digital Printed Rug Manufacturer", tr:"ahmetuygur | Dijital Baskılı Halı Üreticisi", de:"ahmetuygur | Hersteller digital bedruckter Teppiche", fr:"ahmetuygur | Fabricant de tapis imprimés numériques" };
  return {
    title: titles[locale],
    description: copy[locale].heroText,
    alternates: { canonical:`/${locale}`, languages:Object.fromEntries(locales.map(l=>[l,`/${l}`])) },
    openGraph:{ title:titles[locale], description:copy[locale].heroText, url:`/${locale}`, siteName:"ahmetuygur", type:"website", locale:locale === "en" ? "en_US" : locale === "de" ? "de_DE" : locale === "fr" ? "fr_FR" : "tr_TR" }
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale:string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <QuoteProvider locale={raw}><Header locale={raw}/><main>{children}</main><Footer locale={raw}/><WhatsAppButton locale={raw}/></QuoteProvider>;
}
