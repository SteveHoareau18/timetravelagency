import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroNewProps {
  onExplore: () => void;
}

export function HeroNew({ onExplore }: HeroNewProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background with overlay */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Animated gradient overlay simulating video */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
        
        {/* Particles effect */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -20, null],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="inline-block">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 border-2 border-amber-500/30 rounded-full" />
              <div className="absolute inset-2 border-2 border-amber-400/50 rounded-full" />
              <div className="absolute inset-4 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Voyagez à travers
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              le Temps
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          L'histoire n'a jamais été aussi proche. Explorez les époques légendaires avec TimeTravel Agency, 
          la première agence de voyage temporel de luxe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onExplore}
            className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-full font-bold text-lg shadow-2xl shadow-amber-500/30 flex items-center gap-3 hover:shadow-amber-500/50 transition-all"
          >
            <Sparkles className="w-6 h-6" />
            Explorer les destinations
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-transparent border-2 border-amber-500/50 text-white rounded-full font-bold text-lg hover:bg-amber-500/10 hover:border-amber-500 transition-all backdrop-blur-sm"
          >
            En savoir plus
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { label: 'Époques disponibles', value: '50+' },
            { label: 'Voyageurs satisfaits', value: '10K+' },
            { label: 'Destinations premium', value: '15' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity },
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={onExplore}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-amber-500 text-sm uppercase tracking-wider">Découvrir</span>
          <ArrowDown className="w-6 h-6 text-amber-500" />
        </div>
      </motion.div>

      {/* Decorative border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </div>
  );
}
