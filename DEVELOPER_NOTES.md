# 📝 Notes pour les développeurs

Ce document contient des informations techniques sur l'intégration de Groq AI dans TimeTravel Agency.

## 🏗️ Architecture du Chatbot

### Structure des fichiers

```
src/
├── app/
│   └── components/
│       └── ChatBotPremium.tsx       # Interface utilisateur du chatbot
├── utils/
│   ├── groqService.ts               # Service d'appel à l'API Groq
│   └── types.ts                     # Types TypeScript partagés
```

### Flux de données

```
Utilisateur → ChatBotPremium → GroqService → API Groq → Réponse IA
                     ↓                              ↓
              Gestion état (React)            Gestion erreurs
```

## 🔧 Configuration

### Variables d'environnement

Les variables d'environnement doivent être préfixées par `VITE_` pour être accessibles côté client avec Vite.

```env
VITE_GROQ_KEY=gsk_your_api_key_here
```

### Accès dans le code

```typescript
// ✅ Correct (avec Vite)
const apiKey = import.meta.env.VITE_GROQ_KEY;

// ❌ Incorrect
const apiKey = process.env.GROQ_KEY;
```

## 🤖 Service Groq

### Initialisation

```typescript
import { GroqService } from '../utils/groqService';

const groqService = new GroqService(GroqService.getApiKey());
```

### Configuration personnalisée

```typescript
const groqService = new GroqService(
  GroqService.getApiKey(),
  {
    model: 'mixtral-8x7b-32768',
    temperature: 0.7,
    maxTokens: 500,
    topP: 1
  }
);
```

### Envoi de messages

```typescript
const messages = [
  { role: 'user' as const, content: 'Quelle destination recommandez-vous ?' }
];

const response = await groqService.sendMessage(messages);
```

## 📊 Gestion de l'historique

Le chatbot maintient l'historique des conversations pour fournir un contexte à l'IA :

```typescript
const conversationHistory = messages
  .filter(m => m.sender !== 'bot' || m.id !== '1') // Exclure message bienvenue
  .map(m => ({
    role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
    content: m.text
  }));
```

## 🎨 États du Chatbot

### Mode Assistant Basique (sans API)
- Réponses prédéfinies basées sur mots-clés
- Affichage d'un bandeau d'avertissement
- Fallback automatique en cas d'erreur API

### Mode IA Avancée (avec API)
- Réponses contextuelles via Groq
- Indicateur visuel "✨ IA" dans le header
- Gestion des erreurs avec messages appropriés

## 🔐 Sécurité

### Bonnes pratiques implémentées

✅ **Clé API côté client uniquement**
- Les clés Groq sont destinées à être utilisées côté client
- Pas de secrets sensibles (PII, données bancaires) dans les prompts
- Quotas et limites de taux gérés par Groq

✅ **Validation des entrées**
- Vérification de la présence de la clé API
- Gestion des erreurs d'autorisation
- Messages d'erreur user-friendly

✅ **Gestion des erreurs**
```typescript
try {
  const response = await groqService.sendMessage(messages);
  // Traiter la réponse
} catch (error) {
  // Afficher message d'erreur gracieux
  // Fallback vers réponses prédéfinies
}
```

## 🎯 System Prompt

Le prompt système définit la personnalité et les connaissances du bot :

```typescript
systemPrompt = `
Tu es un conseiller temporel expert de TimeTravel Agency...
[Informations sur destinations, tarifs, politiques...]
Réponds en français, de manière professionnelle et enthousiaste.
`;
```

### Recommandations pour modifier le prompt

- Garder les informations factuelles (prix, destinations) à jour
- Maintenir un ton cohérent avec la marque
- Inclure toutes les informations nécessaires (le bot n'a pas d'autre source)
- Tester après chaque modification importante

## 🚀 Performances

### Optimisations implémentées

1. **Délai de frappe simulé**
   ```typescript
   await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
   ```
   Rend les réponses plus naturelles

