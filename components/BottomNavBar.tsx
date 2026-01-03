
import React from 'react';
import type { View } from './types';

// Icons
const HomeIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const ShopIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const OffersIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0a2 2 0 00-2 2v11a2 2 0 002 2h6a2 2 0 002-2V10a2 2 0 00-2-2h-6z" />
    </svg>
);

const CatalogIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const AIIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2-2 2 2m-2 4v6m2-6l2 2-2 2M15 3l2 2-2 2m-2-4v4m2 4l2 2-2 2m-8 4h12" />
    </svg>
);

interface BottomNavBarProps {
    onNavigate: (view: View, payload?: any) => void;
    currentView: View;
    currentCategory: string;
}

interface NavItem {
    view: View;
    label: string;
    icon: React.FC<{ isActive: boolean }>;
    payload?: any;
    isExternal?: boolean;
    href?: string;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onNavigate, currentView, currentCategory }) => {
    
    const navItems: NavItem[] = [
        { view: 'home', label: 'Inicio', icon: HomeIcon, payload: undefined },
        { view: 'catalog', label: 'Catálogo', icon: CatalogIcon, payload: undefined },
        { view: 'ofertas', label: 'Ofertas', icon: OffersIcon, payload: undefined },
        { view: 'ia', label: 'IA', icon: AIIcon, payload: undefined },
        { view: 'products', label: 'Tienda', icon: ShopIcon, payload: 'all' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 pb-safe">
            <nav className="flex justify-around items-end h-16 pb-1">
                {navItems.map(item => {
                    const isActive = item.view === 'products'
                        ? (currentView === 'products' || currentView === 'productDetail')
                        : currentView === item.view;
                        
                    const Icon = item.icon;

                    const handleClick = () => {
                         if (item.isExternal && item.href) {
                            window.location.href = item.href;
                         } else {
                            onNavigate(item.view, item.payload);
                         }
                    };

                    return (
                        <button
                            key={item.label}
                            onClick={handleClick}
                            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative group ${
                                isActive ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-primary'
                            }`}
                            aria-label={item.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <span className={`absolute -top-0.5 w-8 h-0.5 rounded-b-md bg-brand-primary transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></span>
                            <Icon isActive={isActive} />
                            <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                        </button>
                    )
                })}
            </nav>
            {/* Safe area spacing for iPhone X+ home indicator handled by padding-bottom if needed */}
            <div className="h-[env(safe-area-inset-bottom)] bg-white"></div>
        </div>
    );
};

export default BottomNavBar;
