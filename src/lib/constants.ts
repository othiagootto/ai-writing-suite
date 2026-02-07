import type { ToolType } from '@/types';

export const FREE_DAILY_LIMIT = 3;

export const TOOLS: readonly {
  id: ToolType;
  nameKey: string;
  descriptionKey: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  active: boolean;
  color: string;
}[] = [
  {
    id: 'detector' as ToolType,
    nameKey: 'tools.detector.name',
    descriptionKey: 'tools.detector.description',
    name: 'AI Detector',
    description: 'Analyze text to determine if it was written by AI',
    icon: 'ScanSearch',
    path: '/tools/ai-detector',
    active: true,
    color: 'text-blue-500',
  },
  {
    id: 'humanizer' as ToolType,
    nameKey: 'tools.humanizer.name',
    descriptionKey: 'tools.humanizer.description',
    name: 'AI Humanizer',
    description: 'Rewrite AI-generated text to sound naturally human',
    icon: 'UserPen',
    path: '/tools/humanizer',
    active: true,
    color: 'text-green-500',
  },
  {
    id: 'paraphraser' as ToolType,
    nameKey: 'tools.paraphraser.name',
    descriptionKey: 'tools.paraphraser.description',
    name: 'Paraphraser',
    description: 'Rewrite text with different tone and intensity',
    icon: 'RefreshCw',
    path: '/tools/paraphraser',
    active: true,
    color: 'text-purple-500',
  },
  {
    id: 'grammar' as ToolType,
    nameKey: 'tools.grammar.name',
    descriptionKey: 'tools.grammar.description',
    name: 'Grammar Checker',
    description: 'Find and fix grammar, spelling, and style errors',
    icon: 'SpellCheck',
    path: '/tools/grammar-checker',
    active: true,
    color: 'text-orange-500',
  },
  {
    id: 'plagiarism' as ToolType,
    nameKey: 'tools.plagiarism.name',
    descriptionKey: 'tools.plagiarism.description',
    name: 'Plagiarism Checker',
    description: 'Analyze text originality and detect potential plagiarism',
    icon: 'ShieldCheck',
    path: '/tools/plagiarism-checker',
    active: true,
    color: 'text-red-500',
  },
  {
    id: 'summarizer' as ToolType,
    nameKey: 'tools.summarizer.name',
    descriptionKey: 'tools.summarizer.description',
    name: 'Summarizer',
    description: 'Condense long texts into concise summaries',
    icon: 'FileText',
    path: '/tools/summarizer',
    active: true,
    color: 'text-cyan-500',
  },
  {
    id: 'citation' as ToolType,
    nameKey: 'tools.citation.name',
    descriptionKey: 'tools.citation.description',
    name: 'Citation Generator',
    description: 'Generate citations in APA, MLA, Chicago, and Harvard',
    icon: 'Quote',
    path: '/tools/citation-generator',
    active: true,
    color: 'text-yellow-500',
  },
  {
    id: 'chat' as ToolType,
    nameKey: 'tools.chat.name',
    descriptionKey: 'tools.chat.description',
    name: 'AI Chat',
    description: 'Chat with AI about your documents and writing',
    icon: 'MessageSquare',
    path: '/tools/ai-chat',
    active: true,
    color: 'text-pink-500',
  },
];

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '',
    description: 'Try our tools with limited usage',
    features: [
      `${FREE_DAILY_LIMIT} uses per tool per day`,
      'All 8 writing tools',
      'Basic AI analysis',
      'No credit card required',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'monthly',
    name: 'Pro Monthly',
    price: 19.99,
    period: '/month',
    description: 'Unlimited access to all tools',
    features: [
      'Unlimited tool usage',
      'All 8 writing tools',
      'Priority AI processing',
      'Usage history',
      'Document upload (PDF, DOCX)',
      '7-day free trial',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'annual',
    name: 'Pro Annual',
    price: 9.99,
    period: '/month',
    annualPrice: 119.88,
    description: 'Best value - save 50%',
    features: [
      'Everything in Pro Monthly',
      'Save 50% vs monthly',
      'Priority support',
      'Early access to new features',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
] as const;

export const TONES = [
  { id: 'academic', label: 'Academic', description: 'Formal, scholarly writing' },
  { id: 'casual', label: 'Casual', description: 'Friendly, conversational' },
  { id: 'professional', label: 'Professional', description: 'Polished business English' },
  { id: 'neutral', label: 'Neutral', description: 'Plain, simple language' },
  { id: 'humanize', label: 'Humanize', description: 'Natural human sound' },
  { id: 'remove-plagiarism', label: 'Remove Plagiarism', description: 'Unique rephrasing' },
] as const;

export const INTENSITIES = [
  { id: 'minimum', label: 'Minimum', description: 'Light rewording (~20%)' },
  { id: 'moderate', label: 'Moderate', description: 'Balanced rewrite (~50%)' },
  { id: 'maximum', label: 'Maximum', description: 'Full transformation (~80%)' },
] as const;

export const HUMANIZER_MODES = [
  { id: 'light', label: 'Sound Human', description: 'Minimal changes, fix obvious AI patterns' },
  { id: 'auto', label: 'Auto', description: 'Balanced rewrite for natural reading' },
  { id: 'bypass', label: 'Bypass Detectors', description: 'Heavy rewrite to pass AI detection' },
] as const;

export const SUMMARY_LENGTHS = [
  { id: 'short', label: 'Short', description: '1-2 sentences' },
  { id: 'medium', label: 'Medium', description: '3-5 sentences' },
  { id: 'long', label: 'Long', description: '1-2 paragraphs' },
] as const;

export const CITATION_FORMATS = [
  { id: 'apa', label: 'APA 7th', description: 'American Psychological Association' },
  { id: 'mla', label: 'MLA 9th', description: 'Modern Language Association' },
  { id: 'chicago', label: 'Chicago 17th', description: 'Chicago Manual of Style' },
  { id: 'harvard', label: 'Harvard', description: 'Harvard Referencing' },
] as const;

export const MAX_INPUT_CHARS = 10000;
