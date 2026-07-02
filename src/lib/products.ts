export interface Product {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  rating: number;
  badge?: string;
  category: string;
  subcategory?: string;
  description: string;
}

const img = (path: string) =>
  `https://www.promodar.com.tn/Fr/image_resize.php?img=upload%2F${path}&h=500`;

export const products: Product[] = [
  // Électroménagers encastrables
  { id: "1", name: "Hotte Ora-Ito DKG552", price: "1 290.000", oldPrice: "1 490.000", image: img("1413993234.jpg"), rating: 4.7, badge: "Promo", category: "Électroménagers Encastrables", subcategory: "Hottes", description: "Hotte encastrable design Ora-Ito DKG552. Dimensions : 600 mm. Performance d'aspiration élevée et finition élégante." },
  { id: "2", name: "Hotte Classico DK63MCLI", price: "890.000", image: img("1422699582.jpg"), rating: 4.5, category: "Électroménagers Encastrables", subcategory: "Hottes", description: "Hotte encastrable Classico DK63MCLI. Dimensions : 600 mm. Style classique pour cuisine moderne." },
  { id: "3", name: "Micro-onde Classico MO4250CLI", price: "1 150.000", image: img("1422699631.jpg"), rating: 4.6, badge: "Nouveau", category: "Électroménagers Encastrables", subcategory: "Micro-ondes", description: "Micro-onde encastrable Classico MO4250CLI. Nombre de fonctions : 6. Capacité généreuse pour usage quotidien." },
  { id: "4", name: "Machine à café CMA9200", price: "3 490.000", image: img("1451375073.jpg"), rating: 4.9, badge: "Top", category: "Électroménagers Encastrables", subcategory: "Machines à café", description: "Machine à café encastrable automatique CMA9200. Préparation espresso, cappuccino et café long en un clic." },

  // Revêtements
  { id: "5", name: "Mosaïque JSM-LL041", price: "85.000", image: img("1486644906.jpg"), rating: 4.3, category: "Revêtements & Chauffages", subcategory: "Mosaïques", description: "Mosaïque décorative JSM-LL041. Revêtement pour mur, finition haut de gamme." },
  { id: "6", name: "Mosaïque TC035", price: "78.000", image: img("1472549188.jpg"), rating: 4.2, category: "Revêtements & Chauffages", subcategory: "Mosaïques", description: "Mosaïque TC035 pour revêtement mural. Style contemporain." },
  { id: "7", name: "Mosaïque SC220", price: "92.000", image: img("1472549913.jpg"), rating: 4.4, badge: "Promo", oldPrice: "115.000", category: "Revêtements & Chauffages", subcategory: "Mosaïques", description: "Mosaïque SC220 pour mur intérieur. Effet lumineux et moderne." },
  { id: "8", name: "Mosaïque JSM-JS042", price: "88.000", image: img("1472548582.jpg"), rating: 4.1, category: "Revêtements & Chauffages", subcategory: "Mosaïques", description: "Mosaïque JSM-JS042. Revêtement pour mur, large palette de motifs." },

  // Salle de bains & Sanitaires
  { id: "9", name: "Vidage et siphon Bonde", price: "65.000", image: img("1723545067.png"), rating: 4.5, badge: "Promo", category: "Salle de Bains & Sanitaires", subcategory: "Vidages & Siphons", description: "Vidage et siphon Bonde de qualité professionnelle pour évier et lavabo." },
  { id: "10", name: "Caniveau Venisio Slim 700mm", price: "420.000", image: img("1629458060.jpg"), rating: 4.8, category: "Salle de Bains & Sanitaires", subcategory: "Caniveaux de douche", description: "Caniveau de douche Venisio Slim 700mm 30721031. Design ultra-fin, finition inox brossé." },

  // Accessoires Meuble / Mobilier
  { id: "11", name: "Aventos HF mécanique Blum", price: "560.000", image: img("1442845319.jpg"), rating: 4.7, category: "Accessoires Meuble", subcategory: "Portes relevables", description: "Système relevant mécanique Aventos HF pour façade en bois et cadre alu large Blum." },
  { id: "12", name: "Aventos HF Servo-drive Blum", price: "1 890.000", image: img("1442846174.jpg"), rating: 4.9, badge: "Nouveau", category: "Accessoires Meuble", subcategory: "Portes relevables", description: "Système relevant électrique Aventos HF Servo-drive Blum pour façade en bois et cadre alu large." },
  { id: "13", name: "AVENTOS CACHE 20L8020 BL", price: "145.000", image: img("1648025930.png"), rating: 4.4, category: "Accessoires Meuble", subcategory: "Portes relevables", description: "AVENTOS HF cache large droite + gauche, finition blanche." },

  // Machines & Accessoires machine / Assemblage
  { id: "14", name: "Tourillon bois 8x30 mm", price: "12.000", image: img("1419431192.jpg"), rating: 4.2, category: "Machines & Accessoires Machine", subcategory: "Systèmes d'assemblage", description: "Tourillon bois 8x30 mm. Idéal pour les assemblages cachés en ébénisterie." },
  { id: "15", name: "Ferrure assemblage 313.15+20", price: "28.000", image: img("1419432195.jpg"), rating: 4.3, category: "Machines & Accessoires Machine", subcategory: "Systèmes d'assemblage", description: "Ferrure d'assemblage 313.15+20. Diamètre : 15 mm. Excellente tenue mécanique." },
  { id: "16", name: "Cheville laiton BU12", price: "8.500", image: img("1439293383.jpg"), rating: 4.1, category: "Machines & Accessoires Machine", subcategory: "Quincaillerie", description: "Cheville en laiton BU12. Diamètre : 8 mm. Pour fixations exigeantes." },
  { id: "17", name: "Goujon massif 5137905", price: "15.000", image: img("1438602035.jpg"), rating: 4.0, category: "Machines & Accessoires Machine", subcategory: "Systèmes d'assemblage", description: "Goujon massif 5137905. Dimensions : 7x42 mm. Pour assemblages résistants." },
];

