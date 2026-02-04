# 🏗️ Architecture - TimeTravel Agency

Documentation de l'architecture technique du projet.

## 📊 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    TimeTravel Agency                         │
│                   (React + TypeScript)                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │     │   Services   │     │   Styling    │
│  Components  │────▶│  (Groq API)  │     │  (Tailwind)  │
└──────────────┘     └──────────────┘     └──────────────┘
```

## 🎯 Architecture en couches

### Couche 1 : Interface Utilisateur (UI)

```
src/app/
├── App.tsx                          # Point d'entrée, orchestration
└── components/
    ├── HeroNew.tsx                  # Section hero avec animations
    ├── DestinationsPremium.tsx      # Liste des destinations
    ├── DestinationCardPremium.tsx   # Carte individuelle
    ├── ChatBotPremium.tsx           # Interface chatbot
    ├── BookingFormPremium.tsx       # Formulaire réservation
    ├── FAQ.tsx                      # Questions fréquentes
    └── ui/                          # Composants UI réutilisables
        ├── button.tsx
        ├── dialog.tsx
        ├── accordion.tsx
        └── ... (shadcn/ui components)
```

**Responsabilités :**
- Affichage des données
- Gestion des interactions utilisateur
- Animations et transitions
- État local des composants

### Couche 2 : Logique Métier (Services)

```
src/utils/
├── groqService.ts                   # Service API Groq
└── types.ts                         # Types TypeScript partagés
```

**Responsabilités :**
- Appels API vers Groq
- Transformation des données
- Gestion des erreurs
- Cache et optimisations

### Couche 3 : Styles

```
src/styles/
├── index.css                        # Point d'entrée CSS
├── tailwind.css                     # Config Tailwind v4
├── theme.css                        # Variables CSS et thème
└── fonts.css                        # Imports de polices
```

**Responsabilités :**
- Système de design
- Variables CSS
- Thème dark mode
- Responsive design

## 🔄 Flux de données du Chatbot

```
┌─────────────┐
│   Utilisateur │
│  tape message │
└──────┬────────┘
       │
       ▼
┌──────────────────────┐
│  ChatBotPremium      │
│  - Gère l'état       │
│  - Affiche messages  │
│  - Animations        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐         ┌─────────────────┐
│  GroqService         │────────▶│  API Groq       │
│  - Prépare requête   │         │  (Mixtral-8x7b) │
│  - Gère historique   │◀────────│  https://...    │
│  - Traite réponse    │         └─────────────────┘
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  ChatBotPremium      │
│  - Affiche réponse   │
│  - Update historique │
└──────────────────────┘
```

### Détail du flux

1. **User Input** → L'utilisateur tape un message
2. **State Update** → React met à jour l'état avec le message utilisateur
3. **API Call** → `GroqService.sendMessage()` est appelé
4. **Request Preparation** → Le service prépare la requête avec :
   - System prompt (instructions pour l'IA)
   - Historique de conversation
   - Nouveau message utilisateur
5. **HTTP Request** → Fetch vers `https://api.groq.com/openai/v1`
6. **IA Processing** → Groq traite avec Mixtral-8x7b
7. **Response** → L'IA génère une réponse contextuelle
8. **State Update** → React affiche la réponse du bot
9. **UI Update** → L'interface se met à jour avec animations

## 🗂️ Structure des données

### Message (Chat)

```typescript
interface Message {
  id: string;              // Identifiant unique
  text: string;            // Contenu du message
  sender: 'user' | 'bot';  // Expéditeur
  timestamp: Date;         // Horodatage
}
```

### Destination

```typescript
interface DestinationPremium {
  id: string;
  name: string;
  period: string;
  price: number;
  duration: string;
  image: string;
  difficulty: 'Facile' | 'Modéré' | 'Extrême';
  description: string;
  highlights: string[];
  included: string[];
}
```

### Groq Message

```typescript
interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
```

### Groq Response

```typescript
interface GroqResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
```

## 🔐 Gestion de l'environnement

```
┌─────────────────────────────────────────┐
│          Variables d'environnement       │
├─────────────────────────────────────────┤
│                                          │
│  .env (local, non commité)              │
│  ├─ VITE_GROQ_KEY=gsk_...               │
│  └─ Autres variables...                 │
│                                          │
│  .env.example (template, commité)       │
│  └─ VITE_GROQ_KEY=your_key_here         │
│                                          │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         Vite (Build time)               │
│  Remplace import.meta.env.VITE_*        │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         Application (Runtime)            │
│  Utilise les valeurs injectées          │
└─────────────────────────────────────────┘
```

## 🎨 Système de Design

### Palette de couleurs

