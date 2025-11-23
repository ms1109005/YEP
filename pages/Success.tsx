
import React from 'react';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { Page } from '../types';

interface SuccessProps {
  onNavigate: (page: Page) => void;
}

export const Success: React.FC<SuccessProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-[110px] flex items-center justify-center bg-light px-6">
      <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl max-w-lg w-full text-center border border-gray-100 relative overflow-hidden">
        {/* Confetti bg effect */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#1A4D2E_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-inner">
                <CheckCircle size={48} strokeWidth={3} />
            </div>
            
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-dark mb-4">Merci pour votre commande !</h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Votre équipement SUNBAG sera préparé avec soin dès aujourd'hui. Vous recevrez un email de confirmation dans quelques instants.
            </p>
            
            <div className="bg-light p-6 rounded-2xl mb-8 text-left border border-gray-200">
                <h4 className="font-bold text-dark mb-2">Prochaines étapes :</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Préparation à l'atelier (Liège)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> Expédition (24h)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> Livraison chez vous</li>
                </ul>
            </div>

            <button 
                onClick={() => onNavigate('home')}
                className="w-full bg-primary text-white font-bold py-4 rounded-full hover:bg-secondary transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
                Retour à l'accueil <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};
