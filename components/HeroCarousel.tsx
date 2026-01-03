
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View) => void;
}

const slides = [
    {
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=78093358-84b4-48bc-b818-814071e28cf5&name=2x1_TheOne_Split_970x450&inputFormat=jpg',
        title: 'Solo Online - Hasta el 6 de Enero',
        subtitle: '¡Maquillaje THE ONE con hasta un 50% dto!',
        buttonText: 'COMPRAR AHORA',
        view: 'products' as View,
    },
    {
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=62bf98fd-8dcd-4996-bd59-22cf7c4b47fe&name=2x1_OnColour_Split_970x450&inputFormat=jpg',
        title: 'Explosión de Color OnColour',
        subtitle: 'Tus favoritos con descuentos increíbles solo esta semana',
        buttonText: 'VER COLECCIÓN',
        view: 'products' as View,
    },
    {
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=10eada9f-b5ef-4854-911a-34f17f58b371&name=2_Promo_split_NewCollection_600x450&inputFormat=jpg',
        title: 'Comienza el Año con Belleza',
        subtitle: 'Descubre las novedades del Catálogo 1 de 2026',
        buttonText: 'VER NOVEDADES',
        view: 'catalog' as View,
    },
];

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);


const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="w-full h-[60vh] max-h-[500px] m-auto relative group rounded-2xl overflow-hidden shadow-2xl bg-black">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <img 
                            src={slide.imageUrl} 
                            alt={slide.title}
                            className="w-full h-full object-cover object-center opacity-80"
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
                            <div className="text-center text-white p-4 max-w-2xl">
                                <h2 className="text-4xl md:text-6xl font-bold font-serif drop-shadow-xl mb-4">{slide.title}</h2>
                                <p className="mt-4 text-lg md:text-2xl font-light drop-shadow-md">{slide.subtitle}</p>
                                <button
                                    onClick={() => onNavigate(slide.view)}
                                    className="mt-10 bg-brand-primary text-white font-bold py-4 px-10 rounded-full shadow-xl hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                                >
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors z-20">
                    <button onClick={prevSlide} aria-label="Anterior diapositiva"><ChevronLeftIcon /></button>
                </div>
                <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors z-20">
                    <button onClick={nextSlide} aria-label="Siguiente diapositiva"><ChevronRightIcon /></button>
                </div>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-brand-primary w-10' : 'bg-white/50 w-4 hover:bg-white/75'}`}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
