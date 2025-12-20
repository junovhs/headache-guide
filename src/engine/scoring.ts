// ============================================================================
// Diagnostic Scoring
// ============================================================================

import { diagnosticRules } from "../data";
import type { Answer, DiagnosticWeight, HeadacheCategory } from "../types";

export interface CategoryScore {
	score: number;
	reasons: string[];
}

export type CategoryScores = Record<string, CategoryScore>;

const ALL_CATEGORIES: HeadacheCategory[] = [
	"tension",
	"dehydration",
	"caffeine_withdrawal",
	"caffeine_excess",
	"hunger",
	"eye_strain",
	"sleep_deprivation",
	"sinus",
	"migraine",
	"cervicogenic",
	"stress",
	"medication_overuse",
	"weather",
	"alcohol",
	"unknown",
];

function initializeScores(): CategoryScores {
	const scores: CategoryScores = {};
	for (const cat of ALL_CATEGORIES) {
		scores[cat] = { score: 0, reasons: [] };
	}
	return scores;
}

function applyWeight(scores: CategoryScores, weight: DiagnosticWeight): void {
	if (weight.category === "red_flag") return;
	scores[weight.category].score += weight.weight;
	scores[weight.category].reasons.push(weight.reason);
}

export function calculateScores(answers: Map<string, Answer>): CategoryScores {
	const scores = initializeScores();

	for (const rule of diagnosticRules) {
		if (rule.condition(answers)) {
			for (const weight of rule.weights) {
				applyWeight(scores, weight);
			}
		}
	}

	return scores;
}

export interface RankedCause {
	category: HeadacheCategory;
	confidence: number;
}

export function rankCauses(scores: CategoryScores): {
	primary: RankedCause;
	secondary: RankedCause[];
} {
	const sorted = Object.entries(scores)
		.filter(([, data]) => data.score > 0)
		.sort((a, b) => b[1].score - a[1].score);

	if (sorted.length === 0) {
		return {
			primary: { category: "unknown", confidence: 50 },
			secondary: [],
		};
	}

	const totalScore = sorted.reduce((sum, [, data]) => sum + data.score, 0);
	const [primaryCat, primaryData] = sorted[0];
	const primaryConfidence = Math.min(
		95,
		(primaryData.score / totalScore) * 100 + 20,
	);

	const secondary = sorted
		.slice(1, 3)
		.filter(([, data]) => data.score > 0.2)
		.map(([cat, data]) => ({
			category: cat as HeadacheCategory,
			confidence: Math.min(80, (data.score / totalScore) * 100 + 10),
		}));

	return {
		primary: {
			category: primaryCat as HeadacheCategory,
			confidence: primaryConfidence,
		},
		secondary,
	};
}
