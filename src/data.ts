// ============================================================================
// HEADACHE.GUIDE - Questions, Rules, and Remedies Data
// ============================================================================

import type {
  Question,
  DiagnosticRule,
  Remedy,
  HeadacheCategory,
  Answer,
} from './types';

// ============================================================================
// QUESTIONS
// ============================================================================

export const questions: Question[] = [
  // RED FLAG SCREENING (always first)
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

  // ONSET & TIMING
  {
    id: 'onset',
    text: 'When did this headache start?',
    type: 'single',
    options: [
      { value: 'just_now', label: 'Just now (within the hour)', emoji: '⏱️' },
      { value: 'few_hours', label: 'A few hours ago', emoji: '🕐' },
      { value: 'this_morning', label: 'This morning', emoji: '🌅' },
      { value: 'woke_with', label: 'I woke up with it', emoji: '😴' },
      { value: 'yesterday', label: 'Yesterday or longer', emoji: '📅' },
    ],
    required: true,
    category: 'onset',
  },
  {
    id: 'onset_pattern',
    text: 'How did it develop?',
    type: 'single',
    options: [
      { value: 'gradual', label: 'Slowly built up over time', emoji: '📈' },
      { value: 'sudden', label: 'Came on quickly', emoji: '⚡' },
      { value: 'constant', label: 'Been constant since it started', emoji: '➡️' },
      { value: 'waves', label: 'Comes and goes in waves', emoji: '🌊' },
    ],
    required: true,
    category: 'onset',
  },

  // LOCATION
  {
    id: 'location',
    text: 'Where is the pain?',
    subtext: 'Select all areas that apply',
    type: 'multiple',
    options: [
      { value: 'forehead', label: 'Forehead', emoji: '🔼' },
      { value: 'temples', label: 'Temples (sides)', emoji: '◀️▶️' },
      { value: 'behind_eyes', label: 'Behind the eyes', emoji: '👀' },
      { value: 'top', label: 'Top of head', emoji: '⬆️' },
      { value: 'back', label: 'Back of head', emoji: '🔽' },
      { value: 'neck', label: 'Base of skull / upper neck', emoji: '🦴' },
      { value: 'one_side', label: 'One side only', emoji: '↔️' },
      { value: 'face', label: 'Face / cheeks / sinuses', emoji: '😷' },
      { value: 'all_over', label: 'All over', emoji: '🔴' },
    ],
    required: true,
    category: 'location',
  },

  // PAIN QUALITY
  {
    id: 'pain_quality',
    text: 'What does the pain feel like?',
    type: 'single',
    options: [
      { value: 'throbbing', label: 'Throbbing / pulsing', emoji: '💓' },
      { value: 'pressure', label: 'Pressure / squeezing', emoji: '🗜️' },
      { value: 'stabbing', label: 'Stabbing / sharp', emoji: '🗡️' },
      { value: 'dull', label: 'Dull ache', emoji: '😑' },
      { value: 'burning', label: 'Burning', emoji: '🔥' },
      { value: 'tight_band', label: 'Like a tight band around head', emoji: '🎀' },
    ],
    required: true,
    category: 'quality',
  },
  {
    id: 'pain_intensity',
    text: 'How intense is the pain right now?',
    type: 'scale',
    min: 1,
    max: 10,
    required: true,
    category: 'quality',
  },

  // LIFESTYLE FACTORS
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

  // PHYSICAL FACTORS
  {
    id: 'neck_relief',
    text: 'Does stretching or massaging your neck provide any relief?',
    type: 'single',
    options: [
      { value: 'yes_helps', label: 'Yes, it helps temporarily', emoji: '✓' },
      { value: 'no_change', label: 'No change', emoji: '➖' },
      { value: 'makes_worse', label: 'Makes it worse', emoji: '❌' },
      { value: 'havent_tried', label: "Haven't tried", emoji: '❓' },
    ],
    required: true,
    category: 'triggers',
  },
  {
    id: 'posture_activity',
    text: 'What were you doing before the headache started?',
    type: 'multiple',
    options: [
      { value: 'desk_work', label: 'Desk/computer work', emoji: '💼' },
      { value: 'phone', label: 'Looking at phone', emoji: '📱' },
      { value: 'driving', label: 'Driving', emoji: '🚗' },
      { value: 'reading', label: 'Reading', emoji: '📖' },
      { value: 'physical', label: 'Physical activity/exercise', emoji: '🏃' },
      { value: 'nothing_special', label: 'Nothing particular', emoji: '🤷' },
    ],
    required: true,
    category: 'triggers',
  },

  // ENVIRONMENTAL & OTHER
  {
    id: 'sinus_symptoms',
    text: 'Do you have any of these sinus-related symptoms?',
    type: 'multiple',
    options: [
      { value: 'congestion', label: 'Nasal congestion', emoji: '🤧' },
      { value: 'pressure_face', label: 'Pressure in face/cheeks', emoji: '😷' },
      { value: 'runny', label: 'Runny nose', emoji: '💧' },
      { value: 'post_nasal', label: 'Post-nasal drip', emoji: '👃' },
      { value: 'none', label: 'None of these', emoji: '✓' },
    ],
    required: true,
    category: 'triggers',
  },
  {
    id: 'light_sound_sensitivity',
    text: 'Are light or sound bothering you more than usual?',
    type: 'single',
    options: [
      { value: 'both', label: 'Yes, both light and sound', emoji: '🔆🔊' },
      { value: 'light_only', label: 'Light only', emoji: '🔆' },
      { value: 'sound_only', label: 'Sound only', emoji: '🔊' },
      { value: 'no', label: 'No more than usual', emoji: '✓' },
    ],
    required: true,
    category: 'triggers',
  },
  {
    id: 'nausea',
    text: 'Are you feeling nauseous?',
    type: 'single',
    options: [
      { value: 'yes_severe', label: 'Yes, significantly', emoji: '🤢' },
      { value: 'mild', label: 'Mildly', emoji: '😐' },
      { value: 'no', label: 'No', emoji: '✓' },
    ],
    required: true,
    category: 'triggers',
  },
  {
    id: 'stress_level',
    text: 'How would you rate your stress level lately?',
    type: 'single',
    options: [
      { value: 'low', label: 'Low - feeling relaxed', emoji: '😌' },
      { value: 'moderate', label: 'Moderate - some things on my mind', emoji: '😐' },
      { value: 'high', label: 'High - significant stress', emoji: '😰' },
      { value: 'extreme', label: 'Extreme - overwhelmed', emoji: '😫' },
    ],
    required: true,
    category: 'triggers',
  },
  {
    id: 'weather_change',
    text: 'Has there been a significant weather or pressure change recently?',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes', emoji: '🌦️' },
      { value: 'no', label: 'No', emoji: '☀️' },
      { value: 'unsure', label: 'Not sure', emoji: '❓' },
    ],
    required: true,
    category: 'triggers',
  },
  {
    id: 'medication_frequency',
    text: 'How often do you take pain medication for headaches?',
    type: 'single',
    options: [
      { value: 'rarely', label: 'Rarely (few times a month or less)', emoji: '💊' },
      { value: 'weekly', label: '1-2 times per week', emoji: '💊💊' },
      { value: 'frequently', label: '3+ times per week', emoji: '💊💊💊' },
      { value: 'daily', label: 'Almost daily', emoji: '⚠️' },
    ],
    required: true,
    category: 'triggers',
  },
];

