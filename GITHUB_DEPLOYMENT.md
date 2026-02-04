# 🚀 Guide de Déploiement sur GitHub

## Étape 1 : Initialiser Git localement

Ouvrez votre terminal dans le répertoire du projet et exécutez :

```bash
git init
git add .
git commit -m "🎉 Initial commit: TimeTravel Agency - Application complète"
```

## Étape 2 : Créer un dépôt GitHub

1. Allez sur [GitHub](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite
3. Sélectionnez **"New repository"**
4. Nommez votre dépôt (exemple: `timetravel-agency`)
5. **NE PAS** cocher "Initialize with README" (vous en avez déjà un)
6. Cliquez sur **"Create repository"**

## Étape 3 : Connecter votre projet local à GitHub

GitHub vous donnera des instructions. Utilisez celles-ci :

```bash
git remote add origin https://github.com/VOTRE_USERNAME/timetravel-agency.git
git branch -M main
git push -u origin main
```

**Remplacez `VOTRE_USERNAME`** par votre nom d'utilisateur GitHub !

## Étape 4 : Configuration de la clé API Groq (optionnel)

Si vous souhaitez activer l'IA Groq :

1. Créez un fichier `.env` à la racine (ce fichier ne sera PAS pushé sur GitHub)
2. Copiez le contenu de `.env.example`
3. Remplacez `your_groq_api_key_here` par votre vraie clé API

```bash
cp .env.example .env
# Éditez .env avec votre clé API
```

## 🌐 Étape 5 : Déployer en ligne (optionnel)

### Option A : Déployer sur Vercel (recommandé)

```bash
# Installez Vercel CLI
npm i -g vercel

# Déployez
vercel
```

Lors du déploiement sur Vercel :
- Ajoutez votre variable d'environnement `VITE_GROQ_KEY` dans les paramètres du projet

### Option B : Déployer sur Netlify

1. Allez sur [Netlify](https://netlify.com)
2. Cliquez sur **"Add new site"** > **"Import an existing project"**
3. Connectez votre dépôt GitHub
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Ajoutez la variable d'environnement `VITE_GROQ_KEY`

### Option C : Déployer sur GitHub Pages

**Note:** GitHub Pages ne supporte pas les variables d'environnement. Le chatbot fonctionnera en mode basique.

1. Modifiez `vite.config.ts` :

```typescript
export default defineConfig({
  base: '/timetravel-agency/', // Nom de votre dépôt
  plugins: [react()],
});
```

2. Ajoutez ces scripts à `package.json` :

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Installez gh-pages :

```bash
npm install --save-dev gh-pages
```

4. Déployez :

```bash
npm run deploy
```

5. Activez GitHub Pages :
   - Allez dans Settings > Pages
   - Source: `gh-pages` branch
   - Votre site sera sur `https://VOTRE_USERNAME.github.io/timetravel-agency/`

## 📝 Commandes Git utiles

```bash
# Vérifier le statut
git status

# Ajouter des modifications
git add .

# Créer un commit
git commit -m "Description des changements"

# Push vers GitHub
git push

# Pull les derniers changements
git pull

# Voir l'historique
git log --oneline
```

## 🔐 Sécurité

✅ Le fichier `.gitignore` est configuré pour **NE PAS** push :
- `node_modules/`
- `.env` (vos clés API)
- `dist/` (fichiers de build)

⚠️ **IMPORTANT** : Ne commitez JAMAIS votre fichier `.env` avec des vraies clés API !

## 🎯 Prochaines étapes après le déploiement

1. Testez votre application en ligne
2. Configurez un nom de domaine personnalisé (optionnel)
3. Ajoutez Google Analytics (optionnel)
4. Configurez un système de monitoring
5. Partagez votre projet ! 🚀

## 📞 Support

En cas de problème, vérifiez :
- Que Git est installé : `git --version`
- Que vous êtes connecté à GitHub : `git remote -v`
- Les logs de build en cas d'erreur de déploiement

---

**Créé avec ❤️ pour TimeTravel Agency**
