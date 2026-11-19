import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  const color = light ? "#ffffff" : "#800021";
  return (
    <Link href="/en" aria-label="ahmetuygur" className="flex items-center gap-3">
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="36" height="36" rx="18" stroke={color} strokeWidth="1.5" />
        <path d="M10 19L19 10L28 19L19 28L10 19Z" stroke={color} strokeWidth="1.5" />
        <path d="M14 19L19 14L24 19L19 24L14 19Z" stroke={color} strokeWidth="1.5" />
      </svg>
      <span className="font-serif text-xl font-semibold tracking-[0.08em]" style={{ color }}>ahmetuygur</span>
    </Link>
  );
}
