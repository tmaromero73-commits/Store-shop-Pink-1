
import React, { useRef, useState } from 'react';
import { type Currency, formatCurrency } from './currency';
import type { Product } from './types';

export const ProductCard: React.FC<{
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ product, currency, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [showAddedFeedback, setShowAddedFeedback] = useState(false);

    const isDiscounted = product.regularPrice && product.regularPrice > product.price;

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        onQuickAddToCart(product, btnRef.current, null);
        setShowAddedFeedback(true);
        setTimeout(() => setShowAddedFeedback(false), 2000);
    };

    return (
        <div 
            className="bg-white rounded-[2rem] flex flex-col group border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden cursor-pointer"
            onClick={() => onProductSelect(product)}
        >
            {isDiscounted && (
                <div className="absolute top-4 left-4 z-10 bg-black text-[#FBCFE8] text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    OFERTA
                </div>
            )}

            <div className="relative overflow-hidden bg-white aspect-square p-8">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
            </div>

            <div className="p-8 flex flex-col flex-grow justify-between">
                <div className="space-y-3">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] block">{product.brand}</span>
                    <h3 className="text-sm font-black text-black leading-snug line-clamp-2 uppercase tracking-tight">{product.name}</h3>
                </div>
                
                <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-gray-50">
                    <div className="flex flex-col">
                        {isDiscounted && <span className="text-[10px] text-gray-400 line-through font-bold">{formatCurrency(product.regularPrice!, currency)}</span>}
                        <span className="text-xl font-black text-black">{formatCurrency(product.price, currency)}</span>
                    </div>
                    
                    <button
                        ref={btnRef}
                        onClick={handleQuickAdd}
                        className="bg-[#FBCFE8] text-black px-8 py-3.5 rounded-2xl shadow-sm hover:brightness-105 active:scale-95 transition-all font-black text-[10px] uppercase tracking-widest whitespace-nowrap"
                    >
                        {showAddedFeedback ? 'AÑADIDO' : 'COMPRAR'}
                    </button>
                </div>
            </div>
        </div>
    );
};
