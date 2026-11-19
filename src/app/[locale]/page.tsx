import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, corporate, isLocale, type Locale } from "@/lib/i18n";
import { products } from "@/lib/products";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const c = copy[locale];
  const factory = corporate[locale];
  const featured = ["AU-001", "AU-042", "AU-118", "AU-205"]
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const standards = locale === "tr"
    ? ["İpek kadife kumaş yüzey", "İçi dolgulu yapı", "700 g/m²", "850 g/m²", "Siyah keçe dot taban"]
    : locale === "de"
      ? ["Seidenvelours-Oberfläche", "Gepolsterte Innenstruktur", "700 g/m²", "850 g/m²", "Schwarzer Filz-Dot-Boden"]
      : locale === "fr"
        ? ["Surface en velours de soie", "Structure intérieure rembourrée", "700 g/m²", "850 g/m²", "Semelle noire en feutre à points"]
        : ["Silk velvet surface", "Cushioned inner structure", "700 g/m²", "850 g/m²", "Black felt-dot backing"];

  return (
    <>
      <section className="relative mt-20 min-h-[680px] overflow-hidden bg-[#800021] text-white">
        <div className="absolute inset-0 opacity-10 pattern-grid" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:py-32">
          <div>
            <p className="eyebrow text-[#FFE4D8]">{c.home}</p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-[82px]">{c.hero}</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/75">{c.heroText}</p>
            <p className="mt-5 max-w-xl text-sm font-semibold leading-7 text-[#FFE4D8]">{factory.direct}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/${locale}/models`} className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#800021]">{c.explore}</Link>
              <Link href={`/${locale}/quote`} className="rounded-full border border-white/30 px-7 py-4 text-sm font-semibold">{c.quote}</Link>
            </div>
          </div>
          <div className="relative mx-auto h-[520px] w-full max-w-[560px] overflow-hidden rounded-[2px] border border-white/15">
            <Image src="/images/rugs/au-001.webp" alt="Premium digitally printed silk velvet rug" fill priority sizes="560px" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10">
        <p className="eyebrow">{c.standards}</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-[#800021]/10 bg-[#800021]/10 md:grid-cols-2 lg:grid-cols-5">
          {standards.map((item, index) => (
            <div key={item} className="min-h-44 bg-white p-7">
              <span className="font-serif text-3xl text-[#C24366]">0{index + 1}</span>
              <p className="mt-10 text-sm font-semibold leading-6 text-neutral-800">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-px bg-[#800021]/10 md:grid-cols-3">
          {[factory.factory, factory.custom, factory.moq].map((item) => (
            <p key={item} className="min-h-36 bg-[#FFF9F6] p-7 text-sm font-semibold leading-7 text-neutral-700">{item}</p>
          ))}
        </div>
      </section>

      <section className="bg-[#FFF9F6] px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between">
            <div><p className="eyebrow">{c.models}</p><h2 className="mt-4 font-serif text-4xl text-[#800021] lg:text-6xl">{c.viewAll}</h2></div>
            <Link href={`/${locale}/models`} className="hidden border-b border-[#800021] pb-1 text-sm font-semibold text-[#800021] md:block">{c.explore} →</Link>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-600">{factory.custom}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.map((product) => product && (
              <Link key={product.id} href={`/${locale}/models#${product.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <Image src={product.image} alt={product.translations[locale].alt} fill sizes="(max-width:768px) 50vw,25vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute left-4 top-4 bg-white/90 px-3 py-2 text-[10px] font-bold tracking-widest">{product.id}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 lg:grid-cols-2 lg:px-10">
        <div className="bg-[#800021] p-10 text-white lg:p-16">
          <p className="eyebrow text-[#FFE4D8]">B2B EXPORT</p>
          <h2 className="mt-5 font-serif text-4xl lg:text-6xl">{factory.direct}</h2>
        </div>
        <div className="flex flex-col justify-center rounded-sm border border-[#800021]/10 p-10 lg:p-16">
          <p className="text-lg leading-8 text-neutral-600">{factory.factory}</p>
          <p className="mt-5 text-sm leading-7 text-neutral-600">{factory.custom}</p>
          <p className="mt-5 text-sm font-bold text-[#800021]">{factory.moq}</p>
          <Link href={`/${locale}/quote`} className="mt-8 w-fit rounded-full bg-[#800021] px-7 py-4 text-sm font-semibold text-white">{c.quote}</Link>
        </div>
      </section>
    </>
  );
}