// ============================================================================
// DIAGNOSTIC RULES
// ============================================================================

const getAnswer = (answers: Map<string, Answer>, id: string): string | string[] | number | null => {
  const answer = answers.get(id);
  return answer?.value ?? null;
};

const hasValue = (answers: Map<string, Answer>, id: string, value: string): boolean => {
  const answer = getAnswer(answers, id);
  if (Array.isArray(answer)) return answer.includes(value);
  return answer === value;
};

const hasAnyValue = (answers: Map<string, Answer>, id: string, values: string[]): boolean => {
  return values.some(v => hasValue(answers, id, v));
};

export const diagnosticRules: DiagnosticRule[] = [
  // RED FLAGS
  {
    id: 'thunderclap',
    description: 'Sudden severe onset - possible emergency',
    condition: (answers) => hasValue(answers, 'red_flag_sudden', 'yes'),
    weights: [{ category: 'red_flag', weight: 1.0, reason: 'Sudden severe headache requires immediate evaluation' }],
  },
  {
    id: 'emergency_symptoms',
    description: 'Dangerous accompanying symptoms',
    condition: (answers) => {
      const symptoms = getAnswer(answers, 'red_flag_symptoms');
      if (!Array.isArray(symptoms)) return false;
      return symptoms.some(s => s !== 'none');
    },
    weights: [{ category: 'red_flag', weight: 1.0, reason: 'Symptoms suggest possible serious condition' }],
  },

  // TENSION HEADACHE
  {
    id: 'tension_location',
    description: 'Classic tension headache location',
    condition: (answers) => hasAnyValue(answers, 'location', ['back', 'neck', 'temples', 'all_over']),
    weights: [{ category: 'tension', weight: 0.3, reason: 'Location typical of tension headache' }],
  },
  {
    id: 'tension_quality',
    description: 'Tension headache pain quality',
    condition: (answers) => hasAnyValue(answers, 'pain_quality', ['pressure', 'dull', 'tight_band']),
    weights: [{ category: 'tension', weight: 0.3, reason: 'Pressure/tightness quality suggests tension' }],
  },
  {
    id: 'tension_neck_relief',
    description: 'Neck stretching provides relief',
    condition: (answers) => hasValue(answers, 'neck_relief', 'yes_helps'),
    weights: [{ category: 'tension', weight: 0.4, reason: 'Relief from neck stretching indicates muscular component' }],
  },
  {
    id: 'tension_posture',
    description: 'Preceded by postural strain activities',
    condition: (answers) => hasAnyValue(answers, 'posture_activity', ['desk_work', 'phone', 'driving', 'reading']),
    weights: [{ category: 'tension', weight: 0.3, reason: 'Activity involves sustained posture' }],
  },
  {
    id: 'tension_stress',
    description: 'High stress level',
    condition: (answers) => hasAnyValue(answers, 'stress_level', ['high', 'extreme']),
    weights: [
      { category: 'tension', weight: 0.3, reason: 'Stress contributes to muscle tension' },
      { category: 'stress', weight: 0.4, reason: 'High stress is a headache trigger' },
    ],
  },

  // CERVICOGENIC (NECK-RELATED)
  {
    id: 'cervicogenic_location',
    description: 'Pain at base of skull/neck',
    condition: (answers) => hasAnyValue(answers, 'location', ['neck', 'back']),
    weights: [{ category: 'cervicogenic', weight: 0.4, reason: 'Location suggests cervical origin' }],
  },
  {
    id: 'cervicogenic_relief',
    description: 'Neck manipulation helps',
    condition: (answers) => hasValue(answers, 'neck_relief', 'yes_helps'),
    weights: [{ category: 'cervicogenic', weight: 0.5, reason: 'Response to neck work suggests cervicogenic' }],
  },
  {
    id: 'cervicogenic_screen',
    description: 'Heavy screen time',
    condition: (answers) => hasAnyValue(answers, 'screen_time', ['heavy', 'extreme']),
    weights: [{ category: 'cervicogenic', weight: 0.3, reason: 'Extended screen time strains neck' }],
  },

  // DEHYDRATION
  {
    id: 'dehydration_intake',
    description: 'Low water intake',
    condition: (answers) => hasAnyValue(answers, 'water_intake', ['none', 'little']),
    weights: [{ category: 'dehydration', weight: 0.6, reason: 'Insufficient fluid intake' }],
  },
  {
    id: 'dehydration_alcohol',
    description: 'Recent alcohol consumption',
    condition: (answers) => hasAnyValue(answers, 'alcohol_recent', ['several', 'heavy']),
    weights: [
      { category: 'dehydration', weight: 0.4, reason: 'Alcohol causes dehydration' },
      { category: 'alcohol', weight: 0.6, reason: 'Alcohol directly causes headaches' },
    ],
  },

  // CAFFEINE
  {
    id: 'caffeine_withdrawal',
    description: 'Less caffeine than usual',
    condition: (answers) => hasAnyValue(answers, 'caffeine_today', ['none_unusual', 'less']),
    weights: [{ category: 'caffeine_withdrawal', weight: 0.7, reason: 'Reduced caffeine triggers withdrawal headache' }],
  },
  {
    id: 'caffeine_excess',
    description: 'More caffeine than usual',
    condition: (answers) => hasValue(answers, 'caffeine_today', 'more'),
    weights: [{ category: 'caffeine_excess', weight: 0.5, reason: 'Excess caffeine can cause headaches' }],
  },

  // HUNGER
  {
    id: 'hunger_long',
    description: 'Long time since eating',
    condition: (answers) => hasAnyValue(answers, 'last_meal', ['4_8h', 'over_8h', 'cant_remember']),
    weights: [{ category: 'hunger', weight: 0.6, reason: 'Low blood sugar from not eating' }],
  },

  // EYE STRAIN
  {
    id: 'eye_strain_location',
    description: 'Pain behind eyes',
    condition: (answers) => hasValue(answers, 'location', 'behind_eyes'),
    weights: [{ category: 'eye_strain', weight: 0.4, reason: 'Location suggests eye strain' }],
  },
  {
    id: 'eye_strain_screen',
    description: 'Heavy screen time + eye location',
    condition: (answers) => 
      hasAnyValue(answers, 'screen_time', ['heavy', 'extreme']) && 
      hasValue(answers, 'location', 'behind_eyes'),
    weights: [{ category: 'eye_strain', weight: 0.6, reason: 'Screen time with eye pain indicates strain' }],
  },

  // SLEEP DEPRIVATION
  {
    id: 'sleep_poor',
    description: 'Poor sleep',
    condition: (answers) => hasAnyValue(answers, 'sleep_last_night', ['poor', 'very_little', 'none']),
    weights: [{ category: 'sleep_deprivation', weight: 0.5, reason: 'Lack of sleep triggers headaches' }],
  },
  {
    id: 'sleep_woke_with',
    description: 'Woke up with headache after poor sleep',
    condition: (answers) => 
      hasValue(answers, 'onset', 'woke_with') && 
      hasAnyValue(answers, 'sleep_last_night', ['poor', 'very_little', 'none']),
    weights: [{ category: 'sleep_deprivation', weight: 0.7, reason: 'Waking with headache after poor sleep' }],
  },

  // SINUS
  {
    id: 'sinus_symptoms',
    description: 'Sinus symptoms present',
    condition: (answers) => {
      const symptoms = getAnswer(answers, 'sinus_symptoms');
      if (!Array.isArray(symptoms)) return false;
      return symptoms.some(s => s !== 'none');
    },
    weights: [{ category: 'sinus', weight: 0.5, reason: 'Sinus symptoms present' }],
  },
  {
    id: 'sinus_location',
    description: 'Face/sinus location with symptoms',
    condition: (answers) => {
      const hasFaceLocation = hasValue(answers, 'location', 'face');
      const symptoms = getAnswer(answers, 'sinus_symptoms');
      if (!Array.isArray(symptoms)) return false;
      return hasFaceLocation && symptoms.some(s => s !== 'none');
    },
    weights: [{ category: 'sinus', weight: 0.6, reason: 'Face pain with sinus symptoms' }],
  },

  // MIGRAINE
  {
    id: 'migraine_quality',
    description: 'Throbbing unilateral pain',
    condition: (answers) => 
      hasValue(answers, 'pain_quality', 'throbbing') && 
      hasValue(answers, 'location', 'one_side'),
    weights: [{ category: 'migraine', weight: 0.5, reason: 'Throbbing one-sided pain typical of migraine' }],
  },
  {
    id: 'migraine_sensitivity',
    description: 'Light and sound sensitivity',
    condition: (answers) => hasValue(answers, 'light_sound_sensitivity', 'both'),
    weights: [{ category: 'migraine', weight: 0.5, reason: 'Photophobia and phonophobia suggest migraine' }],
  },
  {
    id: 'migraine_nausea',
    description: 'Significant nausea',
    condition: (answers) => hasValue(answers, 'nausea', 'yes_severe'),
    weights: [{ category: 'migraine', weight: 0.4, reason: 'Nausea commonly accompanies migraine' }],
  },
  {
    id: 'migraine_cluster',
    description: 'Multiple migraine indicators',
    condition: (answers) => {
      let count = 0;
      if (hasValue(answers, 'pain_quality', 'throbbing')) count++;
      if (hasValue(answers, 'location', 'one_side')) count++;
      if (hasAnyValue(answers, 'light_sound_sensitivity', ['both', 'light_only'])) count++;
      if (hasAnyValue(answers, 'nausea', ['yes_severe', 'mild'])) count++;
      return count >= 3;
    },
    weights: [{ category: 'migraine', weight: 0.7, reason: 'Multiple migraine criteria met' }],
  },

  // WEATHER
  {
    id: 'weather_change',
    description: 'Recent weather change',
    condition: (answers) => hasValue(answers, 'weather_change', 'yes'),
    weights: [{ category: 'weather', weight: 0.3, reason: 'Barometric pressure changes trigger headaches' }],
  },

  // MEDICATION OVERUSE
  {
    id: 'medication_overuse',
    description: 'Frequent pain medication use',
    condition: (answers) => hasAnyValue(answers, 'medication_frequency', ['frequently', 'daily']),
    weights: [{ category: 'medication_overuse', weight: 0.6, reason: 'Frequent medication use can cause rebound headaches' }],
  },
];

