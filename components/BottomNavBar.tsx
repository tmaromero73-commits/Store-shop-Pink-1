
import React from 'react';
import type { View } from './types';

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const CatalogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const AIIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

interface BottomNavBarProps {
    onNavigate: (view: View, payload?: any) => void;
    currentView: View;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onNavigate, currentView }) => {
    const items = [
        { id: 'catalog', label: 'Catálogo', icon: CatalogIcon },
        { id: 'home', label: 'Inicio', icon: HomeIcon },
        { id: 'ia', label: 'Inteligencia artificial', icon: AIIcon },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-[150] shadow-2xl h-24">
            <div className="flex justify-around items-center h-full px-8 max-w-2xl mx-auto">
                {items.map(item => {
                    const isActive = currentView === item.id;
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id as View)}
                            className={`flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'text-pink-600' : 'text-gray-400'}`}
                        >
                            <Icon />
                            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                            {isActive && <div className="w-1 h-1 bg-pink-600 rounded-full mt-1"></div>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNavBar;
