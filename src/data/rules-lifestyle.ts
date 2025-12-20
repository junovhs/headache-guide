// ============================================================================
// Lifestyle-Related Diagnostic Rules
// ============================================================================

import type { DiagnosticRule } from '../types';
import { hasValue, hasAnyValue } from './answer-utils';

export const dehydrationRules: DiagnosticRule[] = [
  {
    id: 'dehydration_intake',
    condition: (a) => hasAnyValue(a, 'water_intake', ['none', 'little']),
    weights: [{ category: 'dehydration', weight: 0.6, reason: 'Insufficient fluid intake' }],
  },
  {
    id: 'dehydration_alcohol',
    condition: (a) => hasAnyValue(a, 'alcohol_recent', ['several', 'heavy']),
    weights: [
      { category: 'dehydration', weight: 0.4, reason: 'Alcohol causes dehydration' },
      { category: 'alcohol', weight: 0.6, reason: 'Alcohol directly causes headaches' },
    ],
  },
];

export const caffeineRules: DiagnosticRule[] = [
  {
    id: 'caffeine_withdrawal',
    condition: (a) => hasAnyValue(a, 'caffeine_today', ['none_unusual', 'less']),
    weights: [{ category: 'caffeine_withdrawal', weight: 0.7, reason: 'Reduced caffeine triggers withdrawal headache' }],
  },
  {
    id: 'caffeine_excess',
    condition: (a) => hasValue(a, 'caffeine_today', 'more'),
    weights: [{ category: 'caffeine_excess', weight: 0.5, reason: 'Excess caffeine can cause headaches' }],
  },
];

export const hungerRules: DiagnosticRule[] = [
  {
    id: 'hunger_long',
    condition: (a) => hasAnyValue(a, 'last_meal', ['4_8h', 'over_8h', 'cant_remember']),
    weights: [{ category: 'hunger', weight: 0.6, reason: 'Low blood sugar from not eating' }],
  },
];

export const sleepRules: DiagnosticRule[] = [
  {
    id: 'sleep_poor',
    condition: (a) => hasAnyValue(a, 'sleep_last_night', ['poor', 'very_little', 'none']),
    weights: [{ category: 'sleep_deprivation', weight: 0.5, reason: 'Lack of sleep triggers headaches' }],
  },
  {
    id: 'sleep_woke_with',
    condition: (a) =>
      hasValue(a, 'onset', 'woke_with') &&
      hasAnyValue(a, 'sleep_last_night', ['poor', 'very_little', 'none']),
    weights: [{ category: 'sleep_deprivation', weight: 0.7, reason: 'Waking with headache after poor sleep' }],
  },
];

export const eyeStrainRules: DiagnosticRule[] = [
  {
    id: 'eye_strain_location',
    condition: (a) => hasValue(a, 'location', 'behind_eyes'),
    weights: [{ category: 'eye_strain', weight: 0.4, reason: 'Location suggests eye strain' }],
  },
  {
    id: 'eye_strain_screen',
    condition: (a) =>
      hasAnyValue(a, 'screen_time', ['heavy', 'extreme']) &&
      hasValue(a, 'location', 'behind_eyes'),
    weights: [{ category: 'eye_strain', weight: 0.6, reason: 'Screen time with eye pain indicates strain' }],
  },
];
