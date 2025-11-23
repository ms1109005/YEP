import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SUGGESTIONS = [
  "Quel kit pour le GR20 ?",
  "Délai de livraison ?",
  "Comment installer le panneau ?",
  "Différence entre Kit Expédition et Essentiel ?"
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Bonjour ! 👋 Je suis l'assistant virtuel SUNBAG. Je peux vous aider à choisir le kit solaire idéal pour votre prochaine aventure ou répondre à vos questions sur nos batteries. Comment puis-je vous aider ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Salutations
    if (lowerMessage.match(/^(bonjour|salut|hello|bonsoir|hey|hi|bon matin|bon après-midi)/i)) {
      return "Bonjour ! 😊 Je suis là pour vous aider à trouver le kit solaire parfait.\n\nJe peux vous renseigner sur :\n• Nos kits solaires et batteries\n• Les prix et caractéristiques\n• La livraison et les garanties\n• Quel produit choisir selon votre usage\n\nQue souhaitez-vous savoir ?";
    }

    // Prix et tarifs
    if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('tarif') || lowerMessage.includes('combien') || lowerMessage.includes('cher')) {
      return `💰 **Nos tarifs :**

**Kits :**
• Kit ESSENTIEL : 53,78€
• Kit EXPEDITION : 86,35€

**Batteries :**
• La Française 10K : 17,29€
• Xtorm Rugged 20K : 54,89€

**Accessoires :**
• Panneau FLEX : 31,46€
• Sac SUNBAG ONE : 249€

Livraison offerte dès 150€ ! 🎁`;
    }

    // Livraison
    if (lowerMessage.includes('livraison') || lowerMessage.includes('expédition') || lowerMessage.includes('shipping') || lowerMessage.includes('délai') || lowerMessage.includes('délais') || lowerMessage.includes('recevoir') || lowerMessage.includes('arrivée')) {
      return `📦 **Livraison :**

• Expédition sous 24h depuis la Belgique
• Livraison offerte dès 150€ d'achat
• Suivi de commande disponible
• 2-3 jours pour France/Belgique/Luxembourg

Stock garanti, envoi rapide ! ⚡`;
    }

    // Garanties
    if (lowerMessage.includes('garantie') || lowerMessage.includes('warranty') || lowerMessage.includes('retour') || lowerMessage.includes('remboursement') || lowerMessage.includes('défaut') || lowerMessage.includes('casse')) {
      return `🛡️ **Garanties & Retours :**

• Panneaux : 3 ans
• Batteries Xtorm : 2 ans
• Batterie La Française : 3 ans
• Retours gratuits sous 30 jours

Support client réactif ! 😊`;
    }

    // Batteries
    if (lowerMessage.includes('batterie') || lowerMessage.includes('power bank') || lowerMessage.includes('quelle batterie') || lowerMessage.includes('choisir batterie')) {
      return `🔋 **Nos Batteries :**

• **Xtorm Rugged 20K** (54,89€) - IP65, anti-choc, outdoor, 20.000 mAh
• **La Française 10K** (17,29€) - Made in France, ultra-léger, 10.000 mAh

Quel usage prévoyez-vous ? Je peux vous conseiller !`;
    }

    // Kits
    if (lowerMessage.includes('kit') || lowerMessage.includes('solaire') || lowerMessage.includes('panneau') || lowerMessage.includes('autonomie') || lowerMessage.includes('énergie solaire')) {
      return `⚡ **Nos Kits Solaires :**

**Kit ESSENTIEL (53,78€) :**
• 10.000 mAh, 410g
• Idéal : randonnées journée, études
• Made in France

**Kit EXPEDITION (86,35€) :**
• 20.000 mAh, 740g, IP65
• Idéal : treks multi-jours, conditions extrêmes

Les deux incluent panneau 10W + batterie + accessoires.

Quel type d'aventure ? 🏔️`;
    }

    // Comparaison
    if (lowerMessage.includes('différence') || lowerMessage.includes('comparer') || lowerMessage.includes('vs') || lowerMessage.includes('versus') || lowerMessage.includes('différences')) {
      return `📊 **ESSENTIEL vs EXPEDITION :**

**ESSENTIEL (53,78€) :**
• 10K mAh, 410g
• Usage : journée, études, urbain
• Made in France

**EXPEDITION (86,35€) :**
• 20K mAh, 740g, IP65
• Usage : treks longs, conditions difficiles

**Recommandation :**
→ Journée/études : ESSENTIEL
→ Treks longs/extrêmes : EXPEDITION

Dites-moi votre usage pour un conseil précis !`;
    }

    // GR20
    if (lowerMessage.includes('gr20') || lowerMessage.includes('gr 20')) {
      return `🏔️ **Pour le GR20, je recommande le Kit EXPEDITION (86,35€) :**

• 20.000 mAh pour 15 jours d'autonomie
• IP65 : résistant à la pluie et aux chocs
• Charge rapide 35W
• Lampe torche intégrée

Parfait pour les conditions difficiles du GR20 ! ⚡`;
    }

    // Installation
    if (lowerMessage.includes('installer') || lowerMessage.includes('installation') || lowerMessage.includes('comment') || lowerMessage.includes('utiliser') || lowerMessage.includes('fonctionne')) {
      return `🔧 **Installation (30 secondes) :**

1. Fixez le panneau sur votre sac (mousquetons fournis)
2. Connectez le câble entre panneau et batterie
3. Le panneau charge la batterie au soleil
4. Connectez vos appareils à la batterie

**Astuce** : Laissez le panneau au soleil pendant la marche ! ☀️`;
    }

    // Produits spécifiques
    if (lowerMessage.includes('expedition') || lowerMessage.includes('kit expedition')) {
      return `🏔️ **Kit EXPEDITION (86,35€) :**

• 20.000 mAh, 740g
• IP65, anti-choc, lampe intégrée
• Charge rapide 35W
• Idéal : treks multi-jours, GR20, conditions extrêmes

Autonomie illimitée pour vos grandes aventures ! ⚡`;
    }

    if (lowerMessage.includes('essentiel') || lowerMessage.includes('kit essentiel')) {
      return `🎒 **Kit ESSENTIEL (53,78€) :**

• 10.000 mAh, 410g
• Made in France (Jura)
• Éco-conçu (recyclé)
• Idéal : randonnées journée, études, poids minimal

Léger, local, durable ! 🇫🇷`;
    }

    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('téléphone') || lowerMessage.includes('appeler') || lowerMessage.includes('joindre')) {
      return `📧 **Nous contacter :**

• Page Contact du site
• Service client 7j/7
• Réponse rapide garantie

N'hésitez pas à nous écrire ! 😊`;
    }

    // Remerciements
    if (lowerMessage.includes('merci') || lowerMessage.includes('thanks') || lowerMessage.includes('parfait') || lowerMessage.includes('super') || lowerMessage.includes('génial')) {
      return "De rien, c'est un plaisir ! 😊\n\nN'hésitez pas si vous avez d'autres questions. Bonne aventure avec SUNBAG ! ⚡";
    }

    // Au revoir
    if (lowerMessage.match(/^(au revoir|bye|à bientôt|ciao|goodbye|à plus)/i)) {
      return "À bientôt ! 👋\n\nRevenez quand vous voulez si vous avez des questions. Bonne journée ! ⚡";
    }

    // Réponse par défaut
    return `Je peux vous aider sur :\n\n• 💰 Prix et produits\n• 📦 Livraison\n• 🛡️ Garanties\n• 🔋 Batteries et kits\n• 🔧 Utilisation\n\nPosez-moi une question précise ! 😊`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const messageText = inputValue;
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simuler une réponse du bot après un court délai
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(question),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      setInputValue('');
    }, 500);
  };

  // Helper to render text with bold support and line breaks
  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        })}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-20 md:bottom-8 md:right-24 z-[60] p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-dark text-white rotate-90' : 'bg-gradient-to-r from-accent to-yellow-500 text-dark'}`}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? <ChevronDown size={28} /> : <MessageCircle size={32} fill="currentColor" className="text-white/20" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-20 md:bottom-32 md:right-24 w-[92vw] md:w-[400px] max-h-[600px] h-[70vh] bg-white rounded-3xl shadow-2xl border border-gray-100 z-[60] flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-dark p-4 flex items-center gap-3 border-b border-gray-800">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-accent relative flex-shrink-0">
            <Bot size={24} />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-dark"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold font-heading leading-tight">Assistant SUNBAG</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Sparkles size={10} className="text-accent" /> En ligne
            </p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-white text-dark border border-gray-100 rounded-bl-none'
                }`}
              >
                {renderMessageText(msg.text)}
              </div>
            </div>
          ))}
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow-sm">
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}

          {/* Suggestions Chips (Only if few messages) */}
          {messages.length === 1 && !isLoading && (
            <div className="grid grid-cols-1 gap-2 mt-4 animate-fade-in">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 ml-1">Suggestions</p>
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(suggestion)}
                  className="text-left text-sm bg-white border border-primary/20 hover:border-primary hover:bg-primary/5 text-primary p-3 rounded-xl transition-all duration-300 font-medium active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input 
            ref={inputRef}
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Posez une question..."
            className="flex-1 bg-gray-50 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium border border-transparent focus:border-primary/20"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="bg-primary hover:bg-secondary text-white w-12 h-12 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <Send size={20} className={inputValue.trim() ? "translate-x-0.5 translate-y-0.5" : ""} />
          </button>
        </form>
      </div>
    </>
  );
};
