
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X, User as UserIcon, LogOut, Search, ArrowUp } from 'lucide-react';
import { Page, User } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onNavigate: (page: Page) => void;
  onSearch?: (query: string) => void;
  currentPage: Page;
  user: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, cartTotal, onOpenCart, onNavigate, onSearch, currentPage, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prevCartCount = useRef(cartCount);

  // Animate cart when items are added
  useEffect(() => {
    if (cartCount > prevCartCount.current) {
        setAnimateCart(true);
        setTimeout(() => setAnimateCart(false), 300);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        onNavigate('shop');
      }
      setIsSearchOpen(false);
      // Keep query for UX or clear it? Let's keep it in Shop component state, clear here
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="absolute top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-[110px] flex items-center transition-all">
        <div className="container mx-auto pl-2 pr-6 flex justify-between items-center max-w-7xl">
          
          {/* Left Section: Logo */}
          <div className="flex items-center gap-6">
              {/* Logo */}
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNav('home'); }} 
                className="flex items-center gap-2 group flex-shrink-0 -ml-2"
              >
                  <img 
                    src="images/logo.png" 
                    alt="SUNBAG" 
                    className="h-36 md:h-64 w-auto object-contain"
                  />
              </a>
          </div>
  
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: 'Accueil' },
              { id: 'story', label: 'À propos' },
              { id: 'shop', label: 'Boutique' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id as Page)}
                className={`font-medium text-base transition-colors duration-300 relative group ${
                  currentPage === link.id ? 'text-primary font-bold' : 'text-dark hover:text-accent'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ease-out bg-current ${
                  currentPage === link.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`} />
              </button>
            ))}
          </nav>
  
          <div className="flex items-center gap-2 md:gap-4">
            {/* Discreet Search Bar (Desktop) */}
            <div className={`hidden md:flex items-center bg-light/50 rounded-full transition-all duration-300 ease-out border ${isSearchOpen ? 'w-64 border-gray-200 shadow-inner' : 'w-10 border-transparent bg-transparent'}`}>
                  <button 
                      onClick={toggleSearch}
                      className="p-2 text-dark hover:text-accent transition-colors duration-300 flex-shrink-0"
                      aria-label="Rechercher"
                  >
                      <Search size={20} />
                  </button>
                  <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                      placeholder="Rechercher..."
                      className={`bg-transparent border-none outline-none text-sm text-dark placeholder-gray-400 h-full transition-all duration-300 ${isSearchOpen ? 'w-full px-2 opacity-100' : 'w-0 px-0 opacity-0'}`}
                  />
                  {isSearchOpen && searchQuery && (
                      <button 
                          onClick={() => setSearchQuery('')}
                          className="p-2 text-gray-400 hover:text-dark transition-colors duration-300"
                      >
                          <X size={14} />
                      </button>
                  )}
              </div>
  
            {/* User Account (Desktop) */}
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                  <button 
                      onClick={() => handleNav('account')}
                      className={`flex items-center gap-2 font-medium transition-colors duration-300 relative group ${currentPage === 'account' ? 'text-primary' : 'text-dark hover:text-primary'}`}
                  >
                      <UserIcon size={20} />
                      <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${currentPage === 'account' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} />
                  </button>
              </div>
            ) : (
              <button 
                  onClick={() => handleNav('login')}
                  className="hidden md:flex text-dark font-medium hover:text-accent transition-colors duration-300 relative group"
              >
                  Connexion
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 ease-out opacity-0 group-hover:w-full group-hover:opacity-100"></span>
              </button>
            )}
  
            {/* Cart Button (Desktop) */}
            <button 
              onClick={onOpenCart}
              className={`hidden md:flex items-center gap-2 bg-accent text-dark px-5 py-3 rounded-full font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group ${animateCart ? 'scale-110 shadow-xl bg-white' : ''}`}
            >
              <ShoppingBag size={20} className={`transition-transform ${animateCart ? 'scale-125 text-primary' : 'group-hover:scale-110'}`} />
              <span>Panier</span>
              {cartCount > 0 && (
                <div className="flex items-center gap-2 ml-1 pl-2 border-l border-dark/20">
                  <span className="bg-white text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                  <span className="text-sm font-extrabold">
                      {cartTotal.toFixed(2)} €
                  </span>
                </div>
              )}
            </button>
  
            {/* Mobile Cart Icon */}
            <button 
              onClick={onOpenCart}
              className={`md:hidden p-2 text-dark relative hover:text-accent transition-colors duration-300 ${animateCart ? 'scale-110' : ''}`}
              aria-label="Panier"
            >
              <ShoppingBag size={26} className={animateCart ? 'text-accent' : ''} />
              {cartCount > 0 && (
                  <span className="absolute top-1 right-0 bg-accent text-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {cartCount}
                  </span>
              )}
            </button>
  
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-dark focus:outline-none hover:text-accent transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Full Screen Overlay */}
      <div className={`fixed inset-0 bg-white z-[60] flex flex-col transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          
          {/* Mobile Header inside Menu */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <img src="images/sunbag-logo-alt.png" alt="Logo" className="h-10 w-auto" />
             <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-dark hover:text-accent transition-colors bg-gray-100 rounded-full"
             >
               <X size={24} />
             </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-8 overflow-y-auto pb-20 p-6">
            {/* Mobile Search */}
            <div className="w-full max-w-xs relative">
                <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-accent focus:bg-white transition-all text-dark font-medium shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
    
            <div className="flex flex-col items-center gap-6 w-full">
                <button onClick={() => handleNav('home')} className="text-3xl font-heading font-bold text-dark hover:text-accent transition-colors">
                    Accueil
                </button>
                <button onClick={() => handleNav('story')} className="text-3xl font-heading font-bold text-dark hover:text-accent transition-colors">
                    À propos
                </button>
                <button onClick={() => handleNav('shop')} className="text-3xl font-heading font-bold text-dark hover:text-accent transition-colors">
                    Boutique
                </button>
                <button onClick={() => handleNav('contact')} className="text-3xl font-heading font-bold text-dark hover:text-accent transition-colors">
                    Contact
                </button>
            </div>
            
            <hr className="w-12 border-2 border-gray-100 rounded-full" />
    
            {user ? (
                <div className="flex flex-col gap-4 items-center w-full">
                    <button onClick={() => handleNav('account')} className="text-xl font-bold text-primary flex items-center gap-3 bg-primary/5 px-8 py-3 rounded-full">
                        <UserIcon size={24} /> Mon Compte
                    </button>
                    <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="text-gray-400 hover:text-red-500 flex items-center gap-2 transition-colors">
                        <LogOut size={18} /> Déconnexion
                    </button>
                </div>
            ) : (
                <button onClick={() => handleNav('login')} className="text-xl font-bold text-dark hover:text-accent flex items-center gap-2">
                    Se connecter
                </button>
            )}
          </div>
      </div>
      
      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-primary text-white p-3 rounded-full shadow-xl transition-all duration-500 transform hover:bg-accent hover:text-dark hover:-translate-y-2 ${
          showScrollTop && !isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
        aria-label="Retour en haut"
      >
        <ArrowUp size={24} />
      </button>
    </>
  );
};
