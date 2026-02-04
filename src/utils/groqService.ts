import type { GroqMessage, GroqResponse, GroqConfig } from './types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export class GroqService {
  private apiKey: string;
  private systemPrompt: string;
  private config: Partial<GroqConfig>;

  constructor(apiKey: string, config?: Partial<GroqConfig>) {
    this.apiKey = apiKey;
    this.config = {
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      maxTokens: 500,
      topP: 1,
      ...config
    };
    this.systemPrompt = `Tu es un conseiller temporel expert de TimeTravel Agency, une agence de voyage temporel de luxe et premium. 
    
Ton rôle est d'aider les clients à planifier leurs voyages dans le temps avec professionnalisme, enthousiasme et expertise.

DESTINATIONS DISPONIBLES :
1. Paris 1889 - Belle Époque
   - Prix : 3 499€ pour 5 jours
   - Difficulté : Facile
   - Points forts : Inauguration de la Tour Eiffel, Exposition Universelle, Moulin Rouge, artistes impressionnistes à Montmartre
   - Inclus : Transport temporel A/R, guide expert, vêtements d'époque, traducteur universel, équipement sécurité, assurance standard, kit photo 8K

2. Florence Renaissance 1504
   - Prix : 4 799€ pour 6 jours
   - Difficulté : Modéré
   - Points forts : Installation du David de Michel-Ange, ateliers de Léonard de Vinci, rencontre avec Laurent II de Médicis, cours de fresque
   - Parfait pour passionnés d'art et d'histoire

3. Crétacé - Ère des Dinosaures
   - Prix : 12 999€ pour 7 jours
   - Difficulté : Extrême
   - Points forts : Safari préhistorique, observation T-Rex, troupeaux de Triceratops, survol volcans actifs
   - Requiert excellente condition physique et bilan médical
   - Places limitées (max 4 voyageurs)

INFORMATIONS IMPORTANTES :
- Sécurité : Capsules avec boucliers temporels, rapatriement d'urgence 60s, IA surveillance, traceur quantique
- Plus de 50 000 voyages réalisés, 99.8% de satisfaction
- Certification ISO Temporelle 9001
- Relativité temporelle : 5-7 jours dans le passé = 4-8h dans le présent
- Mode observateur protégé : impossible de modifier l'histoire ou créer un paradoxe

ASSURANCES :
1. Standard (incluse) : protection de base + rapatriement urgence
2. Premium (+500€) : annulation flexible + protection étendue + assistance 24/7 prioritaire
3. Ultimate (+1000€) : couverture maximale + protection paradoxes temporels + garantie satisfaction

POLITIQUE ANNULATION :
- Plus de 30 jours avant : 100% remboursé
- 30-15 jours : 50% remboursé
- 15-7 jours : 25% remboursé
- Moins de 7 jours : non remboursable sauf force majeure

PAIEMENT :
- Paiement sécurisé
- 3x sans frais disponible

Réponds toujours en français, de manière chaleureuse, professionnelle et avec enthousiasme. Sois concis mais informatif. Utilise des émojis avec parcimonie pour rendre tes réponses plus vivantes.`;
  }

  async sendMessage(messages: GroqMessage[]): Promise<string> {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: 'system', content: this.systemPrompt },
            ...messages
          ],
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens,
          top_p: this.config.topP,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      const data: GroqResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from Groq API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      
      // Fallback message en cas d'erreur
      if (error instanceof Error && error.message.includes('Authorization')) {
        return "Désolé, je ne peux pas me connecter à mon système d'IA pour le moment. Veuillez vérifier que la clé API Groq est correctement configurée. En attendant, n'hésitez pas à explorer nos destinations !";
      }
      
      return "Je rencontre une difficulté technique temporaire. Pourriez-vous reformuler votre question ? En attendant, je peux vous recommander de consulter nos trois destinations principales : Paris 1889, Florence Renaissance ou le Crétacé.";
    }
  }

  static isConfigured(): boolean {
    return !!import.meta.env.VITE_GROQ_KEY;
  }

  static getApiKey(): string {
    return import.meta.env.VITE_GROQ_KEY || '';
  }
}