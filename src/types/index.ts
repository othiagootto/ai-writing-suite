export type ToolType = 'detector' | 'plagiarism' | 'humanizer' | 'paraphraser' | 'grammar' | 'summarizer' | 'chat' | 'citation';

export type Tone = 'academic' | 'casual' | 'professional' | 'neutral' | 'humanize' | 'remove-plagiarism';
export type Intensity = 'minimum' | 'moderate' | 'maximum';
export type HumanizerMode = 'light' | 'auto' | 'bypass';
export type SummaryLength = 'short' | 'medium' | 'long';
export type CitationFormat = 'apa' | 'mla' | 'chicago' | 'harvard';

export interface ToolOptions {
  tone?: Tone;
  intensity?: Intensity;
  mode?: HumanizerMode;
  length?: SummaryLength;
  format?: CitationFormat;
}

export interface Highlight {
  start: number;
  end: number;
  type: string;
  confidence: number;
  message?: string;
}

export interface ToolResult {
  result: string;
  score?: number;
  highlights?: Highlight[];
  corrections?: Array<{
    original: string;
    corrected: string;
    type: string;
    message: string;
  }>;
  metadata: {
    provider: 'openai' | 'anthropic';
    tokensUsed: number;
    processingTime: number;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  plan: 'monthly' | 'annual';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_end: string;
  created_at: string;
}
