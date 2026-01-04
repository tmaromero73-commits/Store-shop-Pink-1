
import React from 'react';
import type { View } from './types';

const Footer: React.FC<{ onNavigate: (view: View, payload?: any) => void }> = ({ onNavigate }) => {
    return (
        <footer className="bg-black text-white font-sans mt-auto border-t border-white/5">
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <img 
                            src="https://vellaperfumeria.com/wp-content/uploads/2024/06/vellaperfumeralogo.png" 
                            className="h-16 w-auto mb-10 brightness-0 invert" 
                            alt="Logo Vella" 
                        />
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed max-w-xs">
                            Tu esencia, tu belleza, tu tienda.<br/>
                            Distribuidor independiente Oriflame Suecia.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-black tracking-[0.5em] uppercase mb-10 text-[#FBCFE8]">Explorar</h3>
                        <ul className="space-y-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Inicio</button></li>
                            <li><button onClick={() => onNavigate('products', 'all')} className="hover:text-white transition-colors">Tienda Online</button></li>
                            <li><button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">Catálogo Digital</button></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-black tracking-[0.5em] uppercase mb-10 text-[#FBCFE8]">Soporte</h3>
                        <ul className="space-y-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <li><button onClick={() => onNavigate('ia')} className="hover:text-white transition-colors">Asistente IA</button></li>
                            <li><button onClick={() => onNavigate('ofertas')} className="hover:text-white transition-colors">Promociones</button></li>
                            <li><button onClick={() => onNavigate('checkout')} className="hover:text-white transition-colors">Contacto</button></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-[11px] font-black tracking-[0.5em] uppercase mb-10 text-[#FBCFE8]">Seguridad</h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
                            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-[9px] font-black">VISA</div>
                            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-[9px] font-black">MASTERCARD</div>
                            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-[9px] font-black">PAYPAL</div>
                        </div>
                        <div className="flex space-x-6 text-gray-400">
                            <a href="https://instagram.com/vellaperfumeria" className="hover:text-[#FBCFE8] transition-colors">INSTAGRAM</a>
                            <a href="https://wa.me/34661202616" className="hover:text-[#FBCFE8] transition-colors">WHATSAPP</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-[#050505] py-12 border-t border-white/5 text-center text-[9px] text-gray-700 font-black uppercase tracking-[0.5em]">
                &copy; {new Date().getFullYear()} Vellaperfumeria. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
