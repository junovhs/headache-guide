// ============================================================================
// HEADACHE.GUIDE - Diagnostic Engine
// ============================================================================

import type {
  Answer,
  DiagnosticResult,
  HeadacheCategory,
  Remedy,
} from './types';
import {
  diagnosticRules,
  remedies,
  legalDisclaimer,
  redFlagWarning,
} from './data';

/** Score accumulator for each headache category */
interface CategoryScores {
  [key: string]: {
    score: number;
    reasons: string[];
  };
}

/**
 * Run the diagnostic engine on a set of answers
 */
export function runDiagnosis(answers: Answer[]): DiagnosticResult {
  // Convert answers array to map for easier lookup
  const answerMap = new Map<string, Answer>();
  for (const answer of answers) {
    answerMap.set(answer.questionId, answer);
  }

  // Check for red flags first
  const redFlags = checkRedFlags(answerMap);
  if (redFlags.length > 0) {
    return createRedFlagResult(redFlags);
  }

  // Calculate scores for each category
  const scores = calculateScores(answerMap);

  // Determine primary and secondary causes
  const { primary, secondary } = rankCauses(scores);

  // Get appropriate remedies
  const applicableRemedies = getRemedies(primary, secondary);

  // Build reasoning
  const reasoning = buildReasoning(scores, primary);

  return {
    primaryCause: primary.category,
    confidence: Math.round(primary.confidence),
    secondaryCauses: secondary.map(s => ({
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

/**
 * Check for red flag symptoms that require immediate attention
 */
function checkRedFlags(answers: Map<string, Answer>): string[] {
  const redFlags: string[] = [];

  // Check thunderclap headache
  const suddenOnset = answers.get('red_flag_sudden');
  if (suddenOnset?.value === 'yes') {
    redFlags.push('Sudden severe headache with maximum intensity reached within seconds to minutes');
  }

  // Check dangerous symptoms
  const symptoms = answers.get('red_flag_symptoms');
  if (Array.isArray(symptoms?.value)) {
    const dangerousSymptoms = symptoms.value.filter(s => s !== 'none');
    
    const symptomDescriptions: Record<string, string> = {
      fever_stiff_neck: 'Fever with stiff neck',
      vision_changes: 'Sudden vision changes',
      confusion: 'Confusion or difficulty speaking',
      weakness: 'Weakness or numbness on one side',
      after_injury: 'Headache following head injury',
    };

    for (const symptom of dangerousSymptoms) {
      if (symptomDescriptions[symptom]) {
        redFlags.push(symptomDescriptions[symptom]);
      }
    }
  }

  return redFlags;
}

/**
 * Create result for red flag cases
 */
function createRedFlagResult(redFlags: string[]): DiagnosticResult {
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

/**
 * Calculate weighted scores for each headache category
 */
function calculateScores(answers: Map<string, Answer>): CategoryScores {
  const scores: CategoryScores = {};

  // Initialize all categories
  const categories: HeadacheCategory[] = [
    'tension', 'dehydration', 'caffeine_withdrawal', 'caffeine_excess',
    'hunger', 'eye_strain', 'sleep_deprivation', 'sinus', 'migraine',
    'cervicogenic', 'stress', 'medication_overuse', 'weather', 'alcohol', 'unknown',
  ];

  for (const cat of categories) {
    scores[cat] = { score: 0, reasons: [] };
  }

  // Apply each rule
  for (const rule of diagnosticRules) {
    if (rule.condition(answers)) {
      for (const weight of rule.weights) {
        if (weight.category !== 'red_flag') {
          scores[weight.category].score += weight.weight;
          scores[weight.category].reasons.push(weight.reason);
        }
      }
    }
  }

  return scores;
}

/**
 * Rank causes by score and calculate confidence
 */
function rankCauses(scores: CategoryScores): {
  primary: { category: HeadacheCategory; confidence: number };
  secondary: Array<{ category: HeadacheCategory; confidence: number }>;
} {
  // Sort categories by score
  const sorted = Object.entries(scores)
    .filter(([_, data]) => data.score > 0)
    .sort((a, b) => b[1].score - a[1].score);

  // If no scores, return unknown
  if (sorted.length === 0) {
    return {
      primary: { category: 'unknown', confidence: 50 },
      secondary: [],
    };
  }

  // Calculate total score for normalization
  const totalScore = sorted.reduce((sum, [_, data]) => sum + data.score, 0);

  // Primary cause
  const [primaryCat, primaryData] = sorted[0];
  const primaryConfidence = Math.min(95, (primaryData.score / totalScore) * 100 + 20);

  // Secondary causes (top 2 others with meaningful scores)
  const secondary = sorted
    .slice(1, 3)
    .filter(([_, data]) => data.score > 0.2)
    .map(([cat, data]) => ({
      category: cat as HeadacheCategory,
      confidence: Math.min(80, (data.score / totalScore) * 100 + 10),
    }));

  return {
    primary: {
      category: primaryCat as HeadacheCategory,
      confidence: primaryConfidence,
    },
    secondary,
  };
}

/**
 * Get remedies for the identified causes
 */
function getRemedies(
  primary: { category: HeadacheCategory; confidence: number },
  secondary: Array<{ category: HeadacheCategory; confidence: number }>
): Remedy[] {
  const result: Remedy[] = [];
  const addedIds = new Set<string>();

  // Add primary remedies
  const primaryRemedies = remedies[primary.category] || [];
  for (const remedy of primaryRemedies) {
    if (!addedIds.has(remedy.id)) {
      result.push(remedy);
      addedIds.add(remedy.id);
    }
  }

  // Add secondary remedies (immediate ones only)
  for (const sec of secondary) {
    const secRemedies = remedies[sec.category] || [];
    for (const remedy of secRemedies) {
      if (!addedIds.has(remedy.id) && remedy.category === 'immediate') {
        result.push(remedy);
        addedIds.add(remedy.id);
      }
    }
  }

  // If no remedies found, add general ones
  if (result.length === 0) {
    const unknownRemedies = remedies['unknown'] || [];
    for (const remedy of unknownRemedies) {
      result.push(remedy);
    }
  }

  return result;
}

/**
 * Build human-readable reasoning
 */
function buildReasoning(scores: CategoryScores, primary: { category: HeadacheCategory; confidence: number }): string[] {
  const reasoning: string[] = [];

  const categoryLabels: Record<HeadacheCategory, string> = {
    tension: 'Tension Headache',
    dehydration: 'Dehydration',
    caffeine_withdrawal: 'Caffeine Withdrawal',
    caffeine_excess: 'Excess Caffeine',
    hunger: 'Low Blood Sugar / Hunger',
    eye_strain: 'Eye Strain',
    sleep_deprivation: 'Sleep Deprivation',
    sinus: 'Sinus-Related',
    migraine: 'Migraine',
    cervicogenic: 'Neck/Posture-Related (Cervicogenic)',
    stress: 'Stress-Related',
    medication_overuse: 'Medication Overuse',
    weather: 'Weather/Pressure Change',
    alcohol: 'Alcohol-Related',
    unknown: 'Unclear Cause',
    red_flag: 'Warning Signs',
  };

  // Main conclusion
  reasoning.push(
    `Based on your responses, this appears most likely to be a ${categoryLabels[primary.category]} headache.`
  );

  // Supporting evidence
  const primaryReasons = scores[primary.category]?.reasons || [];
  if (primaryReasons.length > 0) {
    reasoning.push('Key factors:');
    for (const reason of primaryReasons.slice(0, 3)) {
      reasoning.push(`• ${reason}`);
    }
  }

  return reasoning;
}

/**
 * Get a friendly label for a category
 */
export function getCategoryLabel(category: HeadacheCategory): string {
  const labels: Record<HeadacheCategory, string> = {
    tension: 'Tension Headache',
    dehydration: 'Dehydration Headache',
    caffeine_withdrawal: 'Caffeine Withdrawal Headache',
    caffeine_excess: 'Caffeine-Induced Headache',
    hunger: 'Hunger/Blood Sugar Headache',
    eye_strain: 'Eye Strain Headache',
    sleep_deprivation: 'Sleep Deprivation Headache',
    sinus: 'Sinus Headache',
    migraine: 'Migraine',
    cervicogenic: 'Cervicogenic (Neck-Related) Headache',
    stress: 'Stress Headache',
    medication_overuse: 'Medication Overuse Headache',
    weather: 'Barometric Pressure Headache',
    alcohol: 'Alcohol-Related Headache',
    unknown: 'Undetermined Cause',
    red_flag: 'Warning - Seek Medical Care',
  };
  return labels[category] || category;
}

/**
 * Get a description for a category
 */
export function getCategoryDescription(category: HeadacheCategory): string {
  const descriptions: Record<HeadacheCategory, string> = {
    tension: 'Caused by muscle tension in the head, neck, and shoulders. Often related to stress, poor posture, or prolonged screen use.',
    dehydration: 'Occurs when your body lacks sufficient fluids. The brain can temporarily shrink from fluid loss, causing pain.',
    caffeine_withdrawal: 'Happens when regular caffeine users miss or reduce their usual intake. Blood vessels dilate, causing a throbbing headache.',
    caffeine_excess: 'Too much caffeine can cause headaches through vasoconstriction and nervous system stimulation.',
    hunger: 'Low blood sugar from skipped meals triggers headaches. Your brain needs consistent glucose to function properly.',
    eye_strain: 'Results from prolonged focus on screens or reading. Eye muscles fatigue and refer pain to the head.',
    sleep_deprivation: 'Lack of sleep disrupts pain regulation and can trigger inflammatory responses causing headaches.',
    sinus: 'Inflammation or congestion in the sinuses creates pressure and pain in the face and head.',
    migraine: 'A neurological condition causing moderate to severe throbbing pain, often with nausea and sensitivity to light/sound.',
    cervicogenic: 'Originates from the cervical spine (neck). Poor posture and neck strain refer pain to the head.',
    stress: 'Emotional and mental stress causes muscle tension and changes in neurotransmitters that trigger headaches.',
    medication_overuse: 'Frequent use of pain medications can paradoxically cause more headaches as the body becomes dependent.',
    weather: 'Changes in barometric pressure can affect sinus pressure and blood flow, triggering headaches in sensitive individuals.',
    alcohol: 'Alcohol causes dehydration, inflammation, and blood vessel changes that result in headache.',
    unknown: 'The cause isn\'t clear from the available information. Try general relief measures.',
    red_flag: 'Symptoms suggest a potentially serious condition requiring medical evaluation.',
  };
  return descriptions[category] || '';
}
