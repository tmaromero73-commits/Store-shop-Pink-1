
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const categories = [
    { key: 'all', name: 'Todos los productos' },
    { key: 'skincare', name: 'Cuidado Facial' },
    { key: 'makeup', name: 'Maquillaje' },
    { key: 'perfume', name: 'Fragancias' },
    { key: 'wellness', name: 'Wellness' },
    { key: 'hair', name: 'Cuidado del Cabello' },
    { key: 'personal-care', name: 'Cuidado Personal' },
    { key: 'the-one', name: 'Colección THE ONE' },
    { key: 'accessories', name: 'Accesorios' },
];

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ShopPage: React.FC<{
    currency: Currency;
    initialCategory: string;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, initialCategory, onAddToCart, onQuickAddToCart, onProductSelect, onQuickView }) => {
    
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sortOrder, setSortOrder] = useState('menu_order');
    
    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...allProducts];

        if (activeCategory === 'the-one') {
            filtered = allProducts.filter(p => p.brand.toUpperCase().includes('THE ONE'));
        } else if (activeCategory !== 'all') {
            filtered = allProducts.filter(p => p.category === activeCategory);
        }

        switch (sortOrder) {
            case 'price': filtered.sort((a, b) => a.price - b.price); break;
            case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
            case 'rating': filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
            default: break;
        }
        return filtered;
    }, [activeCategory, sortOrder]);

    /**
     * Función de escapado robusta para CSV según Estándar RFC 4180.
     * Cuida las comas, saltos de línea y escapa las comillas dobles.
     */
    const escapeCSV = (val: any): string => {
        if (val === null || val === undefined) return '""';
        let s = String(val).trim();
        // Escapamos comillas dobles internas duplicándolas (" -> "")
        s = s.replace(/"/g, '""');
        // Envolvemos el valor en comillas dobles para proteger comas y saltos de línea
        return `"${s}"`;
    };

    const handleDownloadFullCSV = () => {
        // Cabeceras oficiales compatibles con el importador nativo de WooCommerce
        const headers = [
            "ID", "Type", "SKU", "Name", "Published", "Is featured?", "Visibility in catalog", 
            "Short description", "Description", "In stock?", "Stock", "Sale price", "Regular price", 
            "Categories", "Images", "Attribute 1 name", "Attribute 1 value(s)", "Attribute 1 visible", "Attribute 1 global"
        ];
        
        const rows = allProducts.map(p => {
            const catName = categories.find(c => c.key === p.category)?.name || p.category;
            const shortDesc = `Vellaperfumeria - ${p.brand}`;

            return [
                p.id,
                "simple",
                `VELLA-${p.id}`,
                escapeCSV(p.name),
                1,
                0,
                "visible",
                escapeCSV(shortDesc),
                escapeCSV(p.description), // Cuidado especial para que no rompa las columnas
                1,
                p.stock,
                p.price.toFixed(2),
                p.regularPrice ? p.regularPrice.toFixed(2) : p.price.toFixed(2),
                escapeCSV(catName),
                escapeCSV(p.imageUrl), // La URL de la foto íntegra
                escapeCSV("Marca"),
                escapeCSV(p.brand),
                1,
                1
            ].join(",");
        });

        // Marcador BOM (\uFEFF) para compatibilidad total con tildes y ñ en Excel
        const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `CATALOGO_VELLA_IMPORT_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            {/* PANEL DE EXPORTACIÓN (Rosa Glass) */}
            <div className="mb-12 p-1 bg-gradient-to-r from-brand-primary/40 via-brand-primary/10 to-brand-primary/40 rounded-[2.6rem] shadow-sm">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/20 text-brand-primary">
                            <DownloadIcon />
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-1">Exportar Base de Datos</h2>
                            <p className="text-gray-500 text-sm max-w-sm">
                                Genera un archivo CSV profesional con descripciones y fotos cuidadas, listo para importar.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={handleDownloadFullCSV}
                        className="relative z-10 flex items-center gap-3 bg-brand-primary text-white px-10 py-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest hover:brightness-105 active:scale-95 shadow-lg shadow-brand-primary/20"
                    >
                        Descargar CSV de Productos
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-gray-100 pb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                        {categories.find(c => c.key === activeCategory)?.name || 'Tienda'}
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">Mostrando {filteredAndSortedProducts.length} tesoros encontrados.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                    <select 
                        value={activeCategory} 
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="bg-white border border-gray-200 rounded-xl py-3 px-6 text-xs font-bold uppercase tracking-widest text-gray-700 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all cursor-pointer shadow-sm"
                    >
                        {categories.map(cat => (
                            <option key={cat.key} value={cat.key}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredAndSortedProducts.length > 0 ? filteredAndSortedProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        currency={currency}
                        onAddToCart={onAddToCart}
                        onQuickAddToCart={onQuickAddToCart}
                        onProductSelect={onProductSelect}
                        onQuickView={onQuickView}
                    />
                )) : (
                    <div className="col-span-full py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <div className="text-4xl mb-4">🌸</div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Pronto tendremos más novedades aquí</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
