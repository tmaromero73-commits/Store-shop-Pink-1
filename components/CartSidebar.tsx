
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
const DISCOUNT_THRESHOLD = 35; 
const DISCOUNT_PERCENTAGE = 0.15; 
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

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, currency, onUpdateQuantity, onRemoveItem, onCheckout, isCheckingOut, checkoutError, onNavigate }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        if (subtotal >= DISCOUNT_THRESHOLD) return subtotal * DISCOUNT_PERCENTAGE;
        return 0;
    }, [subtotal]);

    const hasShippingSaver = useMemo(() => {
        return cartItems.some(item => item.product.isShippingSaver);
    }, [cartItems]);

    const shippingCost = useMemo(() => {
        if (hasShippingSaver || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
        return SHIPPING_COST;
    }, [subtotal, hasShippingSaver]);

    const total = subtotal - discountAmount + shippingCost;

    return (
        <div
            role="dialog"
            className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-black uppercase tracking-widest">Carrito</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><CloseIcon /></button>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex-grow flex flex-col overflow-hidden">
                        <div className="flex-grow overflow-y-auto p-6 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                    <img src={item.product.imageUrl} className="w-20 h-20 object-contain bg-white rounded-xl p-1" alt={item.product.name} />
                                    <div className="flex-grow">
                                        <h3 className="text-xs font-bold text-gray-800 line-clamp-2">{item.product.name}</h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-sm font-black">{formatCurrency(item.product.price * item.quantity, currency)}</span>
                                            <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-500"><TrashIcon /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t bg-gray-50 space-y-4">
                            <div className="flex justify-between text-sm font-bold">
                                <span className="text-gray-500">Subtotal</span>
                                <span>{formatCurrency(subtotal, currency)}</span>
                            </div>
                            {discountAmount > 0 && (
                                <div className="flex justify-between text-sm text-green-600 font-bold">
                                    <span>Descuento (15%)</span>
                                    <span>-{formatCurrency(discountAmount, currency)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm font-bold">
                                <span className="text-gray-500">Envío</span>
                                <span>{shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost, currency)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-black pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span className="text-pink-600">{formatCurrency(total, currency)}</span>
                            </div>

                            <button
                                onClick={onCheckout}
                                className="w-full bg-pink-200 text-black font-black py-4 rounded-2xl hover:brightness-105 transition-all shadow-xl shadow-pink-200/20 uppercase text-xs tracking-[0.2em]"
                            >
                                Finalizar Pedido
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full text-gray-400 font-bold text-xs uppercase tracking-widest py-2"
                            >
                                Continuar Comprando
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Tu cesta está vacía</p>
                        <button onClick={() => {onClose(); onNavigate('products', 'all');}} className="mt-6 text-pink-500 font-black underline">IR A LA TIENDA</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
