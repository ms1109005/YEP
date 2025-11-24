
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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (value: string) => {
    if (!value) return 'L\'email est requis';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Format d\'email invalide';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Le mot de passe est requis';
    if (value.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setPasswordError(validatePassword(value));
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'email') {
      setEmailError(validateEmail(email));
    } else {
      setPasswordError(validatePassword(password));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, password: true });
    
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    setLoading(true);

    try {
      const user = await authService.login(email, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la connexion');
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
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input 
              id="email"
              type="email" 
              required
              value={email}
              onChange={handleEmailChange}
              onBlur={() => handleBlur('email')}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-light border-2 transition-all outline-none ${
                emailError 
                  ? 'border-red-300 focus:border-red-500 focus:bg-white' 
                  : 'border-transparent focus:bg-white focus:border-primary'
              }`}
              placeholder="votre@email.com"
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                <span>•</span> {emailError}
              </p>
            )}
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm font-bold text-gray-700">
                Mot de passe
              </label>
              <button 
                type="button"
                onClick={() => {}}
                className="text-sm text-primary hover:underline"
              >
                Oublié ?
              </button>
            </div>
            <input 
              id="password"
              type="password" 
              required
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('password')}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? 'password-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-light border-2 transition-all outline-none ${
                passwordError 
                  ? 'border-red-300 focus:border-red-500 focus:bg-white' 
                  : 'border-transparent focus:bg-white focus:border-primary'
              }`}
              placeholder="••••••••"
            />
            {passwordError && (
              <p id="password-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                <span>•</span> {passwordError}
              </p>
            )}
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