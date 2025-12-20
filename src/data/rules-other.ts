// ============================================================================
// Migraine, Sinus, and Other Diagnostic Rules
// ============================================================================

import type { Answer, DiagnosticRule } from "../types";
import { getAnswer, hasAnyValue, hasValue } from "./answer-utils";

export const migraineRules: DiagnosticRule[] = [
	{
		id: "migraine_quality",
		condition: (a) =>
			hasValue(a, "pain_quality", "throbbing") &&
			hasValue(a, "location", "one_side"),
		weights: [
			{
				category: "migraine",
				weight: 0.5,
				reason: "Throbbing one-sided pain typical of migraine",
			},
		],
	},
	{
		id: "migraine_sensitivity",
		condition: (a) => hasValue(a, "light_sound_sensitivity", "both"),
		weights: [
			{
				category: "migraine",
				weight: 0.5,
				reason: "Photophobia and phonophobia suggest migraine",
			},
		],
	},
	{
		id: "migraine_nausea",
		condition: (a) => hasValue(a, "nausea", "yes_severe"),
		weights: [
			{
				category: "migraine",
				weight: 0.4,
				reason: "Nausea commonly accompanies migraine",
			},
		],
	},
	{
		id: "migraine_cluster",
		condition: (a) => countMigraineIndicators(a) >= 3,
		weights: [
			{
				category: "migraine",
				weight: 0.7,
				reason: "Multiple migraine criteria met",
			},
		],
	},
];

function countMigraineIndicators(answers: Map<string, Answer>): number {
	let count = 0;
	if (hasValue(answers, "pain_quality", "throbbing")) count++;
	if (hasValue(answers, "location", "one_side")) count++;
	if (hasAnyValue(answers, "light_sound_sensitivity", ["both", "light_only"]))
		count++;
	if (hasAnyValue(answers, "nausea", ["yes_severe", "mild"])) count++;
	return count;
}

export const sinusRules: DiagnosticRule[] = [
	{
		id: "sinus_symptoms",
		condition: (a) => {
			const symptoms = getAnswer(a, "sinus_symptoms");
			if (!Array.isArray(symptoms)) return false;
			return symptoms.some((s) => s !== "none");
		},
		weights: [
			{ category: "sinus", weight: 0.5, reason: "Sinus symptoms present" },
		],
	},
	{
		id: "sinus_location",
		condition: (a) => {
			const hasFace = hasValue(a, "location", "face");
			const symptoms = getAnswer(a, "sinus_symptoms");
			if (!Array.isArray(symptoms)) return false;
			return hasFace && symptoms.some((s) => s !== "none");
		},
		weights: [
			{
				category: "sinus",
				weight: 0.6,
				reason: "Face pain with sinus symptoms",
			},
		],
	},
];

export const otherRules: DiagnosticRule[] = [
	{
		id: "weather_change",
		condition: (a) => hasValue(a, "weather_change", "yes"),
		weights: [
			{
				category: "weather",
				weight: 0.3,
				reason: "Barometric pressure changes trigger headaches",
			},
		],
	},
	{
		id: "medication_overuse",
		condition: (a) =>
			hasAnyValue(a, "medication_frequency", ["frequently", "daily"]),
		weights: [
			{
				category: "medication_overuse",
				weight: 0.6,
				reason: "Frequent medication use can cause rebound headaches",
			},
		],
	},
];

export const redFlagRules: DiagnosticRule[] = [
	{
		id: "thunderclap",
		condition: (a) => hasValue(a, "red_flag_sudden", "yes"),
		weights: [
			{
				category: "red_flag",
				weight: 1.0,
				reason: "Sudden severe headache requires immediate evaluation",
			},
		],
	},
	{
		id: "emergency_symptoms",
		condition: (a) => {
			const symptoms = getAnswer(a, "red_flag_symptoms");
			if (!Array.isArray(symptoms)) return false;
			return symptoms.some((s) => s !== "none");
		},
		weights: [
			{
				category: "red_flag",
				weight: 1.0,
				reason: "Symptoms suggest possible serious condition",
			},
		],
	},
];
