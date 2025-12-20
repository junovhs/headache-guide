// ============================================================================
// Tension & Cervicogenic Remedies
// ============================================================================

import type { Remedy } from "../types";

export const tensionRemedies: Remedy[] = [
	{
		id: "tension_stretches",
		title: "Neck and Shoulder Stretches",
		description: "Release muscle tension with targeted stretches",
		timeToEffect: "5-15 minutes",
		steps: [
			"Chin tucks: Pull chin straight back, hold 5 seconds, repeat 10x",
			"Neck rolls: Slowly roll head in circles, 5 each direction",
			"Shoulder shrugs: Raise shoulders to ears, hold 5 seconds, release",
			"Upper trap stretch: Tilt ear to shoulder, hold 30 seconds each side",
		],
		category: "immediate",
	},
	{
		id: "tension_heat",
		title: "Apply Heat",
		description: "Relax tense muscles with warmth",
		timeToEffect: "10-20 minutes",
		steps: [
			"Apply heating pad or warm towel to back of neck",
			"Take a hot shower, letting water hit your neck and shoulders",
			"Use a microwaveable heat wrap",
		],
		category: "immediate",
	},
	{
		id: "tension_suboccipital",
		title: "Suboccipital Release",
		description: "Target the muscles at the base of your skull",
		timeToEffect: "5-10 minutes",
		steps: [
			"Lie on your back",
			"Place two tennis balls or your fists at the base of your skull",
			"Let your head rest on them with gentle pressure",
			"Stay for 2-3 minutes, breathing deeply",
		],
		category: "immediate",
	},
	{
		id: "tension_break",
		title: "Take a Screen Break",
		description: "Give your eyes and posture a rest",
		timeToEffect: "20-30 minutes",
		steps: [
			"Step away from all screens for at least 20 minutes",
			"Look at distant objects to relax eye muscles",
			"Walk around to reset your posture",
		],
		category: "immediate",
	},
];

export const cervicogenicRemedies: Remedy[] = [
	{
		id: "cervicogenic_stretches",
		title: "Cervical Stretches",
		description: "Mobilize your neck to relieve cervicogenic pain",
		timeToEffect: "10-20 minutes",
		steps: [
			"Chin tucks: 10 repetitions, hold 5 seconds each",
			"Gentle neck rotations: Look left, hold 10 seconds, then right",
			"Levator scapulae stretch: Look into armpit, gentle pull with hand",
		],
		category: "immediate",
	},
	{
		id: "cervicogenic_posture",
		title: "Posture Correction",
		description: "Address the root cause",
		timeToEffect: "Ongoing",
		steps: [
			"Adjust monitor to eye level",
			"Keep ears aligned over shoulders",
			"Set hourly reminders to check posture",
		],
		category: "preventive",
	},
];

export const stressRemedies: Remedy[] = [
	{
		id: "stress_breathing",
		title: "Deep Breathing",
		description: "Activate relaxation response",
		timeToEffect: "5-10 minutes",
		steps: [
			"Breathe in slowly for 4 counts",
			"Hold for 4 counts",
			"Exhale slowly for 6 counts",
			"Repeat for 5-10 cycles",
		],
		category: "immediate",
	},
	{
		id: "stress_walk",
		title: "Brief Walk",
		description: "Physical reset",
		timeToEffect: "15-20 minutes",
		steps: [
			"Take a short walk outside if possible",
			"Focus on your surroundings, not your thoughts",
			"Even 10 minutes helps",
		],
		category: "immediate",
	},
];
