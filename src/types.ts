// ============================================================================
// HEADACHE.GUIDE - Type Definitions
// ============================================================================

export type HeadacheLocation =
  | 'forehead'
  | 'temples'
  | 'behind_eyes'
  | 'top_of_head'
  | 'back_of_head'
  | 'one_side'
  | 'all_over'
  | 'face_sinuses'
  | 'neck_base';

export type PainQuality =
  | 'throbbing'
  | 'pressure'
  | 'stabbing'
  | 'dull_ache'
  | 'burning'
  | 'tightness';

export type OnsetSpeed = 'sudden' | 'gradual' | 'woke_with';

export type HeadacheCategory =
  | 'tension'
  | 'dehydration'
  | 'caffeine_withdrawal'
  | 'caffeine_excess'
  | 'hunger'
  | 'eye_strain'
  | 'sleep_deprivation'
  | 'sinus'
  | 'migraine'
  | 'cervicogenic'
  | 'stress'
  | 'medication_overuse'
  | 'weather'
  | 'alcohol'
  | 'unknown'
  | 'red_flag';

export interface QuestionOption {
  value: string;
  label: string;
  emoji?: string;
}

export interface Question {
  id: string;
  text: string;
  subtext?: string;
  type: 'single' | 'multiple' | 'scale';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  required: boolean;
  category: 'onset' | 'location' | 'quality' | 'lifestyle' | 'triggers' | 'red_flags';
}

export interface Answer {
  questionId: string;
  value: string | string[] | number;
  timestamp: number;
}

export interface DiagnosticWeight {
  category: HeadacheCategory;
  weight: number;
  reason: string;
}

export interface DiagnosticRule {
  id: string;
  condition: (answers: Map<string, Answer>) => boolean;
  weights: DiagnosticWeight[];
}

export interface Remedy {
  id: string;
  title: string;
  description: string;
  timeToEffect: string;
  steps?: string[];
  warnings?: string[];
  category: 'immediate' | 'short_term' | 'preventive';
}

export interface DiagnosticResult {
  primaryCause: HeadacheCategory;
  confidence: number;
  secondaryCauses: Array<{ cause: HeadacheCategory; confidence: number }>;
  reasoning: string[];
  remedies: Remedy[];
  redFlags: string[];
  disclaimer: string;
  seekMedicalAttention: boolean;
  urgency: 'none' | 'soon' | 'today' | 'immediate';
}

export interface DiagnosticSession {
  id: string;
  startedAt: number;
  answers: Answer[];
  currentQuestionIndex: number;
  completed: boolean;
  result?: DiagnosticResult;
}

export interface QuestionRenderOptions {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  currentAnswer: Answer | undefined;
  onAnswer: (answer: Answer) => void;
  onBack: (() => void) | null;
}
