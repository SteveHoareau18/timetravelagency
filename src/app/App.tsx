import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { HeroNew } from './components/HeroNew';
import { DestinationsPremium } from './components/DestinationsPremium';
import { FAQ } from './components/FAQ';
import { ChatBotPremium, ChatButton } from './components/ChatBotPremium';
import { BookingFormPremium } from './components/BookingFormPremium';
import type { DestinationPremium } from './components/DestinationCardPremium';

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState<DestinationPremium | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar transparency
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleBook = (destination: DestinationPremium) => {
    setSelectedDestination(destination);
    setIsBookingOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 shadow-xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border-2 border-amber-500/30 rounded-full" />
              <div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-lg">⏰</span>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              TimeTravel Agency
            </span>
          </motion.div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('destinations')}
              className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
            >
              Destinations
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
            >
              Chat
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
            >
              Contact
            </button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('destinations')}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-full font-bold"
            >
              Réserver
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-t border-slate-800"
            >
              <div className="px-4 py-4 space-y-3">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-300 hover:text-amber-500 transition-colors py-3 px-4 hover:bg-slate-800 rounded-lg font-medium"
                >
                  Accueil
                </button>
                <button
                  onClick={() => scrollToSection('destinations')}
                  className="block w-full text-left text-gray-300 hover:text-amber-500 transition-colors py-3 px-4 hover:bg-slate-800 rounded-lg font-medium"
                >
                  Destinations
                </button>
                <button
                  onClick={() => {
                    setIsChatOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-300 hover:text-amber-500 transition-colors py-3 px-4 hover:bg-slate-800 rounded-lg font-medium"
                >
                  Chat
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left text-gray-300 hover:text-amber-500 transition-colors py-3 px-4 hover:bg-slate-800 rounded-lg font-medium"
                >
                  Contact
                </button>
                <button
                  onClick={() => scrollToSection('destinations')}
                  className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-full font-bold"
                >
                  Réserver un voyage
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <HeroNew onExplore={() => scrollToSection('destinations')} />

      {/* Destinations Section */}
      <DestinationsPremium onBook={handleBook} />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-b from-slate-900 to-slate-950 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-semibold uppercase tracking-wider">
                Contactez-nous
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Prêt pour l'aventure
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
                de votre vie ?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Notre équipe d'experts est disponible 24/7 pour répondre à toutes vos questions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Phone,
                title: 'Téléphone',
                content: '+33 1 23 45 67 89',
                subContent: 'Lun-Dim 24h/24'
              },
              {
                icon: Mail,
                title: 'Email',
                content: 'contact@timetravel.agency',
                subContent: 'Réponse sous 2h'
              },
              {
                icon: MapPin,
                title: 'Station Temporelle',
                content: '123 Avenue du Temps',
                subContent: 'Lyon, France'
              }
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <contact.icon className="w-7 h-7 text-slate-900" />
                </div>
                <h3 className="text-white font-bold mb-2">{contact.title}</h3>
                <p className="text-gray-300 mb-1">{contact.content}</p>
                <p className="text-sm text-gray-500">{contact.subContent}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-10 bg-gradient-to-r from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Rejoignez 50 000+ voyageurs temporels</h3>
            <p className="text-gray-300 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives et guides de voyage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-6 py-3 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 border border-slate-700"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                S'inscrire
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 border-2 border-amber-500/30 rounded-full" />
                  <div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-lg">⏰</span>
                  </div>
                </div>
                <span className="font-bold text-white text-lg">TimeTravel Agency</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                La première agence de voyage temporel au monde. Explorez l'histoire avec sécurité et élégance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Destinations</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Antiquité</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Moyen Âge</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Renaissance</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Préhistoire</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Futur</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Informations</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Sécurité temporelle</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Conditions générales</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Politique de confidentialité</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Suivez-nous</h4>
              <div className="flex gap-3 mb-4">
                {[
                  { Icon: Instagram, href: '#' },
                  { Icon: Facebook, href: '#' },
                  { Icon: Twitter, href: '#' },
                  { Icon: Linkedin, href: '#' }
                ].map(({ Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-slate-700 transition-all border border-slate-700"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Rejoignez notre communauté de voyageurs temporels
              </p>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2026 TimeTravel Agency. Tous droits réservés dans toutes les époques.
            </p>
            <p className="text-gray-500 text-sm text-center md:text-right">
              Certifié par l'Autorité Chronologique Internationale
            </p>
          </div>
          
          <div className="border-t border-slate-800 mt-6 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              Créé par <span className="text-amber-500 font-semibold">Steve HOAREAU</span> dans le cadre d'un projet{' '}
              <span className="text-gray-400">Montpellier YNOV Campus</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      {!isChatOpen && <ChatButton onClick={() => setIsChatOpen(true)} />}

      {/* Chat Bot */}
      <ChatBotPremium isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Booking Form */}
      <BookingFormPremium
        destination={selectedDestination}
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedDestination(null);
        }}
      />
    </div>
  );
}