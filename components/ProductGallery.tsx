
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
  imageColor: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt, imageColor }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Keyboard navigation for zoomed view
  useEffect(() => {
    if (!isZoomed) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, images.length]);

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div 
        className={`relative aspect-square rounded-3xl overflow-hidden group cursor-zoom-in ${imageColor} shadow-sm`}
        onClick={() => setIsZoomed(true)}
      >
        <img 
          src={images[selectedIndex]} 
          alt={`${alt} - View ${selectedIndex + 1}`}
          className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105"
        />
        
        {/* Overlay Icons */}
        <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Maximize2 size={20} className="text-dark" />
        </div>

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
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Full Screen Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <button 
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50 bg-black/20 rounded-full"
          >
            <X size={32} />
          </button>

          {/* 
            Container Changes:
            1. Removed 'max-w-6xl' to allow full width on large screens.
            2. Added 'w-full' and 'h-full' to use available space.
          */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* 
               Image Changes:
               1. Changed 'max-h-[80vh]' to 'max-h-[90vh]' for better vertical usage.
               2. Kept 'object-contain' to preserve aspect ratio.
            */}
            <img 
              src={images[selectedIndex]} 
              alt={alt} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
            />
            
            <div className="absolute bottom-4 md:bottom-8 flex items-center gap-8 text-white bg-black/30 px-6 py-2 rounded-full backdrop-blur-md">
               {images.length > 1 && (
                 <>
                    <button onClick={handlePrev} className="p-2 hover:bg-white/20 rounded-full transition-colors"><ChevronLeft size={28} /></button>
                    <span className="font-medium text-lg tracking-wider select-none">{selectedIndex + 1} / {images.length}</span>
                    <button onClick={handleNext} className="p-2 hover:bg-white/20 rounded-full transition-colors"><ChevronRight size={28} /></button>
                 </>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};