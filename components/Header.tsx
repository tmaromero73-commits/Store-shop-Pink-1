
import React, { useState, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

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
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuSections = [
        { 
            title: 'MAQUILLAJE', 
            links: [
                { name: 'Colección THE ONE', key: 'the-one' },
                { name: 'OnColour Style', key: 'makeup' },
                { name: 'Giordani Gold', key: 'makeup' }
            ] 
        },
        { 
            title: 'CABELLO', 
            links: [
                { name: 'Duologi Tratamiento', key: 'hair' },
                { name: 'Eleo Aceites', key: 'hair' }
            ] 
        },
        { 
            title: 'CUERPO', 
            links: [
                { name: 'Magnolia', key: 'personal-care' },
                { name: 'Milk & Honey Gold', key: 'personal-care' }
            ] 
        },
        { 
            title: 'FRAGANCIAS', 
            links: [
                { name: 'Eclat Homme', key: 'perfume' },
                { name: 'Giordani Gold', key: 'perfume' }
            ] 
        }
    ];

    const logoUrl = "https://vellaperfumeria.com/wp-content/uploads/2024/06/vellaperfumeralogo.png";

    return (
        <header 
            className={`w-full z-[100] transition-all duration-300 ${isScrolled ? 'fixed top-0' : 'relative'}`}
            onMouseLeave={() => setShowMegaMenu(false)}
        >
            {/* 1. PROMOCIONES Y TELÉFONO */}
            <div className="w-full bg-pink-50 py-2 px-6 flex justify-between items-center border-b border-pink-100">
                <div className="flex items-center gap-6">
                    <div className="text-[10px] font-black text-pink-600 uppercase tracking-[0.3em]">
                        Envío Gratis +35€ • Catálogo 1
                    </div>
                    <div className="hidden md:block text-[10px] font-black text-gray-700 uppercase tracking-[0.2em] border-l border-pink-200 pl-6">
                        Teléfono: 661 202 616
                    </div>
                </div>
                <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase">
                    <button onClick={() => onCurrencyChange('EUR')} className={currency === 'EUR' ? 'text-pink-600' : ''}>EUR</button>
                    <button onClick={() => onCurrencyChange('USD')} className={currency === 'USD' ? 'text-pink-600' : ''}>USD</button>
                </div>
            </div>

            {/* 2. LOGO CENTRADO */}
            <div className={`w-full bg-white transition-all duration-500 flex justify-center items-center overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'py-12 h-auto opacity-100'}`}>
                <button onClick={() => onNavigate('home')} className="hover:scale-105 transition-transform duration-500">
                    <img 
                        src={logoUrl} 
                        alt="Vellaperfumeria" 
                        className="h-32 md:h-40 w-auto" 
                    />
                </button>
            </div>

            {/* 3. NAVEGACIÓN NEGRA */}
            <nav className="w-full bg-black shadow-2xl">
                <div className="max-w-full mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                    <div className="flex-1 flex items-center gap-4">
                        {isScrolled && (
                            <button onClick={() => onNavigate('home')} className="animate-fade-in">
                                <img src={logoUrl} alt="Logo" className="h-10 w-auto invert brightness-0" />
                            </button>
                        )}
                        <button className="text-white/60 hover:text-white transition-colors p-2">
                            <SearchIcon />
                        </button>
                    </div>

                    <div className="flex items-center space-x-12">
                        <button onClick={() => onNavigate('home')} className="text-[11px] font-black uppercase tracking-[0.4em] text-white hover:text-pink-300 transition-colors">Inicio</button>
                        
                        <button 
                            onMouseEnter={() => setShowMegaMenu(true)}
                            className={`text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-2 transition-colors ${showMegaMenu ? 'text-pink-300' : 'text-white hover:text-pink-300'}`}
                        >
                            Catálogo <span className="text-[7px]">▼</span>
                        </button>

                        <button onClick={() => onNavigate('ofertas')} className="text-[11px] font-black uppercase tracking-[0.4em] text-pink-400 hover:brightness-125 transition-all">Ofertas</button>
                        <button onClick={() => onNavigate('ia')} className="text-[11px] font-black uppercase tracking-[0.4em] text-white hover:text-pink-300 transition-colors">Belleza IA</button>
                    </div>

                    <div className="flex-1 flex items-center justify-end gap-6">
                        <button className="text-white/60 hover:text-white hidden md:block transition-colors"><UserIcon /></button>
                        <button onClick={onCartClick} className="relative text-white hover:text-pink-200 transition-colors">
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* 4. MEGA MENU */}
            {showMegaMenu && (
                <div 
                    className="absolute top-full left-0 w-full bg-black/98 backdrop-blur-2xl text-white border-t border-white/5 shadow-2xl animate-mega-menu z-[110]"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                >
                    <div className="max-w-screen-xl mx-auto px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
                        {menuSections.map((section, sIdx) => (
                            <div key={sIdx} className="space-y-6">
                                <h3 className="text-pink-400 text-[10px] font-black uppercase tracking-[0.5em] border-b border-white/10 pb-4">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, bIdx) => (
                                        <li key={bIdx}>
                                            <button 
                                                onClick={() => { 
                                                    onNavigate('products', link.key); 
                                                    setShowMegaMenu(false); 
                                                }}
                                                className="text-[13px] text-gray-400 hover:text-white transition-all flex items-center group/item font-bold"
                                            >
                                                <span className="w-0 h-[1px] bg-pink-500 mr-0 transition-all group-hover/item:w-4 group-hover/item:mr-2"></span>
                                                {link.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes megaMenuIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-mega-menu { animation: megaMenuIn 0.3s ease-out forwards; }
                .animate-fade-in { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </header>
    );
};

export default Header;
