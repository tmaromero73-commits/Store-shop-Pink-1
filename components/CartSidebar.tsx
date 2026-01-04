
import React, { useMemo, useRef } from 'react';
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

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, currency, onUpdateQuantity, onRemoveItem, onCheckout, onNavigate }) => {
    const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0), [cartItems]);
    const shipping = subtotal >= 35 ? 0 : 6.00;

    return (
        <div className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-8 border-b flex items-center justify-between">
                    <h2 className="text-xl font-black uppercase tracking-widest">Mi Cesta</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><CloseIcon /></button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 space-y-6">
                    {cartItems.length > 0 ? cartItems.map(item => (
                        <div key={item.id} className="flex gap-6 items-center border-b pb-6">
                            <img src={item.product.imageUrl} className="w-20 h-20 object-contain bg-gray-50 rounded-xl" alt={item.product.name} />
                            <div className="flex-grow">
                                <h3 className="text-xs font-black text-black uppercase">{item.product.name}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-black">{formatCurrency(item.product.price * item.quantity, currency)}</span>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="text-gray-400">-</button>
                                        <span className="text-xs font-bold">{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="text-gray-400">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-gray-400 py-20 font-bold uppercase text-sm tracking-widest">Cesta Vacía</p>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-8 bg-gray-50 space-y-4">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal, currency)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                            <span>Envío</span>
                            <span>{shipping === 0 ? 'GRATIS' : formatCurrency(shipping, currency)}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-black pt-4 border-t">
                            <span>Total</span>
                            <span className="text-black">{formatCurrency(subtotal + shipping, currency)}</span>
                        </div>
                        <button onClick={onCheckout} className="w-full bg-[#FBCFE8] text-black font-black py-5 rounded-2xl hover:brightness-105 transition-all shadow-xl shadow-[#FBCFE8]/20 uppercase text-[11px] tracking-widest">
                            Finalizar Compra
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
