
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
  imageColor: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt, imageColor }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div 
        className={`relative aspect-square rounded-3xl overflow-hidden group ${imageColor} shadow-sm`}
      >
        <img 
          src={images[selectedIndex]} 
          alt={`${alt} - View ${selectedIndex + 1}`}
          className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105 will-change-transform"
          loading="lazy"
          decoding="async"
        />

        {/* Navigation Arrows (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm z-10"
            >
              <ChevronLeft size={24} className="text-dark" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm z-10"
            >
              <ChevronRight size={24} className="text-dark" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedIndex === index ? 'border-primary shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};