// ============================================================================
// Welcome Screen
// ============================================================================

import { legalDisclaimer } from "../data";
import { clearScreen, el } from "./elements";

function createHeader(): HTMLElement {
	const header = el("div", { className: "welcome-header" });
	header.appendChild(el("div", { className: "welcome-icon", text: "🎯" }));
	header.appendChild(
		el("h1", { className: "welcome-title", text: "headache.guide" }),
	);
	header.appendChild(
		el("p", {
			className: "welcome-subtitle",
			text: "Find out what's causing your headache in under 2 minutes",
		}),
	);
	return header;
}

function createFeatures(): HTMLElement {
	const features = el("div", { className: "welcome-features" });
	const items = [
		{ icon: "⚡", text: "Quick assessment" },
		{ icon: "🎯", text: "Targeted remedies" },
		{ icon: "🔒", text: "Private & anonymous" },
	];

	for (const item of items) {
		const feature = el("div", { className: "feature-item" });
		feature.appendChild(
			el("span", { className: "feature-icon", text: item.icon }),
		);
		feature.appendChild(
			el("span", { className: "feature-text", text: item.text }),
		);
		features.appendChild(feature);
	}

	return features;
}

function createDisclaimer(): HTMLElement {
	const disclaimer = el("div", { className: "welcome-disclaimer" });
	const content = el("div", {
		className: "disclaimer-content",
		text: legalDisclaimer,
	});

	const toggle = el("button", {
		className: "disclaimer-toggle",
		text: "📋 Medical Disclaimer",
		onClick: () => {
			content.classList.toggle("expanded");
			toggle.classList.toggle("active");
		},
	});

	disclaimer.appendChild(toggle);
	disclaimer.appendChild(content);
	return disclaimer;
}

export function renderWelcome(onStart: () => void): void {
	const screen = clearScreen();
	screen.className = "screen welcome-screen";

	const container = el("div", { className: "welcome-container" });

	container.appendChild(createHeader());
	container.appendChild(createFeatures());
	container.appendChild(
		el("button", {
			className: "btn btn-primary btn-large",
			text: "Start Assessment",
			onClick: onStart,
		}),
	);
	container.appendChild(createDisclaimer());

	screen.appendChild(container);
}
