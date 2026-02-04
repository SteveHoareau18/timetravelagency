import { motion } from 'motion/react';
import { DestinationCard, type Destination } from './DestinationCard';

interface DestinationsProps {
  onSelectDestination: (destination: Destination) => void;
}

export function Destinations({ onSelectDestination }: DestinationsProps) {
  const destinations: Destination[] = [
    {
      id: '1',
      name: 'Paris, Exposition Universelle',
      era: 'Belle Époque',
      year: '1889',
      image: 'https://images.unsplash.com/photo-1632749696219-4c3ba70af799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlciUyMDE4ODklMjB2aW50YWdlfGVufDF8fHx8MTc3MDIxMjAyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      description: "Assistez à l'inauguration de la Tour Eiffel et découvrez l'âge d'or parisien. Une époque de glamour, d'innovation et d'art nouveau.",
      highlights: [
        "Inauguration de la Tour Eiffel",
        "Exposition des inventions révolutionnaires",
        "Quartier de Montmartre en effervescence"
      ],
      difficulty: 'Facile',
      price: '2 499€'
    },
    {
      id: '2',
      name: 'Crétacé Supérieur',
      era: 'Préhistoire',
      year: '-65 millions d\'années',
      image: 'https://images.unsplash.com/photo-1668173271996-4095986dce2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXJhbm5vc2F1cnVzJTIwcmV4JTIwbmF0dXJlfGVufDF8fHx8MTc3MDIxMjAzMXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: "Explorez la terre des géants préhistoriques. Observez les dinosaures dans leur habitat naturel depuis notre capsule de sécurité.",
      highlights: [
        "Observation de T-Rex en chasse",
        "Forêts luxuriantes du Crétacé",
        "Témoins de l'impact météoritique (option)"
      ],
      difficulty: 'Extrême',
      price: '8 999€'
    },
    {
      id: '3',
      name: 'Florence Renaissance',
      era: 'Renaissance',
      year: '1504',
      image: 'https://images.unsplash.com/photo-1718726057677-5aebd7e0754a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMHJlbmFpc3NhbmNlJTIwY2F0aGVkcmFsfGVufDF8fHx8MTc3MDIxMjAyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: "Rencontrez Michel-Ange et assistez à l'inauguration du David. Plongez dans l'effervescence artistique de la Renaissance italienne.",
      highlights: [
        "Rencontre avec Michel-Ange",
        "Ateliers d'artistes de la Renaissance",
        "Visite des palais des Médicis"
      ],
      difficulty: 'Modéré',
      price: '3 799€'
    },
    {
      id: '4',
      name: 'Égypte Antique',
      era: 'Antiquité',
      year: '-2560 av. J.-C.',
      image: 'https://images.unsplash.com/photo-1734461255961-6288a28a65f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBweXJhbWlkcyUyMHN1bnNldHxlbnwxfHx8fDE3NzAyMTIwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: "Découvrez la construction de la Grande Pyramide de Khéops. Percez les mystères de cette civilisation fascinante.",
      highlights: [
        "Chantier de la Grande Pyramide",
        "Cérémonie au temple de Karnak",
        "Navigation sur le Nil antique"
      ],
      difficulty: 'Modéré',
      price: '4 299€'
    },
    {
      id: '5',
      name: 'Neo-Tokyo',
      era: 'Futur Proche',
      year: '2184',
      image: 'https://images.unsplash.com/photo-1715614176939-f5c46ae99d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2l0eSUyMG5lb24lMjBsaWdodHN8ZW58MXx8fHwxNzcwMjEyMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: "Explorez la mégalopole futuriste où l'humanité coexiste avec l'intelligence artificielle. Découvrez les technologies de demain.",
      highlights: [
        "Villes flottantes et gratte-ciels atmosphériques",
        "Rencontre avec des IA conscientes",
        "Transport par tube à vide"
      ],
      difficulty: 'Facile',
      price: '5 499€'
    },
    {
      id: '6',
      name: 'Versailles, Cour du Roi-Soleil',
      era: 'Grand Siècle',
      year: '1682',
      image: 'https://images.unsplash.com/photo-1724247354470-9779b657c010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aW1lJTIwdHJhdmVsJTIwY2xvY2slMjBwb3J0YWx8ZW58MXx8fHwxNzcwMjEyMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: "Vivez le faste et l'étiquette de la cour de Louis XIV. Assistez à un bal masqué et découvrez les intrigues du château.",
      highlights: [
        "Bal masqué au Château",
        "Jardins de Le Nôtre",
        "Représentation de Molière"
      ],
      difficulty: 'Modéré',
      price: '3 199€'
    }
  ];

  return (
    <section id="destinations" className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Destinations <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Temporelles</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choisissez votre époque et embarquez pour un voyage inoubliable à travers le temps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DestinationCard
                destination={destination}
                onSelect={onSelectDestination}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
