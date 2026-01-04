
// Variant types, used in Product
export interface VariantOption {
    value: string;
    colorCode?: string;
    imageUrl?: string;
    variationId?: number;
}

export interface ProductVariants {
    [key: string]: VariantOption[];
}

// Product type
export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    regularPrice?: number;
    imageUrl: string;
    description: string;
    howToUse?: string;
    stock: number;
    category: 'perfume' | 'hair' | 'makeup' | 'skincare' | 'personal-care' | 'men' | 'wellness' | 'accessories';
    subCategory?: 'Giordani Gold' | 'THE ONE' | 'OnColour';
    tag?: 'NOVEDAD' | 'SET' | 'OFERTA' | 'BESTSELLER';
    beautyPoints?: number;
    isShippingSaver?: boolean;
    rating?: number;
    reviewCount?: number;
    variants?: ProductVariants;
}

// Cart item type
export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    selectedVariant: Record<string, string> | null;
}

// App view type
export type View = 'home' | 'products' | 'productDetail' | 'ofertas' | 'ia' | 'catalog' | 'blog' | 'blogPost' | 'checkout';
