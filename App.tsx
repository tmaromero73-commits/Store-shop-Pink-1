

import React, { Component, useState, useEffect, useCallback, type ErrorInfo, type ReactNode } from 'react';
// Types
import type { View, Product, CartItem } from './components/types';
import type { Currency } from './currency';
import { blogPosts } from './components/blogData';
// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ShopPage from './components/ShopPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartSidebar from './components/CartSidebar';
import OfertasPage from './components/OfertasPage';
import AsistenteIAPage from './components/AsistenteIAPage';
import CatalogPage from './components/CatalogPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import QuickViewModal from './components/QuickViewModal';
import CheckoutPage from './components/CheckoutPage';
import BottomNavBar from './components/BottomNavBar';
import WhatsAppFloat from './components/WhatsAppFloat';
import HeroCarousel from './components/HeroCarousel';

interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

// Fix: Explicitly declaring 'state' and using 'React.Component' to resolve TypeScript errors about 'state' and 'props' not existing on the class instance.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = { hasError: false };

    constructor(props: ErrorBoundaryProps) {
        super(props);
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center p-12">
                    <img src="https://vellaperfumeria.com/wp-content/uploads/2024/06/vellaperfumeralogo.png" alt="Vella" className="h-24 mb-10" />
                    <h1 className="text-3xl font-black text-pink-500 mb-4 uppercase tracking-tighter">Mantenimiento de Belleza</h1>
                    <p className="text-gray-400 mb-12 max-w-sm font-bold uppercase text-[10px] tracking-widest">Estamos reconectando con el catálogo oficial Oriflame...</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-white text-black font-black px-14 py-6 rounded-full shadow-2xl uppercase text-[10px] tracking-[0.4em] hover:bg-pink-600 hover:text-white transition-all"
                    >
                        Actualizar Tienda
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

type AppView = {
    current: View;
    payload?: any;
};

const AppContent: React.FC = () => {
    const [view, setView] = useState<AppView>({ current: 'home' });
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [currency, setCurrency] = useState<Currency>('EUR');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('vella_final_stable_v1');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        } catch (e) {
            console.error("Cart Recovery Error", e);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('vella_final_stable_v1', JSON.stringify(cartItems));
    }, [cartItems]);
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view.current]);

    const handleNavigate = useCallback((newView: View, payload?: any) => {
        setIsCartOpen(false);
        setQuickViewProduct(null);
        setView({ current: newView, payload });
    }, []);

    const addToCart = (product: Product, _: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        const cartItemId = `${product.id}-${selectedVariant ? JSON.stringify(selectedVariant) : 'none'}`;
        setCartItems(prev => {
            const existing = prev.find(item => item.id === cartItemId);
            if (existing) return prev.map(item => item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
            return [...prev, { id: cartItemId, product, quantity: 1, selectedVariant }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (id: string, qty: number) => {
        if (qty < 1) {
            setCartItems(prev => prev.filter(item => item.id !== id));
        } else {
            setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
        }
    };

    const renderView = () => {
        switch (view.current) {
            case 'home':
                return (
                    <div className="w-full space-y-20 pb-20">
                        <HeroCarousel onNavigate={(v) => handleNavigate(v)} />
                        <ProductList 
                            onNavigate={