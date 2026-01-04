
import React, { useState, useMemo, useEffect } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface CheckoutPageProps {
    cartItems: CartItem[];
    currency: Currency;
    onClearCart: () => void;
    onNavigate: (view: View, payload?: any) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, currency, onClearCart, onNavigate }) => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', address: '', city: '', zip: '', phone: '', email: '', notes: ''
    });

    const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0), [cartItems]);
    const shippingCost = subtotal >= 35 ? 0 : 6.00;
    const total = subtotal + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) return;
        let message = `*Pedido Vellaperfumeria:* 🌸\n\n`;
        cartItems.forEach(item => {
            message += `• ${item.quantity}x ${item.product.name} - ${formatCurrency(item.product.price * item.quantity, currency)}\n`;
        });
        message += `\n*Total:* ${formatCurrency(total, currency)}\n`;
        message += `\n*Cliente:* ${formData.firstName} ${formData.lastName}\n*Tel:* ${formData.phone}\n*Dir:* ${formData.address}, ${formData.city}`;
        
        window.open(`https://wa.me/34661202616?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-white min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
                <div className="flex-grow space-y-8">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Detalles de Entrega</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input name="firstName" placeholder="Nombre" onChange={handleInputChange} className="bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-pink-200" />
                        <input name="lastName" placeholder="Apellidos" onChange={handleInputChange} className="bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-pink-200" />
                        <input name="address" placeholder="Dirección" onChange={handleInputChange} className="md:col-span-2 bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-pink-200" />
                        <input name="city" placeholder="Ciudad" onChange={handleInputChange} className="bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-pink-200" />
                        <input name="phone" placeholder="WhatsApp / Teléfono" onChange={handleInputChange} className="bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-pink-200" />
                        <textarea name="notes" placeholder="Notas adicionales del pedido..." onChange={handleInputChange} className="md:col-span-2 bg-gray-50 p-4 rounded-xl outline-none border border-transparent focus:border-pink-200 min-h-[120px]"></textarea>
                    </div>
                </div>

                <div className="w-full lg:w-96">
                    <div className="bg-gray-50 p-8 rounded-3xl sticky top-24 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-black uppercase tracking-widest mb-6">Resumen del Pedido</h2>
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600 truncate mr-4">{item.quantity}x {item.product.name}</span>
                                    <span className="font-bold flex-shrink-0">{formatCurrency(item.product.price * item.quantity, currency)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Subtotal</span>
                                <span className="font-bold">{formatCurrency(subtotal, currency)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Envío</span>
                                <span className="font-bold">{shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost, currency)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-black pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span className="text-pink-600">{formatCurrency(total, currency)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handlePlaceOrder}
                            disabled={cartItems.length === 0}
                            className="w-full bg-pink-600 text-white font-black py-4 rounded-2xl mt-8 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-pink-600/20 uppercase text-xs tracking-[0.2em] disabled:opacity-50 disabled:grayscale"
                        >
                            Finalizar por WhatsApp
                        </button>
                        
                        <button 
                            onClick={() => onNavigate('home')}
                            className="w-full text-gray-400 font-bold text-xs uppercase tracking-widest mt-4 hover:text-gray-600 transition-colors"
                        >
                            Seguir comprando
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Fix: Explicitly exporting default component to satisfy the import in App.tsx
export default CheckoutPage;
