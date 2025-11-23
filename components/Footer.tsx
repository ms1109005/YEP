
import React from 'react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-heading font-bold text-base md:text-lg mb-6 text-white uppercase tracking-wide">À propos</h4>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">
              La boutique officielle pour vos kits solaires prêts à expédier. Autonomie et liberté pour toutes vos aventures.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-accent hover:text-dark flex items-center justify-center transition-all duration-300"
                  aria-label={`Suivez-nous sur ${Icon.name}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading font-bold text-base md:text-lg mb-6 text-white uppercase tracking-wide">Navigation</h4>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => onNavigate('home')} 
                className="text-left text-gray-400 hover:text-accent transition-colors duration-300 text-sm md:text-base"
              >
                Accueil
              </button>
              <button 
                onClick={() => onNavigate('story')} 
                className="text-left text-gray-400 hover:text-accent transition-colors duration-300 text-sm md:text-base"
              >
                À propos
              </button>
              <button 
                onClick={() => onNavigate('shop')} 
                className="text-left text-gray-400 hover:text-accent transition-colors duration-300 text-sm md:text-base"
              >
                Boutique
              </button>
              <button 
                onClick={() => onNavigate('contact')} 
                className="text-left text-gray-400 hover:text-accent transition-colors duration-300 text-sm md:text-base"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold text-base md:text-lg mb-6 text-white uppercase tracking-wide">Support</h4>
            <div className="space-y-3">
              <a 
                href="mailto:hello@sunbag.fr" 
                className="block text-gray-400 hover:text-accent transition-colors duration-300 text-sm md:text-base"
              >
                hello@sunbag.fr
              </a>
              <p className="text-gray-400 text-sm md:text-base">+32 4 123 45 67</p>
              <p className="text-gray-400 text-sm md:text-base">Chat 7j/7</p>
            </div>
          </div>

          {/* Logistic */}
          <div>
            <h4 className="font-heading font-bold text-base md:text-lg mb-6 text-white uppercase tracking-wide">Logistique</h4>
            <div className="space-y-3">
              <p className="text-gray-400 text-sm md:text-base">Liège, Belgique</p>
              <p className="text-accent font-semibold text-sm md:text-base">Livraison express 24h</p>
              <button 
                onClick={() => onNavigate('contact')} 
                className="text-left text-gray-400 hover:text-accent transition-colors duration-300 underline decoration-gray-600 underline-offset-4 hover:decoration-accent text-sm md:text-base"
              >
                FAQ & retours
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs md:text-sm">
          © 2025 SUNBAG · Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};