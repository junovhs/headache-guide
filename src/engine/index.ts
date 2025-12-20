// ============================================================================
// Diagnostic Engine - Main Entry Point
// ============================================================================

import type { Answer, DiagnosticResult, HeadacheCategory } from '../types';
import { legalDisclaimer } from '../data';
import { calculateScores, rankCauses, type CategoryScores } from './scoring';
import { checkRedFlags, createRedFlagResult } from './redflags';
import { getRemedies } from './remedies';

export { getCategoryLabel, getCategoryDescription } from './labels';
import { getCategoryLabel } from './labels';

function buildReasoning(scores: CategoryScores, primaryCategory: HeadacheCategory): string[] {
  const reasoning: string[] = [];
  const label = getCategoryLabel(primaryCategory);

  reasoning.push(`Based on your responses, this appears most likely to be a ${label} headache.`);

  const primaryReasons = scores[primaryCategory]?.reasons || [];
  if (primaryReasons.length > 0) {
    reasoning.push('Key factors:');
    for (const reason of primaryReasons.slice(0, 3)) {
      reasoning.push(`• ${reason}`);
    }
  }

  return reasoning;
}

function answersToMap(answers: Answer[]): Map<string, Answer> {
  const map = new Map<string, Answer>();
  for (const answer of answers) {
    map.set(answer.questionId, answer);
  }
  return map;
}

export function runDiagnosis(answers: Answer[]): DiagnosticResult {
  const answerMap = answersToMap(answers);

  const redFlags = checkRedFlags(answerMap);
  if (redFlags.length > 0) {
    return createRedFlagResult(redFlags);
  }

  const scores = calculateScores(answerMap);
  const { primary, secondary } = rankCauses(scores);
  const applicableRemedies = getRemedies(primary, secondary);
  const reasoning = buildReasoning(scores, primary.category);

  return {
    primaryCause: primary.category,
    confidence: Math.round(primary.confidence),
    secondaryCauses: secondary.map((s) => ({
      cause: s.category,
      confidence: Math.round(s.confidence),
    })),
    reasoning,
    remedies: applicableRemedies,
    redFlags: [],
    disclaimer: legalDisclaimer,
    seekMedicalAttention: false,
    urgency: 'none',
  };
}
