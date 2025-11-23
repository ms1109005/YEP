
import { User } from './types';

const USERS_KEY = 'sunbag_users';
const SESSION_KEY = 'sunbag_session';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async register(name: string, email: string, password: string): Promise<User> {
    await delay(800);
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    if (users.find((u: User) => u.email === email)) {
      throw new Error('Cet email est déjà utilisé.');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password // In a real app, this must be hashed!
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Auto login after register
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return newUser;
  },

  async login(email: string, password: string): Promise<User> {
    await delay(800);
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Email ou mot de passe incorrect.');
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession(): User | null {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }
};