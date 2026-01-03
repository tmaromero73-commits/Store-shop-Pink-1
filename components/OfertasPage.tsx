
import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';
import SpecialOffersCarousel from './SpecialOffersCarousel';

// Acondicionadores Duologi (La Oferta)
const conditionerIds = [44960, 44961];
const conditionerProducts = allProducts.filter(p => conditionerIds.includes(p.id));

// Resto de productos Duologi
const otherDuologiProducts = allProducts.filter(p => p.brand === 'DUOLOGI' && !conditionerIds.includes(p.id));

// Productos Selección (Trigger Products)
const triggerProductIds = [
    47440, 46987, 47009, // Love Nature Simple Joys
    46642, 46731, 45799, 45800, 47450, // Essense & Co
    46801, // Divine Dark Velvet
    46968, 46969, 46970, 46971, // Milk & Honey
    36151, // Tender Care
    47878, // Esponja
    47677, // Cepillo
    47202, // Crema Manos Pasión
];
const triggerProducts = allProducts.filter(p => triggerProductIds.includes(p.id));

// Otros productos de regalo (Backup)
const giftProductIds = [153756, 153757, 48649, 47536, 47538, 20374, 104, 38497, 46901, 22442, 1440];
const giftProducts = allProducts.filter(p => giftProductIds.includes(p.id));


const OfertasPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            
            {/* Header Section */}
            <div className="text-center mb-12 pt-6">
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-black tracking-tight mb-3">Ofertas Especiales</h1>
                <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                    Descubre promociones exclusivas diseñadas para realzar tu belleza esta temporada.
                </p>
            </div>
            
            {/* Carousel Component */}
            <SpecialOffersCarousel onProductSelect={onProductSelect} />

            {/* Main Offer Section: Glassmorphism Container */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-16 shadow-xl border border-white/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300"></div>
                
                {/* Step 1: The Reward */}
                <div className="mb-16 relative z-10">
                     <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
                        <span className="bg-gradient-to-br from-brand-primary to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg shrink-0">1</span>
                        <div>
                            <h3 className="text-3xl font-serif text-black mb-1">Elige tu Acondicionador</h3>
                            <p className="text-brand-primary font-bold text-xl">SOLO 6,99€ <span className="text-gray-400 text-base font-normal line-through ml-2">15,00€</span></p>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {conditionerProducts.map(product => (
                            <div key={product.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="relative h-full">
                                     <div className="absolute -top-3 -right-3 z-20 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white">
                                        OFERTA
                                    </div>
                                    <ProductCard
                                        product={product}
                                        currency={currency}
                                        onAddToCart={onAddToCart}
                                        onQuickAddToCart={onQuickAddToCart}
                                        onProductSelect={onProductSelect}
                                        onQuickView={onQuickView}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 2: The Trigger */}
                <div id="seleccion-oferta" className="relative z-10">
                     <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
                        <span className="bg-gradient-to-br from-gray-800 to-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg shrink-0">2</span>
                        <div>
                            <h3 className="text-3xl font-serif text-black mb-1">Activa la oferta</h3>
                            <p className="text-gray-600 text-lg">Añade al menos un producto de esta selección a tu cesta.</p>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {triggerProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Other Offers Section */}
             {otherDuologiProducts.length > 0 && (
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                        <h3 className="text-2xl font-serif font-bold text-black">Más de la Colección Duologi</h3>
                        <span className="text-brand-primary font-medium text-sm hidden md:block">Cuidado capilar avanzado</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {otherDuologiProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </div>
            )}

             {giftProducts.length > 0 && (
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                        <h3 className="text-2xl font-serif font-bold text-black">Ideas para Regalar</h3>
                        <span className="text-brand-primary font-medium text-sm hidden md:block">Detalles perfectos</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {giftProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfertasPage;
