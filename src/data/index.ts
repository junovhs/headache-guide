// ============================================================================
// Data Module - Aggregated Exports
// ============================================================================

import type {
	DiagnosticRule,
	HeadacheCategory,
	Question,
	Remedy,
} from "../types";
import {
	locationQuestions,
	onsetQuestions,
	qualityQuestions,
} from "./questions-core";
import { lifestyleQuestions } from "./questions-lifestyle";
// Questions
import { redFlagQuestions } from "./questions-redflag";
import { triggerQuestions } from "./questions-triggers";
import {
	alcoholRemedies,
	caffeineExcessRemedies,
	caffeineRemedies,
	dehydrationRemedies,
	eyeStrainRemedies,
	hungerRemedies,
	sleepRemedies,
} from "./remedies-lifestyle";
import {
	medicationOveruseRemedies,
	migraineRemedies,
	sinusRemedies,
	unknownRemedies,
	weatherRemedies,
} from "./remedies-other";
// Remedies
import {
	cervicogenicRemedies,
	stressRemedies,
	tensionRemedies,
} from "./remedies-tension";
import {
	caffeineRules,
	dehydrationRules,
	eyeStrainRules,
	hungerRules,
	sleepRules,
} from "./rules-lifestyle";
import {
	migraineRules,
	otherRules,
	redFlagRules,
	sinusRules,
} from "./rules-other";
// Rules
import { cervicogenicRules, tensionRules } from "./rules-tension";

export { getAnswer, hasAnyValue, hasValue } from "./answer-utils";
// Disclaimers
export { legalDisclaimer, redFlagWarning } from "./disclaimers";

// Aggregated questions in order
export const questions: Question[] = [
	...redFlagQuestions,
	...onsetQuestions,
	...locationQuestions,
	...qualityQuestions,
	...lifestyleQuestions,
	...triggerQuestions,
];

// Aggregated diagnostic rules
export const diagnosticRules: DiagnosticRule[] = [
	...redFlagRules,
	...tensionRules,
	...cervicogenicRules,
	...dehydrationRules,
	...caffeineRules,
	...hungerRules,
	...sleepRules,
	...eyeStrainRules,
	...migraineRules,
	...sinusRules,
	...otherRules,
];

// Remedies mapped by category
export const remedies: Record<HeadacheCategory, Remedy[]> = {
	tension: tensionRemedies,
	cervicogenic: cervicogenicRemedies,
	stress: stressRemedies,
	dehydration: dehydrationRemedies,
	caffeine_withdrawal: caffeineRemedies,
	caffeine_excess: caffeineExcessRemedies,
	hunger: hungerRemedies,
	eye_strain: eyeStrainRemedies,
	sleep_deprivation: sleepRemedies,
	alcohol: alcoholRemedies,
	migraine: migraineRemedies,
	sinus: sinusRemedies,
	weather: weatherRemedies,
	medication_overuse: medicationOveruseRemedies,
	unknown: unknownRemedies,
	red_flag: [],
};
