import type {MetadataRoute} from "next";
import {locales} from "@/lib/i18n";
import {products} from "@/lib/products";
const base="https://ahmetuygur.com";
export default function sitemap():MetadataRoute.Sitemap{const entries=[] as MetadataRoute.Sitemap;for(const locale of locales){for(const route of ["","/models","/manufacturer","/about","/quote"]){entries.push({url:`${base}/${locale}${route}`,lastModified:new Date(),changeFrequency:route?"weekly":"daily",alternates:{languages:Object.fromEntries(locales.map(l=>[l,`${base}/${l}${route}`]))},priority:route?0.7:1})}for(const p of products){entries.push({url:`${base}/${locale}/models/${p.id.toLowerCase()}`,lastModified:new Date(),changeFrequency:"monthly",priority:0.6,alternates:{languages:Object.fromEntries(locales.map(l=>[l,`${base}/${l}/models/${p.id.toLowerCase()}`]))}})}}return entries}
