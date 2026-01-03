
import React, { useState, useEffect } from 'react';
import type { View, Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const SearchIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const UserIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const HeartIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
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

    const featuredItems = allProducts.filter(p => [48115, 48082].includes(p.id));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [
        { id: 'skincare', label: 'Cuidado Facial', links: ['Hidratantes', 'Ojos', 'Limpieza', 'Labios', 'Tratamientos'] },
        { id: 'makeup', label: 'Maquillaje', links: ['Rostro', 'Ojos', 'Labiales', 'Uñas', 'Accesorios'] },
        { id: 'perfume', label: 'Fragancias', links: ['Mujer', 'Hombre', 'Cuerpo', 'Sets de Regalo'] },
        { id: 'wellness', label: 'Wellness', links: ['Nutrición', 'Suplementos', 'Control de Peso'] },
        { id: 'hair', label: 'Cabello', links: ['Champús', 'Acondicionadores', 'Tratamientos', 'Coloración'] }
    ];

    return (
        <header 
            className={`w-full z-[100] transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-xl bg-white/95 backdrop-blur-md' : 'relative bg-white'}`}
            onMouseLeave={() => setShowMegaMenu(false)}
        >
            {/* 1. TOP PROMO BAR (Rosa Suave) */}
            <div className="bg-brand-primary text-white py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-center">
                ENVÍO GRATIS DESDE 35€ • REGÍSTRATE Y RECIBE UN 15% DTO EXTRA 🌸
            </div>

            {/* 2. MAIN HEADER (Logo Centrado) */}
            <div className={`w-full px-4 md:px-10 flex items-center justify-between border-b border-gray-100 ${isScrolled ? 'py-1' : 'py-3'}`}>
                
                {/* Left: Actions */}
                <div className="flex items-center gap-1 md:gap-4 w-1/3">
                    <button className="p-2 text-gray-700 hover:text-brand-primary transition-colors flex items-center gap-2 group">
                        <SearchIcon />
                        <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">Buscar</span>
                    </button>
                    <button className="p-2 text-gray-700 hover:text-brand-primary transition-colors hidden md:flex items-center gap-2">
                        <HeartIcon />
                        <span className="text-[10px] font-bold uppercase tracking-widest lg:inline hidden">Favoritos</span>
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="w-1/3 flex justify-center">
                    <button onClick={() => onNavigate('home')} className="hover:opacity-80 transition-all">
                        <img 
                            src="https://vellaperfumeria.com/wp-content/uploads/2024/06/vellaperfumeralogo.png" 
                            alt="Vellaperfumeria" 
                            className={`${isScrolled ? 'h-10' : 'h-20'} w-auto object-contain`} 
                        />
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="w-1/3 flex items-center justify-end gap-1 md:gap-4">
                    <button className="p-2 text-gray-700 hover:text-brand-primary transition-colors flex items-center gap-2">
                        <UserIcon />
                        <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">Mi Cuenta</span>
                    </button>
                    <button onClick={onCartClick} className="relative p-2 text-gray-700 hover:text-brand-primary transition-colors flex items-center gap-2 group">
                        <CartIcon />
                        <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">Bolsa</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* 3. NAVIGATION BAR (Rosa Glass) */}
            <nav className="w-full border-b border-gray-100 hidden lg:block bg-brand-secondary/50 backdrop-blur-sm">
                <div className="max-w-screen-xl mx-auto">
                    <ul className="flex items-center justify-center space-x-2">
                        <li><button onClick={() => onNavigate('home')} className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800 hover:text-brand-primary transition-colors">Inicio</button></li>
                        <li onMouseEnter={() => setShowMegaMenu(true)} className="relative">
                            <button className={`px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors ${showMegaMenu ? 'text-brand-primary' : 'text-gray-800 hover:text-brand-primary'}`}>
                                Productos <span className={`text-[8px] transition-transform ${showMegaMenu ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                        </li>
                        <li><button onClick={() => onNavigate('ofertas')} className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary hover:text-gray-900 transition-colors">Ofertas</button></li>
                        <li><button onClick={() => onNavigate('catalog')} className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800 hover:text-brand-primary transition-colors">Catálogo Digital</button></li>
                        <li><button onClick={() => onNavigate('ia')} className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-gray-800 hover:text-brand-primary">
                            <span className="text-brand-primary">✨</span> IA Beauty
                        </button></li>
                    </ul>
                </div>
            </nav>

            {/* 4. MEGA MENU (Fondo Negro) */}
            {showMegaMenu && (
                <div 
                    className="absolute top-full left-0 w-full bg-[#0d0d0d] text-white shadow-2xl z-[110] border-t border-white/10 animate-mega-reveal"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                >
                    <div className="max-w-screen-2xl mx-auto px-10 py-16">
                        <div className="grid grid-cols-12 gap-8">
                            {categories.map((cat, idx) => (idx < 4) && (
                                <div key={cat.id} className="col-span-2">
                                    <h3 className="text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8 pb-2 border-b border-white/5">
                                        {cat.label}
                                    </h3>
                                    <ul className="space-y-4">
                                        {cat.links.map(label => (
                                            <li key={label}>
                                                <button 
                                                    onClick={() => { onNavigate('products', cat.id); setShowMegaMenu(false); }} 
                                                    className="text-[12px] font-medium text-gray-400 hover:text-white transition-all hover:translate-x-1"
                                                >
                                                    {label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <div className="col-span-4 bg-white/5 rounded-3xl p-8 border border-white/5">
                                <h3 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-6">Recomendado</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {featuredItems.map(product => (
                                        <div key={product.id} className="cursor-pointer group/item" onClick={() => { onNavigate('productDetail', product); setShowMegaMenu(false); }}>
                                            <div className="aspect-square bg-white rounded-xl p-2 mb-2">
                                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover/item:scale-105 transition-transform" />
                                            </div>
                                            <p className="text-[10px] font-bold uppercase truncate text-gray-400 group-hover/item:text-brand-primary">{product.name}</p>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => { onNavigate('products', 'all'); setShowMegaMenu(false); }}
                                    className="mt-8 w-full bg-brand-primary text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all"
                                >
                                    Ver Catálogo Completo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes megaReveal {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-mega-reveal { 
                    animation: megaReveal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                }
            `}</style>
        </header>
    );
};

export default Header;
