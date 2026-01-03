import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    currency: Currency;
    onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
    onRemoveItem: (cartItemId: string) => void;
    onCheckout: () => void;
    isCheckingOut: boolean;
    checkoutError: string | null;
    onNavigate: (view: View, payload?: any) => void;
}

const FREE_SHIPPING_THRESHOLD = 35;
const DISCOUNT_THRESHOLD = 35; // Same threshold for discount
const DISCOUNT_PERCENTAGE = 0.15; // 15%
const SHIPPING_COST = 6.00;


const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, currency, onUpdateQuantity, onRemoveItem, onCheckout, isCheckingOut, checkoutError, onNavigate }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [shareLinkStatus, setShareLinkStatus] = useState<'idle' | 'copied'>('idle');
    
    // Close sidebar on "Escape" key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Trap focus within the sidebar when open for accessibility
    useEffect(() => {
        if (!isOpen || !sidebarRef.current) return;

        const focusableElements = sidebarRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                if (event.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        firstElement?.focus();
        sidebarRef.current.addEventListener('keydown', handleTabKeyPress);
        return () => sidebarRef.current?.removeEventListener('keydown', handleTabKeyPress);

    }, [isOpen]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        if (subtotal >= DISCOUNT_THRESHOLD) {
            return subtotal * DISCOUNT_PERCENTAGE;
        }
        return 0;
    }, [subtotal]);

    const totalBeautyPoints = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const points = item.product.beautyPoints || 0;
            return total + (points * item.quantity);
        }, 0);
    }, [cartItems]);

    const hasShippingSaver = useMemo(() => {
        return cartItems.some(item => item.product.isShippingSaver);
    }, [cartItems]);

    const shippingCost = useMemo(() => {
        if (hasShippingSaver || subtotal >= FREE_SHIPPING_THRESHOLD) {
            return 0;
        }
        return SHIPPING_COST;
    }, [subtotal, hasShippingSaver]);

    const total = subtotal - discountAmount + shippingCost;
    const amountForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

    // --- Feature: Create Shareable Link ---
    const handleCreateShareLink = () => {
        if (cartItems.length === 0) return;
        
        // Minimize data for URL: only ID, quantity, and variant choices
        const simpleCart = cartItems.map(item => ({
            id: item.id,
            productId: item.product.id,
            quantity: item.quantity,
            selectedVariant: item.selectedVariant
        }));

        try {
            const jsonString = JSON.stringify(simpleCart);
            const base64String = btoa(jsonString);
            const url = `${window.location.origin}${window.location.pathname}?cart=${base64String}`;
            
            navigator.clipboard.writeText(url).then(() => {
                setShareLinkStatus('copied');
                setTimeout(() => setShareLinkStatus('idle'), 3000);
            });
        } catch (e) {
            console.error("Failed to generate link", e);
        }
    };

    // --- Feature: Download Cart CSV ---
    const handleDownloadCSV = () => {
        if (cartItems.length === 0) return;

        const headers = ["ID Producto", "Nombre", "Marca", "Variante", "Precio Unitario", "Cantidad", "Subtotal"];
        
        const escapeCSV = (value: any) => {
            if (value === null || value === undefined) return "";
            const stringValue = String(value);
            if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        };

        const csvRows = cartItems.map(item => {
            const variantString = item.selectedVariant 
                ? Object.values(item.selectedVariant).join(" - ") 
                : "";
            
            return [
                escapeCSV(item.product.id),
                escapeCSV(item.product.name),
                escapeCSV(item.product.brand),
                escapeCSV(variantString),
                escapeCSV(item.product.price.toFixed(2)),
                escapeCSV(item.quantity),
                escapeCSV((item.product.price * item.quantity).toFixed(2))
            ].join(",");
        });

        // Add Summary Rows
        csvRows.push(["", "", "", "", "", "Subtotal", escapeCSV(subtotal.toFixed(2))].join(","));
        csvRows.push(["", "", "", "", "", "Descuento", escapeCSV(discountAmount.toFixed(2))].join(","));
        csvRows.push(["", "", "", "", "", "Envío", escapeCSV(shippingCost.toFixed(2))].join(","));
        csvRows.push(["", "", "", "", "", "TOTAL", escapeCSV(total.toFixed(2))].join(","));

        const csvContent = "\uFEFF" + headers.join(",") + "\n" + csvRows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `carrito-vellaperfumeria-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-heading"
            className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} aria-hidden="true" />

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
                    <h2 id="cart-heading" className="text-xl font-bold tracking-wide">Tu Carrito</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Cerrar carrito">
                        <CloseIcon />
                    </button>
                </div>

                {/* Cart Content */}
                {cartItems.length > 0 ? (
                    <div className="flex-grow flex flex-col overflow-hidden">
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 items-start bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-contain rounded-md border p-1 bg-white" />
                                    <div className="flex-grow flex flex-col">
                                        <h3 className="font-semibold text-sm leading-tight">{item.product.name}</h3>
                                        {item.selectedVariant && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                {Object.entries(item.selectedVariant).map(([key, value]) => `${key}: ${value}`).join(', ')}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between mt-2">
                                             <p className="font-bold text-base">{formatCurrency(item.product.price * item.quantity, currency)}</p>
                                             <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-600 p-1 transition-colors" aria-label={`Eliminar ${item.product.name}`}>
                                                <TrashIcon />
                                            </button>
                                        </div>
                                        <div className="flex items-center border rounded-md w-fit mt-2 bg-gray-50">
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 font-semibold text-lg hover:bg-gray-200 rounded-l-md transition-colors" aria-label="Reducir cantidad">-</button>
                                            <span className="px-3 text-sm font-medium bg-white h-full flex items-center">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-semibold text-lg hover:bg-gray-200 rounded-r-md transition-colors" aria-label="Aumentar cantidad">+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t bg-gray-50 space-y-4 flex-shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                             {discountAmount > 0 ? (
                                <p className="text-center text-sm font-semibold text-green-600 p-2 bg-green-50 rounded-md border border-green-200 animate-pulse">
                                    ¡Felicidades! Se ha aplicado un <b>15% de descuento</b> a tu compra.
                                </p>
                            ) : amountForFreeShipping > 0 ? (
                                <div className="text-center text-sm">
                                    <p>Te faltan <span className="font-bold">{formatCurrency(amountForFreeShipping, currency, { decimals: 2 })}</span> para el envío <b>GRATIS</b> y un <b>15% de descuento</b>.</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                                        <div className="bg-brand-purple-dark h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center text-sm font-semibold text-green-600 p-2 bg-green-50 rounded-md border border-green-200">¡Felicidades! Tienes envío GRATIS.</p>
                            )}
                            
                            {totalBeautyPoints > 0 && (
                                <div className="flex justify-center items-center gap-2 text-black font-semibold p-2 bg-brand-purple/20 rounded-md border border-brand-purple/50">
                                    <span>✨</span>
                                    <span>¡Conseguirás <b>{totalBeautyPoints} Puntos Beauty</b> con esta compra!</span>
                                </div>
                            )}

                            <div className="space-y-1 text-base">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Subtotal</span>
                                    <span className="font-semibold">{formatCurrency(subtotal, currency)}</span>
                                </div>
                                {discountAmount > 0 && (
                                     <div className="flex justify-between text-green-600">
                                        <span className="font-semibold">Descuento (15%)</span>
                                        <span className="font-semibold">-{formatCurrency(discountAmount, currency)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Envío</span>
                                    <span className="font-semibold">{shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost, currency)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-xl border-t pt-3 mt-2">
                                <span>Total</span>
                                <span>{formatCurrency(total, currency)}</span>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-3">
                                {checkoutError && (
                                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm" role="alert">
                                        <p className="font-bold">Error al procesar</p>
                                        <p>{checkoutError}</p>
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Botón para Generar Enlace */}
                                    <button
                                        onClick={handleCreateShareLink}
                                        className={`py-2 px-2 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1 border ${shareLinkStatus === 'copied' ? 'bg-green-50 text-green-700 border-green-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <ShareIcon />
                                        {shareLinkStatus === 'copied' ? 'Copiado' : 'Enlace'}
                                    </button>

                                    {/* Botón para Descargar CSV */}
                                    <button
                                        onClick={handleDownloadCSV}
                                        className="py-2 px-2 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1 border bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    >
                                        <DownloadIcon />
                                        CSV
                                    </button>
                                </div>

                                {/* Botón de Navegación Interna a la Pasarela de Pago */}
                                <button
                                    onClick={onCheckout}
                                    className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors flex justify-center items-center shadow-md transform active:scale-95 text-center"
                                >
                                     Finalizar Compra
                                </button>

                                <button
                                    onClick={onClose}
                                    className="w-full bg-transparent text-brand-primary font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Seguir Comprando
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                        <div className="bg-gray-50 p-6 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Tu carrito está vacío</h3>
                        <p className="text-gray-500 mt-2">Parece que aún no has añadido nada.</p>
                        <button
                            onClick={() => {
                                onClose();
                                onNavigate('products', 'all');
                            }}
                            className="mt-8 bg-brand-purple text-brand-primary font-semibold py-3 px-10 rounded-full hover:bg-brand-purple-dark transition-all transform hover:-translate-y-1 shadow-md"
                        >
                            Ir a la Tienda
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;