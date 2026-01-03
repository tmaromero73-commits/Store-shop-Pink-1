
import React from 'react';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';

const GiftWrappingPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    
    // Filtramos los productos específicos de envoltorio según el catálogo Oriflame
    const giftProducts = allProducts.filter(p => [48977, 48975, 47947, 48970].includes(p.id));

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Header */}
            <div className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-center justify-center">
                <img 
                    src="https://media-cdn.oriflame.com/contentImage?externalMediaId=96119198-b8ab-4de1-a77e-0d923a0753de&name=2_2x1_GiftWrapping_Split_970x450&inputFormat=jpg" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
                    alt="Background"
                />
                <div className="relative z-10 text-center px-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-600 mb-4 block animate-bounce">Edición de Lujo</span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                        Envoltorio de Regalo
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto font-medium">
                        Eleva tu experiencia de belleza convirtiendo cada pedido en un momento inolvidable.
                    </p>
                </div>
            </div>

            {/* Informational Section */}
            <div className="container mx-auto px-4 md:px-12 -mt-16 relative z-20">
                <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-gray-50 flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <img 
                            src="https://media-cdn.oriflame.com/contentImage?externalMediaId=742072c7-5238-4ffe-9646-45d57b137ae4&name=1_OneMediaParagraphText_980x1300&inputFormat=jpg" 
                            className="rounded-3xl shadow-xl w-full"
                            alt="Packaging Oriflame"
                        />
                    </div>
                    <div className="lg:w-1/2 space-y-8">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Haz que regalar sea parte de tu rutina</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            ¿Buscas el envoltorio perfecto? Nuestras opciones exclusivas están diseñadas para realzar cualquier producto Oriflame. 
                            Combinamos elegancia y practicidad para que tus sorpresas sean siempre memorables.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <span className="text-pink-500 font-black">01. ELIGE</span>
                                <p className="text-sm text-gray-500">Tus productos favoritos de cosmética o wellness.</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-pink-500 font-black">02. SELECCIONA</span>
                                <p className="text-sm text-gray-500">El formato que mejor se adapte: sobre, bolsa o caja.</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-pink-500 font-black">03. RECIBE</span>
                                <p className="text-sm text-gray-500">Con papel de seda y detalles dorados de marca.</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-pink-500 font-black">04. DISFRUTA</span>
                                <p className="text-sm text-gray-500">De la alegría de regalar sin complicaciones.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 md:px-12 mt-24">
                <div className="text-center mb-16">
                    <h3 className="text-2xl font-black uppercase tracking-widest text-gray-900">Colección de Embalaje Premium</h3>
                    <div className="w-20 h-1 bg-pink-500 mx-auto mt-4"></div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {giftProducts.map(product => (
                        <div key={product.id} className="animate-pop-in">
                            <ProductCard 
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                @keyframes popIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-pop-in {
                    animation: popIn 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
                }
            `}</style>
        </div>
    );
};

export default GiftWrappingPage;
