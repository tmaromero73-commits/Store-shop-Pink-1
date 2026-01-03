
import React, { useState, useEffect, useCallback } from 'react';
import type { Product } from './types';

interface SpecialOffersCarouselProps {
    onProductSelect?: (product: Product) => void;
}

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

const slides = [
    {
        id: 1,
        title: "SOLO ONLINE",
        subtitle: "Hasta el 6 de Enero",
        description: "Disfruta de ofertas exclusivas en maquillaje. THE ONE y OnColour con hasta 50% dto.",
        buttonText: "COMPRAR THE ONE",
        image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=78093358-84b4-48bc-b818-814071e28cf5&name=2x1_TheOne_Split_970x450&inputFormat=jpg",
        bgClass: "bg-gradient-to-br from-gray-900 via-black to-pink-900",
        textClass: "text-white",
        buttonClass: "bg-brand-primary text-white hover:bg-pink-700 shadow-pink-900/20",
        targetId: null
    },
    {
        id: 2,
        title: "OFERTA ONCOLOUR",
        subtitle: "Belleza al mejor precio",
        description: "Color vibrante y calidad Oriflame con descuentos irresistibles solo esta semana.",
        buttonText: "VER ONCOLOUR",
        image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=62bf98fd-8dcd-4996-bd59-22cf7c4b47fe&name=2x1_OnColour_Split_970x450&inputFormat=jpg",
        bgClass: "bg-gradient-to-br from-rose-50 via-white to-pink-100",
        textClass: "text-gray-900",
        buttonClass: "bg-black text-white hover:bg-gray-800 shadow-gray-200",
        targetId: null
    },
    {
        id: 3,
        title: "ENVÍO GRATIS",
        subtitle: "Pedidos superiores a 35€",
        description: "Aprovecha las rebajas de enero y no pagues gastos de envío en tus productos favoritos.",
        buttonText: "VER PRODUCTOS",
        image: "https://media-cdn.oriflame.com/contentImage?externalMediaId=10eada9f-b5ef-4854-911a-34f17f58b371&name=2_Promo_split_NewCollection_600x450&inputFormat=jpg",
        bgClass: "bg-gradient-to-br from-[#fdf2f8] via-white to-[#fce7f3]",
        textClass: "text-gray-900",
        buttonClass: "bg-brand-primary text-white hover:bg-pink-700 shadow-pink-200",
        targetId: null
    }
];

const SpecialOffersCarousel: React.FC<SpecialOffersCarouselProps> = ({ onProductSelect }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, 6000); 
        return () => clearInterval(interval);
    }, [nextSlide]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
        setTouchStart(0);
        setTouchEnd(0);
    };

    const handleButtonClick = (slide: typeof slides[0]) => {
        if (slide.targetId) {
            const element = document.getElementById(slide.targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div 
            className="relative w-full h-[550px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12 group border border-white/50 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
             {slides.map((slide, index) => (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${slide.bgClass}`}
                >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
                    <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pb-12 md:py-8 gap-6 md:gap-12 relative z-20">
                        <div className={`w-full md:w-1/2 text-center md:text-left space-y-6 ${index === currentIndex ? 'animate-fade-in-up' : ''}`}>
                            <div>
                                <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] mb-4 shadow-sm uppercase text-brand-primary">
                                    Oferta de Enero
                                </span>
                                <h2 className={`text-4xl md:text-6xl font-serif font-medium tracking-tight leading-tight ${slide.textClass}`}>
                                    {slide.title}
                                </h2>
                                <h3 className={`text-xl md:text-2xl font-light mt-2 ${slide.textClass} opacity-80`}>
                                    {slide.subtitle}
                                </h3>
                            </div>
                            
                            <p className={`text-lg md:text-xl leading-relaxed max-w-md mx-auto md:mx-0 font-light ${slide.textClass === 'text-white' ? 'text-gray-300' : 'text-gray-600'}`}>
                                {slide.description}
                            </p>
                            
                            <button 
                                onClick={() => handleButtonClick(slide)}
                                className={`mt-6 px-10 py-4 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:shadow-xl ${slide.buttonClass}`}
                            >
                                {slide.buttonText}
                            </button>
                        </div>
                        
                        <div className="w-full md:w-1/2 h-1/2 md:h-[80%] flex items-center justify-center relative">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform rotate-1 transition-transform hover:rotate-0 duration-500 border-4 border-white/20">
                                <img 
                                    src={slide.image} 
                                    alt={slide.title} 
                                    className={`w-full h-full object-cover transform transition-transform duration-[1500ms] ${index === currentIndex ? 'scale-110' : 'scale-100'}`} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
             ))}

             <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/40 hover:bg-white/90 p-3 rounded-full text-black backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg border border-white/50" aria-label="Anterior">
                <ChevronLeftIcon />
             </button>
             <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/40 hover:bg-white/90 p-3 rounded-full text-black backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg border border-white/50" aria-label="Siguiente">
                <ChevronRightIcon />
             </button>

             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
                {slides.map((slide, index) => (
                    <button 
                        key={slide.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? 'w-12 bg-brand-primary' : 'w-4 bg-white/40 hover:bg-white/60'}`}
                        aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                ))}
             </div>
             
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default SpecialOffersCarousel;
