// ============================================================================
// Red Flag Screening Questions
// ============================================================================

import type { Question } from '../types';

export const redFlagQuestions: Question[] = [
  {
    id: 'red_flag_sudden',
    text: 'Did this headache reach maximum intensity within seconds to minutes?',
    subtext: 'Like a "thunderclap" - the worst headache of your life, instantly',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes, it was sudden and severe', emoji: '⚠️' },
      { value: 'no', label: 'No, it built up gradually', emoji: '✓' },
    ],
    required: true,
    category: 'red_flags',
  },
  {
    id: 'red_flag_symptoms',
    text: 'Are you experiencing any of these right now?',
    subtext: 'Select all that apply',
    type: 'multiple',
    options: [
      { value: 'fever_stiff_neck', label: 'Fever with stiff neck', emoji: '🤒' },
      { value: 'vision_changes', label: 'Sudden vision changes or loss', emoji: '👁️' },
      { value: 'confusion', label: 'Confusion or difficulty speaking', emoji: '🧠' },
      { value: 'weakness', label: 'Weakness or numbness on one side', emoji: '💪' },
      { value: 'after_injury', label: 'This started after a head injury', emoji: '🤕' },
      { value: 'none', label: 'None of these', emoji: '✓' },
    ],
    required: true,
    category: 'red_flags',
  },
];
