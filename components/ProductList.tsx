
import React, { useState } from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import type { Currency } from './currency';
import Breadcrumbs from './Breadcrumbs';
import { ProductCard } from './ProductCard';

const ProductList: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currency: Currency;
    onQuickView: (product: Product) => void;
}> = ({ onNavigate, onProductSelect, onAddToCart, onQuickAddToCart, currency, onQuickView }) => {
    
    const eclatHomme = allProducts.find(p => p.id === 42502);

    return (
        <div className="bg-white pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* BANNER LUJO: AZUL Y DORADO */}
                <div className="relative w-full rounded-[3rem] overflow-hidden mb-16 shadow-2xl bg-blue-950 min-h-[450px] flex items-center border border-blue-900">
                    <div className="absolute inset-0 bg-dots-gold animate-shimmer opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/50 to-transparent"></div>
                    
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 p-12 w-full">
                        <div className="flex flex-col justify-center text-center md:text-left">
                            <span className="text-amber-400 font-black text-[10px] uppercase tracking-[0.5em] mb-4">EDICIÓN COLECCIONISTA</span>
                            <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-6 leading-tight">Eclat Homme</h2>
                            <p className="text-blue-100 text-lg mb-8 max-w-md font-light leading-relaxed">
                                El aroma del éxito. Una sofisticada fragancia parisina que define la elegancia del hombre moderno.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <button 
                                    onClick={() => eclatHomme && onProductSelect(eclatHomme)}
                                    className="bg-pink-200 text-black font-black py-4 px-10 rounded-2xl hover:brightness-105 transition-all text-xs uppercase tracking-widest shadow-xl"
                                >
                                    DESCUBRIR FRAGANCIA
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            {eclatHomme && (
                                <img 
                                    src={eclatHomme.imageUrl} 
                                    alt="Eclat Homme" 
                                    className="h-72 md:h-96 object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)] animate-float"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4 pb-12">
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8 border-b-2 border-pink-100 pb-4 inline-block">Nuestra Selección</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {allProducts.map(product => (
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
            
            <style>{`
                .bg-dots-gold {
                    background-image: radial-gradient(#d4af37 1.5px, transparent 1.5px);
                    background-size: 30px 30px;
                }
                @keyframes shimmer { 0% { opacity: 0.3; } 50% { opacity: 0.6; } 100% { opacity: 0.3; } }
                .animate-shimmer { animation: shimmer 4s infinite ease-in-out; }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                .animate-float { animation: float 6s infinite ease-in-out; }
            `}</style>
        </div>
    );
};

export default ProductList;
