
import React, { useState, useRef } from 'react';
import { allProducts } from './products';
import type { Product } from './types';
import type { Currency } from './currency';

const INTERACTIVE_CATALOG_URL = 'https://es-catalogue.oriflame.com/oriflame/es/2026001-brp?HideStandardUI=true&Page=1';
const FALLBACK_CATALOG_URL = 'https://es.oriflame.com/products/digital-catalogue-current';

interface CatalogPageProps {
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    currency: Currency;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart, onQuickAddToCart, onProductSelect, onQuickView, currency }) => {
    const [quickAddCode, setQuickAddCode] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isCatalogLoaded, setIsCatalogLoaded] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleQuickAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!quickAddCode.trim()) return;
        const code = parseInt(quickAddCode.trim());
        const product = allProducts.find(p => p.id === code);
        if (product) {
            onAddToCart(product, buttonRef.current, null);
            setStatusMessage(`¡${product.name} añadido!`);
            setQuickAddCode('');
            setTimeout(() => setStatusMessage(''), 3000);
        } else {
            setStatusMessage('Código no encontrado.');
            setTimeout(() => setStatusMessage(''), 3000);
        }
    };

    return (
        <div className="w-full px-2 py-4 md:px-4 md:py-8 bg-gray-50 min-h-screen">
            <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-6 md:gap-10">
                
                {/* Catalog Viewer - MAX SIZE ON MOBILE */}
                <div className="flex-grow w-full order-1">
                    <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
                        <div>
                            <h1 className="text-2xl md:text-4xl font-serif font-bold text-gray-900">Catálogo Digital 2026</h1>
                            <p className="text-gray-500 text-sm">Novedades y promociones exclusivas Oriflame.</p>
                        </div>
                        <a 
                            href={FALLBACK_CATALOG_URL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors flex items-center gap-1 uppercase tracking-widest"
                        >
                            Ver en pantalla completa
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    </div>
                    
                    {/* The Frame: rounded contour, 90vh on mobile */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 h-[85vh] md:h-auto md:aspect-[16/9] relative group">
                        {!isCatalogLoaded ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-white to-gray-50">
                                <div className="w-32 h-44 bg-white rounded-xl shadow-xl mb-6 border-4 border-pink-50 overflow-hidden transform -rotate-2">
                                    <img src="https://cdn.ipaper.io/iPaper/Papers/0ae94f9f-dbf1-41ce-8890-85ef3c56310d/Pages/1/Zoom.jpg" className="w-full h-full object-cover" alt="Portada" />
                                </div>
                                <h3 className="text-xl font-bold mb-6 text-gray-800 uppercase tracking-widest">Visualizador Oficial</h3>
                                <button 
                                    onClick={() => setIsCatalogLoaded(true)}
                                    className="bg-brand-primary text-white font-black py-4 px-12 rounded-full hover:bg-pink-600 transition-all shadow-xl tracking-widest text-xs"
                                >
                                    ABRIR AHORA
                                </button>
                            </div>
                        ) : (
                            <iframe
                                src={INTERACTIVE_CATALOG_URL}
                                title="Catálogo Oriflame Interactivo"
                                className="w-full h-full border-none"
                                allowFullScreen
                            />
                        )}
                    </div>
                </div>

                {/* Quick Add - Sidebar */}
                <div className="w-full lg:w-80 flex-shrink-0 order-2">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 lg:sticky lg:top-24">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-2xl">⚡</span>
                            <h2 className="text-xl font-bold text-gray-900">Pedido Directo</h2>
                        </div>
                        
                        <p className="text-xs text-gray-400 leading-relaxed mb-6">
                            Introduce los códigos del catálogo para añadirlos rápidamente a tu pedido de <b>Vellaperfumeria</b>.
                        </p>

                        <form onSubmit={handleQuickAdd} className="space-y-4">
                            <input
                                type="text"
                                maxLength={6}
                                placeholder="Ejem: 47697"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-xl font-black focus:ring-2 focus:ring-pink-200 outline-none text-center transition-all shadow-inner"
                                value={quickAddCode}
                                onChange={(e) => setQuickAddCode(e.target.value.replace(/\D/g, ''))}
                            />
                            <button
                                ref={buttonRef}
                                type="submit"
                                disabled={quickAddCode.length < 3}
                                className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-lg disabled:opacity-30 disabled:grayscale uppercase text-xs tracking-[0.2em]"
                            >
                                Añadir a Cesta
                            </button>
                        </form>

                        {statusMessage && (
                            <p className={`mt-4 text-center text-[10px] font-black uppercase tracking-widest ${statusMessage.includes('añadido') ? 'text-green-600' : 'text-pink-600'}`}>
                                {statusMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
