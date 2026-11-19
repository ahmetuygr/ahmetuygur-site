"use client";
import { createContext, useContext, useState } from "react";
import type { Product } from "@/lib/products";
import type { Locale } from "@/lib/i18n";

type ContextType={items:Product[];add:(p:Product)=>void;remove:(id:string)=>void;locale:Locale};
const C=createContext<ContextType|null>(null);
export const useQuote=()=>useContext(C)!;
export default function QuoteProvider({children,locale}:{children:React.ReactNode;locale:Locale}){const [items,setItems]=useState<Product[]>([]);const add=(p:Product)=>setItems(v=>v.some(x=>x.id===p.id)?v:[...v,p]);const remove=(id:string)=>setItems(v=>v.filter(x=>x.id!==id));return <C.Provider value={{items,add,remove,locale}}>{children}</C.Provider>}
