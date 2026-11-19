import {notFound} from "next/navigation";
import QuoteForm from "@/components/QuoteForm";
import {isLocale,type Locale} from "@/lib/i18n";
export default async function Quote({params}:{params:Promise<{locale:string}>}){const {locale:raw}=await params;if(!isLocale(raw))notFound();return <section className="mt-20 px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1440px]"><QuoteForm locale={raw as Locale}/></div></section>}
