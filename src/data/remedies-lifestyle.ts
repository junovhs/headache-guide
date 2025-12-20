// ============================================================================
// Lifestyle-Related Remedies
// ============================================================================

import type { Remedy } from '../types';

export const dehydrationRemedies: Remedy[] = [
  {
    id: 'dehydration_water',
    title: 'Rehydrate',
    description: 'Replace lost fluids',
    timeToEffect: '30-60 minutes',
    steps: [
      'Drink 16-24 oz of water over the next hour',
      'Add electrolytes if you have them (or a pinch of salt)',
      'Continue sipping water throughout the day',
    ],
    warnings: ["Don't chug large amounts at once - sip steadily"],
    category: 'immediate',
  },
];

export const caffeineRemedies: Remedy[] = [
  {
    id: 'caffeine_small_dose',
    title: 'Have a Small Amount of Caffeine',
    description: 'Ease withdrawal symptoms',
    timeToEffect: '15-30 minutes',
    steps: [
      'Have half your usual coffee/tea',
      'This should provide relief within 30 minutes',
    ],
    warnings: ["Don't overcompensate with extra caffeine"],
    category: 'immediate',
  },
  {
    id: 'caffeine_gradual',
    title: 'Gradual Reduction Plan',
    description: 'Prevent future withdrawal headaches',
    timeToEffect: 'Long-term',
    steps: [
      'Reduce caffeine by 25% per week',
      'Maintain consistent timing of caffeine intake',
      'Switch to half-caf as an intermediate step',
    ],
    category: 'preventive',
  },
];

export const caffeineExcessRemedies: Remedy[] = [
  {
    id: 'caffeine_water',
    title: 'Dilute and Wait',
    description: 'Help your body process the excess caffeine',
    timeToEffect: '1-2 hours',
    steps: [
      'Drink plenty of water',
      'Avoid any more caffeine today',
      'Light physical activity can help metabolize it faster',
    ],
    category: 'immediate',
  },
];

export const hungerRemedies: Remedy[] = [
  {
    id: 'hunger_eat',
    title: 'Eat Something',
    description: 'Stabilize blood sugar',
    timeToEffect: '20-40 minutes',
    steps: [
      'Eat a balanced snack or meal',
      'Include protein and complex carbs for sustained energy',
      'Avoid pure sugar which can cause a crash',
    ],
    category: 'immediate',
  },
];

export const eyeStrainRemedies: Remedy[] = [
  {
    id: 'eye_20_20_20',
    title: '20-20-20 Rule',
    description: 'Rest your eyes',
    timeToEffect: '10-20 minutes',
    steps: [
      'Every 20 minutes, look at something 20 feet away for 20 seconds',
      'Close your eyes and rest them for a minute',
      'Reduce screen brightness if possible',
    ],
    category: 'immediate',
  },
  {
    id: 'eye_palming',
    title: 'Eye Palming',
    description: 'Relax eye muscles',
    timeToEffect: '5 minutes',
    steps: [
      'Rub palms together to warm them',
      "Cup palms over closed eyes (don't press)",
      'Relax in darkness for 1-2 minutes',
    ],
    category: 'immediate',
  },
];

export const sleepRemedies: Remedy[] = [
  {
    id: 'sleep_nap',
    title: 'Power Nap',
    description: 'Give your brain a break',
    timeToEffect: '20-30 minutes',
    steps: [
      'If possible, take a 20-minute nap',
      'Set an alarm to avoid oversleeping',
      'Even resting with eyes closed helps',
    ],
    category: 'immediate',
  },
  {
    id: 'sleep_tonight',
    title: 'Prioritize Sleep Tonight',
    description: 'Recover properly',
    timeToEffect: 'Tonight',
    steps: [
      'Go to bed earlier than usual',
      'Avoid screens 1 hour before bed',
      'Keep the room cool and dark',
    ],
    category: 'short_term',
  },
];

export const alcoholRemedies: Remedy[] = [
  {
    id: 'alcohol_recovery',
    title: 'Hangover Recovery',
    description: 'Address alcohol-related headache',
    timeToEffect: '1-2 hours',
    steps: [
      'Rehydrate with water and electrolytes',
      'Eat easily digestible food',
      'Rest if possible',
      'Avoid "hair of the dog" - more alcohol makes it worse',
    ],
    category: 'immediate',
  },
];
