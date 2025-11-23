
import React from 'react';
import { User, Page } from '../types';
import { LogOut, Package, User as UserIcon, Settings } from 'lucide-react';

interface AccountProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

export const Account: React.FC<AccountProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <div className="min-h-screen pt-[110px] pb-20 bg-light">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-dark">Mon Compte</h1>
                <p className="text-gray-500 text-lg">Bienvenue, {user.name} 👋</p>
            </div>
            <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors font-bold w-fit"
            >
                <LogOut size={20} /> Déconnexion
            </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 col-span-1">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
                    <UserIcon size={32} />
                </div>
                <h3 className="font-bold text-xl mb-1 text-center md:text-left">{user.name}</h3>
                <p className="text-gray-500 text-sm mb-6 text-center md:text-left">{user.email}</p>
                <button className="w-full py-2 px-4 rounded-lg bg-light hover:bg-gray-200 text-dark text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    <Settings size={16} /> Modifier le profil
                </button>
            </div>

            {/* Orders Mockup */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 md:col-span-2">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                    <Package className="text-primary" /> Mes Commandes
                </h3>
                
                {/* Empty State Mockup */}
                <div className="text-center py-10 bg-light/50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 mb-4">Vous n'avez pas encore passé de commande.</p>
                    <button 
                        onClick={() => onNavigate('shop')}
                        className="text-primary font-bold hover:underline"
                    >
                        Découvrir la boutique
                    </button>
                </div>

                {/* Example of what a past order would look like (hidden for now/mock) */}
                {/* 
                <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center p-4 bg-light rounded-xl">
                        <div>
                            <div className="font-bold text-dark">Commande #FR-8823</div>
                            <div className="text-xs text-gray-500">24 Octobre 2024 • Livré</div>
                        </div>
                        <div className="font-bold text-primary">179.00 €</div>
                    </div>
                </div> 
                */}
            </div>
        </div>
      </div>
    </div>
  );
};