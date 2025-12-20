// ============================================================================
// Emergency Result Screen
// ============================================================================

import type { DiagnosticResult } from "../types";
import { el } from "./elements";

export function renderEmergencyResult(
	container: HTMLElement,
	result: DiagnosticResult,
	onReset: () => void,
): void {
	const emergency = el("div", { className: "emergency-container" });

	emergency.appendChild(el("div", { className: "emergency-icon", text: "⚠️" }));
	emergency.appendChild(
		el("h1", { className: "emergency-title", text: "Seek Medical Attention" }),
	);

	const message = el("div", { className: "emergency-message" });
	message.appendChild(
		el("p", {
			text: "Based on your responses, you may be experiencing symptoms that require prompt medical evaluation.",
		}),
	);

	if (result.redFlags.length > 0) {
		message.appendChild(createRedFlagsList(result.redFlags));
	}
	emergency.appendChild(message);

	emergency.appendChild(createEmergencyActions());
	emergency.appendChild(createEmergencyDisclaimer());
	emergency.appendChild(
		el("button", {
			className: "btn btn-secondary",
			text: "Start Over",
			onClick: onReset,
		}),
	);

	container.appendChild(emergency);
}

function createRedFlagsList(redFlags: string[]): HTMLElement {
	const flags = el("div", { className: "red-flags-list" });
	flags.appendChild(el("h3", { text: "Concerning symptoms:" }));

	const list = el("ul");
	for (const flag of redFlags) {
		list.appendChild(el("li", { text: flag }));
	}
	flags.appendChild(list);

	return flags;
}

function createEmergencyActions(): HTMLElement {
	const actions = el("div", { className: "emergency-actions" });
	actions.appendChild(
		el("p", {
			className: "emergency-instruction",
			html: `
        <strong>If symptoms are severe:</strong> Call 911 or go to the nearest emergency room.<br><br>
        <strong>If symptoms are mild but concerning:</strong> Contact your doctor or visit urgent care today.
      `,
		}),
	);
	return actions;
}

function createEmergencyDisclaimer(): HTMLElement {
	const disclaimer = el("div", { className: "emergency-disclaimer" });
	disclaimer.appendChild(
		el("p", {
			text: "This is not a diagnosis. Many conditions can cause these symptoms, and most are not emergencies. However, these symptoms should be evaluated by a healthcare professional to rule out serious conditions.",
		}),
	);
	return disclaimer;
}
