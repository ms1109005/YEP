
import React, { useState } from 'react';
import { Page, User } from '../types';
import { authService } from '../auth';
import { UserPlus, AlertCircle } from 'lucide-react';

interface RegisterProps {
  onNavigate: (page: Page) => void;
  onLoginSuccess: (user: User) => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ name: false, email: false, password: false });

  const validateName = (value: string) => {
    if (!value.trim()) return 'Le nom est requis';
    if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value) return 'L\'email est requis';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Format d\'email invalide';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Le mot de passe est requis';
    if (value.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
    if (!/(?=.*[a-z])/.test(value)) return 'Le mot de passe doit contenir au moins une minuscule';
    if (!/(?=.*[A-Z])/.test(value)) return 'Le mot de passe doit contenir au moins une majuscule';
    if (!/(?=.*\d)/.test(value)) return 'Le mot de passe doit contenir au moins un chiffre';
    return '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (touched.name) {
      setNameError(validateName(value));
    }
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

  const handleBlur = (field: 'name' | 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'name') {
      setNameError(validateName(name));
    } else if (field === 'email') {
      setEmailError(validateEmail(email));
    } else {
      setPasswordError(validatePassword(password));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouched({ name: true, email: true, password: true });
    
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (nameErr || emailErr || passwordErr) {
      return;
    }

    setLoading(true);

    try {
      const user = await authService.register(name, email, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[120px] pb-20 bg-light flex items-center justify-center px-6">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-3xl text-dark mb-2">Créer un compte</h1>
          <p className="text-gray-500">Rejoignez la communauté SUNBAG.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-2 text-sm font-medium">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
              Nom complet
            </label>
            <input 
              id="name"
              type="text" 
              required
              value={name}
              onChange={handleNameChange}
              onBlur={() => handleBlur('name')}
              aria-invalid={!!nameError}
              aria-describedby={nameError ? 'name-error' : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-light border-2 transition-all outline-none ${
                nameError 
                  ? 'border-red-300 focus:border-red-500 focus:bg-white' 
                  : 'border-transparent focus:bg-white focus:border-primary'
              }`}
              placeholder="Jean Dupont"
            />
            {nameError && (
              <p id="name-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                <span>•</span> {nameError}
              </p>
            )}
          </div>
          
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
              placeholder="jean@exemple.com"
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                <span>•</span> {emailError}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
              Mot de passe
            </label>
            <input 
              id="password"
              type="password" 
              required
              minLength={6}
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
              placeholder="6 caractères minimum"
            />
            {passwordError && (
              <p id="password-error" className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                <span>•</span> {passwordError}
              </p>
            )}
            {!passwordError && password && (
              <p className="mt-1 text-xs text-gray-500">
                Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre.
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-4 rounded-full hover:bg-secondary transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'Création...' : <><UserPlus size={20} /> S'inscrire</>}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          Déjà un compte ?{' '}
          <button 
            onClick={() => onNavigate('login')}
            className="text-primary font-bold hover:underline"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};