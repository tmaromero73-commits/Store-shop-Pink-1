
import React, { useEffect, useRef, useState } from 'react';
import type { Product } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface QuickViewModalProps {
    product: Product;
    currency: Currency;
    onClose: () => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, currency, onClose, onAddToCart, onProductSelect }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const addToCartBtnRef = useRef<HTMLButtonElement>(null);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative animate-fade-in" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black z-10"><CloseIcon /></button>
                
                <div className="md:w-1/2 bg-gray-50 p-12 flex items-center justify-center">
                    <img src={product.imageUrl} alt={product.name} className="max-h-[400px] object-contain" />
                </div>
                
                <div className="md:w-1/2 p-10 md:p-16 flex flex-col">
                    <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-2">{product.brand}</span>
                    <h2 className="text-3xl font-black text-black leading-tight mb-6">{product.name}</h2>
                    
                    <div className="mb-8">
                        <span className="text-3xl font-black text-black">{formatCurrency(product.price, currency)}</span>
                        {product.regularPrice && (
                            <span className="ml-4 text-gray-400 line-through text-lg">{formatCurrency(product.regularPrice, currency)}</span>
                        )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-10 overflow-y-auto max-h-40">{product.description}</p>

                    <div className="mt-auto flex flex-col gap-4">
                        <button
                            ref={addToCartBtnRef}
                            onClick={() => onAddToCart(product, addToCartBtnRef.current, null)}
                            className="w-full bg-[#FBCFE8] text-black font-black py-5 rounded-2xl hover:brightness-105 transition-all uppercase text-[11px] tracking-widest shadow-xl shadow-[#FBCFE8]/20"
                        >
                            Añadir a la Cesta
                        </button>
                        <button 
                            onClick={() => onProductSelect(product)}
                            className="w-full bg-black text-white font-black py-5 rounded-2xl hover:bg-gray-900 transition-all uppercase text-[11px] tracking-widest"
                        >
                            Más Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
