"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { copy, corporate, locales, type Locale } from "@/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const factory = corporate[locale];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#800021]/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-20 lg:px-10">
          <Logo />

          <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-neutral-700 md:flex">
            <Link href={`/${locale}/models`}>{c.navModels}</Link>
            <Link href={`/${locale}/manufacturer`}>{c.navManufacturer}</Link>
            <Link href={`/${locale}/about`}>{c.navAbout}</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
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

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#800021]/15 text-[#800021] md:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-[1.5px] w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] h-[1.5px] w-5 bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[#17070b]/35"
            onClick={() => setOpen(false)}
          />
          <aside
            id="mobile-navigation"
            className="absolute right-0 top-0 flex h-[100dvh] w-[min(88vw,390px)] flex-col overflow-y-auto bg-white px-5 pb-8 pt-5 shadow-2xl"
          >
            <div className="flex h-12 items-center justify-between">
              <Link href={`/${locale}`} onClick={() => setOpen(false)} aria-label="ahmetuygur home">
                <span className="font-serif text-xl font-semibold tracking-[0.08em] text-[#800021]">ahmetuygur</span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#800021]/15 text-xl text-[#800021]"
              >
                ×
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="mt-8 border-t border-neutral-200">
              <Link onClick={() => setOpen(false)} href={`/${locale}/models`} className="flex items-center justify-between border-b border-neutral-200 py-5 text-lg font-medium text-neutral-900">
                {c.navModels}<span className="text-[#C24366]">→</span>
              </Link>
              <Link onClick={() => setOpen(false)} href={`/${locale}/manufacturer`} className="flex items-center justify-between border-b border-neutral-200 py-5 text-lg font-medium text-neutral-900">
                {c.navManufacturer}<span className="text-[#C24366]">→</span>
              </Link>
              <Link onClick={() => setOpen(false)} href={`/${locale}/about`} className="flex items-center justify-between border-b border-neutral-200 py-5 text-lg font-medium text-neutral-900">
                {c.navAbout}<span className="text-[#C24366]">→</span>
              </Link>
            </nav>

            <div className="mt-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C24366]">Language</p>
              <nav aria-label="Mobile language selector" className="mt-3 grid grid-cols-4 gap-2">
                {locales.map((item) => (
                  <Link
                    key={item}
                    href={`/${item}`}
                    onClick={() => setOpen(false)}
                    className={`flex h-11 items-center justify-center rounded-full border text-xs font-bold ${item === locale ? "border-[#800021] bg-[#800021] text-white" : "border-[#800021]/15 text-neutral-700"}`}
                  >
                    {item.toUpperCase()}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-7 rounded-sm bg-[#FFF9F6] p-5">
              <p className="text-xs font-bold leading-6 text-[#800021]">{factory.direct}</p>
              <p className="mt-3 text-xs leading-5 text-neutral-600">{factory.custom}</p>
              <p className="mt-3 text-xs font-bold text-[#800021]">{factory.moq}</p>
            </div>

            <Link
              onClick={() => setOpen(false)}
              href={`/${locale}/quote`}
              className="mt-auto flex h-14 items-center justify-center rounded-full bg-[#800021] text-sm font-semibold text-white"
            >
              {c.quote}
            </Link>
          </aside>
        </div>
      )}
    </>
  );
}
