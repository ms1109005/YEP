
import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (index: number) => void;
  onCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-light/50">
          <h3 className="font-heading font-bold text-xl flex items-center gap-2">
            <ShoppingBag className="text-primary" /> 
            Mon Panier
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
              <ShoppingBag size={64} opacity={0.2} />
              <p>Votre panier est vide.</p>
              <button onClick={onClose} className="text-primary font-bold hover:underline">
                Retourner à la boutique
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center gap-4 p-4 bg-light rounded-xl">
                  <div className={`w-16 h-16 rounded-lg ${item.imageColor} flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-dark/30`}>
                     {item.category}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-dark line-clamp-1">{item.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500">Qté: {item.qty}</span>
                        <span className="font-bold text-primary">{item.price.toFixed(2)} €</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemove(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-light/30">
          <div className="flex justify-between items-center mb-6 text-xl font-heading font-bold">
            <span>Total</span>
            <span className="text-primary">{total.toFixed(2)} €</span>
          </div>
          <button 
            className="w-full bg-primary text-white py-4 rounded-full font-bold hover:bg-secondary transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={cart.length === 0}
            onClick={onCheckout}
          >
            Passer au paiement
          </button>
        </div>

      </div>
    </>
  );
};
