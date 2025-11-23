
import React from 'react';
import { GraduationCap, Leaf, Zap, RefreshCcw, MapPin, ShieldCheck, ArrowRight, Recycle, Quote } from 'lucide-react';
import { Page } from '../types';

interface StoryProps {
  onNavigate: (page: Page) => void;
}

export const Story: React.FC<StoryProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-[110px] pb-20 bg-white overflow-hidden">
      
      {/* Hero Histoire - Style Dark harmonisé avec CSS Pattern */}
      <section className="bg-dark text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
         {/* Background Pattern CSS Only */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-dark to-dark" style={{ backgroundSize: '10px 10px', backgroundImage: 'radial-gradient(circle, #4a4a4a 1px, transparent 1px)' }}></div>
         {/* Ambient Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-accent font-bold text-sm mb-6 uppercase tracking-widest backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Notre Parcours
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl mb-6 md:mb-8 leading-tight">
            De l'Idée Étudiante<br/>à l'Autonomie Durable
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
            Du projet YEP à la HEPL, jusqu'à une marque engagée pour l'énergie nomade responsable.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center relative">
            {/* Vertical Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

            <div className="md:text-right relative">
                <div className="hidden md:flex absolute top-0 right-[-49px] w-6 h-6 bg-accent rounded-full border-4 border-white shadow-md z-10"></div>
                <span className="text-primary font-bold text-6xl opacity-10 absolute top-[-40px] right-0 md:right-10">01</span>
                <h2 className="font-heading font-bold text-3xl text-dark mb-6">Le commencement<br/>du Projet SUNBAG</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    L'aventure SUNBAG a débuté sur les bancs de la <strong>Haute École de la Province de Liège (HEPL)</strong>, dans le cadre du programme entrepreneurial Young Enterprise Project (YEP).
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                    L'idée du sac à dos solaire est apparue lors d'une session de brainstorming. Nous avons réalisé que l'autonomie énergétique en mobilité était la clé.
                </p>
            </div>

            <div className="relative">
                 <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-accent text-dark font-bold px-4 py-2 rounded-bl-2xl text-sm">HEPL / YEP</div>
                    <div className="flex flex-col items-center justify-center h-[250px] md:h-[300px] bg-light/50 rounded-2xl border-2 border-dashed border-gray-200 group-hover:border-accent transition-colors">
                        <GraduationCap size={64} className="text-gray-300 mb-4 group-hover:text-accent transition-colors" />
                        <img src="/images/Logo_HEPL.png" className="h-20 md:h-28 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500" alt="HEPL Logo" 
                             onError={(e) => {
                                 (e.target as HTMLImageElement).src = "/images/logo.png";
                             }}
                        />
                        <span className="font-bold text-dark mt-4">Incubateur Étudiant</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Le Pivot Écologique - Dark Section */}
      <section className="py-16 md:py-24 bg-dark text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="text-center mb-16 md:mb-20">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 mb-6">
                    <Leaf size={32} className="text-green-400" />
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6 md:mb-8">L'Exigence Écologique :<br/>Notre "Pivot"</h2>
                <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                    Conscient que la majorité des produits électroniques provenaient de chaînes lointaines, nous avons refusé de compromettre nos valeurs.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <h3 className="font-heading font-bold text-2xl mb-4 flex items-center gap-3 text-white group-hover:text-accent transition-colors">
                        <MapPin className="text-accent" /> Sourcing Européen
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                        Nous avons établi des partenariats avec des fournisseurs de batteries et de panneaux solaires basés en Europe (Pays-Bas, France) pour réduire drastiquement les transports.
                    </p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <h3 className="font-heading font-bold text-2xl mb-4 flex items-center gap-3 text-white group-hover:text-accent transition-colors">
                        <RefreshCcw className="text-accent" /> Économie Circulaire
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                        Pour le sac à dos, nous intégrons des matériaux de seconde main ou revalorisés. Ne pas produire du neuf quand l'existant suffit.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Nos Produits - Grid Layout */}
      <section className="py-16 md:py-24 bg-light/50">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Notre Gamme</span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Le Reflet de Nos Engagements</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Card 1 - Innovation (Orange Gradient) */}
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 rounded-[2rem] shadow-xl shadow-orange-900/20 hover:-translate-y-2 transition-transform duration-300 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                        <Zap size={28} />
                    </div>
                    <h3 className="font-heading font-bold text-2xl mb-4 text-white">L'Innovation Modulaire</h3>
                    <p className="text-orange-50 leading-relaxed flex-1">
                        Plutôt que d'acheter un sac neuf, équipez votre sac actuel (Osprey, Deuter...) avec notre Panneau FLEX. Cela prolonge la durée de vie de votre équipement.
                    </p>
                </div>

                {/* Card 2 - Qualité (Blue Gradient) */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-900 text-white p-8 rounded-[2rem] shadow-xl shadow-blue-900/20 hover:-translate-y-2 transition-transform duration-300 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                        <ShieldCheck size={28} />
                    </div>
                    <h3 className="font-heading font-bold text-2xl mb-4 text-white">Qualité Européenne</h3>
                    <ul className="space-y-4 flex-1 text-blue-50">
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 shrink-0"></div>
                            <span><strong>Xtorm (Pays-Bas) :</strong> Robustesse IP65 pour l'Expédition.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 shrink-0"></div>
                            <span><strong>La Française (Jura) :</strong> Assemblée en France, plastiques recyclés.</span>
                        </li>
                    </ul>
                </div>

                {/* Card 3 - Circulaire (Green Gradient) - Already correct */}
                <div className="bg-gradient-to-br from-primary to-green-800 text-white p-8 rounded-[2rem] shadow-xl shadow-green-900/20 hover:-translate-y-2 transition-transform duration-300 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                        <Recycle size={28} />
                    </div>
                    <h3 className="font-heading font-bold text-2xl mb-4 text-white">L'Avenir Circulaire</h3>
                    <p className="text-green-100 leading-relaxed mb-6">
                        Le <strong>SUNBAG ONE</strong> est fabriqué sur mesure, en partie à partir de matériaux revalorisés. Une chaîne de production courte et locale (ETA).
                    </p>
                    <div className="mt-auto pt-4 border-t border-white/20 text-sm font-bold flex items-center gap-2">
                        <ArrowRight size={16} /> Objectif Zéro Déchet
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Manifeste Citation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="relative p-10 md:p-16 bg-gray-50 rounded-[3rem] text-center">
                <Quote size={48} className="text-accent absolute top-8 left-8 opacity-50" />
                <blockquote className="font-heading font-bold text-2xl md:text-3xl text-dark leading-snug relative z-10 italic">
                    "Nous ne vendons pas juste des batteries. Nous offrons la liberté de partir plus loin, plus longtemps, tout en respectant les terrains de jeu que nous aimons."
                </blockquote>
                <div className="mt-8 font-bold text-primary uppercase tracking-widest text-sm">L'Équipe SUNBAG</div>
            </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-white relative">
         <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
            <h2 className="font-heading font-extrabold text-3xl md:text-6xl text-dark mb-6 md:mb-8 tracking-tight">
                Prêt à rejoindre l'aventure ?
            </h2>
            <p className="text-gray-500 text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto">
                Optez pour l'autonomie et soutenez une initiative jeune, locale et durable.
            </p>
            <button 
                onClick={() => onNavigate('shop')}
                className="bg-dark text-white font-bold py-5 px-12 rounded-full text-lg hover:bg-accent hover:text-dark transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto group w-full md:w-auto justify-center"
            >
                Découvrir la boutique <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </section>
    </div>
  );
};
