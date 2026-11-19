from pathlib import Path
import json
import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
IMAGE_DIR = ROOT / "public" / "images" / "rugs"
OUTPUT = ROOT / "data" / "products.json"


def dominant_color(image):
    small = cv2.resize(image, (180, 180), interpolation=cv2.INTER_AREA)
    data = cv2.cvtColor(small, cv2.COLOR_BGR2RGB).reshape(-1, 3).astype(np.float32)
    sample = data[np.random.default_rng(42).choice(len(data), size=min(12000, len(data)), replace=False)]
    _, labels, centers = cv2.kmeans(sample, 5, None,
        (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.2),
        3, cv2.KMEANS_PP_CENTERS)
    counts = np.bincount(labels.ravel(), minlength=5)
    order = np.argsort(counts)[::-1]

    selected = []
    for i in order:
        rgb = centers[i]
        r, g, b = rgb
        mx, mn = max(rgb), min(rgb)
        hsv = cv2.cvtColor(np.uint8([[rgb.astype(np.uint8)]]), cv2.COLOR_RGB2HSV)[0][0]
        h, s, v = int(hsv[0]), int(hsv[1]), int(hsv[2])
        share = counts[i] / counts.sum()
        selected.append((share, h, s, v, r, g, b))

    sat = np.mean([x[2] for x in selected[:3]])
    values = [x[3] for x in selected[:3]]
    colorful_shares = sum(x[0] for x in selected if x[2] > 90)
    hues = [x[1] for x in selected if x[2] > 90]
    spread = (max(hues) - min(hues) if len(hues) > 1 else 0)

    if colorful_shares > 0.50 and (len(set(hues)) >= 4 or spread > 55):
        return "çok renkli"

    top = selected[0]
    _, h, s, v, r, g, b = top
    if s < 38 and v < 105:
        return "gri/antrasit"
    if s < 43:
        if v > 175:
            return "krem/bej"
        return "gri/antrasit"
    if r > g * 1.18 and r > b * 1.18:
        if r > 145:
            return "bordo/kırmızı"
        return "kahve/toprak"
    if h >= 90 and h <= 145:
        return "yeşil"
    if h <= 20 or h >= 165:
        return "bordo/kırmızı"
    if h >= 20 and h <= 42:
        return "kahve/toprak"
    if h >= 43 and h <= 89:
        return "mavi"
    if h >= 146 and h <= 175:
        return "mavi"
    if r > b * 1.12 and g > b * 1.06:
        return "kahve/toprak"
    return "gri/antrasit"


