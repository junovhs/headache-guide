// ============================================================================
// Red Flag Detection
// ============================================================================

import type { Answer, DiagnosticResult } from '../types';
import { redFlagWarning } from '../data';

const SYMPTOM_DESCRIPTIONS: Record<string, string> = {
  fever_stiff_neck: 'Fever with stiff neck',
  vision_changes: 'Sudden vision changes',
  confusion: 'Confusion or difficulty speaking',
  weakness: 'Weakness or numbness on one side',
  after_injury: 'Headache following head injury',
};

function checkSuddenOnset(answers: Map<string, Answer>): string | null {
  const answer = answers.get('red_flag_sudden');
  if (answer?.value === 'yes') {
    return 'Sudden severe headache with maximum intensity reached within seconds to minutes';
  }
  return null;
}

function checkDangerousSymptoms(answers: Map<string, Answer>): string[] {
  const symptoms = answers.get('red_flag_symptoms');
  if (!Array.isArray(symptoms?.value)) return [];

  return symptoms.value
    .filter((s): s is string => typeof s === 'string' && s !== 'none')
    .map((s) => SYMPTOM_DESCRIPTIONS[s])
    .filter((desc): desc is string => desc !== undefined);
}

export function checkRedFlags(answers: Map<string, Answer>): string[] {
  const redFlags: string[] = [];

  const suddenOnset = checkSuddenOnset(answers);
  if (suddenOnset) redFlags.push(suddenOnset);

  const symptoms = checkDangerousSymptoms(answers);
  redFlags.push(...symptoms);

  return redFlags;
}

export function createRedFlagResult(redFlags: string[]): DiagnosticResult {
  return {
    primaryCause: 'red_flag',
    confidence: 100,
    secondaryCauses: [],
    reasoning: [
      'Your symptoms include warning signs that require immediate medical evaluation.',
      'This is not a diagnosis, but these symptoms should be assessed by a healthcare professional promptly.',
    ],
    remedies: [],
    redFlags,
    disclaimer: redFlagWarning,
    seekMedicalAttention: true,
    urgency: 'immediate',
  };
}
