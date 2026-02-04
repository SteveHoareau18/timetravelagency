# 🚀 Quick Start - TimeTravel Agency

Guide de démarrage rapide pour lancer l'application en 5 minutes.

## ⚡ Installation rapide

```bash
# 1. Cloner le projet
git clone https://github.com/SteveHoareau18/timetravelagency.git
cd timetravelagency

# 2. Installer les dépendances
pnpm install
# ou : npm install
# ou : yarn install

# 3. Configurer l'API Groq (optionnel)
cp .env.example .env
# Éditer .env et ajouter votre clé API Groq

# 4. Lancer le serveur de développement
pnpm dev

# 5. Ouvrir dans le navigateur
# http://localhost:5173
```

## 🔑 Configuration Groq (Recommandé)

### Obtenir une clé API (2 minutes)

1. **Créer un compte** : [console.groq.com](https://console.groq.com) 
2. **Générer une clé** : [console.groq.com/keys](https://console.groq.com/keys)
3. **Copier la clé** : Commence par `gsk_`

### Configurer dans le projet

```bash
# Créer le fichier .env
echo "VITE_GROQ_KEY=gsk_votre_clé_ici" > .env

# Redémarrer le serveur
pnpm dev
```

## ✅ Vérification

### Chatbot IA activé ✨

Quand vous ouvrez le chat, vous devriez voir :
- ✅ "Conseiller Temporel ✨ IA" dans le titre
- ✅ "Propulsé par Groq AI" dans le sous-titre
- ❌ PAS de bandeau d'avertissement orange

### Chatbot en mode basique

Si vous voyez :
- ⚠️ Bandeau orange "Mode assistant basique actif"
- 📝 "Pour activer l'IA avancée, configurez VITE_GROQ_KEY"

→ La clé API n'est pas configurée (le chatbot fonctionne quand même avec réponses prédéfinies)

## 🎯 Test rapide

1. Cliquer sur le bouton de chat (bulle dorée en bas à droite)
2. Poser une question : "Quelle destination recommandez-vous ?"
3. La réponse devrait être personnalisée et contextuelle (avec IA)

## 📦 Structure du projet

```
timetravelagency/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # ← Point d'entrée principal
│   │   └── components/
│   │       ├── ChatBotPremium.tsx     # ← Chatbot avec IA
│   │       ├── HeroNew.tsx            # ← Page d'accueil
│   │       ├── DestinationsPremium.tsx
│   │       ├── BookingFormPremium.tsx
│   │       └── FAQ.tsx
│   ├── utils/
│   │   ├── groqService.ts             # ← Service API Groq
│   │   └── types.ts                   # ← Types TypeScript
│   └── styles/                        # ← Styles CSS
├── .env.example                       # ← Template config
├── .env                               # ← Votre config (à créer)
└── README.md                          # ← Documentation complète
```

## 🛠️ Commandes utiles

```bash
# Développement
pnpm dev              # Lancer le serveur de dev (port 5173)

# Build
pnpm build            # Créer le build de production (dossier dist/)

# Preview
pnpm preview          # Prévisualiser le build de production

# Test Groq
# Ouvrir test-groq.html dans un navigateur
```

## 🐛 Problèmes courants

### "Cannot find module..."
```bash
# Réinstaller les dépendances
rm -rf node_modules
pnpm install
```

### "Port 5173 already in use"
```bash
# Changer le port dans vite.config.ts
# ou tuer le processus sur le port 5173
```

### "Chatbot ne répond pas"
1. Vérifier la console du navigateur (F12)
2. Vérifier que `.env` existe et contient `VITE_GROQ_KEY`
3. Redémarrer le serveur après modification de `.env`
4. Tester avec `test-groq.html`

## 📚 Documentation complète

- **README.md** - Vue d'ensemble du projet
- **GROQ_SETUP.md** - Configuration détaillée de Groq
- **DEVELOPER_NOTES.md** - Notes techniques
- **DEPLOYMENT.md** - Guide de déploiement
- **CHANGELOG.md** - Historique des versions

## 🎨 Fonctionnalités

✅ **Hero section animée** avec particules  
✅ **3 destinations temporelles** détaillées  
✅ **Chatbot IA intelligent** avec Groq  
✅ **Système de réservation** en 3 étapes  
✅ **FAQ interactive** avec accordéons  
✅ **Design responsive** mobile/desktop  
✅ **Animations fluides** avec Motion  
✅ **Dark mode premium** avec accents dorés  

## 💡 Prochaines étapes

1. ✅ Installer et lancer le projet
2. ✅ Configurer Groq pour le chatbot IA
3. 📖 Lire `GROQ_SETUP.md` pour plus de détails
4. 🎨 Explorer le code dans `src/app/`
5. 🚀 Déployer sur Vercel/Netlify (voir `DEPLOYMENT.md`)

## 🤝 Besoin d'aide ?

- 📖 Consulter `GROQ_SETUP.md` pour la config Groq
- 🐛 Vérifier `DEVELOPER_NOTES.md` pour le debugging
- 🌐 Documentation Groq : [console.groq.com/docs](https://console.groq.com/docs)

---

**Bon voyage dans le temps ! ⏰✨**

*Créé par Steve HOAREAU - YNOV Campus Montpellier*
