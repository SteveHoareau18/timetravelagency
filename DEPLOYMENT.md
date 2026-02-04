# 🚀 Guide de Déploiement - TimeTravel Agency

Ce guide explique comment déployer l'application TimeTravel Agency sur différentes plateformes d'hébergement.

## 📋 Prérequis

- Code source du projet
- Compte sur la plateforme d'hébergement choisie
- Clé API Groq (pour le chatbot IA)

## 🌐 Plateformes supportées

### 1. Vercel (Recommandé)

Vercel est la plateforme idéale pour les applications Vite/React.

#### Déploiement automatique via GitHub

1. **Connecter le repository**
   ```bash
   # Pusher votre code sur GitHub
   git push origin main
   ```

2. **Importer sur Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "New Project"
   - Importer votre repository GitHub
   - Vercel détecte automatiquement Vite

3. **Configurer les variables d'environnement**
   - Dans Project Settings → Environment Variables
   - Ajouter : `VITE_GROQ_KEY=gsk_votre_clé_api`
   - Appliquer à Production, Preview et Development

4. **Déployer**
   - Cliquer sur "Deploy"
   - Le site sera en ligne en ~2 minutes

#### Commandes CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

---

### 2. Netlify

Netlify est une excellente alternative avec CI/CD intégré.

#### Déploiement via interface web

