
import React, { useState, useEffect } from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import type { Currency } from './currency';
import Breadcrumbs from './Breadcrumbs';
import { ProductCard } from './ProductCard';

// Icons for Action Bar
const FilterIcon = () => (
    <svg className="w-6 h-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.437 7a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h1.063a2 2 0 0 1 3.874 0H19.5a.5.5 0 0 1 0 1zM6.5 6.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0m11.937 5H19.5a.5.5 0 0 1 0 1h-1.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h10.063a2 2 0 0 1 3.874 0m-.937.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-6.063 5H19.5a.5.5 0 0 1 0 1h-8.063a2 2 0 0 1-3.874 0H4.5a.5.5 0 0 1 0-1h3.063a2 2 0 0 1 3.874 0m-.937.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0"></path>
    </svg>
);

const SortIcon = () => (
    <svg className="w-6 h-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.5 6a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zm0 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zM19 6.5a.5.5 0 0 0-1 0v9.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L19 16.293z"></path>
    </svg>
);

type MixedItem = 
  | { type: 'product', id: number }
  | { type: 'banner-image', image: string, title: string, buttonText: string, link: string, colSpan?: number, textColor?: string }
  | { type: 'banner-text', title: string, buttonText: string, link: string }
  | { type: 'banner-video', src: string, link?: string };

