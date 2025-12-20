// ============================================================================
// Migraine, Sinus, and Other Remedies
// ============================================================================

import type { Remedy } from "../types";

export const migraineRemedies: Remedy[] = [
	{
		id: "migraine_dark",
		title: "Dark, Quiet Room",
		description: "Reduce sensory input",
		timeToEffect: "Varies",
		steps: [
			"Go to a dark, quiet room",
			"Lie down if possible",
			"Apply cold compress to forehead or back of neck",
		],
		category: "immediate",
	},
	{
		id: "migraine_cold",
		title: "Cold Therapy",
		description: "Constrict blood vessels",
		timeToEffect: "15-20 minutes",
		steps: [
			"Apply ice pack or cold compress to forehead",
			"Can also try back of neck",
			"Use for 15-20 minutes at a time",
		],
		category: "immediate",
	},
];

export const sinusRemedies: Remedy[] = [
	{
		id: "sinus_steam",
		title: "Steam Inhalation",
		description: "Open up congested sinuses",
		timeToEffect: "10-15 minutes",
		steps: [
			"Boil water and pour into a bowl",
			"Drape towel over head, lean over bowl",
			"Breathe steam for 5-10 minutes",
			"Add eucalyptus oil if available",
		],
		category: "immediate",
	},
	{
		id: "sinus_rinse",
		title: "Nasal Rinse",
		description: "Clear out sinuses",
		timeToEffect: "5-10 minutes",
		steps: [
			"Use a neti pot or saline spray",
			"Use distilled or previously boiled water only",
			"Repeat 1-2 times daily as needed",
		],
		warnings: ["Never use tap water directly - must be sterile"],
		category: "immediate",
	},
];

export const weatherRemedies: Remedy[] = [
	{
		id: "weather_general",
		title: "Weather-Related Relief",
		description: "Manage barometric pressure headaches",
		timeToEffect: "Varies",
		steps: [
			"Stay well-hydrated during weather changes",
			"Consider OTC pain relief if needed",
			"Rest in a comfortable environment",
		],
		category: "immediate",
	},
];

export const medicationOveruseRemedies: Remedy[] = [
	{
		id: "moh_awareness",
		title: "Medication Overuse Awareness",
		description: "Understanding rebound headaches",
		timeToEffect: "Long-term",
		steps: [
			"Track your medication use in a headache diary",
			"Aim to use acute medications fewer than 10 days per month",
			"Consider speaking with a doctor about preventive options",
		],
		warnings: ["Do not stop medications abruptly without medical guidance"],
		category: "preventive",
	},
];

export const unknownRemedies: Remedy[] = [
	{
		id: "unknown_general",
		title: "General Relief Measures",
		description: "Try these common remedies",
		timeToEffect: "Varies",
		steps: [
			"Drink water",
			"Take a break from screens",
			"Rest in a comfortable position",
			"Consider OTC pain relief if appropriate",
		],
		category: "immediate",
	},
];