```css
/* Dark Mode - Background */
--slate-950: #020617    /* Background principal */
--slate-900: #0f172a    /* Background secondaire */
--slate-800: #1e293b    /* Cards & panels */

/* Accents dorés */
--amber-500: #f59e0b    /* Primary accent */
--yellow-600: #ca8a04   /* Secondary accent */

/* Texte */
--white: #ffffff        /* Texte principal */
--gray-300: #d1d5db     /* Texte secondaire */
--gray-500: #6b7280     /* Texte désactivé */
```

### Composants UI

```
shadcn/ui components (src/app/components/ui/)
├── Primitives (Radix UI)
│   ├── Dialog
│   ├── Accordion
│   ├── Tabs
│   └── ...
│
└── Styled with Tailwind
    └── Customized with theme colors
```

## 🚀 Build & Déploiement

```
┌──────────────┐
│ Source Code  │
│ (TypeScript) │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│     Vite     │
│   - Bundling │
│   - Tree-shake│
│   - Minify   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   dist/      │
│ - index.html │
│ - assets/    │
│   ├── js     │
│   ├── css    │
│   └── images │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  Hébergement         │
│  (Vercel/Netlify)    │
│  + CDN global        │
└──────────────────────┘
```

## 📦 Dépendances principales

### Core
- **React 18.3.1** - Library UI
- **TypeScript** - Typage statique
- **Vite 6.3.5** - Build tool

### UI & Styling
- **Tailwind CSS 4.1** - Utility-first CSS
- **Motion (Framer Motion) 12.23** - Animations
- **Lucide React** - Icônes
- **Radix UI** - Composants primitifs

### Services
- **Groq API** - IA conversationnelle (via fetch)

## 🔄 State Management

L'application utilise **React hooks natifs** :

```typescript
// État local du composant
const [messages, setMessages] = useState<Message[]>([]);
const [isTyping, setIsTyping] = useState(false);
const [inputValue, setInputValue] = useState('');

// Effet pour scroll automatique
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages, isTyping]);

// Référence DOM
const messagesEndRef = useRef<HTMLDivElement>(null);
```

**Aucun state management externe** (Redux, Zustand) n'est nécessaire pour cette application.

## 🎭 Gestion des erreurs

```
API Call
    │
    ├─ Success
    │  └─ Display response
    │
    └─ Error
       ├─ Authorization Error
       │  └─ "Clé API invalide..."
       │
       ├─ Network Error
       │  └─ "Problème de connexion..."
       │
       └─ Unknown Error
          └─ "Erreur technique temporaire..."
```

## 📱 Responsive Design

```
Mobile First Approach

└── Base styles (mobile)
    └── @media (md:) ≥ 768px
        └── @media (lg:) ≥ 1024px
            └── @media (xl:) ≥ 1280px
```

Classes Tailwind :
- `md:` - Tablettes (≥ 768px)
- `lg:` - Desktop (≥ 1024px)
- `xl:` - Large screens (≥ 1280px)

## 🔒 Sécurité

### Mesures implémentées

1. **Variables d'environnement**
   - `.env` exclu de Git (`.gitignore`)
   - Template `.env.example` fourni

2. **Validation des entrées**
   - Trim des messages utilisateur
   - Vérification présence clé API

3. **Gestion des erreurs**
   - Messages d'erreur génériques (pas de détails techniques)
   - Logs en console en développement uniquement

4. **HTTPS obligatoire**
   - Automatique avec Vercel/Netlify
   - Requis pour API Groq

## 🎯 Performance

### Optimisations

1. **Code splitting**
   - Vite génère automatiquement des chunks optimisés

2. **Tree shaking**
   - Élimination du code non utilisé

3. **Lazy loading**
   - Images chargées à la demande
   - Composants chargés dynamiquement

4. **Caching**
   - Headers de cache pour assets statiques
   - CDN pour distribution globale

## 📈 Monitoring (Recommandé)

```
┌──────────────┐
│  Production  │
└──────┬───────┘
       │
       ├─────────▶ Uptime Monitoring (UptimeRobot)
       │
       ├─────────▶ Analytics (Plausible/GA)
       │
       ├─────────▶ Error Tracking (Sentry)
       │
       └─────────▶ Performance (PageSpeed Insights)
```

## 🧩 Extensibilité

### Points d'extension

1. **Nouvelles destinations**
   - Ajouter dans `DestinationsPremium.tsx`
   - Mettre à jour le system prompt

2. **Nouveaux modèles IA**
   - Modifier `model` dans `groqService.ts`
   - Ajuster `temperature` et `max_tokens`

3. **Nouvelles langues**
   - Externaliser les textes
   - Implémenter i18n (react-i18next)

4. **Backend**
   - Ajouter API pour sauvegarder réservations
   - Authentification utilisateur
   - Base de données

---

**Architecture documentée le :** 4 février 2026  
**Version :** 1.1.0  
**Auteur :** Steve HOAREAU