export interface SubCategory {
  name: string;
}

export interface Category {
  name: string;
  subcategories: SubCategory[];
}

export const categoriesData: Category[] = [
  {
    name: "Électroménagers Encastrables",
    subcategories: [
      { name: "Hottes" },
      { name: "Fours" },
      { name: "Micro-ondes" },
      { name: "Machines à café" },
      { name: "Plaques de cuisson" },
      { name: "Lave-vaisselle" },
    ],
  },
  {
    name: "Salle de Bains & Sanitaires",
    subcategories: [
      { name: "Mitigeurs lavabo" },
      { name: "Robinetterie douche" },
      { name: "Vidages & Siphons" },
      { name: "Caniveaux de douche" },
      { name: "Accessoires salle de bains" },
      { name: "WC & Sanitaires" },
    ],
  },
  {
    name: "Revêtements & Chauffages",
    subcategories: [
      { name: "Mosaïques" },
      { name: "Faïences murales" },
      { name: "Cheminées éthanol" },
      { name: "Radiateurs design" },
      { name: "Sèche-serviettes" },
    ],
  },
  {
    name: "Accessoires Meuble",
    subcategories: [
      { name: "Portes relevables" },
      { name: "Coulisses de tiroir" },
      { name: "Charnières" },
      { name: "Poignées" },
      { name: "Éclairage LED meuble" },
    ],
  },
  {
    name: "Machines & Accessoires Machine",
    subcategories: [
      { name: "Systèmes d'assemblage" },
      { name: "Quincaillerie" },
      { name: "Aides au montage" },
      { name: "Outillage électroportatif" },
      { name: "Catalogue électronique" },
    ],
  },
];

export const categories = categoriesData.map((c) => c.name);
