// ============================================================================
// Category Labels and Descriptions
// ============================================================================

import type { HeadacheCategory } from '../types';

const CATEGORY_LABELS: Record<HeadacheCategory, string> = {
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

const CATEGORY_DESCRIPTIONS: Record<HeadacheCategory, string> = {
  tension:
    'Caused by muscle tension in the head, neck, and shoulders. Often related to stress, poor posture, or prolonged screen use.',
  dehydration:
    'Occurs when your body lacks sufficient fluids. The brain can temporarily shrink from fluid loss, causing pain.',
  caffeine_withdrawal:
    'Happens when regular caffeine users miss or reduce their usual intake. Blood vessels dilate, causing a throbbing headache.',
  caffeine_excess:
    'Too much caffeine can cause headaches through vasoconstriction and nervous system stimulation.',
  hunger:
    'Low blood sugar from skipped meals triggers headaches. Your brain needs consistent glucose to function properly.',
  eye_strain:
    'Results from prolonged focus on screens or reading. Eye muscles fatigue and refer pain to the head.',
  sleep_deprivation:
    'Lack of sleep disrupts pain regulation and can trigger inflammatory responses causing headaches.',
  sinus:
    'Inflammation or congestion in the sinuses creates pressure and pain in the face and head.',
  migraine:
    'A neurological condition causing moderate to severe throbbing pain, often with nausea and sensitivity to light/sound.',
  cervicogenic:
    'Originates from the cervical spine (neck). Poor posture and neck strain refer pain to the head.',
  stress:
    'Emotional and mental stress causes muscle tension and changes in neurotransmitters that trigger headaches.',
  medication_overuse:
    'Frequent use of pain medications can paradoxically cause more headaches as the body becomes dependent.',
  weather:
    'Changes in barometric pressure can affect sinus pressure and blood flow, triggering headaches in sensitive individuals.',
  alcohol:
    'Alcohol causes dehydration, inflammation, and blood vessel changes that result in headache.',
  unknown: "The cause isn't clear from the available information. Try general relief measures.",
  red_flag: 'Symptoms suggest a potentially serious condition requiring medical evaluation.',
};

export function getCategoryLabel(category: HeadacheCategory): string {
  return CATEGORY_LABELS[category] || category;
}

export function getCategoryDescription(category: HeadacheCategory): string {
  return CATEGORY_DESCRIPTIONS[category] || '';
}
