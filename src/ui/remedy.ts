// ============================================================================
// Remedy Card Renderer
// ============================================================================

import type { Remedy } from "../types";
import { el } from "./elements";

export function renderRemedy(remedy: Remedy): HTMLElement {
	const card = el("div", { className: "remedy-card" });

	const header = el("div", { className: "remedy-header" });
	header.appendChild(
		el("h4", { className: "remedy-title", text: remedy.title }),
	);
	header.appendChild(
		el("span", { className: "remedy-time", text: `⏱️ ${remedy.timeToEffect}` }),
	);
	card.appendChild(header);

	card.appendChild(
		el("p", { className: "remedy-description", text: remedy.description }),
	);

	if (remedy.steps && remedy.steps.length > 0) {
		const steps = el("ol", { className: "remedy-steps" });
		for (const step of remedy.steps) {
			steps.appendChild(el("li", { text: step }));
		}
		card.appendChild(steps);
	}

	if (remedy.warnings && remedy.warnings.length > 0) {
		const warnings = el("div", { className: "remedy-warnings" });
		for (const warning of remedy.warnings) {
			warnings.appendChild(el("p", { text: `⚠️ ${warning}` }));
		}
		card.appendChild(warnings);
	}

	return card;
}