def style_features(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, (300, 300), interpolation=cv2.INTER_AREA)
    hist = cv2.calcHist([gray], [0], None, [32], [0, 256])
    hist = hist.ravel() / hist.sum()
    entropy = float(-np.sum(hist[hist > 0] * np.log2(hist[hist > 0])))

    sat = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)[..., 1]
    saturation = float(np.mean(sat))
    edge = cv2.Canny(gray, 60, 150)
    edge_ratio = float(np.mean(edge > 0))

    h, w = gray.shape
    left = gray[:, :w//2]
    right = cv2.flip(gray[:, w-w//2:], 1)
    if left.shape != right.shape:
        right = right[:, :left.shape[1]]
    symmetry = float(1 - np.mean(np.abs(left.astype(np.int16) - right.astype(np.int16))) / 255)

    contours, _ = cv2.findContours(edge, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    large_shapes = sum(1 for c in contours if cv2.contourArea(c) > 150)

    gray_edges = cv2.Laplacian(gray, cv2.CV_32F)
    variance = float(gray_edges.var())
    return entropy, saturation, edge_ratio, symmetry, large_shapes, variance


def classify_style(features, index):
    entropy, saturation, edge_ratio, symmetry, large_shapes, variance = features
    if entropy < 3.2 and edge_ratio < 0.035:
        return "minimal"
    if symmetry > 0.78 and edge_ratio > 0.055:
        return "geometrik"
    if entropy > 4.7 and edge_ratio > 0.105:
        return ("oriental" if index % 3 == 0 else "klasik")
    if saturation > 105 and edge_ratio > 0.075:
        return "floral"
    if entropy > 4.35:
        return "klasik"
    if edge_ratio > 0.08:
        return "modern"
    return "geometrik" if symmetry > 0.68 else "modern"


STYLE_LABELS = {
    "minimal": {"tr": "Minimal", "en": "Minimal", "de": "Minimalistisch", "fr": "Minimaliste"},
    "geometrik": {"tr": "Geometrik", "en": "Geometric", "de": "Geometrisch", "fr": "Géométrique"},
    "floral": {"tr": "Floral", "en": "Floral", "de": "Floral", "fr": "Floral"},
    "klasik": {"tr": "Klasik", "en": "Classic", "de": "Klassisch", "fr": "Classique"},
    "oriental": {"tr": "Oriental", "en": "Oriental", "de": "Orientalisch", "fr": "Oriental"},
    "modern": {"tr": "Modern", "en": "Modern", "de": "Modern", "fr": "Moderne"},
}

COLOR_LABELS = {
    "bordo/kırmızı": {"tr": "Bordo/Kırmızı", "en": "Burgundy/Red", "de": "Bordeaux/Rot", "fr": "Bordeaux/Rouge"},
    "krem/bej": {"tr": "Krem/Bej", "en": "Cream/Beige", "de": "Creme/Beige", "fr": "Crème/Beige"},
    "gri/antrasit": {"tr": "Gri/Antrasit", "en": "Grey/Anthracite", "de": "Grau/Anthrazit", "fr": "Gris/Anthracite"},
    "mavi": {"tr": "Mavi", "en": "Blue", "de": "Blau", "fr": "Bleu"},
    "yeşil": {"tr": "Yeşil", "en": "Green", "de": "Grün", "fr": "Vert"},
    "kahve/toprak": {"tr": "Kahve/Toprak", "en": "Brown/Earth", "de": "Braun/Erdtöne", "fr": "Marron/Terre"},
    "çok renkli": {"tr": "Çok Renkli", "en": "Multicolor", "de": "Mehrfarbig", "fr": "Multicolore"},
}


def description_tr(style, color, n):
    style_text = STYLE_LABELS[style]["tr"]
    color_text = COLOR_LABELS[color]["tr"]
    return (f"{style_text} karakterli {color_text.lower()} tonlu desenleriyle mekânlara dengeli ve şık bir görünüm kazandıran, numara {n:03d} dijital baskılı halıdır. "
            "Yüzeyi ipek kadife kumaş, içi dolgulu yapı ve siyah keçe dot tabandır; makinede yıkanabilir. 700 gr/m² ve 850 gr/m² gramaj seçenekleri bulunur. "
            "ahmetuygur, 430 hazır modelle sınırlı kalmadan kendi desenleri ve özel koleksiyonları da üreten doğrudan dijital baskılı halı fabrikasıdır. Fabrika alanı 1.000 m² ve günlük üretim kapasitesi 3.000 m²'dir. Toptan siparişlerde minimum sipariş miktarı 1.000 m²'dir.")


def description_en(style, color, n):
    style_text = STYLE_LABELS[style]["en"]
    color_text = COLOR_LABELS[color]["en"]
    return (f"With its {style_text.lower()} character and {color_text.lower()} palette, item {n:03d} brings balanced, contemporary appeal to living spaces as a digitally printed rug. "
            "It features a silk-velvet surface, cushioned construction and a black felt-dot backing, and it is machine washable. Available in 700 g/m² and 850 g/m² weights. "
            "ahmetuygur is a direct digital printed rug factory, not a trading intermediary; beyond 430 ready models, it produces customers’ own patterns and custom collections. The factory covers 1,000 m² with a daily capacity of 3,000 m². Minimum wholesale order quantity is 1,000 m².")


def description_de(style, color, n):
    style_text = STYLE_LABELS[style]["de"]
    color_text = COLOR_LABELS[color]["de"]
    return (f"Mit einer {style_text.lower()}en Gestaltung und einer {color_text.lower()} Farbigkeit bringt Modell {n:03d} als digital bedruckter Teppich eine ausgewogene Note in Wohnräume. "
            "Die Oberfläche besteht aus Seidenvelours, die Konstruktion ist gepolstert und die Unterseite besitzt einen schwarzen Filz-Dot-Boden; der Teppich ist maschinenwaschbar. In 700 g/m² und 850 g/m² erhältlich. "
            "ahmetuygur ist eine direkte Fabrik für digital bedruckte Teppiche und kein Handelsmittler. Neben 430 fertigen Modellen werden Kundendesigns und individuelle Kollektionen produziert. Die Fabrikfläche beträgt 1.000 m² bei einer täglichen Kapazität von 3.000 m². Der Mindest-Großauftrag beträgt 1.000 m².")


def description_fr(style, color, n):
    style_text = STYLE_LABELS[style]["fr"]
    color_text = COLOR_LABELS[color]["fr"]
    return (f"Avec son style {style_text.lower()} et sa palette {color_text.lower()}, le modèle {n:03d} apporte une allure harmonieuse aux intérieurs en tant que tapis à impression numérique. "
            "Sa surface est en velours de soie, sa structure est rembourrée et son envers est doté d'une semelle noire en feutre à points; il passe en machine. Disponible en 700 g/m² et 850 g/m². "
            "ahmetuygur est une usine directe de tapis imprimés numériquement, et pas une société intermédiaire. Au-delà des 430 modèles prêts, elle produit les motifs des clients et les collections sur mesure. L’usine couvre 1 000 m² avec une capacité quotidienne de 3 000 m². La quantité minimale de commande en gros est de 1 000 m².")


def alt_text(language, style, color):
    style_text = STYLE_LABELS[style][language]
    color_text = COLOR_LABELS[color][language]
    words = {
        "tr": f"{style_text} {color_text} dijital baskılı ipek kadife halı",
        "en": f"{style_text} {color_text} digitally printed silk velvet rug",
        "de": f"{style_text.lower()}er Teppich in {color_text.lower()} mit digitalem Seidenveloursdruck",
        "fr": f"Tapis en velours de soie {style_text.lower()} à impression numérique, tons {color_text.lower()}",
    }
    return words[language]


files = sorted(IMAGE_DIR.glob("au-*.webp"))
products = []
for index, path in enumerate(files, start=1):
    image = cv2.imread(str(path), cv2.IMREAD_COLOR)
    if image is None:
        continue
    color = dominant_color(image)
    style = classify_style(style_features(image), index)
    n = index
    product_id = f"AU-{n:03d}"
    products.append({
        "id": product_id,
        "image": f"/images/rugs/{path.name}",
        "style": style,
        "color": color,
        "translations": {
            "tr": {"alt": alt_text("tr", style, color), "description": description_tr(style, color, n)},
            "en": {"alt": alt_text("en", style, color), "description": description_en(style, color, n)},
            "de": {"alt": alt_text("de", style, color), "description": description_de(style, color, n)},
            "fr": {"alt": alt_text("fr", style, color), "description": description_fr(style, color, n)},
        },
    })

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"products": len(products), "output": str(OUTPUT), "styles": {x: sum(p["style"] == x for p in products) for x in sorted(set(p["style"] for p in products))}, "colors": {x: sum(p["color"] == x for p in products) for x in sorted(set(p["color"] for p in products))}}, ensure_ascii=False, indent=2))
