
import React, { useState, useEffect } from 'react';
import type { View, Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const SearchIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const UserIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const HeartIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const Header: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const orchidColor = "#E29CD2";
    const lightOrchid = "#F8E7F4"; // Versión más clara para botones/hovers

    const featuredProduct = allProducts.find(p => p.id === 48082) || allProducts[0];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [
        { id: 'skincare', label: 'Facial', links: ['Limpiadores', 'Hidratantes', 'Sérums', 'Ojos'] },
        { id: 'makeup', label: 'Maquillaje', links: ['Rostro', 'Ojos', 'Labios', 'Uñas'] },
        { id: 'perfume', label: 'Perfumes', links: ['Mujer', 'Hombre', 'Sets'] },
        { id: 'wellness', label: 'Bienestar', links: ['Nutrición', 'Suplementos', 'Control Peso'] },
        { id: 'hair', label: 'Cabello', links: ['Champús', 'Mascarillas', 'Aceites'] }
    ];

    return (
        <header 
            className={`w-full z-[100] transition-all duration-500 bg-white ${isScrolled ? 'fixed top-0 shadow-2xl' : 'relative'}`}
            onMouseLeave={() => setShowMegaMenu(false)}
        >
            {/* 1. BARRA SUPERIOR (Rosa Orquídea) */}
            <div 
                style={{ backgroundColor: orchidColor }} 
                className="w-full text-white py-1.5 px-4 text-[9px] font-black uppercase tracking-[0.4em] text-center"
            >
                ENVÍO GRATIS DESDE 35€ • TU ESENCIA, TU BELLEZA 🌸
            </div>

            {/* 2. AREA DE LOGOTIPO (Centrado y Grande) */}
            <div className={`transition-all duration-500 flex flex-col items-center justify-center ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'py-8 md:py-10'}`}>
                <button onClick={() => onNavigate('home')} className="relative group px-4">
                    <img 
                        src="https://vellaperfumeria.com/wp-content/uploads/2024/06/vellaperfumeralogo.png" 
                        alt="Vellaperfumeria" 
                        className="h-32 md:h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gray-100"></div>
                </button>
            </div>

            {/* 3. BARRA DE NAVEGACIÓN SLIM (Fondo Negro) */}
            <nav className={`w-full bg-black transition-all duration-300 relative z-[110] ${isScrolled ? 'py-1' : 'py-0'}`}>
                <div className="max-w-screen-xl mx-auto flex items-center justify-between md:justify-center px-4 relative">
                    
                    {/* Iconos Izquierda (Solo visibles al hacer scroll) */}
                    <div className={`absolute left-6 flex items-center gap-4 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <button className="text-white hover:text-[#E29CD2] transition-colors"><SearchIcon /></button>
                        <button className="text-white hover:text-[#E29CD2] transition-colors hidden sm:block"><HeartIcon /></button>
                    </div>

                    {/* Logo Pequeño Izquierda (Solo Scroll) */}
                    {isScrolled && (
                        <div className="absolute left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0">
                            <button onClick={() => onNavigate('home')}>
                                <img src="https://vellaperfumeria.com/wp-content/uploads/2024/06/vellaperfumeralogo.png" alt="Mini Logo" className="h-8 md:h-10 invert brightness-0" />
                            </button>
                        </div>
                    )}

                    {/* Menú Principal */}
                    <ul className="flex items-center justify-center space-x-1 md:space-x-4">
                        <li><button onClick={() => onNavigate('home')} className="px-3 md:px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-[#E29CD2] transition-colors">Inicio</button></li>
                        
                        <li onMouseEnter={() => setShowMegaMenu(true)} className="relative">
                            <button className={`px-3 md:px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors ${showMegaMenu ? 'text-[#E29CD2]' : 'text-white'}`}>
                                Colecciones <span className="text-[7px]">▼</span>
                            </button>
                        </li>

                        <li><button onClick={() => onNavigate('ofertas')} style={{ color: orchidColor }} className="px-3 md:px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:brightness-125 transition-all">Rebajas</button></li>
                        <li className="hidden sm:block"><button onClick={() => onNavigate('catalog')} className="px-3 md:px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-[#E29CD2] transition-colors">Catálogo</button></li>
                        <li><button onClick={() => onNavigate('ia')} className="px-3 md:px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-[#E29CD2] transition-colors flex items-center gap-1">
                            <span style={{ color: orchidColor }}>✨</span> IA
                        </button></li>
                    </ul>

                    {/* Acceso Rápido Derecha */}
                    <div className="absolute right-6 flex items-center gap-4">
                         <button onClick={onCartClick} className="relative text-white hover:text-[#E29CD2] transition-colors flex items-center gap-2 group p-2">
                            <CartIcon />
                            {cartCount > 0 && (
                                <span 
                                    style={{ backgroundColor: orchidColor }}
                                    className="absolute -top-0.5 -right-0.5 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black shadow-sm"
                                >
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* 4. MEGA MENU (Fondo Negro - Slim Style) */}
            {showMegaMenu && (
                <div 
                    className="absolute top-full left-0 w-full bg-black text-white shadow-2xl z-[105] border-t border-white/5 animate-mega-reveal overflow-hidden"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                >
                    <div className="max-w-screen-xl mx-auto px-10 py-12 relative z-10">
                        <div className="grid grid-cols-12 gap-10">
                            
                            {/* Promo Image (4 columns) */}
                            <div className="col-span-4 border-r border-white/5 pr-10">
                                <div className="relative group/ad cursor-pointer overflow-hidden rounded-xl aspect-video" onClick={() => onNavigate('productDetail', featuredProduct)}>
                                    <img 
                                        src={featuredProduct.imageUrl} 
                                        alt="Promo" 
                                        className="w-full h-full object-contain bg-white/5 transition-transform duration-700 group-hover/ad:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <p style={{ color: orchidColor }} className="text-[9px] font-bold uppercase tracking-widest mb-1">Elegancia Diaria</p>
                                        <h4 className="text-sm font-serif italic text-white">Descubre Royal Velvet</h4>
                                    </div>
                                </div>
                            </div>

                            {/* Categories (8 columns) */}
                            <div className="col-span-8">
                                <div className="grid grid-cols-4 gap-8">
                                    {categories.map((cat) => (
                                        <div key={cat.id} className="space-y-4">
                                            <h3 style={{ color: orchidColor }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                                {cat.label}
                                            </h3>
                                            <ul className="space-y-2">
                                                {cat.links.map(label => (
                                                    <li key={label}>
                                                        <button 
                                                            onClick={() => { onNavigate('products', cat.id); setShowMegaMenu(false); }} 
                                                            className="text-[12px] text-gray-400 hover:text-white transition-colors flex items-center group/link text-left"
                                                        >
                                                            <span style={{ backgroundColor: orchidColor }} className="w-0 h-[1px] mr-0 transition-all group-hover/link:w-2 group-hover/link:mr-2"></span>
                                                            {label}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Atención VIP: +34 661 20 26 16</p>
                                    <button 
                                        onClick={() => onNavigate('gift-wrapping')}
                                        style={{ backgroundColor: lightOrchid, color: '#333' }}
                                        className="px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest hover:brightness-105 transition-all shadow-md"
                                    >
                                        Servicio de Regalo 🎁
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes megaReveal {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-mega-reveal { 
                    animation: megaReveal 0.3s ease-out forwards; 
                }
                nav ul li button {
                    position: relative;
                }
                nav ul li button::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 1px;
                    background-color: ${orchidColor};
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }
                nav ul li button:hover::after {
                    width: 60%;
                }
            `}</style>
        </header>
    );
};

export default Header;
