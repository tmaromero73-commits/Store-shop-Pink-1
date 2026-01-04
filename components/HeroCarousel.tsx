
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View) => void;
}

const slides = [
    {
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=78093358-84b4-48bc-b818-814071e28cf5&name=2x1_TheOne_Split_970x450&inputFormat=jpg',
        title: 'Solo Online - Catálogo 1',
        subtitle: 'Maquillaje THE ONE con descuentos de hasta el 50%',
        buttonText: 'COMPRAR AHORA',
        view: 'products' as View,
    },
    {
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=62bf98fd-8dcd-4996-bd59-22cf7c4b47fe&name=2x1_OnColour_Split_970x450&inputFormat=jpg',
        title: 'OnColour Style',
        subtitle: 'Color vibrante para tu día a día al mejor precio',
        buttonText: 'VER COLECCIÓN',
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="w-full h-[60vh] max-h-[500px] m-auto relative group rounded-[3rem] overflow-hidden shadow-2xl bg-black border border-gray-100">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <img 
                            src={slide.imageUrl} 
                            alt={slide.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                            <div className="text-center text-white p-6 max-w-2xl">
                                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 drop-shadow-2xl">{slide.title}</h2>
                                <p className="text-lg md:text-xl font-medium opacity-90 mb-10">{slide.subtitle}</p>
                                <button
                                    onClick={() => onNavigate(slide.view)}
                                    className="bg-pink-200 text-black font-black py-5 px-12 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-[0.3em]"
                                >
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-pink-300 w-12' : 'bg-white/30 w-4'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
