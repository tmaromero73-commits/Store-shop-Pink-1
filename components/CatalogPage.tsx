
import React, { useState, useRef, useEffect } from 'react';
import { allProducts } from './products';
import type { Product } from './types';
import type { Currency } from './currency';

// URL Oficial del Catálogo Oriflame 2026
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
            setStatusMessage(`¡${product.name} añadido al carrito!`);
            setQuickAddCode('');
            setTimeout(() => setStatusMessage(''), 4000);
        } else {
            setStatusMessage('Código no disponible en la base de datos online.');
            setTimeout(() => setStatusMessage(''), 4000);
        }
    };

    return (
        <div className="w-full bg-[#050505] min-h-screen">
            {/* Header del Catálogo */}
            <div className="w-full bg-black py-12 px-6 border-b border-white/5">
                <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <span className="text-pink-500 font-black text-[10px] uppercase tracking-[0.6em] mb-3 block">Experiencia Digital Oriflame</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Catálogo Oficial 2026</h1>
                        <p className="text-gray-400 mt-2 font-medium">Hojea las páginas y anota los códigos para tu pedido rápido.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <div className="flex gap-4">
                             <a 
                                href={FALLBACK_CATALOG_URL} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                            >
                                Pantalla Completa
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row h-[calc(100vh-180px)] overflow-hidden">
                
                {/* Visualizador de Catálogo (Iframe) */}
                <div className="flex-grow bg-black relative">
                    {!isCatalogLoaded && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black p-10 text-center">
                            <div className="w-48 h-64 bg-[#111] rounded-2xl mb-10 animate-pulse border border-white/10 flex items-center justify-center">
                                <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="2"/></svg>
                            </div>
                            <h2 className="text-white text-2xl font-black uppercase tracking-widest mb-6">Cargando Tendencias 2026</h2>
                            <button 
                                onClick={() => setIsCatalogLoaded(true)}
                                className="bg-pink-600 text-white font-black px-12 py-5 rounded-full hover:bg-pink-700 transition-all text-[11px] tracking-[0.3em] shadow-[0_0_40px_rgba(219,39,119,0.4)]"
                            >
                                ACTIVAR VISUALIZADOR
                            </button>
                        </div>
                    )}
                    <iframe
                        src={INTERACTIVE_CATALOG_URL}
                        title="Vellaperfumeria 2026 Catalog"
                        className="w-full h-full border-none opacity-0 transition-opacity duration-1000"
                        style={{ opacity: isCatalogLoaded ? 1 : 0 }}
                        onLoad={() => setIsCatalogLoaded(true)}
                        allowFullScreen
                    />
                </div>

                {/* Sidebar de Pedido Rápido */}
                <div className="w-full lg:w-[450px] bg-black border-l border-white/10 p-10 flex flex-col justify-center overflow-y-auto">
                    <div className="space-y-10">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center border border-pink-500/20">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Pedido Express</h2>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Compra directa por código</p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed">
                            Busca el código de 5 o 6 dígitos en el catálogo digital e introdúcelo aquí para añadirlo instantáneamente a tu cesta de <span className="text-pink-500">Vellaperfumeria</span>.
                        </p>

                        <form onSubmit={handleQuickAdd} className="space-y-6">
                            <div className="relative group">
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="Ej: 47697"
                                    className="w-full bg-[#111] border border-white/10 rounded-3xl px-8 py-6 text-3xl font-black text-white focus:border-pink-500 outline-none text-center transition-all group-hover:bg-[#181818]"
                                    value={quickAddCode}
                                    onChange={(e) => setQuickAddCode(e.target.value.replace(/\D/g, ''))}
                                />
                                <div className="absolute inset-0 border-2 border-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
                            </div>
                            
                            <button
                                ref={buttonRef}
                                type="submit"
                                disabled={quickAddCode.length < 3}
                                className="w-full bg-white text-black font-black py-6 rounded-3xl hover:bg-pink-600 hover:text-white transition-all shadow-2xl disabled:opacity-20 disabled:cursor-not-allowed uppercase text-xs tracking-[0.4em]"
                            >
                                Añadir a la Cesta
                            </button>
                        </form>

                        {statusMessage && (
                            <div className={`p-5 rounded-2xl text-center text-[11px] font-black uppercase tracking-widest animate-fade-in ${statusMessage.includes('añadido') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-pink-500/10 text-pink-500 border border-pink-500/20'}`}>
                                {statusMessage}
                            </div>
                        )}

                        <div className="pt-10 border-t border-white/5 grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <span className="block text-white font-black text-lg">24h</span>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Atención WhatsApp</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-white font-black text-lg">Envío</span>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Gratis +35€</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default CatalogPage;
