import { notFound } from "next/navigation";
import { corporate, isLocale, copy, type Locale } from "@/lib/i18n";

export default async function Manufacturer({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = copy[locale];
  const factory = corporate[locale];

  const cards =
    locale === "tr"
      ? [
          ["Dijital baskı", "Her halıda yüksek detay ve tutarlı baskı kalitesi."],
          ["İpek kadife yüzey", "Yumuşak, rafine ve görsel açıdan zengin yüzey."],
          ["Dolgulu yapı", "Konfor odaklı iç yapı; premium ve sağlam hissiyat."],
          ["Siyah keçe dot taban", "Makinede yıkanabilir güvenilir alt taban katmanı."],
        ]
      : locale === "de"
      ? [
          ["Digitaldruck", "Hochdetailgenaue und konsistente Farbwiedergabe."],
          ["Seidenvelours", "Weiche, raffinierte und visuell hochwertige Oberfläche."],
          ["Gepolsterte Struktur", "Bequeme Innenstruktur mit hochwertigem Griff."],
          ["Schwarzer Filz-Dot-Boden", "Maschinenwaschbare, zuverlässige Unterseite."],
        ]
      : locale === "fr"
      ? [
          ["Impression numérique", "Couleurs haute définition et régulières."],
          ["Velours de soie", "Surface douce, raffinée et riche visuellement."],
          ["Structure rembourrée", "Confort intérieur avec une sensation premium."],
          ["Semelle noire à points", "Envers fiable et lavable en machine."],
        ]
      : [
          ["Digital print", "High-detail, consistent digitally printed color."],
          ["Silk velvet surface", "Soft, refined and visually rich face."],
          ["Cushioned structure", "Comfort-led inner construction with a substantial feel."],
          ["Black felt-dot backing", "Reliable, machine-washable backing."],
        ];

  const process =
    locale === "tr"
      ? ["Desen seçimi veya özel tasarım", "Gramaj ve metraj", "Üretim hazırlığı", "Global teslimat"]
      : locale === "de"
      ? ["Modellwahl oder Kundendesign", "Grammatur und Flächenmaß", "Produktionsvorbereitung", "Weltweite Lieferung"]
      : locale === "fr"
      ? ["Sélection ou design sur mesure", "Grammage et métrage", "Préparation de production", "Livraison mondiale"]
      : ["Model selection or custom design", "Weight and total area", "Production preparation", "Worldwide delivery"];

  return (
    <>
      <section className="mt-20 bg-[#800021] px-5 py-24 text-white lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs uppercase tracking-[0.25em] text-[#FFE4D8]">B2B Manufacturing</p>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl lg:text-7xl">{c.manufacturer}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75">{factory.direct}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10">
        <div className="grid gap-px bg-[#800021]/10 md:grid-cols-2 lg:grid-cols-4">
          {cards.map(([title, description], index) => (
            <article key={title} className="min-h-72 bg-white p-7">
              <span className="font-serif text-3xl text-[#C24366]">0{index + 1}</span>
              <h2 className="mt-10 font-serif text-3xl text-[#800021]">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#FFF9F6] px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="border border-[#800021]/10 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C24366]">Factory</p>
              <p className="mt-5 text-lg leading-8 text-neutral-700">1,000 m²</p>
            </div>
            <div className="border border-[#800021]/10 bg-[#800021] p-8 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFE4D8]">Daily capacity</p>
              <p className="mt-5 text-lg leading-8">3,000 m²</p>
            </div>
            <div className="border border-[#800021]/10 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C24366]">MOQ</p>
              <p className="mt-5 text-lg font-bold text-[#800021]">1,000 m²</p>
            </div>
          </div>
          <div className="mt-10 max-w-4xl space-y-4 text-lg leading-8 text-neutral-700">
            <p>{factory.factory}</p>
            <p>{factory.custom}</p>
            <p className="font-bold text-[#800021]">{factory.moq}</p>
          </div>

          <p className="mt-16 text-xs font-bold uppercase tracking-[0.2em] text-[#C24366]">700 / 850 g/m²</p>
          <div className="mt-10 grid md:grid-cols-2">
            <div className="border border-[#800021]/10 bg-white p-10">
              <span className="font-serif text-6xl text-[#800021]">700</span>
              <p className="mt-2 text-sm">g/m²</p>
            </div>
            <div className="border border-[#800021]/10 bg-[#800021] p-10 text-white">
              <span className="font-serif text-6xl">850</span>
              <p className="mt-2 text-sm text-white/70">g/m²</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10">
        <h2 className="font-serif text-4xl text-[#800021] lg:text-6xl">
          {locale === "tr"
            ? "Global ihracat süreci"
            : locale === "de"
            ? "Globaler Exportprozess"
            : locale === "fr"
            ? "Processus d’exportation mondial"
            : "Global export process"}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {process.map((item, index) => (
            <div key={item} className="border-l border-[#C24366] pl-5">
              <b className="text-xs text-[#C24366]">0{index + 1}</b>
              <p className="mt-4 font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
