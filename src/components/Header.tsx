import Link from "next/link";
import Logo from "./Logo";
import { copy, locales, type Locale } from "@/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#800021]/10 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-neutral-700 md:flex">
          <Link href={`/${locale}/models`}>{c.navModels}</Link>
          <Link href={`/${locale}/manufacturer`}>{c.navManufacturer}</Link>
          <Link href={`/${locale}/about`}>{c.navAbout}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <nav aria-label="Language selector" className="hidden items-center text-xs font-semibold text-neutral-500 lg:flex">
            {locales.map((item, index) => (
              <span key={item} className="flex items-center">
                {index > 0 && <span className="mx-1.5 text-neutral-300" aria-hidden="true">|</span>}
                <Link className={item === locale ? "text-[#800021]" : "hover:text-[#800021]"} href={`/${item}`}>
                  {item.toUpperCase()}
                </Link>
              </span>
            ))}
          </nav>
          <Link href={`/${locale}/quote`} className="rounded-full bg-[#800021] px-5 py-3 text-xs font-semibold text-white">
            {c.quote}
          </Link>
        </div>
      </div>
    </header>
  );
}