1. **Créer un nouveau site**
   - Aller sur [netlify.com](https://netlify.com)
   - Cliquer sur "New site from Git"
   - Connecter GitHub et sélectionner le repository

2. **Configuration du build**
   ```
   Build command: pnpm build
   Publish directory: dist
   ```

3. **Variables d'environnement**
   - Site settings → Environment variables
   - Ajouter : `VITE_GROQ_KEY=gsk_votre_clé_api`

4. **Déployer**
   - Netlify build et deploy automatiquement

#### Fichier netlify.toml (optionnel)

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### 3. GitHub Pages

GitHub Pages est gratuit mais nécessite une configuration supplémentaire.

#### Configuration

1. **Installer gh-pages**
   ```bash
   pnpm add -D gh-pages
   ```

2. **Modifier vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/timetravelagency/',  // Nom de votre repo
     // ... reste de la config
   });
   ```

3. **Ajouter scripts dans package.json**
   ```json
   {
     "scripts": {
       "predeploy": "pnpm build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Déployer**
   ```bash
   pnpm deploy
   ```

⚠️ **Limitation** : GitHub Pages ne supporte pas les variables d'environnement de build facilement. 
Vous devrez coder en dur la clé API (non recommandé pour la production).

---

### 4. Cloudflare Pages

Cloudflare Pages offre des performances excellentes avec CDN global.

#### Déploiement

1. **Se connecter à Cloudflare Pages**
   - Aller sur [pages.cloudflare.com](https://pages.cloudflare.com)
   - Créer un nouveau projet
   - Connecter votre repository GitHub

2. **Configuration du build**
   ```
   Framework preset: Vite
   Build command: pnpm build
   Build output directory: dist
   ```

3. **Variables d'environnement**
   - Dans Settings → Environment variables
   - Ajouter : `VITE_GROQ_KEY=gsk_votre_clé_api`

4. **Déployer**
   - Cloudflare build automatiquement à chaque push

---

## 🔧 Configuration du Build

### Variables d'environnement requises

```env
# Production
VITE_GROQ_KEY=gsk_production_key_here

# Preview/Staging
VITE_GROQ_KEY=gsk_staging_key_here

# Development (local)
VITE_GROQ_KEY=gsk_development_key_here
```

### Build command

```bash
# Avec pnpm (recommandé)
pnpm build

# Avec npm
npm run build

# Avec yarn
yarn build
```

### Output

Le build génère un dossier `dist/` contenant :
- `index.html` - Point d'entrée
- `assets/` - JS, CSS, images optimisées
- Tous les assets statiques

---

## ✅ Checklist avant déploiement

- [ ] Clé API Groq configurée en variable d'environnement
- [ ] Build local réussi : `pnpm build`
- [ ] Test local du build : `pnpm preview`
- [ ] Vérification du chatbot en mode production
- [ ] Tests sur mobile et desktop
- [ ] Vérification des images et assets
- [ ] SEO : balises meta et titre configurés
- [ ] Analytics (optionnel) configuré
- [ ] Domaine personnalisé configuré (optionnel)

---

## 🔍 Vérifications post-déploiement

### Test du chatbot
1. Ouvrir le site déployé
2. Cliquer sur le bouton de chat
3. Vérifier l'affichage "✨ IA"
4. Poser une question test
5. Vérifier la réponse de l'IA

### Performance
- Test avec [PageSpeed Insights](https://pagespeed.web.dev/)
- Score cible : > 90/100
- Vérifier les Core Web Vitals

### Compatibilité
- Tester sur Chrome, Firefox, Safari
- Tester sur mobile (iOS et Android)
- Vérifier le responsive design

---

## 🐛 Troubleshooting

### "Chatbot en mode assistant basique"
**Problème :** La clé API Groq n'est pas détectée

**Solution :**
1. Vérifier que `VITE_GROQ_KEY` est bien définie
2. Redéployer l'application après avoir ajouté la variable
3. Vérifier les logs de build

### "Build failed"
**Problème :** Erreur lors du build

**Solution :**
1. Vérifier que toutes les dépendances sont installées
2. Tester le build en local : `pnpm build`
3. Vérifier les logs d'erreur
4. Vérifier que Node.js >= 18 est utilisé

### "Page blanche après déploiement"
**Problème :** Le site affiche une page blanche

**Solution :**
1. Vérifier la configuration `base` dans vite.config.ts
2. Vérifier que le dossier `dist` est bien publié
3. Ouvrir la console du navigateur pour voir les erreurs
4. Vérifier les chemins des assets

### "Images ne se chargent pas"
**Problème :** Les images sont cassées

**Solution :**
1. Vérifier que les images sont dans le dossier `public/` ou importées
2. Vérifier les chemins relatifs
3. Utiliser le composant `ImageWithFallback` pour les nouvelles images

---

## 📊 Monitoring

### Recommandations

1. **Uptime Monitoring**
   - [UptimeRobot](https://uptimerobot.com) (gratuit)
   - Pingdom
   - StatusCake

2. **Analytics**
   - Google Analytics
   - Plausible (privacy-friendly)
   - Fathom

3. **Error Tracking**
   - Sentry
   - LogRocket
   - Rollbar

---

## 🔐 Sécurité en Production

### Bonnes pratiques

✅ **À faire**
- Utiliser HTTPS (automatique avec Vercel/Netlify)
- Séparer les clés API dev/production
- Régénérer les clés en cas de fuite
- Limiter les CORS si nécessaire

❌ **À ne pas faire**
- Committer les clés API dans Git
- Utiliser la même clé partout
- Exposer des secrets sensibles côté client
- Désactiver HTTPS

---

## 📱 Domaine personnalisé

### Vercel
1. Project Settings → Domains
2. Ajouter votre domaine
3. Configurer les DNS selon instructions

### Netlify
1. Site Settings → Domain management
2. Ajouter domaine personnalisé
3. Configurer les DNS

### Cloudflare Pages
1. Custom domains → Add domain
2. DNS automatiquement configuré si domaine sur Cloudflare

---

## 💰 Coûts estimés

| Plateforme | Gratuit | Payant |
|------------|---------|--------|
| Vercel | Oui (hobby) | Pro à partir de $20/mois |
| Netlify | Oui (100GB/mois) | Pro à partir de $19/mois |
| GitHub Pages | Oui (illimité) | - |
| Cloudflare Pages | Oui (illimité) | - |

**Groq API** : Gratuit avec quotas généreux

---

## 🎯 Recommandation finale

Pour TimeTravel Agency, nous recommandons **Vercel** :
- ✅ Setup le plus simple
- ✅ Performance excellente
- ✅ Preview deployments automatiques
- ✅ Support Vite natif
- ✅ Variables d'environnement faciles
- ✅ Analytics intégrées

---

**Questions ?** Consultez la documentation de votre plateforme ou ouvrez une issue sur GitHub.
