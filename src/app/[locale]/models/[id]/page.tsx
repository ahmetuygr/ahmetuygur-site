import Image from "next/image";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {products} from "@/lib/products";
import {isLocale} from "@/lib/i18n";
export async function generateStaticParams(){return ["en","de","fr","tr"].flatMap(locale=>products.map(p=>({locale,id:p.id.toLowerCase()})))}
export async function generateMetadata({params}:{params:Promise<{locale:string,id:string}>}):Promise<Metadata>{const {locale,id}=await params;if(!isLocale(locale))return{};const p=products.find(x=>x.id.toLowerCase()===id);if(!p)return{};const t=p.translations[locale];return{title:`${p.id} ${p.style}`,description:t.description,openGraph:{title:`${p.id} ${p.style}`,description:t.description,images:[p.image]}}}
export default async function ProductDetail({params}:{params:Promise<{locale:string,id:string}>}){const {locale,id}=await params;if(!isLocale(locale))notFound();const p=products.find(x=>x.id.toLowerCase()===id);if(!p)notFound();return <section className="mt-20 px-5 py-16 lg:px-10"><div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-2"><div className="relative aspect-[3/4]"><Image src={p.image} alt={p.translations[locale].alt} fill sizes="50vw" className="object-cover"/></div><div><p className="text-xs font-bold text-[#C24366]">{p.id}</p><h1 className="mt-4 font-serif text-5xl text-[#800021]">{p.style} · {p.color}</h1><p className="mt-8 text-lg leading-8 text-neutral-600">{p.translations[locale].description}</p></div></div></section>}
