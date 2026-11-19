import Link from "next/link";
import Logo from "./Logo";
import type { Locale } from "@/lib/i18n";
import { corporate } from "@/lib/i18n";
export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="bg-[#800021] text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            {corporate[locale].direct}
          </p>
          <p className="mt-3 max-w-sm text-xs leading-6 text-white/60">
            {corporate[locale].factory} {corporate[locale].moq}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#FFE4D8]">
            Navigation
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link href={`/${locale}/models`}>Models</Link>
            <Link href={`/${locale}/manufacturer`}>Manufacturer</Link>
            <Link href={`/${locale}/about`}>About</Link>
            <Link href={`/${locale}/quote`}>Wholesale quote</Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#FFE4D8]">
            B2B Contact
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <a href="mailto:info@ahmetuygur.com">info@ahmetuygur.com</a>
            <a href="mailto:sales@ahmetuygur.com">sales@ahmetuygur.com</a>
            <a href="https://wa.me/905536850811">05536850811</a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#FFE4D8]">
            Address
          </p>
          <address className="mt-5 text-sm leading-7 text-white/70 not-italic">
            İstanbul Bağcılar 15 Temmuz Mahallesi Gülbahar Caddesi 1488 Sokak No
            70/72
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/50">
        © 2026 ahmetuygur
      </div>
    </footer>
  );
}
