export const locales = ["en", "de", "fr", "tr"] as const;
export type Locale = (typeof locales)[number];

export const corporate = {
  en: {
    direct: "We are a direct digital printed rug manufacturer and factory—not an intermediary or trading company.",
    factory: "Our factory operates on 1,000 m² of manufacturing area with a daily production capacity of 3,000 m².",
    custom: "We produce our 430 ready models as well as clients’ own patterns and custom collections.",
    moq: "Minimum wholesale order quantity: 1,000 m².",
  },
  de: {
    direct: "Wir sind ein direkter Hersteller und Fabrik für digital bedruckte Teppiche – kein Vermittler oder Handelsunternehmen.",
    factory: "Unsere Fabrik verfügt über 1.000 m² Produktionsfläche und eine tägliche Kapazität von 3.000 m².",
    custom: "Wir produzieren nicht nur 430 fertige Modelle, sondern auch Kundendesigns und individuelle Kollektionen.",
    moq: "Mindest-Großauftrag: 1.000 m².",
  },
  fr: {
    direct: "Nous sommes un fabricant direct et une usine de tapis imprimés numériquement, et non un intermédiaire ou une société commerciale.",
    factory: "Notre usine dispose de 1 000 m² d’espace de production et d’une capacité quotidienne de 3 000 m².",
    custom: "Nous produisons nos 430 modèles prêts ainsi que les propres motifs des clients et des collections sur mesure.",
    moq: "Quantité minimale de commande en gros : 1 000 m².",
  },
  tr: {
    direct: "ahmetuygur, aracı veya ticaret firması değil; doğrudan dijital baskılı halı üreticisi ve fabrikadır.",
    factory: "Fabrikamız 1.000 m² üretim alanında faaliyet göstermekte ve günlük 3.000 m² üretim kapasitesine sahiptir.",
    custom: "430 hazır modelimizin yanı sıra müşterilerin kendi desenleri ve özel koleksiyonları da fabrikamızda üretilir.",
    moq: "Toptan siparişlerde minimum sipariş miktarı: 1.000 m².",
  },
} as const;

export const copy = {
  en: { navModels:"Models", navManufacturer:"Manufacturer", navAbout:"About", quote:"Request B2B Quote", home:"Direct digital printed rug manufacturer", hero:"Premium rugs for global interiors", heroText:"Direct-from-manufacturer digitally printed rugs crafted for international distributors, wholesalers and contract projects.", explore:"Explore collection", standards:"Production standards", models:"Global Collection", viewAll:"View 430 models", aboutTitle:"Manufacturer vision", quoteDrawer:"Quote list", add:"Add to quote", selected:"Selected models", sendEmail:"Send e-mail quote", company:"Company name", country:"Country", email:"E-mail", area:"Target square meters", weight:"Weight", submit:"Send Quote", sending:"Sending...", manufacturer:"Direct Manufacturer", wholesale:"Direct factory • wholesale export", technical:"Technical specifications", close:"Close", style:"Pattern", color:"Color", loadMore:"Load more", all:"All" },
  de: { navModels:"Modelle", navManufacturer:"Produzent", navAbout:"Über uns", quote:"B2B-Angebot", home:"Direkter Hersteller digital bedruckter Teppiche", hero:"Premium-Teppiche für globale Räume", heroText:"Teppiche direkt vom Fabrikhersteller für internationale Distributoren, Großhändler und Objektprojekte.", explore:"Kollektion ansehen", standards:"Produktionsstandards", models:"Globale Kollektion", viewAll:"430 Modelle ansehen", aboutTitle:"Hersteller-Vision", quoteDrawer:"Angebotsliste", add:"Zum Angebot hinzufügen", selected:"Ausgewählte Modelle", sendEmail:"Angebotsanfrage per E-Mail", company:"Firmenname", country:"Land", email:"E-Mail", area:"Ziel-Meterzahl", weight:"Grammatur", submit:"Angebot senden", sending:"Wird gesendet...", manufacturer:"Direkter Hersteller", wholesale:"Direkte Fabrik • Großhandelsexport", technical:"Technische Merkmale", close:"Schließen", style:"Muster", color:"Farbe", loadMore:"Mehr laden", all:"Alle" },
  fr: { navModels:"Modèles", navManufacturer:"Fabricant", navAbout:"À propos", quote:"Demande B2B", home:"Fabricant direct de tapis imprimés numériques", hero:"Tapis premium pour les intérieurs du monde entier", heroText:"Tapis imprimés numériquement directement de notre usine pour distributeurs, grossistes et projets professionnels.", explore:"Découvrir la collection", standards:"Normes de production", models:"Collection mondiale", viewAll:"Voir les 430 modèles", aboutTitle:"Vision du fabricant", quoteDrawer:"Liste de devis", add:"Ajouter au devis", selected:"Modèles sélectionnés", sendEmail:"Envoyer la demande par e-mail", company:"Entreprise", country:"Pays", email:"E-mail", area:"Surface cible", weight:"Grammage", submit:"Envoyer le devis", sending:"Envoi en cours...", manufacturer:"Fabricant direct", wholesale:"Direct usine • export en gros", technical:"Caractéristiques techniques", close:"Fermer", style:"Motif", color:"Couleur", loadMore:"Afficher plus", all:"Tous" },
  tr: { navModels:"Modeller", navManufacturer:"Üretici", navAbout:"Hakkımızda", quote:"B2B Teklif Al", home:"Doğrudan dijital baskılı halı üreticisi", hero:"Dünyanın mekanları için premium halılar", heroText:"Uluslararası distribütörler, toptancılar ve projeler için doğrudan fabrikadan dijital baskılı halılar.", explore:"Koleksiyonu keşfet", standards:"Üretim standartları", models:"Global Koleksiyon", viewAll:"430 modeli incele", aboutTitle:"Üretici vizyonu", quoteDrawer:"Teklif listesi", add:"Teklif listesine ekle", selected:"Seçili modeller", sendEmail:"E-posta ile teklif gönder", company:"Firma adı", country:"Ülke", email:"E-posta", area:"Hedef metraj", weight:"Gramaj", submit:"Teklif Gönder", sending:"Gönderiliyor...", manufacturer:"Doğrudan Üretici", wholesale:"Doğrudan fabrika • toptan ihracat", technical:"Teknik özellikler", close:"Kapat", style:"Desen", color:"Renk", loadMore:"Daha fazla yükle", all:"Tümü" }
} as const;

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
