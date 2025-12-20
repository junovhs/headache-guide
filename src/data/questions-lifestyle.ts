// ============================================================================
// Lifestyle Factor Questions
// ============================================================================

import type { Question } from '../types';

export const lifestyleQuestions: Question[] = [
  {
    id: 'water_intake',
    text: 'How much water have you had today?',
    type: 'single',
    options: [
      { value: 'none', label: 'None or almost none', emoji: '🏜️' },
      { value: 'little', label: 'A glass or two', emoji: '🥛' },
      { value: 'moderate', label: 'Been sipping throughout', emoji: '💧' },
      { value: 'plenty', label: 'Plenty - well hydrated', emoji: '🌊' },
    ],
    required: true,
    category: 'lifestyle',
  },
  {
    id: 'last_meal',
    text: 'When did you last eat a real meal?',
    type: 'single',
    options: [
      { value: 'within_2h', label: 'Within the last 2 hours', emoji: '✓' },
      { value: '2_4h', label: '2-4 hours ago', emoji: '🕐' },
      { value: '4_8h', label: '4-8 hours ago', emoji: '😐' },
      { value: 'over_8h', label: 'Over 8 hours ago', emoji: '😰' },
      { value: 'cant_remember', label: "Can't remember", emoji: '❓' },
    ],
    required: true,
    category: 'lifestyle',
  },
  {
    id: 'caffeine_today',
    text: "How much caffeine have you had today compared to usual?",
    type: 'single',
    options: [
      { value: 'none_unusual', label: 'None (but I usually have some)', emoji: '☕❌' },
      { value: 'less', label: 'Less than usual', emoji: '📉' },
      { value: 'normal', label: 'About the same as usual', emoji: '☕' },
      { value: 'more', label: 'More than usual', emoji: '☕☕☕' },
      { value: 'dont_drink', label: "I don't drink caffeine", emoji: '🚫' },
    ],
    required: true,
    category: 'lifestyle',
  },
  {
    id: 'sleep_last_night',
    text: 'How was your sleep last night?',
    type: 'single',
    options: [
      { value: 'great', label: 'Great - felt rested', emoji: '😊' },
      { value: 'ok', label: 'Okay - not perfect but fine', emoji: '😐' },
      { value: 'poor', label: 'Poor - woke up tired', emoji: '😫' },
      { value: 'very_little', label: 'Very little (under 5 hours)', emoji: '😵' },
      { value: 'none', label: 'Basically none', emoji: '💀' },
    ],
    required: true,
    category: 'lifestyle',
  },
  {
    id: 'screen_time',
    text: 'How much screen time today before the headache?',
    type: 'single',
    options: [
      { value: 'minimal', label: 'Minimal (under 1 hour)', emoji: '📱' },
      { value: 'moderate', label: '1-3 hours', emoji: '💻' },
      { value: 'heavy', label: '3-6 hours', emoji: '🖥️' },
      { value: 'extreme', label: '6+ hours', emoji: '👨‍💻' },
    ],
    required: true,
    category: 'lifestyle',
  },
  {
    id: 'alcohol_recent',
    text: 'Have you consumed alcohol in the last 24 hours?',
    type: 'single',
    options: [
      { value: 'no', label: 'No', emoji: '🚫' },
      { value: 'one_two', label: '1-2 drinks', emoji: '🍷' },
      { value: 'several', label: 'Several drinks', emoji: '🍺🍺' },
      { value: 'heavy', label: 'Heavy drinking', emoji: '🍻' },
    ],
    required: true,
    category: 'lifestyle',
  },
];
