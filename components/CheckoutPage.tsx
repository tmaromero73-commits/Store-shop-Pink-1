
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
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        email: '',
        notes: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const hasShippingSaver = useMemo(() => {
        return cartItems.some(item => item.product.isShippingSaver);
    }, [cartItems]);

    const shippingCost = subtotal >= 35 || hasShippingSaver ? 0 : 6.00;
    const total = subtotal + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio';
        if (!formData.lastName.trim()) newErrors.lastName = 'Los apellidos son obligatorios';
        if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';
        if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
        if (!formData.zip.trim()) newErrors.zip = 'El código postal es obligatorio';
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) return;
        if (!validateForm()) return;

        let message = `*Nuevo pedido en Vellaperfumeria:* 🌸\n\n`;
        cartItems.forEach(item => {
            message += `• [${item.quantity}] x ${item.product.name}`;
            if (item.selectedVariant) message += ` (${Object.values(item.selectedVariant).join(', ')})`;
            message += ` - ${formatCurrency(item.product.price * item.quantity, currency)}\n`;
        });
        message += `\n*Subtotal:* ${formatCurrency(subtotal, currency)}`;
        message += `\n*Envío:* ${shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost, currency)}`;
        message += `\n*Total:* ${formatCurrency(total, currency)}\n`;
        message += `\n--------------------------------\n`;
        message += `*Datos del Cliente:*\n`;
        message += `${formData.firstName} ${formData.lastName}\n${formData.address}, ${formData.city}\nCP: ${formData.zip}\nTel: ${formData.phone}\n`;
        if (formData.notes) message += `\n📝 *Notas:* ${formData.notes}`;

        const phoneNumber = "34661202616"; 
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-10 text-center md:text-left">Finalizar Compra</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl shadow-sm text-center border border-gray-100">
                        <p className="text-gray-400 mb-8 text-xl italic font-serif">Tu carrito está esperando ser llenado de belleza...</p>
                        <button onClick={() => onNavigate('products', 'all')} className="btn-primary">Ver la Tienda</button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        
                        {/* 1. Checkout Form (Left) */}
                        <div className="w-full lg:w-7/12 space-y-6">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-50 pb-4">Detalles de Facturación y Envío</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Nombre *</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full border-b-2 ${errors.firstName ? 'border-red-300' : 'border-gray-50'} focus:border-pink-300 bg-transparent py-2.5 outline-none transition-all`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Apellidos *</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full border-b-2 ${errors.lastName ? 'border-red-300' : 'border-gray-50'} focus:border-pink-300 bg-transparent py-2.5 outline-none transition-all`} />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Dirección Completa *</label>
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={`w-full border-b-2 ${errors.address ? 'border-red-300' : 'border-gray-50'} focus:border-pink-300 bg-transparent py-2.5 outline-none transition-all`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Localidad *</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={`w-full border-b-2 ${errors.city ? 'border-red-300' : 'border-gray-50'} focus:border-pink-300 bg-transparent py-2.5 outline-none transition-all`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Código Postal *</label>
                                        <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className={`w-full border-b-2 ${errors.zip ? 'border-red-300' : 'border-gray-50'} focus:border-pink-300 bg-transparent py-2.5 outline-none transition-all`} />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Teléfono *</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full border-b-2 ${errors.phone ? 'border-red-300' : 'border-gray-50'} focus:border-pink-300 bg-transparent py-2.5 outline-none transition-all`} />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">Notas del Pedido</label>
                                        <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full border border-gray-50 bg-gray-50/50 rounded-xl p-4 focus:ring-2 focus:ring-pink-100 outline-none transition-all resize-none mt-2" placeholder="Instrucciones especiales para la entrega..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Order Summary Block (Right - Style WooCommerce Block) */}
                        <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
                            <div className="wp-block-woocommerce-checkout-order-summary-cart-items-block bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Resumen del Pedido</h2>
                                
                                {/* Items List */}
                                <div className="space-y-6 max-h-[400px] overflow-y-auto mb-8 pr-2 scrollbar-thin">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                            <div className="flex gap-4">
                                                <div className="relative flex-shrink-0">
                                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl bg-gray-50 border border-gray-100 shadow-sm" />
                                                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white">
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">{item.product.name}</p>
                                                    {item.selectedVariant && (
                                                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                                                            {Object.values(item.selectedVariant).join(' / ')}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                                                {formatCurrency(item.product.price * item.quantity, currency)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals Section */}
                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-gray-900">{formatCurrency(subtotal, currency)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Gastos de Envío</span>
                                        <span className={`font-bold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                            {shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost, currency)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-bold text-gray-900 pt-6 border-t-2 border-pink-50">
                                        <span>Total</span>
                                        <span className="text-brand-primary">{formatCurrency(total, currency)}</span>
                                    </div>
                                </div>

                                <div className="mt-10 space-y-4">
                                    <button 
                                        onClick={handlePlaceOrder}
                                        className="w-full bg-[#25D366] text-white font-bold py-4.5 rounded-2xl shadow-xl hover:bg-[#20bd5a] hover:-translate-y-1 transition-all flex justify-center items-center gap-3 text-lg"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" /></svg>
                                        Encargar vía WhatsApp
                                    </button>
                                    <p className="text-[10px] text-center text-gray-400 px-4">Al pulsar en "Encargar", se abrirá WhatsApp con el resumen de tu pedido para que podamos gestionarlo personalmente.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
            <style>{`
                .scrollbar-thin::-webkit-scrollbar { width: 4px; }
                .scrollbar-thin::-webkit-scrollbar-track { background: #f9fafb; }
                .scrollbar-thin::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
                button.py-4.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
            `}</style>
        </div>
    );
};

export default CheckoutPage;