const ProductList: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currency: Currency;
    onQuickView: (product: Product) => void;
}> = ({ onNavigate, onProductSelect, onAddToCart, onQuickAddToCart, currency, onQuickView }) => {
    
    const [visibleCount, setVisibleCount] = useState(32);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const totalProducts = 177;

    const quickCategories = [
        { id: 'ofertas', label: 'Especial Enero -50%' },
        { id: 'skincare', label: 'Cuidado Facial' },
        { id: 'makeup', label: 'Maquillaje' },
        { id: 'perfume', label: 'Fragancias' },
        { id: 'wellness', label: 'Wellness' },
        { id: 'hair', label: 'Cabello' },
    ];

    const initialMixedContent: MixedItem[] = [
        { type: 'product', id: 49135 },
        { type: 'product', id: 48082 },
        {
            type: 'banner-image',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=96119198-b8ab-4de1-a77e-0d923a0753de&name=2_2x1_GiftWrapping_Split_970x450&inputFormat=jpg",
            title: "Convierte tu regalo de belleza en un momento de alegría",
            buttonText: "LEER MÁS SOBRE REGALOS",
            link: "gift-wrapping",
            colSpan: 2,
            textColor: "text-gray-900"
        },
        { type: 'product', id: 47847 },
        { type: 'product', id: 48115 },
        {
            type: 'banner-image',
            image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=78093358-84b4-48bc-b818-814071e28cf5&name=2x1_TheOne_Split_970x450&inputFormat=jpg",
            title: "Maquillaje THE ONE con hasta 50% dto. ¡Solo Online!",
            buttonText: "VER OFERTA THE ONE",
            link: "products",
            colSpan: 2
        },
        { type: 'product', id: 48540 },
        { type: 'product', id: 48048 },
        {
            type: 'banner-text',
            title: "Prueba el maquillaje virtual de Vellaperfumeria",
            buttonText: "PROBAR AHORA",
            link: "ia"
        },
        { type: 'banner-video', src: "https://media-cdn.oriflame.com/static-media-web/0fa45d91-4c57-41ab-957e-9404e87544d8?mimeType=video%2fmp4" },
    ];

    const getVisibleContent = () => {
        const content = [...initialMixedContent];
        if (visibleCount > initialMixedContent.length) {
            const extraCount = visibleCount - initialMixedContent.length;
            let added = 0;
            let i = 0;
            while (added < extraCount) {
                const product = allProducts[i % allProducts.length];
                content.push({ type: 'product', id: product.id });
                added++;
                i++;
            }
        }
        return content;
    };

    const mixedContent = getVisibleContent();
    const progressPercentage = Math.min((visibleCount / totalProducts) * 100, 100);

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 16, totalProducts));
            setIsLoadingMore(false);
        }, 800);
    };

    const handleClickLink = (link: string) => {
        if(link === 'ofertas') onNavigate('ofertas');
        else if (link === 'ia') onNavigate('ia');
        else if (link === 'gift-wrapping') onNavigate('gift-wrapping');
        else onNavigate('products', 'all');
    }

    return (
        <div className="bg-white pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-4 pb-4">
                    <Breadcrumbs items={[
                        { label: 'Inicio', onClick: () => onNavigate('home') },
                        { label: 'Tienda' }
                    ]} />
                    
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 uppercase tracking-tight">
                        Catálogo de Belleza
                    </h1>
                </div>

                <div className="relative mb-6 border-b border-gray-200">
                    <div className="flex overflow-x-auto gap-6 pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {quickCategories.map((cat, index) => (
                            <button
                                key={cat.id}
                                onClick={() => onNavigate('products', cat.id === 'ofertas' ? 'all' : cat.id)}
                                className={`whitespace-nowrap pb-3 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors duration-200 ${
                                    index === 0 
                                    ? 'border-brand-primary text-brand-primary' 
                                    : 'border-transparent text-gray-400 hover:text-black hover:border-gray-300'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center py-4 mb-6 border-b border-gray-100">
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                        <button className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group">
                            <FilterIcon />
                            <span className="text-sm font-bold uppercase tracking-widest group-hover:underline">Filtrar</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group">
                            <SortIcon />
                            <span className="text-sm font-bold uppercase tracking-widest group-hover:underline">Recomendado</span>
                        </button>
                    </div>
                    <div className="mt-4 sm:mt-0 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {totalProducts} productos disponibles
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {mixedContent.map((item, index) => {
                        if (item.type === 'banner-image') {
                            return (
                                <div 
                                    key={`banner-img-${index}`} 
                                    className={`relative flex flex-col justify-end overflow-hidden cursor-pointer group ${item.colSpan === 2 ? 'col-span-2' : 'col-span-1'} bg-gray-100 h-full animate-fade-in rounded-3xl shadow-lg border border-gray-100`}
                                    onClick={() => handleClickLink(item.link)}
                                    style={{ minHeight: '350px' }}
                                >
                                    <div className="absolute inset-0">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className={`absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent text-center flex flex-col items-center ${item.textColor || 'text-white'}`}>
                                        <h3 className="text-2xl font-black mb-4 leading-tight uppercase tracking-tight drop-shadow-lg">{item.title}</h3>
                                        <button className="text-[10px] font-black uppercase tracking-[0.3em] bg-white text-black px-6 py-3 rounded-full hover:bg-brand-primary hover:text-white transition-all shadow-xl">
                                            {item.buttonText}
                                        </button>
                                    </div>
                                </div>
                            );
                        } else if (item.type === 'banner-text') {
                            return (
                                <div 
                                    key={`banner-txt-${index}`} 
                                    className="relative flex flex-col justify-center items-center text-center p-8 bg-[#fcfcfc] border border-gray-100 cursor-pointer group col-span-1 h-full animate-fade-in rounded-3xl shadow-sm"
                                    onClick={() => handleClickLink(item.link)}
                                >
                                    <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight leading-snug">{item.title}</h3>
                                    <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-4 border-brand-primary pb-1 hover:text-brand-primary transition-all">
                                        {item.buttonText}
                                    </button>
                                </div>
                            );
                        } else if (item.type === 'banner-video') {
                            return (
                                <div key={`banner-vid-${index}`} className="relative col-span-1 h-full min-h-[350px] bg-black cursor-pointer group animate-fade-in rounded-3xl overflow-hidden shadow-lg border border-gray-800" onClick={() => item.link && handleClickLink(item.link)}>
                                    <video 
                                        autoPlay 
                                        muted 
                                        loop 
                                        playsInline 
                                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-1000"
                                        src={item.src}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (item.type === 'product' && item.id) {
                            const product = allProducts.find(p => p.id === item.id);
                            if (!product) return null;
                            
                            return (
                                <div key={`prod-${index}`} className="h-full animate-fade-in">
                                    <ProductCard 
                                        product={product}
                                        currency={currency}
                                        onAddToCart={onAddToCart}
                                        onQuickAddToCart={onQuickAddToCart}
                                        onProductSelect={onProductSelect}
                                        onQuickView={onQuickView}
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                {visibleCount < totalProducts && (
                    <div className="mt-16 flex flex-col items-center justify-center max-w-md mx-auto text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Descubiertos {visibleCount} de {totalProducts}</p>
                        <div className="w-full h-1 bg-gray-100 rounded-full mb-6 overflow-hidden">
                            <div 
                                className="h-full bg-black rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <button 
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            className="px-10 py-4 bg-black text-white rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-gray-800 transition-all shadow-xl disabled:opacity-50 disabled:cursor-wait flex items-center gap-3"
                        >
                            {isLoadingMore ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Actualizando...
                                </>
                            ) : (
                                'Cargar más tesoros'
                            )}
                        </button>
                    </div>
                )}
            </div>
            
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </div>
    );
};

export default ProductList;
