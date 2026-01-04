
import React, { useRef, useState } from 'react';
import { type Currency, formatCurrency } from './currency';
import type { Product } from './types';

const HeartIcon: React.FC<{isFilled: boolean}> = ({ isFilled }) => (
    <svg className="h-5 w-5" fill={isFilled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

export const ProductCard: React.FC<{
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ product, currency, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showAddedFeedback, setShowAddedFeedback] = useState(false);

    const isDiscounted = product.regularPrice && product.regularPrice > product.price;

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        onQuickAddToCart(product, btnRef.current, null);
        
        // Mostrar feedback visual
        setShowAddedFeedback(true);
        setTimeout(() => setShowAddedFeedback(false), 2000);
    };

    return (
        <div 
            className="bg-white rounded-2xl flex flex-col group border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden"
            onClick={() => onProductSelect(product)}
        >
            {isDiscounted && (
                <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase">
                    -{Math.round(((product.regularPrice! - product.price) / product.regularPrice!) * 100)}%
                </div>
            )}

            <div className="relative cursor-pointer overflow-hidden bg-white aspect-[4/5] p-4">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted); }} 
                        className={`p-2 rounded-full shadow-lg ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-white text-gray-400'}`}
                    >
                        <HeartIcon isFilled={isWishlisted} />
                    </button>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">{product.brand}</span>
                    <h3 className="text-sm font-black text-black leading-snug mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">{product.name}</h3>
                </div>
                
                <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        {isDiscounted && <span className="text-[10px] text-gray-400 line-through mb-0.5">{formatCurrency(product.regularPrice!, currency)}</span>}
                        <span className="text-lg font-black text-gray-900 leading-none">{formatCurrency(product.price, currency)}</span>
                    </div>
                    
                    <div className="relative">
                        {showAddedFeedback && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-black py-1.5 px-3 rounded-full shadow-xl animate-bounce-in whitespace-nowrap z-20">
                                ¡AÑADIDO!
                            </div>
                        )}
                        <button
                            ref={btnRef}
                            onClick={handleQuickAdd}
                            className="bg-pink-200 text-black px-4 py-2.5 rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all font-black text-[10px] uppercase tracking-widest"
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes bounceIn {
                    0% { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }
                    50% { opacity: 1; transform: translate(-50%, -5px) scale(1.1); }
                    100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
                }
                .animate-bounce-in {
                    animation: bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
            `}</style>
        </div>
    );
};
