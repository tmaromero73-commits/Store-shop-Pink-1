
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View) => void;
}

const slides = [
    {
        id: 'eclat-homme',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=7db636e0-258e-4914-9214-411a0937a85e&name=2x1_EclatHomme_Split_970x450&inputFormat=jpg',
        title: 'Eclat Homme Premium',
        subtitle: 'La esencia de la sofisticación parisina para él',
        buttonText: 'VER FRAGANCIA',
        view: 'products' as View,
        customStyles: {
            background: 'radial-gradient(circle at center, #1a365d 0%, #0c1a2c 100%)',
            overlay: 'url("https://www.transparenttextures.com/patterns/gold-dust.png")'
        }
    },
    {
        id: 'duologi',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=04052011-859a-4122-8356-0775d7870404&name=2x1_Duologi_Split_970x450&inputFormat=jpg',
        title: 'Cuidado Capilar Duologi',
        subtitle: 'Tratamientos personalizados inspirados en el cuidado facial',
        buttonText: 'VER DUOLOGI',
        view: 'products' as View,
    },
    {
        id: 'makeup-2026',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=78093358-84b4-48bc-b818-814071e28cf5&name=2x1_TheOne_Split_970x450&inputFormat=jpg',
        title: 'Tendencias Estocolmo 2026',
        subtitle: 'Maquillaje profesional THE ONE',
        buttonText: 'VER MAQUILLAJE',
        view: 'products' as View,
    }
];

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    return (
        <div className="container mx-auto px-6 md:px-12">
             <div className="w-full h-[60vh] md:h-[70vh] max-h-[700px] relative group rounded-[4rem] overflow-hidden shadow-2xl bg-black">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        style={{ background: slide.customStyles?.background }}
                    >
                        {slide.customStyles?.overlay && (
                            <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: slide.customStyles.overlay }}></div>
                        )}
                        <img 
                            src={slide.imageUrl} 
                            alt={slide.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white px-12 max-w-3xl">
                                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 drop-shadow-2xl">{slide.title}</h2>
                                <p className="text-lg md:text-xl font-medium mb-10 opacity-90 italic">{slide.subtitle}</p>
                                <button
                                    onClick={() => onNavigate(slide.view)}
                                    className="bg-[#FBCFE8] text-black font-black py-5 px-14 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-[11px] uppercase tracking-[0.4em]"
                                >
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-6 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[#FBCFE8] w-12' : 'bg-white/30 w-4'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
