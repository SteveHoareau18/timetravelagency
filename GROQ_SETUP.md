# 🤖 Configuration du Chatbot IA avec Groq

Ce guide détaille comment configurer et utiliser l'API Groq pour le chatbot intelligent de TimeTravel Agency.

## 📋 Prérequis

- Un compte Groq (gratuit)
- Node.js et pnpm/npm/yarn installés
- Le projet TimeTravel Agency cloné localement

## 🚀 Installation en 4 étapes

### Étape 1 : Créer un compte Groq

1. Rendez-vous sur [https://console.groq.com](https://console.groq.com)
2. Cliquez sur "Sign Up" pour créer un compte
3. Confirmez votre email
4. Connectez-vous à la console Groq

### Étape 2 : Générer une clé API

1. Une fois connecté, allez sur [https://console.groq.com/keys](https://console.groq.com/keys)
2. Cliquez sur "Create API Key"
3. Donnez un nom à votre clé (ex: "TimeTravel Agency Dev")
4. Copiez la clé générée (elle commence par `gsk_`)

⚠️ **Important** : Copiez votre clé immédiatement, elle ne sera plus affichée après !

### Étape 3 : Configurer les variables d'environnement

1. À la racine du projet, copiez le fichier `.env.example` :
   ```bash
   cp .env.example .env
   ```

2. Ouvrez le fichier `.env` et ajoutez votre clé API :
   ```env
   VITE_GROQ_KEY=gsk_votre_clé_api_ici
   ```

3. Remplacez `gsk_votre_clé_api_ici` par votre vraie clé API Groq

### Étape 4 : Redémarrer le serveur

Si votre serveur de développement est déjà lancé, redémarrez-le :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez-le
pnpm dev
```

## ✅ Vérification

Pour vérifier que tout fonctionne :

1. Lancez l'application : `pnpm dev`
2. Ouvrez l'application dans votre navigateur
3. Cliquez sur le bouton de chat (bulle dorée en bas à droite)
4. Vérifiez que le header du chatbot affiche : "Conseiller Temporel ✨ IA"
5. Il ne devrait **pas** y avoir de bandeau d'avertissement orange
6. Posez une question au chatbot

Si vous voyez "Propulsé par Groq AI" dans le sous-titre, c'est que tout fonctionne ! 🎉

## 🔧 Mode de fonctionnement

Le chatbot TimeTravel Agency fonctionne en deux modes :

### Mode 1 : Assistant Basique (sans clé API)
- **Activation** : Automatique si `VITE_GROQ_KEY` n'est pas définie
- **Fonctionnement** : Réponses prédéfinies basées sur des mots-clés
- **Affichage** : Bandeau d'avertissement orange + "Mode assistant"
- **Usage** : Développement ou tests sans API

### Mode 2 : IA Avancée (avec clé API Groq)
- **Activation** : Lorsque `VITE_GROQ_KEY` est configurée
- **Fonctionnement** : Intelligence artificielle contextuelle avec Groq
- **Affichage** : "Propulsé par Groq AI" + icône ✨
- **Usage** : Production et expérience utilisateur optimale

## 🤖 Modèle utilisé

Le chatbot utilise le modèle **Mixtral-8x7b** de Groq :
- ⚡ Réponses ultra-rapides (grâce à l'infrastructure Groq)
- 🧠 32 768 tokens de contexte
- 🇫🇷 Excellent support du français
- 💡 Raisonnement avancé et réponses pertinentes

## 📊 Quotas et limites

Avec le plan gratuit de Groq :
- **Quotas généreux** pour le développement
- **Pas de carte bancaire requise**
- **Vitesse d'inférence exceptionnelle**

Pour les limites exactes, consultez : [https://console.groq.com/settings/limits](https://console.groq.com/settings/limits)

## 🎯 Prompt System

Le chatbot est configuré avec un prompt système détaillé incluant :
- Toutes les informations sur les 3 destinations
- Tarifs et packages complets
- Politiques d'annulation
- Options d'assurance
- Conseils de sécurité

Cela garantit des réponses précises et cohérentes avec l'univers TimeTravel Agency.

## 🛠️ Personnalisation

Vous pouvez modifier le comportement du chatbot en éditant le fichier :
```
src/utils/groqService.ts
```

Paramètres ajustables :
- `model` : Modèle Groq à utiliser
- `temperature` : Créativité des réponses (0.0 à 2.0)
- `max_tokens` : Longueur maximale des réponses
- `systemPrompt` : Instructions données à l'IA

## 🔒 Sécurité

⚠️ **Bonnes pratiques** :
- ✅ Ne commitez JAMAIS votre fichier `.env`
- ✅ Le `.gitignore` est déjà configuré pour l'exclure
- ✅ Utilisez des clés API différentes pour dev/prod
- ✅ Régénérez votre clé si elle est exposée

## 🐛 Dépannage

### Le chatbot n'utilise pas l'IA
- ✅ Vérifiez que `.env` existe à la racine
- ✅ Vérifiez que `VITE_GROQ_KEY=gsk_...` est définie
- ✅ Redémarrez le serveur après avoir ajouté la clé
- ✅ La clé doit commencer par `gsk_`

### Erreur "Authorization failed"
- ❌ La clé API est invalide ou expirée
- ✅ Générez une nouvelle clé sur console.groq.com
- ✅ Vérifiez qu'il n'y a pas d'espace avant/après la clé

### Le chatbot répond lentement
- Le modèle Groq est très rapide, vérifiez votre connexion Internet
- Un délai artificiel de ~800-1200ms est ajouté pour simuler une frappe naturelle

### Erreur dans la console
- Ouvrez la console développeur (F12)
- Cherchez les messages d'erreur commençant par "Groq API error"
- Vérifiez votre quota sur console.groq.com

## 📚 Ressources

- [Documentation Groq](https://console.groq.com/docs)
- [API Reference Groq](https://console.groq.com/docs/api-reference)
- [Modèles disponibles](https://console.groq.com/docs/models)
- [Support Groq](https://console.groq.com/support)

## 💡 Pour aller plus loin

Idées d'améliorations :
- 🎨 Ajouter le streaming pour voir les réponses en temps réel
- 💾 Sauvegarder l'historique des conversations
- 📊 Analyser les questions fréquentes
- 🌐 Support multilingue automatique
- 🎭 Personnalités multiples pour le bot

---

✨ **Votre chatbot IA est maintenant prêt à conseiller les voyageurs temporels !**
