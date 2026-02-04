import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, X, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import { GroqService } from '../../utils/groqService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotPremiumProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatBotPremium({ isOpen, onClose }: ChatBotPremiumProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bienvenue chez TimeTravel Agency. Je suis votre conseiller temporel personnel propulsé par l'IA. Comment puis-je vous assister dans la planification de votre voyage à travers le temps ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [groqService] = useState(() => new GroqService(GroqService.getApiKey()));
  const [showApiKeyWarning] = useState(!GroqService.isConfigured());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = async (userMessage: string): Promise<string> => {
    // Si la clé API n'est pas configurée, utiliser les réponses par défaut
    if (!GroqService.isConfigured()) {
      const lowerMessage = userMessage.toLowerCase();

      if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('tarif')) {
        return "Nos destinations premium commencent à 3 499€ pour Paris 1889 (5 jours), 4 799€ pour Florence Renaissance (6 jours), et 12 999€ pour le Crétacé (7 jours - expérience extrême). Chaque voyage inclut : transport temporel aller-retour, guide expert, vêtements d'époque, traducteur universel, équipement de sécurité, assurance standard et kit photo 8K. Paiement en 3x sans frais disponible.";
      }
      
      if (lowerMessage.includes('sécurité') || lowerMessage.includes('dangereux') || lowerMessage.includes('risque')) {
        return "Votre sécurité est notre engagement absolu. Chaque capsule est équipée de boucliers temporels, systèmes de rapatriement d'urgence (extraction en 60 secondes), IA de surveillance continue et traceur quantique personnel. Nos guides sont certifiés avec minimum 500 heures de vol temporel. Nous avons réalisé plus de 50 000 voyages avec un taux de satisfaction de 99.8%. Certification ISO Temporelle 9001.";
      }
      
      if (lowerMessage.includes('durée') || lowerMessage.includes('combien de temps') || lowerMessage.includes('longtemps')) {
        return "La relativité temporelle est notre atout majeur ! Vous pouvez vivre 5 à 7 jours complets dans l'époque choisie, tout en ne vous absentant que 4 à 8 heures de votre temps présent. Vous revenez à peine quelques heures après votre départ, sans décalage horaire ni fatigue. C'est comme suspendre le temps actuel pendant votre aventure historique.";
      }
      
      if (lowerMessage.includes('paradoxe') || lowerMessage.includes('modifier') || lowerMessage.includes('changer le passé')) {
        return "Excellente question sur la physique temporelle ! Nos capsules vous placent en 'mode observateur protégé' : vous vivez pleinement l'époque (vous pouvez voir, entendre, sentir, goûter), mais votre présence est isolée de la ligne temporelle principale par un bouclier quantique. Impossible de créer un paradoxe ou de modifier l'histoire. Vous êtes comme un fantôme invisible pour la causalité temporelle.";
      }
      
      if (lowerMessage.includes('recommand') || lowerMessage.includes('conseil') || lowerMessage.includes('meilleur') || lowerMessage.includes('choisir')) {
        return "Pour une première expérience, je recommande Paris 1889 : fascinant, sûr, et culturellement riche. Pour les amateurs d'art et d'histoire, Florence Renaissance est sublime. Si vous recherchez l'aventure ultime et avez une excellente condition physique, le Crétacé offre des sensations incomparables. Quelle période historique vous attire le plus ? Je peux affiner ma recommandation.";
      }
      
      if (lowerMessage.includes('préparer') || lowerMessage.includes('préparation') || lowerMessage.includes('emmener') || lowerMessage.includes('équipement')) {
        return "Nous simplifions tout ! Vous recevrez 48h avant le départ un kit complet comprenant : vêtements d'époque sur mesure (pris de vos mensurations), traducteur universel en temps réel, appareil photo 8K, kit médical temporel, monnaie de l'époque, et guide de survie personnalisé. Une séance de briefing d'1h30 précède chaque départ. Apportez juste vos effets personnels et votre curiosité !";
      }

      if (lowerMessage.includes('paris') || lowerMessage.includes('1889') || lowerMessage.includes('eiffel') || lowerMessage.includes('belle époque')) {
        return "Paris 1889 est notre destination la plus demandée ! Vous assisterez à l'inauguration de la Tour Eiffel, visiterez l'Exposition Universelle avec ses 61 000 exposants, profiterez d'une soirée exclusive au Moulin Rouge lors de son ouverture, et rencontrerez des artistes impressionnistes à Montmartre. 5 jours / 3 499€. Difficulté : Facile. Disponible toute l'année. Souhaitez-vous réserver ?";
      }

      if (lowerMessage.includes('crétacé') || lowerMessage.includes('dinosaure') || lowerMessage.includes('préhistoire') || lowerMessage.includes('t-rex')) {
        return "Le Crétacé est notre expédition la plus spectaculaire ! Safari préhistorique en capsule blindée avec observation de T-Rex en chasse, troupeaux de Triceratops, survol en drone des volcans actifs. Niveau Extrême - requiert excellente condition physique et bilan médical. 7 jours / 12 999€. Places très limitées (max 4 voyageurs par départ). Voulez-vous vérifier la disponibilité ?";
      }

      if (lowerMessage.includes('florence') || lowerMessage.includes('renaissance') || lowerMessage.includes('michel-ange') || lowerMessage.includes('david')) {
        return "Florence Renaissance 1504 est pure magie culturelle ! Assistez à l'installation du David de Michel-Ange, visitez les ateliers privés de Léonard de Vinci et Michel-Ange, rencontrez Laurent II de Médicis, et participez à un cours de fresque avec un maître artisan. 6 jours / 4 799€. Difficulté : Modéré. Parfait pour les passionnés d'art et d'histoire. Je vous en dis plus ?";
      }

      if (lowerMessage.includes('réserver') || lowerMessage.includes('réservation') || lowerMessage.includes('book') || lowerMessage.includes('disponibilité')) {
        return "Excellent choix ! Pour procéder à votre réservation : 1) Choisissez votre destination, 2) Sélectionnez votre date de départ, 3) Nombre de voyageurs, 4) Options d'assurance et extras. Le paiement est sécurisé (3x sans frais disponible) et vous recevrez votre kit de préparation sous 48h. Puis-je vous diriger vers notre formulaire de réservation ?";
      }

      if (lowerMessage.includes('annulation') || lowerMessage.includes('remboursement') || lowerMessage.includes('annuler')) {
        return "Politique d'annulation flexible : 100% remboursé jusqu'à 30 jours avant départ, 50% entre 30-15 jours, 25% entre 15-7 jours. Moins de 7 jours : non remboursable sauf force majeure médicale. Notre assurance Premium (recommandée) couvre tous les cas d'annulation pour raison médicale, professionnelle ou familiale grave. Voulez-vous plus d'infos sur les assurances ?";
      }

      if (lowerMessage.includes('assurance') || lowerMessage.includes('protection') || lowerMessage.includes('garantie')) {
        return "Trois niveaux d'assurance : 1) Standard (incluse) : protection de base + rapatriement d'urgence. 2) Premium (+500€) : annulation flexible + protection étendue + assistance 24/7 prioritaire. 3) Ultimate (+1000€) : couverture maximale + protection contre paradoxes temporels + garantie satisfaction totale. Je recommande Premium pour votre tranquillité d'esprit.";
      }

      // Default responses
      const responses = [
        "Question intéressante ! Nos experts peuvent vous fournir une réponse détaillée. Quelle destination ou époque vous attire particulièrement ?",
        "Je suis là pour vous guider. Préférez-vous explorer l'Antiquité, la Renaissance, l'ère industrielle, ou partir à l'aventure préhistorique ?",
        "TimeTravel Agency vous ouvre les portes de l'histoire. Puis-je vous recommander une destination selon vos centres d'intérêt ?",
        "Excellente question. Pour mieux vous conseiller, dites-moi : recherchez-vous une expérience culturelle, une aventure extrême, ou un mélange des deux ?"
      ];
      
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Utiliser l'API Groq
    try {
      const conversationHistory = messages
        .filter(m => m.sender !== 'bot' || m.id !== '1') // Exclure le message de bienvenue
        .map(m => ({
          role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: m.text
        }));

      conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      const response = await groqService.sendMessage(conversationHistory);
      return response;
    } catch (error) {
      console.error('Error getting bot response:', error);
      return "Je rencontre une difficulté technique temporaire. Pourriez-vous reformuler votre question ?";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const responseText = await getBotResponse(inputValue);
      
      // Simuler un délai de frappe naturel
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error in handleSend:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Désolé, je rencontre un problème technique. Veuillez réessayer.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 w-full max-w-md h-[600px] bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-amber-500/30"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-amber-500" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-amber-500"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Conseiller Temporel {GroqService.isConfigured() && '✨ IA'}
                  </h3>
                  <p className="text-xs text-slate-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {GroqService.isConfigured() ? 'Propulsé par Groq AI' : 'Mode assistant'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-900 hover:bg-slate-900/10 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* API Key Warning */}
            {showApiKeyWarning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-500/20 border-b border-amber-500/30 p-3 flex items-start gap-2"
              >
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-100">
                  <p className="font-semibold mb-1">Mode assistant basique actif</p>
                  <p>Pour activer l'IA avancée, configurez VITE_GROQ_KEY dans votre fichier .env</p>
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'bot' 
                      ? 'bg-gradient-to-br from-amber-500 to-yellow-600' 
                      : 'bg-slate-700'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot className="w-5 h-5 text-slate-900" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-2xl max-w-[85%] ${
                      message.sender === 'bot'
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <div className="text-xs text-gray-600 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-slate-900" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        className="w-2 h-2 bg-amber-500 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez-moi vos questions sur les voyages temporels..."
                  className="flex-1 bg-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-slate-700 placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/30 transition-all"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function ChatButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)' }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full shadow-2xl shadow-amber-500/30 flex items-center justify-center text-slate-900"
    >
      <MessageCircle className="w-7 h-7" />
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-amber-500"
      />
    </motion.button>
  );
}