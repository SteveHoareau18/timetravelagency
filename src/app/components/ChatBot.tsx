import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, X, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour ! Je suis TimeBot, votre assistant voyage temporel. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // FAQ responses
    if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('tarif')) {
      return "Nos tarifs varient selon la destination et la complexité du voyage temporel. Les prix commencent à 2 499€ pour les destinations faciles comme Paris 1889, et peuvent atteindre 8 999€ pour les expéditions extrêmes comme le Crétacé. Chaque voyage inclut : transport temporel, guide expert, équipement de sécurité, et assurance chronologique.";
    }
    
    if (lowerMessage.includes('sécurité') || lowerMessage.includes('dangereux') || lowerMessage.includes('risque')) {
      return "La sécurité est notre priorité absolue ! Chaque voyage est accompagné d'un guide temporel certifié. Nous utilisons des capsules de protection pour les destinations préhistoriques, et nos systèmes de détection préviennent tout paradoxe temporel. Vous portez également un traceur quantique permettant votre rapatriement immédiat en cas d'urgence.";
    }
    
    if (lowerMessage.includes('durée') || lowerMessage.includes('combien de temps') || lowerMessage.includes('longtemps')) {
      return "Excellente question ! Grâce à la relativité temporelle, votre voyage peut durer plusieurs jours dans le passé tout en ne prenant que quelques heures dans le présent. En moyenne, nos circuits durent 3 à 7 jours dans l'époque visitée, mais vous ne serez absent que 6-12 heures de votre temps actuel.";
    }
    
    if (lowerMessage.includes('paradoxe') || lowerMessage.includes('modifier') || lowerMessage.includes('changer le passé')) {
      return "Nos protocoles de sécurité temporelle empêchent tout paradoxe ! Vous êtes en mode 'observateur protégé' : vous pouvez voir et vivre l'époque, mais votre présence n'affecte pas la ligne temporelle principale. C'est comme être dans une bulle d'observation quantique.";
    }
    
    if (lowerMessage.includes('recommand') || lowerMessage.includes('conseil') || lowerMessage.includes('meilleur')) {
      return "Pour une première expérience, je recommande Paris 1889 ou Florence 1504 - des destinations fascinantes et sûres. Si vous êtes aventureux, le Crétacé offre une expérience unique mais nécessite une préparation physique. Pour les amateurs de technologie, Neo-Tokyo 2184 est extraordinaire !";
    }
    
    if (lowerMessage.includes('préparer') || lowerMessage.includes('préparation') || lowerMessage.includes('emmener')) {
      return "Nous fournissons tout l'équipement nécessaire ! Vous recevrez : vêtements d'époque, traducteur universel, kit médical temporel, et guide de survie de l'époque. Apportez simplement vos effets personnels et votre curiosité. Une séance de briefing d'1h précède chaque départ.";
    }

    if (lowerMessage.includes('dinosaure') || lowerMessage.includes('crétacé') || lowerMessage.includes('préhistoire')) {
      return "Le Crétacé est notre destination la plus spectaculaire ! Vous observerez des T-Rex, Tricératops et autres géants depuis notre capsule blindée. L'expérience inclut un survol en drone temporel pour capturer des images incroyables. C'est un voyage de niveau Extrême, nécessitant une excellente condition physique.";
    }

    if (lowerMessage.includes('paris') || lowerMessage.includes('1889') || lowerMessage.includes('eiffel')) {
      return "Paris 1889 pendant l'Exposition Universelle est magique ! Vous assisterez à l'inauguration de la Tour Eiffel, découvrirez les premières automobiles et phonographes, et profiterez de l'ambiance unique de la Belle Époque. Parfait pour les débutants !";
    }

    if (lowerMessage.includes('réserver') || lowerMessage.includes('réservation') || lowerMessage.includes('book')) {
      return "Pour réserver, il suffit de choisir votre destination, de personnaliser votre voyage (durée, options, assurances), puis de valider. Le paiement est sécurisé et vous recevrez votre kit de préparation dans les 48h. Les départs ont lieu tous les jours depuis notre station temporelle de Lyon.";
    }

    // Default response
    const responses = [
      "Intéressante question ! Nos experts temporels peuvent vous fournir plus de détails. Quelle destination vous attire le plus ?",
      "Je peux vous aider à choisir votre voyage idéal ! Préférez-vous l'histoire ancienne, la Renaissance, ou le futur ?",
      "TimeTravel Agency propose des expériences uniques à travers le temps. Avez-vous des questions sur une époque en particulier ?",
      "Notre équipe d'experts est là pour vous guider. Que souhaitez-vous savoir sur les voyages temporels ?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Chat window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 w-full max-w-md h-[600px] bg-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-8 h-8 text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">TimeBot AI</h3>
                  <p className="text-xs text-cyan-100">Assistant voyage temporel</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'bot' 
                      ? 'bg-gradient-to-br from-cyan-500 to-purple-600' 
                      : 'bg-slate-600'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-2xl ${
                      message.sender === 'bot'
                        ? 'bg-slate-700 text-white'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    }`}>
                      {message.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-slate-700 p-3 rounded-2xl flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-slate-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
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