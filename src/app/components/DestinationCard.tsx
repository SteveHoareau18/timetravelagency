import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

export interface Destination {
  id: string;
  name: string;
  era: string;
  year: string;
  image: string;
  description: string;
  highlights: string[];
  difficulty: string;
  price: string;
}

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

export function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        {/* Difficulty badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
          {destination.difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {destination.name}
            </h3>
            <div className="flex items-center gap-2 text-cyan-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{destination.year}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2">
          {destination.description}
        </p>

        {/* Highlights */}
        <div className="mb-4 space-y-2">
          {destination.highlights.slice(0, 2).map((highlight, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div>
            <div className="text-sm text-gray-400">À partir de</div>
            <div className="text-2xl font-bold text-white">{destination.price}</div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(destination)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-shadow"
          >
            Réserver
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent" />
      </div>
    </motion.div>
  );
}
