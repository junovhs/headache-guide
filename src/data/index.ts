// ============================================================================
// Data Module - Aggregated Exports
// ============================================================================

import type { Question, DiagnosticRule, Remedy, HeadacheCategory } from '../types';

// Questions
import { redFlagQuestions } from './questions-redflag';
import { onsetQuestions, locationQuestions, qualityQuestions } from './questions-core';
import { lifestyleQuestions } from './questions-lifestyle';
import { triggerQuestions } from './questions-triggers';

// Rules
import { tensionRules, cervicogenicRules } from './rules-tension';
import { dehydrationRules, caffeineRules, hungerRules, sleepRules, eyeStrainRules } from './rules-lifestyle';
import { migraineRules, sinusRules, otherRules, redFlagRules } from './rules-other';

// Remedies
import { tensionRemedies, cervicogenicRemedies, stressRemedies } from './remedies-tension';
import {
  dehydrationRemedies,
  caffeineRemedies,
  caffeineExcessRemedies,
  hungerRemedies,
  eyeStrainRemedies,
  sleepRemedies,
  alcoholRemedies,
} from './remedies-lifestyle';
import {
  migraineRemedies,
  sinusRemedies,
  weatherRemedies,
  medicationOveruseRemedies,
  unknownRemedies,
} from './remedies-other';

// Disclaimers
export { legalDisclaimer, redFlagWarning } from './disclaimers';
export { getAnswer, hasValue, hasAnyValue } from './answer-utils';

// Aggregated questions in order
export const questions: Question[] = [
  ...redFlagQuestions,
  ...onsetQuestions,
  ...locationQuestions,
  ...qualityQuestions,
  ...lifestyleQuestions,
  ...triggerQuestions,
];

// Aggregated diagnostic rules
export const diagnosticRules: DiagnosticRule[] = [
  ...redFlagRules,
  ...tensionRules,
  ...cervicogenicRules,
  ...dehydrationRules,
  ...caffeineRules,
  ...hungerRules,
  ...sleepRules,
  ...eyeStrainRules,
  ...migraineRules,
  ...sinusRules,
  ...otherRules,
];

// Remedies mapped by category
export const remedies: Record<HeadacheCategory, Remedy[]> = {
  tension: tensionRemedies,
  cervicogenic: cervicogenicRemedies,
  stress: stressRemedies,
  dehydration: dehydrationRemedies,
  caffeine_withdrawal: caffeineRemedies,
  caffeine_excess: caffeineExcessRemedies,
  hunger: hungerRemedies,
  eye_strain: eyeStrainRemedies,
  sleep_deprivation: sleepRemedies,
  alcohol: alcoholRemedies,
  migraine: migraineRemedies,
  sinus: sinusRemedies,
  weather: weatherRemedies,
  medication_overuse: medicationOveruseRemedies,
  unknown: unknownRemedies,
  red_flag: [],
};
