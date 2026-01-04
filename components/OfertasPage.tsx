
import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const OfertasPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    
    const milkHoney = allProducts.filter(p => p.brand === 'Milk & Honey');
    const magnolia = allProducts.filter(p => p.brand === 'Magnolia');
    const makeup = allProducts.filter(p => (p.brand === 'THE ONE' || p.brand === 'OnColour'));
    const duologi = allProducts.filter(p => p.brand === 'Duologi');

    const SectionHeader = ({ icon, title, subtitle }: { icon: string, title: string, subtitle: string }) => (
        <div className="mb-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <span className="text-3xl">{icon}</span>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">{title}</h2>
            </div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] ml-12 hidden md:block">{subtitle}</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="text-center py-20 mb-16 bg-pink-50/40 rounded-[4rem] border border-pink-100">
                <span className="text-pink-500 font-black text-[10px] uppercase tracking-[0.6em] mb-4 block">Tesoro del Catálogo</span>
                <h1 className="text-5xl md:text-7xl font-black text-black mb-6 uppercase tracking-tighter">Ofertas Especiales</h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                    Descubre la magia de Magnolia, la nutrición de Milk & Honey y la tecnología Duologi con descuentos exclusivos de temporada.
                </p>
            </div>

            {/* Magnolia & Milk Section */}
            <div className="mb-24">
                <SectionHeader icon="🌸" title="Cuidado Corporal & Baño" subtitle="Magnolia y Milk & Honey con hasta 40% Dto." />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...magnolia, ...milkHoney].map(product => (
                        <ProductCard key={product.id} product={product} currency={currency} onAddToCart={onAddToCart} onQuickAddToCart={onQuickAddToCart} onProductSelect={onProductSelect} onQuickView={onQuickView} />
                    ))}
                </div>
            </div>

            {/* Duologi Section */}
            <div className="mb-24">
                <SectionHeader icon="💇‍♀️" title="Especial Cabello Duologi" subtitle="Tratamiento capilar avanzado de alta gama" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {duologi.map(product => (
                        <ProductCard key={product.id} product={product} currency={currency} onAddToCart={onAddToCart} onQuickAddToCart={onQuickAddToCart} onProductSelect={onProductSelect} onQuickView={onQuickView} />
                    ))}
                </div>
            </div>

            {/* Maquillaje Section */}
            <div className="mb-24">
                <SectionHeader icon="💄" title="Color Expert" subtitle="Lo mejor de THE ONE y OnColour" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {makeup.map(product => (
                        <ProductCard key={product.id} product={product} currency={currency} onAddToCart={onAddToCart} onQuickAddToCart={onQuickAddToCart} onProductSelect={onProductSelect} onQuickView={onQuickView} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default OfertasPage;
