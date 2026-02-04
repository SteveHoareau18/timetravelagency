# TimeTravel Agency 🕰️

<<<<<<< HEAD
> Une webapp moderne et immersive pour une agence de voyage temporel fictive
=======
> Une webapp moderne et immersive pour une agence de voyage temporel fictive propulsée par l'IA Groq
>>>>>>> 78ccf5a (chore: update project)

![TimeTravel Agency](https://img.shields.io/badge/Version-1.0.0-amber?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss)

## 📖 Description

TimeTravel Agency est une application web interactive qui propose aux utilisateurs de découvrir des destinations temporelles fascinantes : Paris 1889 lors de l'inauguration de la Tour Eiffel, le Crétacé avec ses dinosaures majestueux, ou encore Florence en pleine Renaissance avec Michel-Ange.

L'application propose une expérience immersive complète avec :
- 🎨 **Design premium dark mode** avec accents dorés (amber/yellow)
- 🤖 **Agent conversationnel IA** "TimeBot" pour conseils et FAQ
- 📅 **Système de réservation en 3 étapes** avec calcul dynamique des prix
- ✨ **Animations fluides** avec Motion (Framer Motion)
- 📱 **Interface responsive** et moderne

## 🚀 Fonctionnalités

### 🏠 Page d'accueil (Hero Section)
- Animation de fond avec particules
- Logo animé avec rotation
- Call-to-action attractifs
- Statistiques en temps réel

### 🌍 Destinations Premium
Trois destinations soigneusement conçues :

1. **Paris, Belle Époque (1889)** - 3 499€
   - Inauguration de la Tour Eiffel
   - Exposition Universelle
   - Moulin Rouge
   - Difficulté : Facile

2. **Crétacé Supérieur (-66M années)** - 12 999€
   - Observation des T-Rex et Triceratops
   - Safari préhistorique en capsule blindée
   - Difficulté : Extrême

3. **Florence Renaissance (1504)** - 4 799€
   - Installation du David de Michel-Ange
   - Ateliers des grands maîtres
   - Audience avec les Médicis
   - Difficulté : Modéré

### 🤖 ChatBot Premium
<<<<<<< HEAD
Assistant conversationnel intelligent qui répond aux questions sur :
=======
Assistant conversationnel intelligent propulsé par **Groq AI** qui répond aux questions sur :
>>>>>>> 78ccf5a (chore: update project)
- Les tarifs et packages
- La sécurité temporelle
- Les équipements fournis
- Les politiques d'annulation
- Les conseils personnalisés

<<<<<<< HEAD
=======
**✨ Nouveau** : Le chatbot utilise l'API Groq pour des réponses intelligentes et contextuelles basées sur l'IA.

>>>>>>> 78ccf5a (chore: update project)
### 📋 Système de Réservation
Formulaire en 3 étapes avec :
- **Étape 1** : Sélection voyageurs + date de départ
- **Étape 2** : Choix assurance (Standard/Premium/Ultimate) + extras
- **Étape 3** : Récapitulatif et confirmation

Calcul dynamique des prix selon les options choisies.

### ❓ Section FAQ
Questions-réponses détaillées sur :
- Fonctionnement du voyage temporel
- Sécurité et garanties
- Paradoxes temporels
- Équipement nécessaire
- Politique d'annulation

## 🛠️ Technologies utilisées

- **React 18.3.1** - Framework JavaScript
- **TypeScript** - Typage statique
- **Vite 6.3.5** - Build tool ultra-rapide
- **Tailwind CSS 4.1** - Framework CSS utility-first
- **Motion (Framer Motion) 12.23** - Bibliothèque d'animations
<<<<<<< HEAD
=======
- **Groq AI** - Intelligence artificielle pour le chatbot
>>>>>>> 78ccf5a (chore: update project)
- **Lucide React** - Icônes modernes
- **Material UI** - Composants UI supplémentaires

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/SteveHoareau18/timetravelagency.git

# Accéder au dossier
cd timetravelagency

# Installer les dépendances
pnpm install

# Ou avec npm
npm install

# Ou avec yarn
yarn install
```

<<<<<<< HEAD
=======
## ⚙️ Configuration

### Configuration de l'API Groq (Chatbot IA)

Pour activer le chatbot intelligent avec Groq AI :

1. **Créer un compte Groq** : 
   - Rendez-vous sur [https://console.groq.com](https://console.groq.com)
   - Créez un compte gratuit

2. **Obtenir une clé API** :
   - Allez sur [https://console.groq.com/keys](https://console.groq.com/keys)
   - Cliquez sur "Create API Key"
   - Copiez votre clé API

3. **Configurer les variables d'environnement** :
   ```bash
   # Copier le fichier .env.example
   cp .env.example .env
   
   # Éditer .env et ajouter votre clé API
   VITE_GROQ_KEY=gsk_votre_clé_api_groq_ici
   ```

4. **Redémarrer le serveur de développement**

> **Note** : Le chatbot fonctionne sans clé API en mode "assistant basique" avec des réponses prédéfinies. La clé Groq active les réponses intelligentes contextuelles.

>>>>>>> 78ccf5a (chore: update project)
## 🚀 Lancement

```bash
# Mode développement
pnpm dev

# Build de production
pnpm build

# Prévisualisation du build
pnpm preview
```

L'application sera accessible sur `http://localhost:5173`

## 📁 Structure du projet

```
timetravelagency/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Composant principal
│   │   └── components/
│   │       ├── HeroNew.tsx                  # Hero section avec animations
│   │       ├── DestinationsPremium.tsx      # Liste des destinations
│   │       ├── DestinationCardPremium.tsx   # Carte de destination
<<<<<<< HEAD
│   │       ├── ChatBotPremium.tsx           # Assistant conversationnel
│   │       ├── BookingFormPremium.tsx       # Formulaire de réservation
│   │       ├── FAQ.tsx                      # Questions fréquentes
│   │       └── ui/                          # Composants UI (shadcn)
=======
│   │       ├── ChatBotPremium.tsx           # Assistant conversationnel IA
│   │       ├── BookingFormPremium.tsx       # Formulaire de réservation
│   │       ├── FAQ.tsx                      # Questions fréquentes
│   │       └── ui/                          # Composants UI (shadcn)
│   ├── utils/
│   │   └── groqService.ts                   # Service API Groq
>>>>>>> 78ccf5a (chore: update project)
│   └── styles/
│       ├── index.css                        # Point d'entrée CSS
│       ├── tailwind.css                     # Configuration Tailwind v4
│       └── theme.css                        # Thème et variables CSS
<<<<<<< HEAD
=======
├── .env.example                             # Exemple de variables d'environnement
>>>>>>> 78ccf5a (chore: update project)
├── package.json
├── vite.config.ts
└── README.md
```

## 🎨 Design System

### Couleurs principales
- **Background** : `slate-950` / `slate-900`
- **Accents** : `amber-500` / `yellow-600`
- **Texte** : `white` / `gray-300`
- **Bordures** : `slate-800` / `slate-700`

### Effets visuels
- Glassmorphism avec `backdrop-blur`
- Dégradés dorés avec `gradient-to-r from-amber-500 to-yellow-600`
- Ombres dynamiques avec `shadow-amber-500/30`
- Animations Motion pour transitions fluides

## 📝 Crédits

**Créé par Steve HOAREAU**  
Dans le cadre d'un projet **Montpellier YNOV Campus**

### Attributions
- Composants UI de [shadcn/ui](https://ui.shadcn.com/) sous [licence MIT](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- Photos de [Unsplash](https://unsplash.com) sous [licence Unsplash](https://unsplash.com/license)

## 📄 Licence

Ce projet est un projet éducatif réalisé dans le cadre d'une formation à YNOV Campus Montpellier.

## 🤝 Contributions

Les contributions ne sont pas acceptées pour le moment car il s'agit d'un projet pédagogique personnel.

## 📧 Contact

Pour toute question, vous pouvez contacter l'auteur via GitHub.

---

⏰ **TimeTravel Agency** - *La première agence de voyage temporel de luxe au monde*