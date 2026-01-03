

import React, { Component, useState, useEffect, useCallback, type ErrorInfo, type ReactNode } from 'react';
// Types
import type { View, Product, CartItem } from './components/types';
import type { Currency } from './components/currency';
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
import Breadcrumbs, { type BreadcrumbItem } from './components/Breadcrumbs';
import CheckoutPage from './components/CheckoutPage';
import BottomNavBar from './components/BottomNavBar';
import WhatsAppFloat from './components/WhatsAppFloat';
import GiftWrappingPage from './components/GiftWrappingPage';
import HeroCarousel from './components/HeroCarousel';
import { allProducts } from './components/products';

interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

// Fix: Use React.Component from the React namespace to ensure props and state are correctly inherited and recognized by TypeScript.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error crítico en la aplicación:", error, errorInfo);
    }

    render() {
        // Fix: accessing state via this.state (line 56)
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center p-4">
                    <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-100 max-w-md w-full">
                        <h1 className="text-2xl font-bold text-pink-600 mb-2">¡Vaya! Algo salió mal</h1>
                        <p className="text-gray-600 mb-6 text-sm">Hemos tenido un problema técnico cargando la tienda.</p>
                        <div className="bg-gray-100 p-3 rounded text-xs text-left text-gray-700 font-mono mb-6 overflow-auto max-h-32">
                            {/* Fix: accessing state.error via this.state (line 63) */}
                            {this.state.error?.message || 'Error desconocido'}
                        </div>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="w-full bg-pink-600 text-white font-bold px-6 py-3 rounded-full hover:bg-pink-700 transition-colors shadow-md"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            );
        }
        // Fix: accessing props via this.props (line 75)
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
        const searchParams = new URLSearchParams(window.location.search);
        const sharedCartData = searchParams.get('cart');

        if (sharedCartData) {
            try {
                const decodedData = atob(sharedCartData);
                const parsedData = JSON.parse(decodedData);
                
                const restoredCart: CartItem[] = parsedData.map((item: any) => {
                    const product = allProducts.find(p => p.id === item.productId);
                    if (product) {
                        return {
                            id: item.id,
                            product: product,
                            quantity: item.quantity,
                            selectedVariant: item.selectedVariant
                        };
                    }
                    return null;
                }).filter(Boolean);

                if (restoredCart.length > 0) {
                    setCartItems(restoredCart);
                    setIsCartOpen(true);
                    window.history.replaceState({}, document.title, window.location.pathname);
                    return; 
                }
            } catch (error) {
                console.error("Error parsing shared cart URL", error);
            }
        }

        try {
            const storedCart = localStorage.getItem('vellaperfumeria_cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('vellaperfumeria_cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartItems]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const handleNavigate = useCallback((newView: View, payload?: any) => {
        setIsCartOpen(false);
        setView({ current: newView, payload });
    }, []);

    const addToCart = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        const cartItemId = `${product.id}-${selectedVariant ? JSON.stringify(selectedVariant) : 'none'}`;
        setCartItems(prev => {
            const existing = prev.find(item => item.id === cartItemId);
            if (existing) {
                return prev.map(item => item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
            }
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
                    <div className="space-y-12">
                        <HeroCarousel onNavigate={(v) => handleNavigate(v)} />
                        <ProductList 
                            onNavigate={handleNavigate} 
                            onProductSelect={(p) => handleNavigate('productDetail', p)}
                            onAddToCart={addToCart}
                            onQuickAddToCart={addToCart}
                            currency={currency}
                            onQuickView={setQuickViewProduct}
                        />
                    </div>
                );
            case 'products':
                return (
                    <ShopPage 
                        currency={currency}
                        initialCategory={view.payload || 'all'}
                        onAddToCart={addToCart}
                        onQuickAddToCart={addToCart}
                        onProductSelect={(p) => handleNavigate('productDetail', p)}
                        onQuickView={setQuickViewProduct}
                    />
                );
            case 'productDetail':
                return (
                    <ProductDetailPage 
                        product={view.payload}
                        currency={currency}
                        onAddToCart={addToCart}
                        onQuickAddToCart={addToCart}
                        onProductSelect={(p) => handleNavigate('productDetail', p)}
                        onQuickView={setQuickViewProduct}
                    />
                );
            case 'ofertas':
                return (
                    <OfertasPage 
                        currency={currency}
                        onAddToCart={addToCart}
                        onQuickAddToCart={addToCart}
                        onProductSelect={(p) => handleNavigate('productDetail', p)}
                        onQuickView={setQuickViewProduct}
                    />
                );
            case 'ia':
                return <AsistenteIAPage />;
            case 'catalog':
                return (
                    <CatalogPage 
                        onAddToCart={addToCart}
                        onQuickAddToCart={addToCart}
                        onProductSelect={(p) => handleNavigate('productDetail', p)}
                        onQuickView={setQuickViewProduct}
                        currency={currency}
                    />
                );
            case 'blog':
                return <BlogPage posts={blogPosts} onSelectPost={(p) => handleNavigate('blogPost', p)} />;
            case 'blogPost':
                return <BlogPostPage post={view.payload} allPosts={blogPosts} onSelectPost={(p) => handleNavigate('blogPost', p)} onBack={() => handleNavigate('blog')} />;
            case 'checkout':
                return <CheckoutPage cartItems={cartItems} currency={currency} onClearCart={() => setCartItems([])} onNavigate={handleNavigate} />;
            case 'gift-wrapping':
                return <GiftWrappingPage currency={currency} onAddToCart={addToCart} onQuickAddToCart={addToCart} onProductSelect={(p) => handleNavigate('productDetail', p)} onQuickView={setQuickViewProduct} />;
            default:
                return <div className="py-20 text-center text-gray-500 font-serif italic">Sección en desarrollo...</div>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header 
                onNavigate={handleNavigate} 
                currency={currency} 
                onCurrencyChange={setCurrency} 
                cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
            />
            
            <main className="flex-grow pt-4 pb-20 md:pb-12">
                {renderView()}
            </main>

            <Footer onNavigate={handleNavigate} />
            
            <BottomNavBar onNavigate={handleNavigate} currentView={view.current} currentCategory={view.payload || ''} />
            <WhatsAppFloat />
            
            <CartSidebar 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                cartItems={cartItems} 
                currency={currency}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
                onCheckout={() => handleNavigate('checkout')}
                isCheckingOut={false}
                checkoutError={null}
                onNavigate={handleNavigate}
            />

            {quickViewProduct && (
                <QuickViewModal 
                    product={quickViewProduct} 
                    currency={currency}
                    onClose={() => setQuickViewProduct(null)}
                    onAddToCart={addToCart}
                    onProductSelect={(p) => handleNavigate('productDetail', p)}
                />
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <AppContent />
        </ErrorBoundary>
    );
};

export default App;
