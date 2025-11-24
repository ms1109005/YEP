
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Page } from '../types';

interface BreadcrumbItem {
  label: string;
  page?: Page;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (page: Page) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
        <li>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:text-primary transition-colors"
            aria-label="Retour à l'accueil"
          >
            <Home size={16} />
            <span className="sr-only">Accueil</span>
          </button>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-gray-400" />
            {item.page ? (
              <button
                onClick={() => onNavigate(item.page!)}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-dark font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

