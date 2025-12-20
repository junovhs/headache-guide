// ============================================================================
// Trigger Factor Questions
// ============================================================================

import type { Question } from "../types";

export const triggerQuestions: Question[] = [
	{
		id: "neck_relief",
		text: "Does stretching or massaging your neck provide any relief?",
		type: "single",
		options: [
			{ value: "yes_helps", label: "Yes, it helps temporarily", emoji: "✓" },
			{ value: "no_change", label: "No change", emoji: "➖" },
			{ value: "makes_worse", label: "Makes it worse", emoji: "❌" },
			{ value: "havent_tried", label: "Haven't tried", emoji: "❓" },
		],
		required: true,
		category: "triggers",
	},
	{
		id: "posture_activity",
		text: "What were you doing before the headache started?",
		type: "multiple",
		options: [
			{ value: "desk_work", label: "Desk/computer work", emoji: "💼" },
			{ value: "phone", label: "Looking at phone", emoji: "📱" },
			{ value: "driving", label: "Driving", emoji: "🚗" },
			{ value: "reading", label: "Reading", emoji: "📖" },
			{ value: "physical", label: "Physical activity/exercise", emoji: "🏃" },
			{ value: "nothing_special", label: "Nothing particular", emoji: "🤷" },
		],
		required: true,
		category: "triggers",
	},
	{
		id: "sinus_symptoms",
		text: "Do you have any of these sinus-related symptoms?",
		type: "multiple",
		options: [
			{ value: "congestion", label: "Nasal congestion", emoji: "🤧" },
			{ value: "pressure_face", label: "Pressure in face/cheeks", emoji: "😷" },
			{ value: "runny", label: "Runny nose", emoji: "💧" },
			{ value: "post_nasal", label: "Post-nasal drip", emoji: "👃" },
			{ value: "none", label: "None of these", emoji: "✓" },
		],
		required: true,
		category: "triggers",
	},
	{
		id: "light_sound_sensitivity",
		text: "Are light or sound bothering you more than usual?",
		type: "single",
		options: [
			{ value: "both", label: "Yes, both light and sound", emoji: "🔆🔊" },
			{ value: "light_only", label: "Light only", emoji: "🔆" },
			{ value: "sound_only", label: "Sound only", emoji: "🔊" },
			{ value: "no", label: "No more than usual", emoji: "✓" },
		],
		required: true,
		category: "triggers",
	},
	{
		id: "nausea",
		text: "Are you feeling nauseous?",
		type: "single",
		options: [
			{ value: "yes_severe", label: "Yes, significantly", emoji: "🤢" },
			{ value: "mild", label: "Mildly", emoji: "😐" },
			{ value: "no", label: "No", emoji: "✓" },
		],
		required: true,
		category: "triggers",
	},
	{
		id: "stress_level",
		text: "How would you rate your stress level lately?",
		type: "single",
		options: [
			{ value: "low", label: "Low - feeling relaxed", emoji: "😌" },
			{
				value: "moderate",
				label: "Moderate - some things on my mind",
				emoji: "😐",
			},
			{ value: "high", label: "High - significant stress", emoji: "😰" },
			{ value: "extreme", label: "Extreme - overwhelmed", emoji: "😫" },
		],
		required: true,
		category: "triggers",
	},
	{
		id: "weather_change",
		text: "Has there been a significant weather or pressure change recently?",
		type: "single",
		options: [
			{ value: "yes", label: "Yes", emoji: "🌦️" },
			{ value: "no", label: "No", emoji: "☀️" },
			{ value: "unsure", label: "Not sure", emoji: "❓" },
		],
		required: true,
		category: "triggers",
	},
	{
		id: "medication_frequency",
		text: "How often do you take pain medication for headaches?",
		type: "single",
		options: [
			{
				value: "rarely",
				label: "Rarely (few times a month or less)",
				emoji: "💊",
			},
			{ value: "weekly", label: "1-2 times per week", emoji: "💊💊" },
			{ value: "frequently", label: "3+ times per week", emoji: "💊💊💊" },
			{ value: "daily", label: "Almost daily", emoji: "⚠️" },
		],
		required: true,
		category: "triggers",
	},
];
