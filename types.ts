
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'kits' | 'batteries' | 'accessoires';
  imageColor: string; // Tailwind class for the placeholder bg
  badges: string[];
  specs: string[];
  inStock: boolean;
  images: string[];
  // New detailed fields
  longDescription?: string; // HTML allowed
  features?: string[];
  technicalSpecs?: {
    brand?: string;
    capacity?: string;
    input?: string;
    output?: string;
    weight?: string;
    dimensions?: string;
    waterproof?: string;
    warranty?: string;
    origin?: string;
    material?: string;
    boxContents?: string;
    features?: string;
  };
}

export interface CartItem extends Product {
  qty: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In real app, never store plain text
}

export type Page = 'home' | 'shop' | 'story' | 'contact' | 'details' | 'login' | 'register' | 'account' | 'success';
