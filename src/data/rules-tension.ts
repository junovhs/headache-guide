// ============================================================================
// Tension & Cervicogenic Diagnostic Rules
// ============================================================================

import type { DiagnosticRule } from '../types';
import { hasValue, hasAnyValue } from './answer-utils';

export const tensionRules: DiagnosticRule[] = [
  {
    id: 'tension_location',
    condition: (a) => hasAnyValue(a, 'location', ['back', 'neck', 'temples', 'all_over']),
    weights: [{ category: 'tension', weight: 0.3, reason: 'Location typical of tension headache' }],
  },
  {
    id: 'tension_quality',
    condition: (a) => hasAnyValue(a, 'pain_quality', ['pressure', 'dull', 'tight_band']),
    weights: [{ category: 'tension', weight: 0.3, reason: 'Pressure/tightness quality suggests tension' }],
  },
  {
    id: 'tension_neck_relief',
    condition: (a) => hasValue(a, 'neck_relief', 'yes_helps'),
    weights: [{ category: 'tension', weight: 0.4, reason: 'Relief from neck stretching indicates muscular component' }],
  },
  {
    id: 'tension_posture',
    condition: (a) => hasAnyValue(a, 'posture_activity', ['desk_work', 'phone', 'driving', 'reading']),
    weights: [{ category: 'tension', weight: 0.3, reason: 'Activity involves sustained posture' }],
  },
  {
    id: 'tension_stress',
    condition: (a) => hasAnyValue(a, 'stress_level', ['high', 'extreme']),
    weights: [
      { category: 'tension', weight: 0.3, reason: 'Stress contributes to muscle tension' },
      { category: 'stress', weight: 0.4, reason: 'High stress is a headache trigger' },
    ],
  },
];

export const cervicogenicRules: DiagnosticRule[] = [
  {
    id: 'cervicogenic_location',
    condition: (a) => hasAnyValue(a, 'location', ['neck', 'back']),
    weights: [{ category: 'cervicogenic', weight: 0.4, reason: 'Location suggests cervical origin' }],
  },
  {
    id: 'cervicogenic_relief',
    condition: (a) => hasValue(a, 'neck_relief', 'yes_helps'),
    weights: [{ category: 'cervicogenic', weight: 0.5, reason: 'Response to neck work suggests cervicogenic' }],
  },
  {
    id: 'cervicogenic_screen',
    condition: (a) => hasAnyValue(a, 'screen_time', ['heavy', 'extreme']),
    weights: [{ category: 'cervicogenic', weight: 0.3, reason: 'Extended screen time strains neck' }],
  },
];
