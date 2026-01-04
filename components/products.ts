
import type { Product } from './types';

export const allProducts: Product[] = [
    // --- LÍNEA DUOLOGI (CABELLO GRIS/TRATAMIENTO) ---
    {
        id: 44955,
        name: "Champú Reparación Intensa Duologi",
        brand: "Duologi",
        price: 9.99,
        regularPrice: 15.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44955%2F44955_1.png",
        description: "Champú de tratamiento avanzado para cabello seco o dañado. Limpia profundamente mientras fortalece la fibra capilar con proteínas vegetales.",
        stock: 45,
        category: "hair",
        tag: "NOVEDAD",
        rating: 4.9,
        reviewCount: 128
    },
    {
        id: 44962,
        name: "Acondicionador Rico Duologi",
        brand: "Duologi",
        price: 9.99,
        regularPrice: 15.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44962%2F44962_1.png",
        description: "Acondicionador cremoso para nutrición extrema. Suaviza instantáneamente y previene las puntas abiertas.",
        stock: 38,
        category: "hair",
        rating: 5,
        reviewCount: 92
    },
    {
        id: 44964,
        name: "Sérum Sellador de Puntas Duologi",
        brand: "Duologi",
        price: 12.99,
        regularPrice: 18.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44964%2F44964_1.png",
        description: "Sérum invisible que repara y sella las puntas. Protege contra el calor de planchas y secadores.",
        stock: 25,
        category: "hair",
        tag: "OFERTA",
        rating: 4.8,
        reviewCount: 56
    },
    {
        id: 44967,
        name: "Tónico Revitalizante Capilar Duologi",
        brand: "Duologi",
        price: 14.99,
        regularPrice: 22.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44967%2F44967_1.png",
        description: "Tratamiento para el cuero cabelludo que estimula el crecimiento y reduce la caída del cabello.",
        stock: 15,
        category: "hair",
        rating: 4.7,
        reviewCount: 63
    },

    // --- MAGNOLIA (EDICIÓN LIMITADA) ---
    {
        id: 42686,
        name: "Jabón en Barra Luminous Magnolia",
        brand: "Magnolia",
        price: 2.49,
        regularPrice: 5.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42686%2F42686_1.png",
        description: "Jabón perfumado con delicado extracto de magnolia. Limpia y suaviza la piel con una fragancia primaveral única.",
        stock: 100,
        category: "personal-care",
        tag: "OFERTA",
        rating: 4.9,
        reviewCount: 310
    },

    // --- MILK & HONEY GOLD ---
    {
        id: 31602,
        name: "Crema de Manos y Cuerpo Milk & Honey Gold",
        brand: "Milk & Honey",
        price: 7.99,
        regularPrice: 14.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F31602%2F31602_1.png",
        description: "Fórmula icónica con extractos orgánicos de leche y miel. Nutrición intensa 24 horas para pieles secas.",
        stock: 80,
        category: "personal-care",
        rating: 5,
        reviewCount: 940
    },
    {
        id: 31604,
        name: "Jabón Líquido Nutritivo Milk & Honey",
        brand: "Milk & Honey",
        price: 6.99,
        regularPrice: 11.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F31604%2F31604_1.png",
        description: "Limpiadora cremosa que deja las manos suaves e hidratadas con un aroma reconfortante.",
        stock: 60,
        category: "personal-care",
        rating: 4.8,
        reviewCount: 150
    },

    // --- MAQUILLAJE THE ONE ---
    {
        id: 40657,
        name: "Base de Maquillaje Everlasting Sync THE ONE",
        brand: "THE ONE",
        price: 11.99,
        regularPrice: 21.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F40657%2F40657_1.png",
        description: "Tecnología inteligente que adapta tu maquillaje a la humedad ambiental. Larga duración y acabado natural.",
        stock: 50,
        category: "makeup",
        tag: "OFERTA",
        rating: 4.8,
        reviewCount: 512
    },
    {
        id: 42123,
        name: "Máscara de Pestañas 5 en 1 Wonder Lash THE ONE",
        brand: "THE ONE",
        price: 8.99,
        regularPrice: 16.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42123%2F42123_1.png",
        description: "Volumen, longitud, curvatura, cuidado y definición en una sola pasada. El bestseller de Oriflame.",
        stock: 120,
        category: "makeup",
        tag: "OFERTA",
        rating: 5,
        reviewCount: 2300
    },

    // --- MAQUILLAJE ONCOLOUR ---
    {
        id: 38733,
        name: "Barra de Labios Creamy OnColour",
        brand: "OnColour",
        price: 3.99,
        regularPrice: 8.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F38733%2F38733_1.png",
        description: "Color vibrante con una textura cremosa y pigmentos puros. El maquillaje esencial al mejor precio.",
        stock: 200,
        category: "makeup",
        tag: "OFERTA",
        rating: 4.5,
        reviewCount: 425
    }
];
