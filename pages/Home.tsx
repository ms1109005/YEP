
import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Map, Zap, Leaf, PlayCircle, Star } from 'lucide-react';
import { Page } from '../types';
import { CustomerGallery } from '../components/CustomerGallery';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for Reveal Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8'); // Increased movement for natural feel
        }
      });
    }, { threshold: 0.15 }); // Increased threshold so it triggers when clearly visible

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Parallax Effect Logic
    const handleScroll = () => {
      if (heroBgRef.current) {
        const scrolled = window.scrollY;
        // Only animate if the hero is likely in view to save resources
        if (scrolled < window.innerHeight) {
            // Move background down at 50% of scroll speed
            heroBgRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[850px] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
            ref={heroBgRef}
            className="absolute inset-0 z-0 will-change-transform"
        >
          <img 
            src="/images/image-principale.jpeg" 
            alt="Image principale SUNBAG" 
            className="w-full h-[115%] object-cover -mt-[5%]"
            onError={(e) => {
              // High resolution fallback (4K) for sharpness
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=100&w=3200&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>
        
        {/* Gradient removed as requested */}

        <div className="relative z-10 max-w-5xl text-white p-6 mt-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-accent/90 backdrop-blur text-dark font-bold text-sm mb-6 uppercase tracking-wider animate-fade-in shadow-[0_0_20px_rgba(255,159,28,0.5)]">
                Nouveau : Kit Expédition
            </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-7xl mb-6 leading-tight text-shadow-xl tracking-tight">
            L'énergie illimitée<br/>pour vos aventures
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
            Kits solaires, batteries Xtorm et sac SUNBAG prêts à partir pour vos treks, GR et aventures bikepacking.
          </p>
          <button 
            onClick={() => onNavigate('shop')}
            className="bg-accent hover:bg-white hover:text-dark text-dark font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto text-lg"
          >
            Choisir mon kit <ArrowRight size={22} />
          </button>
        </div>
      </section>

      {/* CONCEPT SECTION - PART 1: THE PROBLEM */}
      <section className="pt-12 md:pt-24 pb-8 bg-white relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left: Image - Appears first */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white group order-2 lg:order-1 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
              <img 
                src="/images/conception.jpg" 
                alt="Conception SUNBAG" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                style={{ display: 'block' }}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2673&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Right: Text - Appears with same style as others */}
            <div className="flex flex-col justify-center order-1 lg:order-2 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out">
              <span className="text-accent font-bold uppercase tracking-wider text-sm mb-3 block">L'Upgrade Intelligent</span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6 md:mb-8 text-dark leading-tight">
                Votre sac est déjà parfait, <span className="text-primary">il lui manque juste l'énergie.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Pourquoi dépenser 200€ dans un nouveau sac solaire alors que votre équipement actuel (Osprey, Deuter, Eastpak...) est fait pour vous ? 
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                SUNBAG est un module universel. Il se clipse en 30 secondes, résiste à tout, et transforme votre sac préféré en centrale électrique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONCEPT SECTION - PART 2: THE SOLUTION (VIDEO) */}
      <section className="pb-16 md:pb-24 pt-4 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-6 md:p-10 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                
                {/* Video Player */}
                <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-black relative group aspect-video">
                  <video 
                    controls 
                    className="w-full h-full object-cover"
                    poster="/images/conception.png"
                  >
                      <source src="/images/sunbag-demo.mp4" type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                  {/* Overlay Play Button Hint (disappears on hover/play) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300 bg-black/10">
                      <div className="bg-white/20 backdrop-blur text-white p-4 rounded-full border border-white/30 animate-pulse">
                          <PlayCircle size={48} fill="currentColor" className="text-white opacity-80" />
                      </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold mb-4">
                        <PlayCircle size={16} /> Module SUNBAG
                    </div>
                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-dark mb-4">
                        Le module SUNBAG en action
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-base md:text-lg">
                        Découvrez comment le panneau SUNBAG se fixe à votre sac existant, comment la batterie Xtorm se range dans le compartiment isolé et comment le câble magnétique recharge vos appareils.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg">
                        Un système simple et efficace qui transforme votre équipement de randonnée en source d'énergie autonome.
                    </p>
                    <button 
                        onClick={() => onNavigate('shop')}
                        className="w-full md:w-auto bg-accent hover:bg-dark hover:text-white text-dark font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg uppercase tracking-wide"
                    >
                        Accéder à la boutique
                    </button>
                </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BANNER */}
      <section className="py-16 md:py-24 bg-dark text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
                <div>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl mb-8 leading-tight">
                        Tout SUNBAG disponible,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">expédié sous 24h</span>.
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-10 font-light leading-relaxed">
                        Kits complets, batteries et sac SUNBAG ONE prêts à rejoindre votre prochaine expédition. Livraison express depuis Liège.
                    </p>
                    <ul className="space-y-5 mb-10">
                        {[
                            'Stock Garanti en Belgique',
                            'Service Client 7j/7',
                            'Garantie 3 ans sur les panneaux'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-lg">
                                <div className="bg-primary/20 p-1 rounded-full text-accent">
                                    <CheckCircle2 size={20} strokeWidth={3} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => onNavigate('shop')} className="group text-accent font-bold text-lg flex items-center gap-2 hover:text-white transition-colors">
                        Voir tous les produits
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
                <div className="bg-white text-dark p-8 md:p-10 rounded-[2.5rem] shadow-2xl transform md:rotate-2 md:hover:rotate-0 transition-transform duration-500 border-8 border-white/10">
                    <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">Livraison offerte</h3>
                    <p className="text-gray-600 mb-8 text-lg">
                        Profitez de notre service d'expédition rapide et sécurisé pour toute commande dès 150€.
                    </p>
                    <div className="flex items-baseline gap-2 mb-2">
                         <div className="text-7xl font-extrabold text-primary tracking-tighter">0€</div>
                    </div>
                    <div className="text-sm text-gray-400 font-medium uppercase tracking-wide">frais de port (Standard)</div>
                </div>
            </div>
        </div>
      </section>

      {/* IMPACT GRID */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl text-center">
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 max-w-3xl mx-auto">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">Éthique & Local</h2>
                <p className="text-gray-600 text-lg mb-16">Un assemblage 100% belge qui soutient l'emploi local et réduit l'impact carbone.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {[
                    { icon: Map, title: "Europe", text: "Composants France & Pays-Bas" },
                    { icon: Zap, title: "Solidaire", text: "Assemblé par l'ETA Step Métiers" },
                    { icon: Leaf, title: "Durable", text: "Plastiques recyclés GRS" },
                ].map((stat, i) => (
                    <div 
                        key={i} 
                        className="bg-gray-50 p-8 md:p-10 rounded-3xl shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-500 border border-gray-100 reveal-on-scroll opacity-0 translate-y-8 group"
                        style={{ transitionDelay: `${i * 150}ms` }}
                    >
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <stat.icon size={40} strokeWidth={1.5} />
                        </div>
                        <h4 className="font-heading font-bold text-2xl mb-3 text-dark">{stat.title}</h4>
                        <p className="text-gray-500 font-medium">{stat.text}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CUSTOMER GALLERY */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
                <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
                    Nos clients en action
                </h2>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                    Découvrez comment nos clients utilisent leur SUNBAG dans leurs aventures en plein air
                </p>
            </div>
            
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
                <CustomerGallery 
                    images={[
                        '/images/galery.jpg',
                        '/images/galery2.jpg',
                        '/images/galery3.jpg',
                        '/images/galery4.jpg'
                    ]}
                />
            </div>
        </div>
      </section>

      {/* TESTIMONIALS (SOCIAL PROOF) */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">La Communauté SUNBAG</h2>
                <p className="text-gray-600 text-lg">Ils ont emporté l'énergie solaire dans leurs aventures.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { 
                        name: "Thomas L.", 
                        role: "Randonneur GR20", 
                        text: "Le Kit Expédition m'a sauvé la mise en Corse. 10 jours sans prise secteur, et mon téléphone toujours chargé pour le GPS.",
                        stars: 5 
                    },
                    { 
                        name: "Sarah M.", 
                        role: "Digital Nomad", 
                        text: "La batterie Xtorm Fuel 27K charge mon MacBook Air sans problème. Je peux travailler depuis n'importe quel refuge.",
                        stars: 5 
                    },
                    { 
                        name: "Julien D.", 
                        role: "Étudiant", 
                        text: "J'ai équipé mon vieux sac Eastpak avec le panneau Flex. C'est génial pour charger mes écouteurs entre les cours.",
                        stars: 4 
                    }
                ].map((review, i) => (
                    <div 
                        key={i} 
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 reveal-on-scroll opacity-0 translate-y-8 hover:-translate-y-1 transition-all duration-300"
                        style={{ transitionDelay: `${i * 200}ms` }}
                    >
                        <div className="flex text-accent mb-4">
                            {[...Array(5)].map((_, s) => (
                                <Star key={s} size={18} fill={s < review.stars ? "currentColor" : "none"} className={s < review.stars ? "text-accent" : "text-gray-300"} />
                            ))}
                        </div>
                        <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-dark">{review.name}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide font-bold">{review.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
};