2. **Gestion asynchrone**
   ```typescript
   const handleSend = async () => {
     setIsTyping(true);
     try {
       const response = await getBotResponse(inputValue);
       // Traiter
     } finally {
       setIsTyping(false);
     }
   };
   ```

3. **Scroll automatique**
   ```typescript
   useEffect(() => {
     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages, isTyping]);
   ```

## 📦 Modèles Groq disponibles

### Mixtral-8x7b-32768 (actuellement utilisé)
- ⚡ Très rapide
- 🧠 32k tokens de contexte
- 🇫🇷 Excellent français
- 💡 Bon équilibre performance/qualité

### Autres modèles disponibles
```typescript
const GROQ_MODELS = {
  MIXTRAL_8X7B: 'mixtral-8x7b-32768',    // Recommandé
  LLAMA_70B: 'llama2-70b-4096',          // Plus puissant
  GEMMA_7B: 'gemma-7b-it',               // Plus léger
};
```

Pour changer de modèle, modifier `src/utils/groqService.ts` :
```typescript
model: 'llama2-70b-4096'  // Au lieu de mixtral-8x7b-32768
```

## 🧪 Tests

### Test manuel avec test-groq.html

Ouvrir `test-groq.html` dans un navigateur pour tester rapidement :
1. Entrer la clé API
2. Poser une question
3. Vérifier la réponse

### Test dans l'application

1. Lancer `pnpm dev`
2. Cliquer sur le bouton de chat
3. Vérifier l'affichage "✨ IA"
4. Poser différentes questions
5. Vérifier les réponses et le contexte

## 🐛 Debugging

### Logs utiles

```typescript
// Ajouter dans groqService.ts
console.log('Sending to Groq:', messages);
console.log('Groq response:', data);
```

### Erreurs communes

#### "Authorization failed"
- Clé API invalide
- Clé mal copiée (espaces)
- Clé expirée

#### "Rate limit exceeded"
- Trop de requêtes
- Vérifier quotas sur console.groq.com

#### "Network error"
- Pas de connexion Internet
- CORS (ne devrait pas arriver avec Groq)

## 📈 Monitoring

### Métriques à surveiller

1. **Taux de réussite des requêtes**
   - Ratio succès/échecs
   - Temps de réponse moyen

2. **Usage de tokens**
   - Disponible dans `data.usage.total_tokens`
   - Suivre la consommation

3. **Satisfaction utilisateur**
   - Temps de réponse perçu
   - Pertinence des réponses

## 🔄 Évolutions futures

### Fonctionnalités possibles

- [ ] **Streaming des réponses**
  - Afficher le texte au fur et à mesure
  - Meilleure UX pour longues réponses

- [ ] **Historique persistant**
  - Sauvegarder dans localStorage
  - Reprendre conversations

- [ ] **Multi-sessions**
  - Plusieurs conversations simultanées
  - Gestion de contextes différents

- [ ] **Analytics**
  - Tracker questions fréquentes
  - Améliorer le prompt système

- [ ] **Personnalisation**
  - Préférences utilisateur
  - Style de réponses ajustable

## 📚 Ressources

### Documentation Groq
- [Guide de démarrage](https://console.groq.com/docs/quickstart)
- [API Reference](https://console.groq.com/docs/api-reference)
- [Modèles](https://console.groq.com/docs/models)
- [Limites et quotas](https://console.groq.com/docs/rate-limits)

### Documentation Vite
- [Variables d'environnement](https://vitejs.dev/guide/env-and-mode.html)
- [Mode et ENV](https://vitejs.dev/guide/env-and-mode.html#env-files)

### Documentation React
- [Hooks](https://react.dev/reference/react)
- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)

## 💬 Support

Pour toute question technique :
- Consulter la documentation Groq
- Vérifier les logs de la console
- Tester avec `test-groq.html`
- Examiner les erreurs réseau (Network tab)

---

**Dernière mise à jour :** Février 2026  
**Version de l'intégration Groq :** 1.0.0