// ============================================================================
// REMEDIES
// ============================================================================

export const remedies: Record<HeadacheCategory, Remedy[]> = {
  tension: [
    {
      id: 'tension_stretches',
      title: 'Neck and Shoulder Stretches',
      description: 'Release muscle tension with targeted stretches',
      timeToEffect: '5-15 minutes',
      steps: [
        'Chin tucks: Pull chin straight back, hold 5 seconds, repeat 10x',
        'Neck rolls: Slowly roll head in circles, 5 each direction',
        'Shoulder shrugs: Raise shoulders to ears, hold 5 seconds, release',
        'Upper trap stretch: Tilt ear to shoulder, hold 30 seconds each side',
      ],
      category: 'immediate',
    },
    {
      id: 'tension_heat',
      title: 'Apply Heat',
      description: 'Relax tense muscles with warmth',
      timeToEffect: '10-20 minutes',
      steps: [
        'Apply heating pad or warm towel to back of neck',
        'Take a hot shower, letting water hit your neck and shoulders',
        'Use a microwaveable heat wrap',
      ],
      category: 'immediate',
    },
    {
      id: 'tension_suboccipital',
      title: 'Suboccipital Release',
      description: 'Target the muscles at the base of your skull',
      timeToEffect: '5-10 minutes',
      steps: [
        'Lie on your back',
        'Place two tennis balls or your fists at the base of your skull',
        'Let your head rest on them with gentle pressure',
        'Stay for 2-3 minutes, breathing deeply',
      ],
      category: 'immediate',
    },
    {
      id: 'tension_break',
      title: 'Take a Screen Break',
      description: 'Give your eyes and posture a rest',
      timeToEffect: '20-30 minutes',
      steps: [
        'Step away from all screens for at least 20 minutes',
        'Look at distant objects to relax eye muscles',
        'Walk around to reset your posture',
      ],
      category: 'immediate',
    },
  ],

  cervicogenic: [
    {
      id: 'cervicogenic_stretches',
      title: 'Cervical Stretches',
      description: 'Mobilize your neck to relieve cervicogenic pain',
      timeToEffect: '10-20 minutes',
      steps: [
        'Chin tucks: 10 repetitions, hold 5 seconds each',
        'Gentle neck rotations: Look left, hold 10 seconds, then right',
        'Levator scapulae stretch: Look into armpit, gentle pull with hand',
      ],
      category: 'immediate',
    },
    {
      id: 'cervicogenic_posture',
      title: 'Posture Correction',
      description: 'Address the root cause',
      timeToEffect: 'Ongoing',
      steps: [
        'Adjust monitor to eye level',
        'Keep ears aligned over shoulders',
        'Set hourly reminders to check posture',
      ],
      category: 'preventive',
    },
  ],

  dehydration: [
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
      warnings: ['Don\'t chug large amounts at once - sip steadily'],
      category: 'immediate',
    },
  ],

  caffeine_withdrawal: [
    {
      id: 'caffeine_small_dose',
      title: 'Have a Small Amount of Caffeine',
      description: 'Ease withdrawal symptoms',
      timeToEffect: '15-30 minutes',
      steps: [
        'Have half your usual coffee/tea',
        'This should provide relief within 30 minutes',
      ],
      warnings: ['Don\'t overcompensate with extra caffeine'],
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
  ],

  caffeine_excess: [
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
  ],

  hunger: [
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
  ],

  eye_strain: [
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
        'Cup palms over closed eyes (don\'t press)',
        'Relax in darkness for 1-2 minutes',
      ],
      category: 'immediate',
    },
  ],

  sleep_deprivation: [
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
  ],

  sinus: [
    {
      id: 'sinus_steam',
      title: 'Steam Inhalation',
      description: 'Open up congested sinuses',
      timeToEffect: '10-15 minutes',
      steps: [
        'Boil water and pour into a bowl',
        'Drape towel over head, lean over bowl',
        'Breathe steam for 5-10 minutes',
        'Add eucalyptus oil if available',
      ],
      category: 'immediate',
    },
    {
      id: 'sinus_rinse',
      title: 'Nasal Rinse',
      description: 'Clear out sinuses',
      timeToEffect: '5-10 minutes',
      steps: [
        'Use a neti pot or saline spray',
        'Use distilled or previously boiled water only',
        'Repeat 1-2 times daily as needed',
      ],
      warnings: ['Never use tap water directly - must be sterile'],
      category: 'immediate',
    },
  ],

  migraine: [
    {
      id: 'migraine_dark',
      title: 'Dark, Quiet Room',
      description: 'Reduce sensory input',
      timeToEffect: 'Varies',
      steps: [
        'Go to a dark, quiet room',
        'Lie down if possible',
        'Apply cold compress to forehead or back of neck',
      ],
      category: 'immediate',
    },
    {
      id: 'migraine_cold',
      title: 'Cold Therapy',
      description: 'Constrict blood vessels',
      timeToEffect: '15-20 minutes',
      steps: [
        'Apply ice pack or cold compress to forehead',
        'Can also try back of neck',
        'Use for 15-20 minutes at a time',
      ],
      category: 'immediate',
    },
  ],

  stress: [
    {
      id: 'stress_breathing',
      title: 'Deep Breathing',
      description: 'Activate relaxation response',
      timeToEffect: '5-10 minutes',
      steps: [
        'Breathe in slowly for 4 counts',
        'Hold for 4 counts',
        'Exhale slowly for 6 counts',
        'Repeat for 5-10 cycles',
      ],
      category: 'immediate',
    },
    {
      id: 'stress_walk',
      title: 'Brief Walk',
      description: 'Physical reset',
      timeToEffect: '15-20 minutes',
      steps: [
        'Take a short walk outside if possible',
        'Focus on your surroundings, not your thoughts',
        'Even 10 minutes helps',
      ],
      category: 'immediate',
    },
  ],

  medication_overuse: [
    {
      id: 'moh_awareness',
      title: 'Medication Overuse Awareness',
      description: 'Understanding rebound headaches',
      timeToEffect: 'Long-term',
      steps: [
        'Track your medication use in a headache diary',
        'Aim to use acute medications fewer than 10 days per month',
        'Consider speaking with a doctor about preventive options',
      ],
      warnings: ['Do not stop medications abruptly without medical guidance'],
      category: 'preventive',
    },
  ],

  weather: [
    {
      id: 'weather_general',
      title: 'Weather-Related Relief',
      description: 'Manage barometric pressure headaches',
      timeToEffect: 'Varies',
      steps: [
        'Stay well-hydrated during weather changes',
        'Consider OTC pain relief if needed',
        'Rest in a comfortable environment',
      ],
      category: 'immediate',
    },
  ],

  alcohol: [
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
  ],

  unknown: [
    {
      id: 'unknown_general',
      title: 'General Relief Measures',
      description: 'Try these common remedies',
      timeToEffect: 'Varies',
      steps: [
        'Drink water',
        'Take a break from screens',
        'Rest in a comfortable position',
        'Consider OTC pain relief if appropriate',
      ],
      category: 'immediate',
    },
  ],

  red_flag: [],
};

// ============================================================================
// LEGAL DISCLAIMER
// ============================================================================

export const legalDisclaimer = `
IMPORTANT MEDICAL DISCLAIMER

This tool is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.

• This tool does not provide medical diagnoses
• Results are based solely on the information you provide
• Headaches can have many causes, some serious
• Always seek the advice of a qualified healthcare provider with any questions about a medical condition
• Never disregard professional medical advice or delay seeking it because of something you read here
• If you think you may have a medical emergency, call your doctor or emergency services immediately

By using this tool, you acknowledge that you understand and agree to these terms.
`.trim();

export const redFlagWarning = `
⚠️ SEEK IMMEDIATE MEDICAL ATTENTION

Based on your responses, you may be experiencing symptoms that require urgent medical evaluation.

Please contact emergency services (911) or go to your nearest emergency room if you are experiencing:
• The worst headache of your life with sudden onset
• Headache with fever and stiff neck
• Headache with confusion, weakness, vision changes, or difficulty speaking
• Headache following head injury

This is not a diagnosis. These symptoms can have many causes, but they should be evaluated by a medical professional promptly to rule out serious conditions.
`.trim();
