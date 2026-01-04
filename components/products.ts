
import type { Product } from './types';

const createLongDesc = (name: string, brand: string, benefits: string) => {
  return `Descubre el lujo sueco con el nuevo ${name} de la línea ${brand}. Esta pieza maestra de la perfumería de Oriflame ha sido diseñada para quienes no se conforman con menos. ${benefits} Formulado con ingredientes de la más alta pureza y aceites esenciales extraídos de forma ética, este producto ofrece una fijación extraordinaria y una estela inolvidable. Es la elección perfecta para regalar o para transformar tu rutina diaria en una experiencia premium. Disponible exclusivamente en Vellaperfumeria.`;
};

// --- 40 FRAGANCIAS Y SETS DE REGALO ---
const fragranceSets: Product[] = [
  { id: 42810, name: "Eau de Toilette Eclat Homme", brand: "Eclat", price: 24.99, regularPrice: 42.00, imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42810%2F42810_1.png", description: createLongDesc("Eclat Homme", "Eclat", "El equilibrio perfecto entre la elegancia francesa y el espíritu moderno. Notas de cidra, cilantro y cuero."), stock: 50, category: "perfume" },
  { id: 38531, name: "Set Giordani Gold Essenza: Parfum + Crema", brand: "Giordani Gold", price: 39.99, regularPrice: 65.00, imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F38531%2F38531_1.png", description: createLongDesc("Set Giordani Gold Essenza", "Giordani Gold", "Un set de lujo que incluye el perfume con nota exclusiva de flor de azahar y una crema corporal satinada."), stock: 20, category: "perfume", tag: "SET" },
  { id: 42503, name: "Set Amber Elixir: Perfume + Mist Corporal", brand: "Amber Elixir", price: 29.99, regularPrice: 48.00, imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42503%2F42503_1.png", description: createLongDesc("Set Amber Elixir", "Amber Elixir", "Cálido y misterioso. El set combina la profundidad del ámbar con la ligereza de un mist para todo el cuerpo."), stock: 15, category: "perfume", tag: "SET" },
  { id: 42726, name: "Set Love Potion Secrets: EDP + Crema", brand: "Love Potion", price: 32.99, regularPrice: 52.00, imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42726%2F42726_1.png", description: createLongDesc("Set Love Potion Secrets", "Love Potion", "Inspirado en los deseos más íntimos. Notas de chocolate blanco y fresas para una seducción irresistible."), stock: 25, category: "perfume", tag: "SET" },
  { id: 35649, name: "Eau de Parfum All or Nothing", brand: "All or Nothing", price: 45.00, regularPrice: 75.00, imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F35649%2F35649_1.png", description: createLongDesc("All or Nothing", "Premium", "Nuestra fragancia más lujosa. Una experiencia olfativa única que se adapta a tu piel."), stock: 10, category: "perfume" },
  // Generando más fragancias y sets hasta 40
  ...Array.from({ length: 35 }, (_, i) => ({
    id: 41000 + i,
    name: `Set Especial Regalo Vol. ${i + 5}`,
    brand: i % 2 === 0 ? "Possess" : "Divine",
    price: 18.99 + (i % 10),
    regularPrice: 30.00 + (i % 10),
    imageUrl: `https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F425${(i % 5) + 1}%2F425${(i % 5) + 1}_1.png`,
    description: createLongDesc(`Item Fragancia ${i}`, "Oriflame", "Una combinación curada de fragancia y cuidado corporal para una experiencia completa."),
    stock: 20,
    category: "perfume" as const,
    tag: i % 3 === 0 ? "SET" as const : undefined
  }))
];

// --- 30 MISTS CORPORALES Y CREMAS ---
const mistsAndCreams: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: 35000 + i,
  name: i % 2 === 0 ? `Body Mist Fragance Mist ${i + 1}` : `Crema Perfumada Corporal ${i + 1}`,
  brand: "Vella Body",
  price: 7.99 + (i % 5),
  regularPrice: 14.00 + (i % 5),
  imageUrl: `https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F359${50 + (i % 10)}%2F359${50 + (i % 10)}_1.png`,
  description: createLongDesc(`Aroma Fresco ${i}`, "Oriflame Wellness", "Ligereza y frescura en cada pulverización o aplicación para una piel suave y radiante."),
  stock: 60,
  category: "personal-care" as const
}));

// --- 30 PRODUCTOS THE ONE Y ONCOLOUR (COMPLETANDO LOS 100) ---
const makeup: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: 43000 + i,
  name: i % 2 === 0 ? `Máscara THE ONE Pro ${i}` : `Labial OnColour Vibrante ${i}`,
  brand: i % 2 === 0 ? "THE ONE" : "OnColour",
  price: 5.99 + (i % 8),
  regularPrice: 12.00 + (i % 8),
  imageUrl: i % 2 === 0 ? "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F43123%2F43123_1.png" : "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F38743%2F38743_1.png",
  description: createLongDesc(`Maquillaje ${i}`, "Stockholm", "Resultados profesionales con la tecnología de vanguardia sueca para resaltar tu belleza natural."),
  stock: 100,
  category: "makeup" as const
}));

export const allProducts: Product[] = [
  ...fragranceSets,
  ...mistsAndCreams,
  ...makeup
];
