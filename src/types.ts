// ============================================================================
// HEADACHE.GUIDE - Type Definitions
// ============================================================================

/** Possible locations where a headache can manifest */
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

/** Pain quality descriptors */
export type PainQuality =
  | 'throbbing'
  | 'pressure'
  | 'stabbing'
  | 'dull_ache'
  | 'burning'
  | 'tightness';

/** How quickly the headache developed */
export type OnsetSpeed =
  | 'sudden'      // seconds to minutes
  | 'gradual'     // built over hours
  | 'woke_with';  // present upon waking

/** Categories of headache causes we can identify */
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
  | 'cervicogenic'    // neck-related
  | 'stress'
  | 'medication_overuse'
  | 'weather'
  | 'alcohol'
  | 'unknown'
  | 'red_flag';       // needs medical attention

/** A single question in the diagnostic flow */
export interface Question {
  id: string;
  text: string;
  subtext?: string;
  type: 'single' | 'multiple' | 'scale' | 'time' | 'text';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  required: boolean;
  category: 'onset' | 'location' | 'quality' | 'lifestyle' | 'triggers' | 'red_flags';
}

/** An option for single/multiple choice questions */
export interface QuestionOption {
  value: string;
  label: string;
  emoji?: string;
  followUp?: string;  // ID of follow-up question if selected
}

/** User's response to a question */
export interface Answer {
  questionId: string;
  value: string | string[] | number;
  timestamp: number;
}

/** Complete user session data */
export interface DiagnosticSession {
  id: string;
  startedAt: number;
  answers: Answer[];
  currentQuestionIndex: number;
  completed: boolean;
  result?: DiagnosticResult;
}

/** Weight factors for each answer toward a diagnosis */
export interface DiagnosticWeight {
  category: HeadacheCategory;
  weight: number;  // -1 to 1, negative means rules out
  reason: string;
}

/** Rule that maps answer patterns to diagnostic weights */
export interface DiagnosticRule {
  id: string;
  description: string;
  condition: (answers: Map<string, Answer>) => boolean;
  weights: DiagnosticWeight[];
}

/** A specific remedy or action */
export interface Remedy {
  id: string;
  title: string;
  description: string;
  timeToEffect: string;
  steps?: string[];
  warnings?: string[];
  category: 'immediate' | 'short_term' | 'preventive';
}

/** Result of the diagnostic process */
export interface DiagnosticResult {
  primaryCause: HeadacheCategory;
  confidence: number;  // 0-100
  secondaryCauses: Array<{ cause: HeadacheCategory; confidence: number }>;
  reasoning: string[];
  remedies: Remedy[];
  redFlags: string[];
  disclaimer: string;
  seekMedicalAttention: boolean;
  urgency: 'none' | 'soon' | 'today' | 'immediate';
}

/** Application state */
export interface AppState {
  currentScreen: 'welcome' | 'questions' | 'results' | 'emergency';
  session: DiagnosticSession | null;
  isLoading: boolean;
  error: string | null;
}

/** Event types for state changes */
export type AppEvent =
  | { type: 'START_SESSION' }
  | { type: 'ANSWER_QUESTION'; answer: Answer }
  | { type: 'GO_BACK' }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'RESET' }
  | { type: 'SHOW_EMERGENCY' };

/** Callback for state subscribers */
export type StateSubscriber = (state: AppState) => void;
