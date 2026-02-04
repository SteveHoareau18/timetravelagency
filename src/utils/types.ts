// Types pour le service Groq
export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

export interface GroqUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: GroqChoice[];
  usage: GroqUsage;
}

export interface GroqError {
  error: {
    message: string;
    type: string;
    code: string;
  };
}

// Configuration Groq
export interface GroqConfig {
  apiKey: string;
  baseUrl?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

// Modèles Groq disponibles
export const GROQ_MODELS = {
  MIXTRAL_8X7B: 'mixtral-8x7b-32768',
  LLAMA_70B: 'llama2-70b-4096',
  GEMMA_7B: 'gemma-7b-it',
} as const;

export type GroqModel = typeof GROQ_MODELS[keyof typeof GROQ_MODELS];
