import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Star, X, ChevronRight, Sparkles } from 'lucide-react';

export interface DestinationPremium {
  id: string;
  name: string;
  era: string;
  year: string;
  image: string;
  description: string;
  longDescription: string;
  highlights: string[];
  activities: string[];
  historicalFacts: string[];
  duration: string;
  difficulty: string;
  price: string;
  rating: number;
}

interface DestinationCardPremiumProps {
  destination: DestinationPremium;
  onBook: (destination: DestinationPremium) => void;
}

export function DestinationCardPremium({ destination, onBook }: DestinationCardPremiumProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group relative"
      >
        <motion.div
          whileHover={{ y: -8 }}
          className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20"
        >
          {/* Image */}
          <div className="relative h-80 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            
            {/* Rating badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center gap-1.5 border border-amber-500/30">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-white font-semibold">{destination.rating}</span>
            </div>

            {/* Difficulty badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-full text-sm font-semibold text-amber-500 border border-amber-500/30">
              {destination.difficulty}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                  {destination.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{destination.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {destination.description}
            </p>

            {/* Highlights */}
            <div className="mb-6 space-y-2">
              {destination.highlights.slice(0, 3).map((highlight, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">À partir de</div>
                <div className="text-3xl font-bold text-amber-500">{destination.price}</div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDetailOpen(true)}
                  className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  Découvrir plus
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onBook(destination)}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-lg font-bold hover:shadow-amber-500/50 transition-all flex items-center gap-2"
                >
                  Réserver
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent" />
          </div>
        </motion.div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-8 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-5xl lg:max-h-[90vh] bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-800"
            >
              {/* Header with image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
                
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-slate-800 transition-colors border border-slate-700"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-4xl font-bold text-white mb-2">{destination.name}</h2>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{destination.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span>{destination.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-20rem)] p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Description</h3>
                      <p className="text-gray-300 leading-relaxed">{destination.longDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-amber-500" />
                        Points forts
                      </h3>
                      <ul className="space-y-2">
                        {destination.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Activités incluses</h3>
                      <ul className="space-y-2">
                        {destination.activities.map((activity, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-300">
                            <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Le saviez-vous ?</h3>
                      <ul className="space-y-3">
                        {destination.historicalFacts.map((fact, index) => (
                          <li key={index} className="p-3 bg-slate-800 rounded-lg text-gray-300 text-sm border border-slate-700">
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CTA Footer */}
                <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Prix par personne</div>
                    <div className="text-4xl font-bold text-amber-500">{destination.price}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsDetailOpen(false);
                      onBook(destination);
                    }}
                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-lg font-bold text-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    Réserver maintenant
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}