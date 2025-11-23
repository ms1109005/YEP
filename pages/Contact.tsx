
import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send, ChevronDown, Truck, ShieldCheck, Sun } from 'lucide-react';

export const Contact: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "Quels sont les délais d'expédition ?",
      answer: "Toutes les commandes validées avant 13h sont expédiées le jour même depuis notre atelier à Liège. La livraison prend généralement 24h pour la Belgique et 48h pour la France."
    },
    {
      question: "Le panneau solaire est-il compatible avec ma batterie ?",
      answer: "Oui, le panneau SUNBAG Flex possède une sortie USB-A standard. Il est compatible avec n'importe quelle batterie externe (Powerbank) du marché. Cependant, nous recommandons nos batteries Xtorm pour leur résistance aux chocs et à l'humidité."
    },
    {
      question: "Les sacs et panneaux sont-ils étanches ?",
      answer: "Nos sacs SUNBAG ONE et le Kit EXPEDITION (Panneau + Batterie Xtorm) sont certifiés IP65 (résistants à la pluie et aux éclaboussures) ou possèdent des housses de pluie intégrées. Ils sont conçus pour le trekking."
    },
    {
      question: "Comment fonctionne la garantie ?",
      answer: "Tous nos produits bénéficient d'une garantie européenne de 2 ans. Les panneaux solaires bénéficient d'une extension à 3 ans. En cas de problème, nous remplaçons la pièce défectueuse."
    },
    {
      question: "Puis-je voyager en avion avec mon SUNBAG ?",
      answer: "Oui ! Les batteries externes (Powerbanks) de moins de 27 000 mAh (100Wh) sont autorisées en cabine sur la quasi-totalité des compagnies aériennes. Nos kits sont donc 'Flight Safe'."
    },
    {
      question: "Combien de temps pour charger un téléphone ?",
      answer: "En plein soleil, le panneau 10W peut recharger un smartphone standard en environ 2h à 3h. Avec une batterie tampon, vous stockez l'énergie la journée pour charger vos appareils le soir."
    }
  ];

  return (
    <div className="min-h-screen pt-[110px] pb-20 bg-light">
        
      {/* Hero Contact - Style Dark harmonisé avec CSS Pattern */}
      <section className="bg-dark text-white py-24 px-6 text-center relative overflow-hidden">
         {/* Background Pattern CSS Only */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-dark to-dark" style={{ backgroundSize: '10px 10px', backgroundImage: 'radial-gradient(circle, #4a4a4a 1px, transparent 1px)' }}></div>
         {/* Ambient Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-accent font-bold text-sm mb-6 uppercase tracking-widest backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                Support Client
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-6 leading-tight">Besoin d'aide ou d'un conseil ?</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Notre équipe basée à Liège est là pour vous accompagner dans le choix de votre équipement solaire.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-7xl -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Info Column */}
            <div className="lg:col-span-1 space-y-6">
                {/* Direct Contact Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-50">
                    <h3 className="font-heading font-bold text-2xl mb-6 text-dark">Contact Direct</h3>
                    <div className="space-y-6">
                        <a href="mailto:hello@sunbag.fr" className="flex items-center gap-4 text-gray-600 hover:text-primary transition-colors group">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <Mail size={24} />
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Email</span>
                                <span className="font-medium">hello@sunbag.fr</span>
                            </div>
                        </a>
                        <a href="tel:+3241234567" className="flex items-center gap-4 text-gray-600 hover:text-primary transition-colors group">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <Phone size={24} />
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Téléphone</span>
                                <span className="font-medium">+32 4 123 45 67</span>
                            </div>
                        </a>
                        <div className="flex items-center gap-4 text-gray-600 group">
                            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Messagerie</span>
                                <span className="font-medium">Chat 7j/7 (9h-20h)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logistics Card */}
                <div className="bg-dark text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-5 -mt-5"></div>
                    <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
                        <MapPin className="text-accent" /> Atelier & Retours
                    </h3>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        Pour les retours et le service après-vente, veuillez utiliser notre adresse logistique :
                    </p>
                    <div className="bg-white/10 p-4 rounded-xl text-sm font-mono text-accent">
                        SUNBAG Logistics<br/>
                        Rue de l'Énergie 12,<br/>
                        4000 Liège, BELGIQUE
                    </div>
                </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2">
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-50 h-full">
                    <h3 className="font-heading font-bold text-3xl mb-2 text-dark">Envoyez-nous un message</h3>
                    <p className="text-gray-500 mb-8">Nous répondons généralement en moins de 2 heures.</p>
                    
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message envoyé (simulation)"); }}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-dark ml-1">Nom complet</label>
                                <input type="text" placeholder="Jean Dupont" className="w-full px-5 py-4 rounded-2xl bg-light border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-dark ml-1">Email</label>
                                <input type="email" placeholder="jean@exemple.com" className="w-full px-5 py-4 rounded-2xl bg-light border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium" />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-dark ml-1">Sujet</label>
                            <select className="w-full px-5 py-4 rounded-2xl bg-light border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium appearance-none cursor-pointer">
                                <option>J'ai une question sur un produit</option>
                                <option>Suivi de ma commande</option>
                                <option>Demande de retour / SAV</option>
                                <option>Partenariat / B2B</option>
                                <option>Autre</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-dark ml-1">Message</label>
                            <textarea placeholder="Bonjour, je souhaiterais savoir..." rows={6} className="w-full px-5 py-4 rounded-2xl bg-light border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-medium resize-none"></textarea>
                        </div>

                        <button className="w-full md:w-auto bg-accent hover:bg-dark hover:text-white text-dark font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2">
                            Envoyer le message <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-4 text-dark">Questions Fréquentes</h2>
                <p className="text-gray-500">Tout ce que vous devez savoir sur nos produits et services.</p>
            </div>

            <div className="grid gap-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 ${activeAccordion === index ? 'shadow-lg ring-1 ring-primary/20' : 'hover:shadow-md'}`}
                    >
                        <button 
                            onClick={() => toggleAccordion(index)}
                            className="w-full p-6 flex items-center justify-between text-left font-bold text-dark hover:text-primary transition-colors"
                        >
                            <span className="text-lg">{faq.question}</span>
                            <ChevronDown 
                                size={20} 
                                className={`text-accent transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`} 
                            />
                        </button>
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trust Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 py-10 border-t border-gray-200">
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-1">
                        <Truck size={24} />
                    </div>
                    <h4 className="font-bold text-dark">Expédition Rapide</h4>
                    <p className="text-sm text-gray-500">Envoi sous 24h depuis Liège</p>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-1">
                        <ShieldCheck size={24} />
                    </div>
                    <h4 className="font-bold text-dark">Garantie Européenne</h4>
                    <p className="text-sm text-gray-500">2 ans sur tous les produits</p>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-1">
                        <Sun size={24} />
                    </div>
                    <h4 className="font-bold text-dark">Expertise Solaire</h4>
                    <p className="text-sm text-gray-500">Conseils techniques gratuits</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
