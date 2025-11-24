import React, { useState } from 'react';
import { ArrowLeft, Check, ShoppingBag, Truck, ShieldCheck, RefreshCcw, Info, Table } from 'lucide-react';
import { Product, Page } from '../types';
import { ProductGallery } from '../components/ProductGallery';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  onNavigate?: (page: Page) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart, onBack, onNavigate }) => {
  const [animating, setAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');
  
  const handleNavigate = (page: Page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      onBack();
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 1000);
  };

  return (
    <div className="min-h-screen pt-[110px] pb-32 md:pb-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumbs */}
        {onNavigate && (
          <div className="mt-8 mb-6">
            <Breadcrumbs 
              items={[
                { label: 'Boutique', page: 'shop' },
                { label: product.name }
              ]}
              onNavigate={handleNavigate}
            />
          </div>
        )}
        
        {/* Back Button (fallback if no onNavigate) */}
        {!onNavigate && (
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onBack) {
                onBack();
              }
            }}
            className="inline-flex items-center gap-3 text-gray-600 hover:text-primary font-medium mb-12 mt-8 group transition-all duration-300 px-4 py-2 rounded-full hover:bg-primary/5 cursor-pointer z-50 relative"
            style={{ pointerEvents: 'auto', WebkitTapHighlightColor: 'transparent' }}
            aria-label="Retour à la boutique"
          >
            <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-primary/10 transition-colors">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="font-semibold">Retour à la boutique</span>
          </button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-12 md:mb-20">
          
          {/* Left Column: Gallery */}
          <div className="w-full">
            <ProductGallery 
                images={product.images} 
                alt={product.name} 
                imageColor={product.imageColor} 
            />
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {product.badges.map((badge, i) => (
                    <span key={i} className="bg-accent text-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {badge}
                    </span>
                ))}
                {product.inStock && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        En Stock
                    </span>
                )}
            </div>

            <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-dark mb-4 leading-tight">
                {product.name}
            </h1>

            <div className="text-3xl font-bold text-primary mb-6">
                {product.price.toFixed(2)} €
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 border-b border-gray-100 pb-8">
                {product.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-dark font-medium bg-light p-3 rounded-lg text-sm md:text-base">
                        <Check size={16} className="text-primary flex-shrink-0" />
                        {spec}
                    </div>
                ))}
            </div>

            {/* Actions - Desktop */}
            <div className="hidden md:flex items-center gap-4 mb-10">
                <button 
                    onClick={handleAddToCart}
                    disabled={animating}
                    className={`flex-1 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all duration-300 ${
                        animating 
                        ? 'bg-green-500 text-white scale-95' 
                        : 'bg-primary text-white hover:bg-secondary hover:-translate-y-1'
                    }`}
                >
                    {animating ? (
                        <>Ajouté au panier <Check /></>
                    ) : (
                        <>Ajouter au panier <ShoppingBag /></>
                    )}
                </button>
            </div>

            {/* Trust elements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 border-t border-gray-100 pt-8">
                <div className="flex flex-col items-center text-center gap-2">
                    <Truck className="text-dark" size={24} />
                    <span>Livraison 24h offerte</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <ShieldCheck className="text-dark" size={24} />
                    <span>Garantie 3 ans</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <RefreshCcw className="text-dark" size={24} />
                    <span>Retours gratuits 30j</span>
                </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Section */}
        {(product.longDescription || product.technicalSpecs || product.features) && (
            <div className="mt-12 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs Header */}
                <div className="flex border-b border-gray-100 overflow-x-auto">
                    <button 
                        onClick={() => setActiveTab('description')}
                        className={`flex-1 py-4 md:py-5 px-4 text-center font-bold text-base md:text-lg transition-colors whitespace-nowrap ${activeTab === 'description' ? 'bg-white text-primary border-b-2 border-primary' : 'bg-light/50 text-gray-500 hover:bg-gray-50'}`}
                    >
                        Description
                    </button>
                    {product.technicalSpecs && (
                        <button 
                            onClick={() => setActiveTab('specs')}
                            className={`flex-1 py-4 md:py-5 px-4 text-center font-bold text-base md:text-lg transition-colors whitespace-nowrap ${activeTab === 'specs' ? 'bg-white text-primary border-b-2 border-primary' : 'bg-light/50 text-gray-500 hover:bg-gray-50'}`}
                        >
                            Spécifications Techniques
                        </button>
                    )}
                </div>

                {/* Tabs Content */}
                <div className="p-6 md:p-12">
                    {activeTab === 'description' && (
                        <div className="max-w-4xl mx-auto">
                            {/* Features List */}
                            {product.features && product.features.length > 0 && (
                                <div className="mb-8 grid md:grid-cols-2 gap-4">
                                    {product.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-light/50 p-4 rounded-xl">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check size={14} />
                                            </div>
                                            <span className="font-medium text-dark text-sm md:text-base">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {/* Long Description HTML */}
                            {product.longDescription && (
                                <div 
                                    className="prose prose-lg text-gray-600 leading-relaxed max-w-none"
                                    dangerouslySetInnerHTML={{ __html: product.longDescription }} 
                                />
                            )}
                        </div>
                    )}

                    {activeTab === 'specs' && product.technicalSpecs && (
                        <div className="max-w-3xl mx-auto">
                            <div className="overflow-hidden rounded-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Object.entries(product.technicalSpecs).map(([key, value]) => (
                                            <tr key={key} className="hover:bg-light/50 transition-colors">
                                                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-bold text-dark bg-light/30 w-1/3 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </td>
                                                <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600 break-words">
                                                    {value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:hidden z-40 flex items-center gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
          <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium uppercase">Total</span>
              <span className="text-xl font-bold text-primary">{product.price.toFixed(2)} €</span>
          </div>
          <button 
              onClick={handleAddToCart}
              disabled={animating}
              className={`flex-1 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  animating 
                  ? 'bg-green-500 text-white' 
                  : 'bg-primary text-white active:scale-95'
              }`}
          >
              {animating ? (
                  <>Ajouté ! <Check size={18}/></>
              ) : (
                  <>Ajouter au panier <ShoppingBag size={18} /></>
              )}
          </button>
      </div>

    </div>
  );
};