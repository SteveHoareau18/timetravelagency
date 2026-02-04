import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Shield, Sparkles, Check } from 'lucide-react';
import type { Destination } from './DestinationCard';

interface BookingFormProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingForm({ destination, isOpen, onClose }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    duration: 5,
    departureDate: '',
    insurance: 'standard',
    guide: true,
    extras: [] as string[]
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const calculatePrice = () => {
    if (!destination) return 0;
    const basePrice = parseInt(destination.price.replace(/[^0-9]/g, ''));
    let total = basePrice * bookingData.travelers;
    
    // Duration adjustment
    total += (bookingData.duration - 5) * 200 * bookingData.travelers;
    
    // Insurance
    if (bookingData.insurance === 'premium') total += 500 * bookingData.travelers;
    if (bookingData.insurance === 'ultimate') total += 1000 * bookingData.travelers;
    
    // Guide
    if (bookingData.guide) total += 800;
    
    // Extras
    total += bookingData.extras.length * 300;
    
    return total;
  };

  const handleSubmit = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsConfirmed(false);
      setStep(1);
      setBookingData({
        travelers: 1,
        duration: 5,
        departureDate: '',
        insurance: 'standard',
        guide: true,
        extras: []
      });
      onClose();
    }, 3000);
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {isConfirmed ? (
              // Confirmation screen
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
                >
                  <Check className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Réservation Confirmée !
                </h2>
                <p className="text-xl text-gray-300 mb-2">
                  Votre voyage vers <span className="text-cyan-400">{destination.name}</span> est réservé
                </p>
                <p className="text-gray-400">
                  Vous recevrez votre kit de préparation dans les 48h
                </p>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mt-8"
                >
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </motion.div>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Réserver votre voyage
                    </h2>
                    <p className="text-cyan-100">{destination.name}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress steps */}
                <div className="bg-slate-700 px-6 py-4 flex justify-between">
                  {['Voyageurs', 'Options', 'Confirmation'].map((label, index) => (
                    <div key={label} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        step > index + 1 ? 'bg-green-500 text-white' :
                        step === index + 1 ? 'bg-cyan-500 text-white' :
                        'bg-slate-600 text-gray-400'
                      }`}>
                        {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                      </div>
                      <span className={`ml-2 text-sm ${
                        step === index + 1 ? 'text-white font-semibold' : 'text-gray-400'
                      } hidden sm:inline`}>
                        {label}
                      </span>
                      {index < 2 && (
                        <div className={`w-12 h-1 mx-2 ${
                          step > index + 1 ? 'bg-green-500' : 'bg-slate-600'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          <Users className="w-5 h-5 inline mr-2" />
                          Nombre de voyageurs
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={bookingData.travelers}
                          onChange={(e) => setBookingData({ ...bookingData, travelers: parseInt(e.target.value) || 1 })}
                          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          <Calendar className="w-5 h-5 inline mr-2" />
                          Durée du séjour (jours dans l'époque)
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="14"
                          value={bookingData.duration}
                          onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}
                          className="w-full"
                        />
                        <div className="text-cyan-400 text-lg font-bold mt-2">
                          {bookingData.duration} jours
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Date de départ souhaitée
                        </label>
                        <input
                          type="date"
                          value={bookingData.departureDate}
                          onChange={(e) => setBookingData({ ...bookingData, departureDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-white font-semibold mb-3">
                          <Shield className="w-5 h-5 inline mr-2" />
                          Assurance voyage temporel
                        </label>
                        <div className="space-y-3">
                          {[
                            { value: 'standard', label: 'Standard', desc: 'Protection de base', price: 'Inclus' },
                            { value: 'premium', label: 'Premium', desc: 'Protection étendue + rapatriement', price: '+500€' },
                            { value: 'ultimate', label: 'Ultimate', desc: 'Protection maximale + paradoxe', price: '+1000€' }
                          ].map((option) => (
                            <label
                              key={option.value}
                              className={`block p-4 rounded-lg cursor-pointer transition-all ${
                                bookingData.insurance === option.value
                                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 ring-2 ring-cyan-400'
                                  : 'bg-slate-700 hover:bg-slate-600'
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
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-white font-semibold">{option.label}</div>
                                  <div className="text-sm text-gray-300">{option.desc}</div>
                                </div>
                                <div className="text-cyan-400 font-bold">{option.price}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center space-x-3 p-4 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
                          <input
                            type="checkbox"
                            checked={bookingData.guide}
                            onChange={(e) => setBookingData({ ...bookingData, guide: e.target.checked })}
                            className="w-5 h-5 text-cyan-500"
                          />
                          <div className="flex-1">
                            <div className="text-white font-semibold">Guide temporel expert</div>
                            <div className="text-sm text-gray-300">Accompagnement personnalisé</div>
                          </div>
                          <div className="text-cyan-400 font-bold">+800€</div>
                        </label>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-3">
                          Options supplémentaires
                        </label>
                        <div className="space-y-2">
                          {[
                            'Traducteur universel premium',
                            'Appareil photo temporel 8K',
                            'Kit souvenir d\'époque',
                            'Accès VIP événements historiques'
                          ].map((extra) => (
                            <label
                              key={extra}
                              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                bookingData.extras.includes(extra)
                                  ? 'bg-cyan-600'
                                  : 'bg-slate-700 hover:bg-slate-600'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={bookingData.extras.includes(extra)}
                                onChange={() => toggleExtra(extra)}
                                className="w-4 h-4 text-cyan-500"
                              />
                              <div className="flex-1 text-white">{extra}</div>
                              <div className="text-cyan-400 text-sm">+300€</div>
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
                      className="space-y-6"
                    >
                      <div className="bg-slate-700 rounded-lg p-6 space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Récapitulatif</h3>
                        
                        <div className="space-y-2 text-gray-300">
                          <div className="flex justify-between">
                            <span>Destination</span>
                            <span className="text-white font-semibold">{destination.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Époque</span>
                            <span className="text-white">{destination.year}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Voyageurs</span>
                            <span className="text-white">{bookingData.travelers} personne{bookingData.travelers > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Durée</span>
                            <span className="text-white">{bookingData.duration} jours</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date de départ</span>
                            <span className="text-white">
                              {bookingData.departureDate 
                                ? new Date(bookingData.departureDate).toLocaleDateString('fr-FR')
                                : 'À définir'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Assurance</span>
                            <span className="text-white capitalize">{bookingData.insurance}</span>
                          </div>
                          {bookingData.guide && (
                            <div className="flex justify-between">
                              <span>Guide expert</span>
                              <span className="text-green-400">✓ Inclus</span>
                            </div>
                          )}
                          {bookingData.extras.length > 0 && (
                            <div>
                              <div className="font-semibold text-white mt-2 mb-1">Options :</div>
                              {bookingData.extras.map(extra => (
                                <div key={extra} className="text-sm ml-4">• {extra}</div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="border-t border-slate-600 pt-4 mt-4">
                          <div className="flex justify-between text-2xl font-bold">
                            <span className="text-white">Total</span>
                            <span className="text-cyan-400">{calculatePrice().toLocaleString('fr-FR')}€</span>
                          </div>
                          <div className="text-sm text-gray-400 text-right mt-1">
                            Paiement en 3x sans frais disponible
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
                        <p className="text-sm text-purple-200">
                          ⚠️ Votre kit de préparation sera envoyé dans les 48h. Une séance de briefing obligatoire aura lieu 24h avant le départ.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-slate-700 p-6 flex justify-between items-center">
                  <div>
                    {step > 1 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
                      >
                        Retour
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Total estimé</div>
                      <div className="text-2xl font-bold text-cyan-400">
                        {calculatePrice().toLocaleString('fr-FR')}€
                      </div>
                    </div>
                    {step < 3 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(step + 1)}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold"
                      >
                        Continuer
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Confirmer la réservation
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
