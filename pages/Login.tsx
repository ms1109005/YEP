
import React, { useState } from 'react';
import { Page, User } from '../types';
import { authService } from '../auth';
import { LogIn, AlertCircle } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: Page) => void;
  onLoginSuccess: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await authService.login(email, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[120px] pb-20 bg-light flex items-center justify-center px-6">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-3xl text-dark mb-2">Connexion</h1>
          <p className="text-gray-500">Heureux de vous revoir sur SUNBAG.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-2 text-sm font-medium">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-light border border-transparent focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all"
              placeholder="votre@email.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Mot de passe</label>
              <a href="#" className="text-sm text-primary hover:underline">Oublié ?</a>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-light border border-transparent focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-4 rounded-full hover:bg-secondary transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'Connexion...' : <><LogIn size={20} /> Se connecter</>}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          Pas encore de compte ?{' '}
          <button 
            onClick={() => onNavigate('register')}
            className="text-primary font-bold hover:underline"
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
};