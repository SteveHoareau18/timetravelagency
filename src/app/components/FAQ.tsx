import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment fonctionne le voyage temporel ?",
      answer: "Notre technologie brevetée utilise des capsules quantiques qui créent un tunnel spatio-temporel stable. Vous voyagez physiquement dans le temps tout en restant dans une bulle de protection qui préserve votre intégrité temporelle. Chaque voyage est accompagné d'un guide expert et supervisé par notre centre de contrôle temporel 24/7."
    },
    {
      question: "Est-ce dangereux ? Quelles sont les garanties de sécurité ?",
      answer: "La sécurité est notre priorité absolue. Nos capsules sont équipées de boucliers temporels, de systèmes de rapatriement d'urgence instantané, et d'une IA de surveillance continue. Vous portez un traceur quantique qui permet votre localisation et extraction en moins de 60 secondes. Nous avons réalisé plus de 50 000 voyages sans incident majeur. Certification ISO Temporelle 9001 depuis 2024."
    },
    {
      question: "Puis-je modifier le passé ou créer un paradoxe temporel ?",
      answer: "Non. Notre technologie vous place en mode 'observateur protégé' : vous pouvez voir, entendre et vivre l'époque, mais votre présence n'affecte pas la ligne temporelle principale. C'est comme regarder à travers une fenêtre unidirectionnelle. Nos protocoles de sécurité temporelle empêchent toute interaction qui pourrait créer un paradoxe."
    },
    {
      question: "Combien de temps dure un voyage dans le présent ?",
      answer: "Grâce à la relativité temporelle, vous pouvez passer plusieurs jours dans le passé tout en ne vous absentant que quelques heures de votre époque. Par exemple, un voyage de 5 jours dans le Paris de 1889 ne prend que 6 heures dans le présent. Vous revenez exactement 6 heures après votre départ, reposé et sans décalage horaire."
    },
    {
      question: "Quel équipement dois-je apporter ?",
      answer: "Pratiquement rien ! Nous fournissons tout l'équipement nécessaire : vêtements d'époque sur mesure, traducteur universel temps réel, kit médical temporel, appareil photo 8K, et guide de survie de l'époque. Apportez simplement vos effets personnels essentiels. Vous recevrez un kit de préparation complet 48h avant le départ avec toutes les instructions."
    },
    {
      question: "Quels sont les prérequis médicaux ?",
      answer: "Un bilan médical standard est requis avant tout voyage. Les destinations 'Facile' et 'Modéré' sont accessibles à tous en bonne santé générale. Les voyages 'Extrême' (comme le Crétacé) nécessitent une excellente condition physique et un certificat médical spécifique. Les femmes enceintes et les personnes avec des pathologies cardiaques graves ne peuvent pas voyager."
    },
    {
      question: "Puis-je ramener des souvenirs de l'époque ?",
      answer: "Pour des raisons de préservation temporelle, ramener des objets physiques du passé est strictement interdit. Cependant, nous créons des répliques 3D haute fidélité de tout objet que vous souhaitez 'ramener'. Vous repartez avec des photos et vidéos 8K illimitées de votre voyage. Certaines destinations offrent des souvenirs période reconstitués par nos artisans."
    },
    {
      question: "Quelle est votre politique d'annulation ?",
      answer: "Annulation gratuite jusqu'à 30 jours avant le départ (remboursement à 100%). Entre 30 et 15 jours : remboursement à 50%. Entre 15 et 7 jours : remboursement à 25%. Moins de 7 jours : non remboursable sauf cas de force majeure (maladie grave avec certificat médical). Nous recommandons vivement l'assurance annulation Premium qui couvre tous les cas."
    }
  ];

  return (
    <section className="bg-slate-900 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-sm font-semibold uppercase tracking-wider">
              Questions Fréquentes
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tout ce que vous devez
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              savoir
            </span>
          </h2>
          
          <p className="text-xl text-gray-300">
            Réponses aux questions les plus courantes sur nos voyages temporels
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-750 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-amber-500" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-slate-700 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 bg-gradient-to-r from-amber-500/10 to-yellow-600/10 border border-amber-500/30 rounded-2xl"
        >
          <p className="text-gray-300 mb-4">
            Vous avez d'autres questions ? Notre équipe d'experts est disponible 24/7.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            Contactez nos experts
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}