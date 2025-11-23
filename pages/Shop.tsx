
import React, { useState, useEffect } from 'react';
import { products } from '../data';
import { Product } from '../types';
import { Plus, Check, Eye, Search, X, Filter } from 'lucide-react';

interface ShopProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  initialSearch?: string;
}

export const Shop: React.FC<ShopProps> = ({ onAddToCart, onViewProduct, initialSearch = '' }) => {
  const [filter, setFilter] = useState<'all' | 'kits' | 'batteries' | 'accessoires'>('all');
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Update internal search if initialSearch prop changes (from Header)
  useEffect(() => {
    if (initialSearch) {
        setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // Add To Cart Animation logic
  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAnimatingId(product.id);
    setTimeout(() => setAnimatingId(null), 1000);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-[110px] pb-20 bg-gray-50">
      {/* Header Boutique Stylisé - CSS Only Texture */}
      <div className="bg-dark text-white py-20 px-6 text-center relative overflow-hidden">
         {/* CSS Radial Gradient Pattern instead of external URL for reliability */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-dark to-dark" style={{ backgroundSize: '10px 10px', backgroundImage: 'radial-gradient(circle, #4a4a4a 1px, transparent 1px)' }}></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
         
         <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl mb-6">Explorez la Gamme</h1>
            <p className="text-gray-300 text-xl font-light">
            Des kits prêts à l'emploi aux composants à l'unité. Trouvez la configuration qui correspond à votre style de voyage.
            </p>
         </div>
      </div>

      {/* Filter & Search Bar Container */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Filters */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    <span className="text-gray-400 mr-2 hidden md:block"><Filter size={18} /></span>
                    {[
                        { id: 'all', label: 'Tout voir' },
                        { id: 'kits', label: 'Kits Solaires' },
                        { id: 'batteries', label: 'Batteries' },
                        { id: 'accessoires', label: 'Accessoires' },
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setFilter(btn.id as any)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                                filter === btn.id 
                                ? 'bg-accent text-dark shadow-md transform scale-105' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={18} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Rechercher un produit..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-100 border-2 border-transparent focus:bg-white focus:border-primary outline-none transition-all text-sm font-medium"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6 max-w-7xl mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
                <div 
                    key={product.id} 
                    onClick={() => onViewProduct(product)}
                    className="group bg-white rounded-[2rem] p-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer relative border border-gray-100"
                >
                    
                    {/* Image Area */}
                    <div className={`relative aspect-[4/3] rounded-[1.5rem] mb-6 ${product.imageColor} overflow-hidden flex items-center justify-center`}>
                         <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                         />
                        
                        {/* Badges */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                            {product.badges.map((badge, i) => (
                                <span key={i} className="bg-white/90 backdrop-blur text-dark text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* Stock */}
                        {product.inStock && (
                            <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 z-10">
                                <Check size={10} strokeWidth={4} /> EN STOCK
                            </div>
                        )}

                        {/* View Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white px-5 py-2.5 rounded-full text-dark font-bold text-sm flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <Eye size={16} /> Voir détails
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-2 pb-2 flex flex-col flex-1">
                        <h3 className="font-heading font-bold text-xl text-dark mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Specs */}
                        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                            {product.specs.slice(0, 2).map((spec, i) => (
                                <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200">
                                    {spec}
                                </span>
                            ))}
                            {product.specs.length > 2 && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200">
                                    +{product.specs.length - 2}
                                </span>
                            )}
                        </div>

                        {/* Footer Card */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-medium">Prix TTC</span>
                                <span className="text-2xl font-bold text-dark font-heading">
                                    {product.price.toFixed(2)} €
                                </span>
                            </div>
                            
                            {/* Desktop: Add Button with Text */}
                            <button 
                                onClick={(e) => handleAdd(e, product)}
                                disabled={animatingId === product.id}
                                className={`hidden md:flex px-6 py-3 rounded-full font-bold text-sm items-center gap-2 transition-all duration-300 shadow-md transform hover:-translate-y-0.5 ${
                                    animatingId === product.id 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-dark text-white hover:bg-accent hover:text-dark'
                                }`}
                            >
                                {animatingId === product.id ? (
                                    <>Ajouté <Check size={18} /></>
                                ) : (
                                    <>Ajouter <Plus size={18} /></>
                                )}
                            </button>

                            {/* Mobile: Circular Button */}
                            <button 
                                onClick={(e) => handleAdd(e, product)}
                                disabled={animatingId === product.id}
                                className={`md:hidden w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                                    animatingId === product.id 
                                    ? 'bg-green-500 text-white scale-110' 
                                    : 'bg-dark text-white hover:bg-accent hover:text-dark hover:scale-110'
                                }`}
                            >
                                {animatingId === product.id ? (
                                    <Check size={22} />
                                ) : (
                                    <Plus size={22} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {filteredProducts.length === 0 && (
            <div className="text-center py-32">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-500">Essayez de modifier votre recherche ou vos filtres.</p>
                <button onClick={() => {setSearchQuery(''); setFilter('all');}} className="mt-6 text-primary font-bold hover:underline">
                    Réinitialiser les filtres
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
