
import React, { useState, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

const Header: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoUrl = "https://vellaperfumeria.com/wp-content/uploads/2024/06/vellaperfumeralogo.png";

    return (
        <header className="w-full z-[100] relative">
            {/* BARRA DE PROMOCIONES (ROSA) */}
            <div className="w-full bg-[#FBCFE8] py-2 px-6 flex justify-between items-center border-b border-black/5">
                <span className="text-[10px] font-black text-black uppercase tracking-[0.2em]">🌸 ENVÍO GRATIS +35€</span>
                <div className="flex gap-4 items-center">
                    <button onClick={() => onCurrencyChange('EUR')} className={`text-[9px] font-black ${currency === 'EUR' ? 'underline' : 'opacity-50'}`}>EUR</button>
                    <button onClick={() => onCurrencyChange('USD')} className={`text-[9px] font-black ${currency === 'USD' ? 'underline' : 'opacity-50'}`}>USD</button>
                </div>
            </div>

            {/* LOGO CENTRADO (BLANCO) */}
            <div className={`w-full bg-white flex flex-col items-center justify-center transition-all duration-500 ${isScrolled ? 'h-24' : 'h-40 md:h-56'}`}>
                <button onClick={() => onNavigate('home')} className="h-2/3 hover:scale-105 transition-transform duration-500">
                    <img src={logoUrl} alt="Vellaperfumeria" className="h-full w-auto object-contain" />
                </button>
            </div>

            {/* NAVEGACIÓN DESKTOP (NEGRO) - Visible solo en escritorio para mantener el look de App */}
            <nav className={`hidden md:block w-full bg-black transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-xl' : ''}`}>
                <div className="w-full px-12 h-16 flex items-center justify-center space-x-12">
                    <button onClick={() => onNavigate('home')} className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-[#FBCFE8]">Inicio</button>
                    <button onClick={() => onNavigate('catalog')} className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-[#FBCFE8]">Catálogo</button>
                    <button onClick={() => onNavigate('products', 'all')} className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-[#FBCFE8]">Tienda</button>
                    <button onClick={() => onNavigate('ia')} className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-[#FBCFE8]">Asistente IA</button>
                </div>
            </nav>
            
            {/* CARRITO FLOTANTE (App Style) */}
            <button 
                onClick={onCartClick} 
                className="fixed top-24 right-6 bg-black text-white p-4 rounded-full shadow-2xl z-[150] md:top-auto md:bottom-28"
            >
                <div className="relative">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#FBCFE8] text-black text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-black">
                            {cartCount}
                        </span>
                    )}
                </div>
            </button>
        </header>
    );
};

export default Header;
