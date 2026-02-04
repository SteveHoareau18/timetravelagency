import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Shield, Check, ChevronRight, Sparkles } from 'lucide-react';
import type { DestinationPremium } from './DestinationCardPremium';

interface BookingFormPremiumProps {
  destination: DestinationPremium | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingFormPremium({ destination, isOpen, onClose }: BookingFormPremiumProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    departureDate: '',
    insurance: 'premium',
    guide: true,
    extras: [] as string[]
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const calculatePrice = () => {
    if (!destination) return 0;
    const basePrice = parseInt(destination.price.replace(/[^0-9]/g, ''));
    let total = basePrice * bookingData.travelers;
    
    if (bookingData.insurance === 'standard') total -= 500 * bookingData.travelers;
    if (bookingData.insurance === 'ultimate') total += 500 * bookingData.travelers;
    
    if (!bookingData.guide) total -= 800;
    
    total += bookingData.extras.length * 400;
    
    return total;
  };

  const handleSubmit = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsConfirmed(false);
      setStep(1);
      setBookingData({
        travelers: 1,
        departureDate: '',
        insurance: 'premium',
        guide: true,
        extras: []
      });
      onClose();
    }, 4000);
  };

  const toggleExtra = (extra: string) => {
    setBookingData(prev => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra]
    }));
  };

  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden border border-amber-500/30 flex flex-col"
          >
            {isConfirmed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-amber-500/50"
                >
                  <Check className="w-12 h-12 text-slate-900" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Réservation Confirmée !
                  </h2>
                  <p className="text-xl text-gray-300 mb-2">
                    Votre voyage vers <span className="text-amber-500 font-semibold">{destination.name}</span>
                  </p>
                  <p className="text-lg text-gray-400 mb-6">
                    {destination.year}
                  </p>
                  <div className="max-w-md mx-auto space-y-3 text-gray-400">
                    <p className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5 text-green-400" />
                      Confirmation envoyée par email
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5 text-green-400" />
                      Kit de préparation dans 48h
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5 text-green-400" />
                      Briefing prévu 24h avant départ
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mt-8"
                >
                  <Sparkles className="w-10 h-10 text-amber-500" />
                </motion.div>
              </motion.div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                      Réserver votre voyage
                    </h2>
                    <p className="text-slate-800">{destination.name} • {destination.year}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-slate-900 hover:bg-slate-900/10 p-2 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-slate-800 px-6 py-4 flex justify-between border-b border-slate-700">
                  {['Détails', 'Options', 'Confirmation'].map((label, index) => (
                    <div key={label} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                        step > index + 1 ? 'bg-green-500 text-white' :
                        step === index + 1 ? 'bg-amber-500 text-slate-900' :
                        'bg-slate-700 text-gray-500'
                      }`}>
                        {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                      </div>
                      <span className={`ml-2 text-sm font-semibold hidden sm:inline ${
                        step === index + 1 ? 'text-white' : 'text-gray-500'
                      }`}>
                        {label}
                      </span>
                      {index < 2 && (
                        <div className={`w-12 h-1 mx-2 ${
                          step > index + 1 ? 'bg-green-500' : 'bg-slate-700'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6 max-w-2xl mx-auto"
                    >
                      <div>
                        <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-amber-500" />
                          Nombre de voyageurs
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              onClick={() => setBookingData({ ...bookingData, travelers: num })}
                              className={`p-4 rounded-lg font-semibold transition-all ${
                                bookingData.travelers === num
                                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 shadow-lg shadow-amber-500/30'
                                  : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Maximum 4 voyageurs par départ pour une expérience premium
                        </p>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-amber-500" />
                          Date de départ souhaitée
                        </label>
                        <input
                          type="date"
                          value={bookingData.departureDate}
                          onChange={(e) => setBookingData({ ...bookingData, departureDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-slate-700"
                        />
                        <p className="text-sm text-gray-400 mt-2">
                          Durée du séjour : {destination.duration} • Retour {destination.duration === '5 jours' ? '6h' : destination.duration === '6 jours' ? '7h' : '8h'} après votre départ (temps présent)
                        </p>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <p className="text-amber-500 font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Inclus dans votre voyage
                        </p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>✓ Transport temporel aller-retour</li>
                          <li>✓ Vêtements d'époque sur mesure</li>
                          <li>✓ Traducteur universel temps réel</li>
                          <li>✓ Kit photo 8K professionnel</li>
                          <li>✓ Assurance et équipement de sécurité</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6 max-w-2xl mx-auto"
                    >
                      <div>
                        <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-amber-500" />
                          Assurance voyage temporel
                        </label>
                        <div className="space-y-3">
                          {[
                            { value: 'standard', label: 'Standard', desc: 'Protection de base incluse', price: 'Inclus' },
                            { value: 'premium', label: 'Premium', desc: 'Recommandé - Annulation + Protection étendue', price: '+500€', badge: 'Recommandé' },
                            { value: 'ultimate', label: 'Ultimate', desc: 'Couverture maximale + Garantie satisfaction', price: '+1 000€' }
                          ].map((option) => (
                            <label
                              key={option.value}
                              className={`block p-4 rounded-lg cursor-pointer transition-all relative ${
                                bookingData.insurance === option.value
                                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 shadow-lg shadow-amber-500/30'
                                  : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white'
                              }`}
                            >
                              <input
                                type="radio"
                                name="insurance"
                                value={option.value}
                                checked={bookingData.insurance === option.value}
                                onChange={(e) => setBookingData({ ...bookingData, insurance: e.target.value })}
                                className="sr-only"
                              />
                              {option.badge && (
                                <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                                  {option.badge}
                                </span>
                              )}
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-semibold text-lg">{option.label}</div>
                                  <div className={`text-sm ${bookingData.insurance === option.value ? 'text-slate-800' : 'text-gray-400'}`}>
                                    {option.desc}
                                  </div>
                                </div>
                                <div className="font-bold text-lg">{option.price}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center space-x-3 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-750 transition-colors border border-slate-700">
                          <input
                            type="checkbox"
                            checked={bookingData.guide}
                            onChange={(e) => setBookingData({ ...bookingData, guide: e.target.checked })}
                            className="w-5 h-5 text-amber-500 rounded"
                          />
                          <div className="flex-1">
                            <div className="text-white font-semibold">Guide temporel expert certifié</div>
                            <div className="text-sm text-gray-400">Historien spécialisé + 500h de vol temporel</div>
                          </div>
                          <div className="text-amber-500 font-bold">+800€</div>
                        </label>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-3">
                          Options premium (facultatives)
                        </label>
                        <div className="space-y-2">
                          {[
                            'Traducteur premium 50 langues',
                            'Appareil photo temporel 12K + drone',
                            'Collection souvenirs d\'époque certifiés',
                            'Accès VIP événements historiques exclusifs'
                          ].map((extra) => (
                            <label
                              key={extra}
                              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                bookingData.extras.includes(extra)
                                  ? 'bg-amber-500/20 border-amber-500'
                                  : 'bg-slate-800 hover:bg-slate-750'
                              } border border-slate-700`}
                            >
                              <input
                                type="checkbox"
                                checked={bookingData.extras.includes(extra)}
                                onChange={() => toggleExtra(extra)}
                                className="w-4 h-4 text-amber-500 rounded"
                              />
                              <div className="flex-1 text-white text-sm">{extra}</div>
                              <div className="text-amber-500 text-sm font-semibold">+400€</div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6 max-w-2xl mx-auto"
                    >
                      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4">Récapitulatif de votre voyage</h3>
                        
                        <div className="space-y-3 text-gray-300">
                          <div className="flex justify-between py-2 border-b border-slate-700">
                            <span>Destination</span>
                            <span className="text-white font-semibold">{destination.name}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-700">
                            <span>Époque</span>
                            <span className="text-white">{destination.year}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-700">
                            <span>Durée</span>
                            <span className="text-white">{destination.duration}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-700">
                            <span>Voyageurs</span>
                            <span className="text-white">{bookingData.travelers} personne{bookingData.travelers > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-700">
                            <span>Date de départ</span>
                            <span className="text-white">
                              {bookingData.departureDate 
                                ? new Date(bookingData.departureDate).toLocaleDateString('fr-FR', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })
                                : 'À définir'}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-700">
                            <span>Assurance</span>
                            <span className="text-white capitalize">{bookingData.insurance}</span>
                          </div>
                          {bookingData.guide && (
                            <div className="flex justify-between py-2 border-b border-slate-700">
                              <span>Guide expert</span>
                              <span className="text-green-400 flex items-center gap-1">
                                <Check className="w-4 h-4" /> Inclus
                              </span>
                            </div>
                          )}
                          {bookingData.extras.length > 0 && (
                            <div className="py-2">
                              <div className="font-semibold text-white mb-2">Options premium :</div>
                              {bookingData.extras.map(extra => (
                                <div key={extra} className="text-sm ml-4 mb-1">• {extra}</div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="border-t border-amber-500/30 pt-4 mt-6">
                          <div className="flex justify-between items-center text-3xl font-bold mb-2">
                            <span className="text-white">Total</span>
                            <span className="text-amber-500">{calculatePrice().toLocaleString('fr-FR')}€</span>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            Paiement en 3x sans frais disponible
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <p className="text-amber-500 font-semibold mb-2">📦 Prochaines étapes</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>1. Confirmation par email immédiate</li>
                          <li>2. Kit de préparation envoyé sous 48h</li>
                          <li>3. Briefing obligatoire 24h avant départ</li>
                          <li>4. Départ depuis notre station temporelle</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="bg-slate-800 p-6 flex justify-between items-center border-t border-slate-700">
                  <div>
                    {step > 1 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-semibold"
                      >
                        Retour
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Total</div>
                      <div className="text-2xl font-bold text-amber-500">
                        {calculatePrice().toLocaleString('fr-FR')}€
                      </div>
                    </div>
                    {step < 3 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(step + 1)}
                        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2"
                      >
                        Continuer
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        disabled={!bookingData.departureDate}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/30 transition-all"
                      >
                        <Check className="w-5 h-5" />
                        Confirmer & Payer
                      </motion.button>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}