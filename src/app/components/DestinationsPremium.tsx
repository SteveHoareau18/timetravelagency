import { motion } from 'motion/react';
import { DestinationCardPremium, type DestinationPremium } from './DestinationCardPremium';

interface DestinationsPremiumProps {
  onBook: (destination: DestinationPremium) => void;
}

export function DestinationsPremium({ onBook }: DestinationsPremiumProps) {
  const destinations: DestinationPremium[] = [
    {
      id: '1',
      name: 'Paris, Belle Époque',
      era: 'XIXe siècle',
      year: '1889',
      image: 'https://images.unsplash.com/photo-1632749695805-2920c261d71d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwdmludGFnZSUyMHNlcGlhfGVufDF8fHx8MTc3MDIxMjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      description: "Revivez l'inauguration de la Tour Eiffel lors de l'Exposition Universelle. Plongez dans l'âge d'or parisien, entre art nouveau et révolution industrielle.",
      longDescription: "Paris 1889 représente l'apogée de la Belle Époque, une période de paix, de prospérité et d'innovation culturelle sans précédent. Vous serez témoin de l'inauguration de la Tour Eiffel, symbole de la modernité et prouesse technique de son époque. Promenez-vous dans les Grands Boulevards illuminés à l'électricité, assistez aux spectacles du Moulin Rouge naissant, et découvrez les premières automobiles et phonographes qui révolutionnent la société.",
      highlights: [
        "Inauguration de la Tour Eiffel par Gustave Eiffel lui-même",
        "Visite privée de l'Exposition Universelle avec plus de 61 000 exposants",
        "Soirée exclusive au Moulin Rouge lors de son ouverture",
        "Rencontre avec des artistes impressionnistes dans les cafés de Montmartre"
      ],
      activities: [
        "Ascension de la Tour Eiffel avec vue panoramique sur Paris",
        "Dégustation gastronomique chez Maxim's",
        "Atelier de photographie avec les premiers appareils",
        "Promenade en calèche dans le Bois de Boulogne",
        "Visite des ateliers d'art nouveau"
      ],
      historicalFacts: [
        "La Tour Eiffel devait être détruite après 20 ans mais fut sauvée grâce à son utilité pour les transmissions radio.",
        "L'Exposition Universelle de 1889 a accueilli 32 millions de visiteurs.",
        "Le Moulin Rouge a ouvert ses portes le 6 octobre 1889 avec la première représentation du French Cancan."
      ],
      duration: '5 jours',
      difficulty: 'Facile',
      price: '3 499€',
      rating: 4.9
    },
    {
      id: '2',
      name: 'Crétacé Supérieur',
      era: 'Préhistoire',
      year: '-66 millions d\'années',
      image: 'https://images.unsplash.com/photo-1609397755983-38190d327177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5vc2F1ciUyMGp1cmFzc2ljJTIwcHJlaGlzdG9yaWMlMjBkcmFtYXRpY3xlbnwxfHx8fDE3NzAyMTI4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: "Observez les derniers géants de la Terre dans leur habitat naturel. Une aventure extrême au cœur du monde préhistorique, dans notre capsule de protection ultime.",
      longDescription: "Embarquez pour le voyage le plus spectaculaire jamais conçu : 66 millions d'années en arrière, à l'époque du Crétacé supérieur. Depuis notre capsule temporelle blindée et invisible aux dinosaures, observez les Tyrannosaurus Rex dans leur chasse matinale, les Triceratops migrant en troupeaux, et les Ptéranodon survolant les mers anciennes. Vous serez aux premières loges de l'écosystème le plus fascinant que la Terre ait jamais connu, juste avant l'impact de l'astéroïde qui changea tout.",
      highlights: [
        "Observation de Tyrannosaurus Rex en chasse depuis notre capsule sécurisée",
        "Vol en drone temporel au-dessus des forêts luxuriantes du Crétacé",
        "Troupeaux de dinosaures herbivores dans leur migration saisonnière",
        "Plage préhistorique avec nidification de dinosaures marins"
      ],
      activities: [
        "Safari préhistorique en capsule blindée tout-terrain",
        "Session photo 8K avec équipement professionnel fourni",
        "Observation nocturne de la faune crétacée",
        "Survol en drone des volcans actifs",
        "Collecte d'échantillons virtuels (répliques 3D à ramener)"
      ],
      historicalFacts: [
        "Le T-Rex avait la morsure la plus puissante de tous les animaux terrestres : 5 700 kg de pression.",
        "L'atmosphère contenait 50% plus d'oxygène qu'aujourd'hui, permettant l'existence de créatures gigantesques.",
        "Cette époque s'est terminée brutalement il y a 66 millions d'années avec l'impact d'un astéroïde de 10 km de diamètre."
      ],
      duration: '7 jours',
      difficulty: 'Extrême',
      price: '12 999€',
      rating: 5.0
    },
    {
      id: '3',
      name: 'Florence Renaissance',
      era: 'XVIe siècle',
      year: '1504',
      image: 'https://images.unsplash.com/photo-1685872364356-963da365a184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yZW5jZSUyMGl0YWx5JTIwcmVuYWlzc2FuY2UlMjBhcnR8ZW58MXx8fHwxNzcwMjEyODE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: "Assistez à l'inauguration du David de Michel-Ange. Immergez-vous dans le berceau de la Renaissance italienne, entre art, science et humanisme.",
      longDescription: "Florence en 1504 est le cœur battant de la Renaissance. Vous serez présent lors de l'installation de la statue colossale du David de Michel-Ange sur la Piazza della Signoria, événement majeur de l'histoire de l'art. Côtoyez les plus grands génies de l'époque : Michel-Ange, Léonard de Vinci, Botticelli. Découvrez les ateliers des Médicis, assistez à des débats philosophiques, et admirez les chefs-d'œuvre en cours de création. Florence vous ouvre les portes d'une époque où l'art et la pensée ont redéfini l'humanité.",
      highlights: [
        "Installation du David de Michel-Ange sur la Piazza della Signoria",
        "Visite privée des ateliers de Michel-Ange et Léonard de Vinci",
        "Audience avec Laurent II de Médicis au Palazzo Vecchio",
        "Participation à un banquet Renaissance avec musiciens et poètes"
      ],
      activities: [
        "Cours de fresque avec un maître artisan de l'époque",
        "Visite des collections privées des Médicis",
        "Promenade sur le Ponte Vecchio et ses orfèvres",
        "Assister à une représentation théâtrale Renaissance",
        "Exploration des jardins secrets de Florence"
      ],
      historicalFacts: [
        "Le David de Michel-Ange mesure 5,17 mètres et pèse 5 660 kg. Il a été sculpté dans un seul bloc de marbre de Carrare.",
        "Florence comptait 70 000 habitants en 1504 mais possédait plus d'artistes et de banques que n'importe quelle ville d'Europe.",
        "Léonard de Vinci et Michel-Ange, tous deux présents à Florence en 1504, étaient des rivaux notoires."
      ],
      duration: '6 jours',
      difficulty: 'Modéré',
      price: '4 799€',
      rating: 4.8
    }
  ];

  return (
    <section id="destinations" className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-semibold uppercase tracking-wider">
              Destinations Premium
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Nos Destinations
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              d'Exception
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Trois voyages soigneusement sélectionnés pour une expérience inoubliable à travers les époques les plus fascinantes de l'histoire
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <DestinationCardPremium destination={destination} onBook={onBook} />
            </motion.div>
          ))}
        </div>

        {/* Additional info banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-2xl text-center"
        >
          <p className="text-gray-300 text-lg mb-4">
            <span className="text-amber-500 font-semibold">Vous ne trouvez pas votre époque idéale ?</span>
          </p>
          <p className="text-gray-400 mb-6">
            Nous proposons plus de 50 destinations à travers le temps. Contactez nos experts pour un voyage sur mesure.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            Planifier un voyage personnalisé
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
