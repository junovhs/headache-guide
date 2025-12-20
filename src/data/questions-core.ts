// ============================================================================
// Onset, Location, and Quality Questions
// ============================================================================

import type { Question } from "../types";

export const onsetQuestions: Question[] = [
	{
		id: "onset",
		text: "When did this headache start?",
		type: "single",
		options: [
			{ value: "just_now", label: "Just now (within the hour)", emoji: "⏱️" },
			{ value: "few_hours", label: "A few hours ago", emoji: "🕐" },
			{ value: "this_morning", label: "This morning", emoji: "🌅" },
			{ value: "woke_with", label: "I woke up with it", emoji: "😴" },
			{ value: "yesterday", label: "Yesterday or longer", emoji: "📅" },
		],
		required: true,
		category: "onset",
	},
	{
		id: "onset_pattern",
		text: "How did it develop?",
		type: "single",
		options: [
			{ value: "gradual", label: "Slowly built up over time", emoji: "📈" },
			{ value: "sudden", label: "Came on quickly", emoji: "⚡" },
			{
				value: "constant",
				label: "Been constant since it started",
				emoji: "➡️",
			},
			{ value: "waves", label: "Comes and goes in waves", emoji: "🌊" },
		],
		required: true,
		category: "onset",
	},
];

export const locationQuestions: Question[] = [
	{
		id: "location",
		text: "Where is the pain?",
		subtext: "Select all areas that apply",
		type: "multiple",
		options: [
			{ value: "forehead", label: "Forehead", emoji: "🔼" },
			{ value: "temples", label: "Temples (sides)", emoji: "◀️▶️" },
			{ value: "behind_eyes", label: "Behind the eyes", emoji: "👀" },
			{ value: "top", label: "Top of head", emoji: "⬆️" },
			{ value: "back", label: "Back of head", emoji: "🔽" },
			{ value: "neck", label: "Base of skull / upper neck", emoji: "🦴" },
			{ value: "one_side", label: "One side only", emoji: "↔️" },
			{ value: "face", label: "Face / cheeks / sinuses", emoji: "😷" },
			{ value: "all_over", label: "All over", emoji: "🔴" },
		],
		required: true,
		category: "location",
	},
];

export const qualityQuestions: Question[] = [
	{
		id: "pain_quality",
		text: "What does the pain feel like?",
		type: "single",
		options: [
			{ value: "throbbing", label: "Throbbing / pulsing", emoji: "💓" },
			{ value: "pressure", label: "Pressure / squeezing", emoji: "🗜️" },
			{ value: "stabbing", label: "Stabbing / sharp", emoji: "🗡️" },
			{ value: "dull", label: "Dull ache", emoji: "😑" },
			{ value: "burning", label: "Burning", emoji: "🔥" },
			{
				value: "tight_band",
				label: "Like a tight band around head",
				emoji: "🎀",
			},
		],
		required: true,
		category: "quality",
	},
	{
		id: "pain_intensity",
		text: "How intense is the pain right now?",
		type: "scale",
		min: 1,
		max: 10,
		required: true,
		category: "quality",
	},
];
