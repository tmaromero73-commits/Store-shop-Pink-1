
import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import type { Currency } from './currency';
import { ProductCard } from './ProductCard';

const ProductList: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currency: Currency;
    onQuickView: (product: Product) => void;
}> = ({ onNavigate, onProductSelect, onAddToCart, onQuickAddToCart, currency, onQuickView }) => {
    
    // Colonia Eclat Homme para el Banner Luxury (ID: 42810)
    const eclatHomme = allProducts.find(p => p.id === 42810) || allProducts[0];

    return (
        <div className="bg-white pb-32">
            <div className="container mx-auto px-4 md:px-12">
                
                {/* SECCIÓN LUXURY - AZUL CON PINTITAS DORADAS */}
                <div className="relative w-full rounded-[4rem] overflow-hidden mb-24 shadow-2xl bg-[#0c1a2c] min-h-[600px] flex items-center group border border-white/10">
                    {/* Efecto Pintitas Doradas */}
                    <div 
                        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" 
                        style={{ 
                            backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', 
                            backgroundSize: '20px 20px' 
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2c] via-transparent to-transparent z-10"></div>

                    <div className="relative z-20 grid md:grid-cols-2 gap-12 p-12 md:p-24 w-full items-center">
                        <div className="text-center md:text-left space-y-8">
                            <div>
                                <span className="text-[#d4af37] font-black text-[12px] uppercase tracking-[0.8em] mb-4 block animate-pulse">
                                    Vella Luxury Edition
                                </span>
                                <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-none tracking-tighter">
                                    Eclat <span className="font-sans font-black text-[#FBCFE8] non-italic">Homme</span>
                                </h2>
                            </div>
                            <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed max-w-md opacity-80">
                                La sofisticación parisina definitiva. Una fragancia atemporal diseñada para el hombre que define su propio destino.
                            </p>
                            <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                                <button 
                                    onClick={() => onProductSelect(eclatHomme)}
                                    className="bg-[#FBCFE8] text-black font-black py-4 px-12 rounded-full hover:scale-105 transition-all text-[10px] uppercase tracking-[0.4em] shadow-xl"
                                >
                                    Ver Detalles
                                </button>
                                <button 
                                    onClick={() => onQuickAddToCart(eclatHomme, null, null)}
                                    className="bg-white text-black font-black py-4 px-12 rounded-full hover:bg-gray-100 transition-all text-[10px] uppercase tracking-[0.4em]"
                                >
                                    Comprar Ahora
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <img 
                                src={eclatHomme.imageUrl} 
                                alt="Eclat Homme" 
                                className="h-[350px] md:h-[500px] object-contain drop-shadow-[0_35px_60px_rgba(212,175,55,0.3)] animate-float-luxury relative z-10"
                            />
                        </div>
                    </div>
                </div>

                {/* GRID DE PRODUCTOS (LOS OTROS 99) */}
                <div className="pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                        <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">Novedades del Catálogo</h2>
                        <button onClick={() => onNavigate('products', 'all')} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-pink-600 transition-all border-b border-gray-200 pb-2">Ver los 100 productos</button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
                        {allProducts.slice(1, 17).map(product => (
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
                @keyframes floatLuxury { 
                    0%, 100% { transform: translateY(0); } 
                    50% { transform: translateY(-20px); } 
                }
                .animate-float-luxury { animation: floatLuxury 6s infinite ease-in-out; }
            `}</style>
        </div>
    );
};

export default ProductList;
