
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ChatBot } from './components/ChatBot';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Contact } from './pages/Contact';
import { ProductDetails } from './pages/ProductDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Account } from './pages/Account';
import { Story } from './pages/Story';
import { Success } from './pages/Success';
import { CartItem, Product, Page, User } from './types';
import { authService } from './auth';

const App: React.FC = () => {
  // State
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Global Search State
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sunbag_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    // Check session
    const sessionUser = authService.getSession();
    if (sessionUser) {
        setUser(sessionUser);
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('sunbag_cart', JSON.stringify(cart));
  }, [cart]);

  // Handlers
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleNavigate = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    // Clear selected product if leaving details to avoid state confusion
    if (page !== 'details') {
        setSelectedProduct(null);
    }
    // Clear global search if not navigating to shop
    if (page !== 'shop') {
        setGlobalSearchQuery('');
    }
  };

  const handleSearch = (query: string) => {
    setGlobalSearchQuery(query);
    handleNavigate('shop');
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate('details');
  };

  const handleBackToShop = () => {
    console.log('handleBackToShop called - navigating to shop');
    // Use handleNavigate which properly manages state and clears selectedProduct
    handleNavigate('shop');
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    handleNavigate('account');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    handleNavigate('home');
  };

  const handleCheckout = () => {
    // Simulate checkout process
    setIsCartOpen(false);
    setCart([]); // Clear cart
    localStorage.removeItem('sunbag_cart');
    handleNavigate('success');
  };

  // Render Page
  const renderPage = () => {
    // If we're on details but no product, redirect to shop
    if (currentPage === 'details' && !selectedProduct) {
      return <Shop onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} initialSearch={globalSearchQuery} />;
    }
    
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'story':
        return <Story onNavigate={handleNavigate} />;
      case 'shop':
        return <Shop onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} initialSearch={globalSearchQuery} />;
      case 'contact':
        return <Contact />;
      case 'details':
        if (!selectedProduct) {
          // This should not happen due to check above, but just in case
          return <Shop onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} initialSearch={globalSearchQuery} />;
        }
        return (
            <ProductDetails 
                product={selectedProduct} 
                onAddToCart={handleAddToCart}
                onBack={handleBackToShop}
                onNavigate={handleNavigate}
            />
        );
      case 'login':
        return <Login onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
      case 'register':
        return <Register onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
      case 'account':
        return user 
            ? <Account user={user} onLogout={handleLogout} onNavigate={handleNavigate} /> 
            : <Login onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
      case 'success':
        return <Success onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  // Memoized cart calculations for better performance
  const cartCount = React.useMemo(() => 
    cart.reduce((acc, item) => acc + item.qty, 0), 
    [cart]
  );
  const cartTotal = React.useMemo(() => 
    cart.reduce((acc, item) => acc + item.price * item.qty, 0), 
    [cart]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        cartCount={cartCount} 
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        currentPage={currentPage}
        user={user}
        onLogout={handleLogout}
      />
      
      {/* Main Content with Page Transition */}
      <main className="flex-grow flex flex-col">
        <div key={currentPage} className="flex-grow animate-fade-in">
          {renderPage()}
        </div>
      </main>

      <Footer onNavigate={handleNavigate} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <ChatBot />
    </div>
  );
};

export default App;
