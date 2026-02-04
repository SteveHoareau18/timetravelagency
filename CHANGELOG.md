# 📝 Changelog - TimeTravel Agency

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [1.1.0] - 2026-02-04

### ✨ Ajouté
- **Intégration Groq AI** pour le chatbot intelligent
  - Service d'API Groq (`src/utils/groqService.ts`)
  - Types TypeScript pour Groq (`src/utils/types.ts`)
  - Support de l'IA contextuelle avec historique de conversation
  - Modèle Mixtral-8x7b-32768 pour des réponses rapides et pertinentes

- **Fallback intelligent**
  - Mode assistant basique si clé API non configurée
  - Réponses prédéfinies basées sur mots-clés
  - Indicateur visuel du mode actif (IA vs Assistant)

- **Documentation complète**
  - `GROQ_SETUP.md` - Guide d'installation et configuration
  - `DEVELOPER_NOTES.md` - Notes techniques pour développeurs
  - `.env.example` - Template de configuration
  - `test-groq.html` - Outil de test de l'API Groq

- **Gestion des erreurs améliorée**
  - Messages d'erreur user-friendly
  - Bandeau d'avertissement si clé API manquante
  - Logs détaillés en console pour debug

### 🔧 Modifié
- **ChatBotPremium** (`src/app/components/ChatBotPremium.tsx`)
  - Support asynchrone des réponses IA
  - Gestion de l'historique de conversation
  - Indicateurs visuels "✨ IA" quand Groq est actif
  - Amélioration du message de bienvenue

- **README.md**
  - Ajout section Configuration Groq
  - Instructions d'installation détaillées
  - Mise à jour de la structure du projet
  - Badges et informations sur les technologies

### 🔐 Sécurité
- `.gitignore` mis à jour pour exclure `.env`
- Validation de la clé API avant utilisation
- Gestion sécurisée des erreurs d'autorisation

### 📚 Documentation
- Guide complet d'installation en 4 étapes
- Documentation de l'architecture du chatbot
- Notes de debugging et troubleshooting
- Ressources et liens utiles

---

## [1.0.0] - 2026-02-03

### ✨ Version initiale
- Interface utilisateur complète avec dark mode premium
- 3 destinations temporelles (Paris 1889, Florence 1504, Crétacé)
- Système de réservation en 3 étapes
- Chatbot avec réponses prédéfinies
- Section FAQ interactive
- Design responsive avec animations Motion
- Glassmorphism et effets visuels avancés

### 🎨 Design
- Dark mode avec accents dorés (amber-500, yellow-600)
- Animations fluides avec Motion/React
- Effets glassmorphism et backdrop-blur
- Interface responsive mobile/desktop

### 🛠️ Technologies
- React 18.3.1
- TypeScript
- Vite 6.3.5
- Tailwind CSS 4.1
- Motion (Framer Motion) 12.23
- Material UI
- Lucide React icons

---

## Format du Changelog

Ce changelog suit les recommandations de [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

### Types de changements
- `✨ Ajouté` - Pour les nouvelles fonctionnalités
- `🔧 Modifié` - Pour les changements dans les fonctionnalités existantes
- `❌ Déprécié` - Pour les fonctionnalités bientôt retirées
- `🗑️ Retiré` - Pour les fonctionnalités retirées
- `🐛 Corrigé` - Pour les corrections de bugs
- `🔐 Sécurité` - En cas de vulnérabilités

---

**Légende des versions :**
- **MAJEUR** : changements incompatibles avec l'API
- **MINEUR** : ajout de fonctionnalités rétrocompatibles
- **PATCH** : corrections de bugs rétrocompatibles
