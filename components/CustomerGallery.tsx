
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, MapPin } from 'lucide-react';

interface CustomerGalleryProps {
  images: string[];
}

export const CustomerGallery: React.FC<CustomerGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }[]>([]);
  const [containerHeight, setContainerHeight] = useState<number>(350);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRefs = React.useRef<(HTMLImageElement | null)[]>([]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Load and measure all images
  useEffect(() => {
    const loadImages = () => {
      images.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
          setImageDimensions(prev => {
            const newDims = [...prev];
            newDims[index] = { width: img.naturalWidth, height: img.naturalHeight };
            return newDims;
          });
        };
        img.src = src;
      });
    };
    loadImages();
  }, [images]);

  // Calculate container height based on current image - precise calculation
  useEffect(() => {
    const updateHeight = () => {
      const container = containerRef.current;
      const dims = imageDimensions[currentIndex];
      const img = imageRefs.current[currentIndex];
      
      if (container) {
        const containerWidth = container.offsetWidth || container.clientWidth;
        
        if (containerWidth > 0) {
          let aspectRatio = 0.75; // Default 4:3
          
          // Try to get dimensions from stored data first
          if (dims && dims.width > 0 && dims.height > 0) {
            aspectRatio = dims.height / dims.width;
          } 
          // Fallback to image element if available
          else if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            aspectRatio = img.naturalHeight / img.naturalWidth;
          }
          
          const calculatedHeight = containerWidth * aspectRatio;
          // Allow more flexibility in height - smaller gallery
          const finalHeight = Math.max(180, Math.min(calculatedHeight, 450));
          setContainerHeight(finalHeight);
        }
      }
    };

    // Update immediately and with delays to catch different load states
    updateHeight();
    const timeout1 = setTimeout(updateHeight, 100);
    const timeout2 = setTimeout(updateHeight, 300);
    
    window.addEventListener('resize', updateHeight);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      window.removeEventListener('resize', updateHeight);
    };
  }, [currentIndex, imageDimensions]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, images.length]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl group bg-gray-100 transition-all duration-700 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        minHeight: '200px',
        height: `${containerHeight}px`
      }}
    >
      {/* Images Container - Adapts to each image's aspect ratio */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              ref={(el) => { imageRefs.current[index] = el; }}
              src={img}
              alt={`Photo client ${index + 1}`}
              className="w-full h-full object-cover will-change-opacity"
              loading="lazy"
              decoding="async"
              style={{ imageRendering: 'auto' }}
              onLoad={(e) => {
                // Trigger height recalculation when image loads
                const target = e.target as HTMLImageElement;
                const container = containerRef.current;
                
                if (container && target.naturalWidth > 0 && target.naturalHeight > 0) {
                  const containerWidth = container.offsetWidth || container.clientWidth;
                  if (containerWidth > 0) {
                    const aspectRatio = target.naturalHeight / target.naturalWidth;
                    const calculatedHeight = Math.max(200, Math.min(containerWidth * aspectRatio, 700));
                    setContainerHeight(calculatedHeight);
                  }
                }
              }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && !isHovered && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/30 z-30">
          <div
            key={currentIndex}
            className="h-full bg-gradient-to-r from-primary to-accent shadow-lg"
            style={{
              width: '100%',
              animation: 'progress 3s linear forwards'
            }}
          />
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 md:p-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center">
              <Heart size={16} className="text-white fill-white" />
            </div>
            <span className="text-white/90 font-semibold text-xs md:text-sm">Photos de nos clients</span>
          </div>
          <h3 className="text-white text-lg md:text-2xl font-heading font-bold mb-1">
            Leurs aventures avec SUNBAG
          </h3>
          <p className="text-white/80 text-xs mb-3 hidden md:block">
            Découvrez comment nos clients utilisent leur sac SUNBAG dans leurs aventures en plein air
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-2.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 z-30 backdrop-blur-sm"
            aria-label="Photo précédente"
          >
            <ChevronLeft size={22} className="text-dark" strokeWidth={2.5} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-2.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 z-30 backdrop-blur-sm"
            aria-label="Photo suivante"
          >
            <ChevronRight size={22} className="text-dark" strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-6 h-1.5 bg-white shadow-lg'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Aller à la photo ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-black/60 backdrop-blur-md text-white px-2.5 py-1.5 rounded-full text-xs font-semibold z-30">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Auto-play Toggle */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsAutoPlaying(!isAutoPlaying);
          }}
          className="absolute top-3 md:top-4 left-3 md:left-4 bg-black/60 backdrop-blur-md text-white px-2.5 py-1.5 rounded-full text-xs font-medium transition-all hover:bg-black/80 z-30 flex items-center gap-1.5"
        >
          <div className={`w-1.5 h-1.5 rounded-full transition-all ${isAutoPlaying ? 'bg-accent animate-pulse' : 'bg-white/50'}`} />
          <span className="hidden md:inline text-xs">{isAutoPlaying ? 'Lecture' : 'Pause'}</span>
        </button>
      )}
    </div>
  );
};

