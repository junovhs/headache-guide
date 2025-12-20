// ============================================================================
// HEADACHE.GUIDE - UI Module
// ============================================================================

import { legalDisclaimer, questions } from "./data";
import { getCategoryDescription, getCategoryLabel } from "./engine";
import type {
	Answer,
	AppState,
	DiagnosticResult,
	Question,
	QuestionOption,
	Remedy,
} from "./types";

/** DOM Element references */
interface DOMRefs {
	app: HTMLElement;
	screen: HTMLElement;
}

/** Get DOM references */
function getRefs(): DOMRefs {
	const app = document.getElementById("app");
	if (!app) throw new Error("App container not found");

	let screen = document.getElementById("screen");
	if (!screen) {
		screen = document.createElement("div");
		screen.id = "screen";
		app.appendChild(screen);
	}

	return { app, screen };
}

/** Clear and return the screen element */
function clearScreen(): HTMLElement {
	const { screen } = getRefs();
	screen.innerHTML = "";
	return screen;
}

/** Create an element with optional classes and content */
function el<K extends keyof HTMLElementTagNameMap>(
	tag: K,
	options?: {
		className?: string;
		text?: string;
		html?: string;
		attrs?: Record<string, string>;
		children?: HTMLElement[];
		onClick?: () => void;
	},
): HTMLElementTagNameMap[K] {
	const element = document.createElement(tag);

	if (options?.className) {
		element.className = options.className;
	}
	if (options?.text) {
		element.textContent = options.text;
	}
	if (options?.html) {
		element.innerHTML = options.html;
	}
	if (options?.attrs) {
		for (const [key, value] of Object.entries(options.attrs)) {
			element.setAttribute(key, value);
		}
	}
	if (options?.children) {
		for (const child of options.children) {
			element.appendChild(child);
		}
	}
	if (options?.onClick) {
		element.addEventListener("click", options.onClick);
	}

	return element;
}

// ============================================================================
// SCREEN RENDERERS
// ============================================================================

/** Render the welcome screen */
export function renderWelcome(onStart: () => void): void {
	const screen = clearScreen();
	screen.className = "screen welcome-screen";

	const container = el("div", { className: "welcome-container" });

	// Logo/Title
	const header = el("div", { className: "welcome-header" });
	const icon = el("div", { className: "welcome-icon", text: "🎯" });
	const title = el("h1", {
		className: "welcome-title",
		text: "headache.guide",
	});
	const subtitle = el("p", {
		className: "welcome-subtitle",
		text: "Find out what's causing your headache in under 2 minutes",
	});
	header.appendChild(icon);
	header.appendChild(title);
	header.appendChild(subtitle);

	// Features
	const features = el("div", { className: "welcome-features" });
	const featureItems = [
		{ icon: "⚡", text: "Quick assessment" },
		{ icon: "🎯", text: "Targeted remedies" },
		{ icon: "🔒", text: "Private & anonymous" },
	];
	for (const item of featureItems) {
		const feature = el("div", { className: "feature-item" });
		feature.appendChild(
			el("span", { className: "feature-icon", text: item.icon }),
		);
		feature.appendChild(
			el("span", { className: "feature-text", text: item.text }),
		);
		features.appendChild(feature);
	}

	// Start button
	const startBtn = el("button", {
		className: "btn btn-primary btn-large",
		text: "Start Assessment",
		onClick: onStart,
	});

	// Disclaimer
	const disclaimer = el("div", { className: "welcome-disclaimer" });
	const disclaimerToggle = el("button", {
		className: "disclaimer-toggle",
		text: "📋 Medical Disclaimer",
		onClick: () => {
			disclaimerContent.classList.toggle("expanded");
			disclaimerToggle.classList.toggle("active");
		},
	});
	const disclaimerContent = el("div", {
		className: "disclaimer-content",
		text: legalDisclaimer,
	});
	disclaimer.appendChild(disclaimerToggle);
	disclaimer.appendChild(disclaimerContent);

	container.appendChild(header);
	container.appendChild(features);
	container.appendChild(startBtn);
	container.appendChild(disclaimer);
	screen.appendChild(container);
}

/** Render a question */
export function renderQuestion(
	question: Question,
	currentIndex: number,
	totalQuestions: number,
	currentAnswer: Answer | undefined,
	onAnswer: (answer: Answer) => void,
	onBack: (() => void) | null,
): void {
	const screen = clearScreen();
	screen.className = "screen question-screen";

	const container = el("div", { className: "question-container" });

	// Progress bar
	const progress = el("div", { className: "progress-container" });
	const progressBar = el("div", { className: "progress-bar" });
	const progressFill = el("div", {
		className: "progress-fill",
		attrs: { style: `width: ${((currentIndex + 1) / totalQuestions) * 100}%` },
	});
	const progressText = el("span", {
		className: "progress-text",
		text: `${currentIndex + 1} of ${totalQuestions}`,
	});
	progressBar.appendChild(progressFill);
	progress.appendChild(progressBar);
	progress.appendChild(progressText);

	// Question text
	const questionHeader = el("div", { className: "question-header" });
	const questionText = el("h2", {
		className: "question-text",
		text: question.text,
	});
	questionHeader.appendChild(questionText);
	if (question.subtext) {
		const subtext = el("p", {
			className: "question-subtext",
			text: question.subtext,
		});
		questionHeader.appendChild(subtext);
	}

	// Options
	const optionsContainer = el("div", { className: "options-container" });

	if (question.type === "single" && question.options) {
		renderSingleOptions(optionsContainer, question, currentAnswer, onAnswer);
	} else if (question.type === "multiple" && question.options) {
		renderMultipleOptions(optionsContainer, question, currentAnswer, onAnswer);
	} else if (question.type === "scale") {
		renderScaleOptions(optionsContainer, question, currentAnswer, onAnswer);
	}

	// Navigation
	const nav = el("div", { className: "question-nav" });
	if (onBack) {
		const backBtn = el("button", {
			className: "btn btn-secondary",
			text: "← Back",
			onClick: onBack,
		});
		nav.appendChild(backBtn);
	}

	container.appendChild(progress);
	container.appendChild(questionHeader);
	container.appendChild(optionsContainer);
	container.appendChild(nav);
	screen.appendChild(container);
}

/** Render single-choice options */
function renderSingleOptions(
	container: HTMLElement,
	question: Question,
	currentAnswer: Answer | undefined,
	onAnswer: (answer: Answer) => void,
): void {
	const options = question.options || [];

	for (const option of options) {
		const isSelected = currentAnswer?.value === option.value;
		const optionEl = el("button", {
			className: `option-btn ${isSelected ? "selected" : ""}`,
			onClick: () => {
				onAnswer({
					questionId: question.id,
					value: option.value,
					timestamp: Date.now(),
				});
			},
		});

		if (option.emoji) {
			optionEl.appendChild(
				el("span", { className: "option-emoji", text: option.emoji }),
			);
		}
		optionEl.appendChild(
			el("span", { className: "option-label", text: option.label }),
		);

		container.appendChild(optionEl);
	}
}

/** Render multiple-choice options */
function renderMultipleOptions(
	container: HTMLElement,
	question: Question,
	currentAnswer: Answer | undefined,
	onAnswer: (answer: Answer) => void,
): void {
	const options = question.options || [];
	const selectedValues: string[] = Array.isArray(currentAnswer?.value)
		? (currentAnswer.value as string[])
		: [];

	const optionsWrapper = el("div", { className: "multi-options-wrapper" });

	for (const option of options) {
		const isSelected = selectedValues.includes(option.value);
		const optionEl = el("button", {
			className: `option-btn multi ${isSelected ? "selected" : ""}`,
			onClick: () => {
				let newValues: string[];

				// Handle "none" option
				if (option.value === "none") {
					newValues = ["none"];
				} else {
					// Remove 'none' if selecting something else
					const withoutNone = selectedValues.filter((v) => v !== "none");

					if (isSelected) {
						newValues = withoutNone.filter((v) => v !== option.value);
					} else {
						newValues = [...withoutNone, option.value];
					}
				}

				onAnswer({
					questionId: question.id,
					value: newValues,
					timestamp: Date.now(),
				});
			},
		});

		const checkbox = el("span", {
			className: `checkbox ${isSelected ? "checked" : ""}`,
			text: isSelected ? "✓" : "",
		});
		optionEl.appendChild(checkbox);

		if (option.emoji) {
			optionEl.appendChild(
				el("span", { className: "option-emoji", text: option.emoji }),
			);
		}
		optionEl.appendChild(
			el("span", { className: "option-label", text: option.label }),
		);

		optionsWrapper.appendChild(optionEl);
	}

	container.appendChild(optionsWrapper);

	// Continue button for multiple choice
	const continueBtn = el("button", {
		className: `btn btn-primary ${selectedValues.length === 0 ? "disabled" : ""}`,
		text: "Continue →",
		attrs: selectedValues.length === 0 ? { disabled: "true" } : {},
		onClick: () => {
			if (selectedValues.length > 0) {
				// Trigger next by re-answering (the parent will handle progression)
				onAnswer({
					questionId: question.id,
					value: selectedValues,
					timestamp: Date.now(),
				});
			}
		},
	});
	container.appendChild(continueBtn);
}

/** Render scale options (1-10) */
function renderScaleOptions(
	container: HTMLElement,
	question: Question,
	currentAnswer: Answer | undefined,
	onAnswer: (answer: Answer) => void,
): void {
	const min = question.min || 1;
	const max = question.max || 10;
	const currentValue =
		typeof currentAnswer?.value === "number" ? currentAnswer.value : null;

	const scaleWrapper = el("div", { className: "scale-wrapper" });

	// Labels
	const labels = el("div", { className: "scale-labels" });
	labels.appendChild(el("span", { text: "Mild" }));
	labels.appendChild(el("span", { text: "Severe" }));
	scaleWrapper.appendChild(labels);

	// Scale buttons
	const scaleButtons = el("div", { className: "scale-buttons" });
	for (let i = min; i <= max; i++) {
		const isSelected = currentValue === i;
		const btn = el("button", {
			className: `scale-btn ${isSelected ? "selected" : ""} ${i <= 3 ? "low" : i <= 6 ? "medium" : "high"}`,
			text: String(i),
			onClick: () => {
				onAnswer({
					questionId: question.id,
					value: i,
					timestamp: Date.now(),
				});
			},
		});
		scaleButtons.appendChild(btn);
	}
	scaleWrapper.appendChild(scaleButtons);

	container.appendChild(scaleWrapper);
}

/** Render the results screen */
export function renderResults(
	result: DiagnosticResult,
	onReset: () => void,
): void {
	const screen = clearScreen();
	screen.className = "screen results-screen";

	const container = el("div", { className: "results-container" });

	// Check for red flags first
	if (result.seekMedicalAttention) {
		renderEmergencyResult(container, result, onReset);
		screen.appendChild(container);
		return;
	}

	// Header
	const header = el("div", { className: "results-header" });
	const headerIcon = el("div", { className: "results-icon", text: "✓" });
	const headerTitle = el("h1", {
		className: "results-title",
		text: "Assessment Complete",
	});
	header.appendChild(headerIcon);
	header.appendChild(headerTitle);

	// Primary diagnosis
	const diagnosis = el("div", { className: "diagnosis-card" });
	const diagnosisLabel = el("div", {
		className: "diagnosis-label",
		text: "Most Likely Cause",
	});
	const diagnosisName = el("h2", {
		className: "diagnosis-name",
		text: getCategoryLabel(result.primaryCause),
	});
	const diagnosisConfidence = el("div", {
		className: "diagnosis-confidence",
		text: `${result.confidence}% confidence`,
	});
	const diagnosisDesc = el("p", {
		className: "diagnosis-description",
		text: getCategoryDescription(result.primaryCause),
	});
	diagnosis.appendChild(diagnosisLabel);
	diagnosis.appendChild(diagnosisName);
	diagnosis.appendChild(diagnosisConfidence);
	diagnosis.appendChild(diagnosisDesc);

	// Reasoning
	if (result.reasoning.length > 0) {
		const reasoning = el("div", { className: "reasoning-section" });
		const reasoningTitle = el("h3", { text: "Why we think this:" });
		reasoning.appendChild(reasoningTitle);
		for (const reason of result.reasoning) {
			reasoning.appendChild(el("p", { text: reason }));
		}
		diagnosis.appendChild(reasoning);
	}

	// Secondary causes
	if (result.secondaryCauses.length > 0) {
		const secondary = el("div", { className: "secondary-causes" });
		secondary.appendChild(el("h4", { text: "Contributing factors:" }));
		for (const cause of result.secondaryCauses) {
			const causeEl = el("div", { className: "secondary-cause" });
			causeEl.appendChild(
				el("span", {
					className: "secondary-name",
					text: getCategoryLabel(cause.cause),
				}),
			);
			causeEl.appendChild(
				el("span", {
					className: "secondary-confidence",
					text: `${cause.confidence}%`,
				}),
			);
			secondary.appendChild(causeEl);
		}
		diagnosis.appendChild(secondary);
	}

	// Remedies
	const remediesSection = el("div", { className: "remedies-section" });
	const remediesTitle = el("h2", {
		className: "remedies-title",
		text: "Recommended Actions",
	});
	remediesSection.appendChild(remediesTitle);

	const immediateRemedies = result.remedies.filter(
		(r) => r.category === "immediate",
	);
	const otherRemedies = result.remedies.filter(
		(r) => r.category !== "immediate",
	);

	if (immediateRemedies.length > 0) {
		remediesSection.appendChild(
			el("h3", { className: "remedy-category", text: "⚡ Do Now" }),
		);
		for (const remedy of immediateRemedies) {
			remediesSection.appendChild(renderRemedy(remedy));
		}
	}

	if (otherRemedies.length > 0) {
		remediesSection.appendChild(
			el("h3", { className: "remedy-category", text: "📋 Also Consider" }),
		);
		for (const remedy of otherRemedies) {
			remediesSection.appendChild(renderRemedy(remedy));
		}
	}

	// Disclaimer
	const disclaimer = el("div", { className: "results-disclaimer" });
	disclaimer.appendChild(el("h4", { text: "⚠️ Important" }));
	disclaimer.appendChild(el("p", { text: result.disclaimer }));

	// Reset button
	const actions = el("div", { className: "results-actions" });
	const resetBtn = el("button", {
		className: "btn btn-secondary",
		text: "Start Over",
		onClick: onReset,
	});
	actions.appendChild(resetBtn);

	container.appendChild(header);
	container.appendChild(diagnosis);
	container.appendChild(remediesSection);
	container.appendChild(disclaimer);
	container.appendChild(actions);
	screen.appendChild(container);
}

/** Render a single remedy card */
function renderRemedy(remedy: Remedy): HTMLElement {
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

/** Render emergency/red flag result */
function renderEmergencyResult(
	container: HTMLElement,
	result: DiagnosticResult,
	onReset: () => void,
): void {
	const emergency = el("div", { className: "emergency-container" });

	const icon = el("div", { className: "emergency-icon", text: "⚠️" });
	const title = el("h1", {
		className: "emergency-title",
		text: "Seek Medical Attention",
	});

	const message = el("div", { className: "emergency-message" });
	message.appendChild(
		el("p", {
			text: "Based on your responses, you may be experiencing symptoms that require prompt medical evaluation.",
		}),
	);

	if (result.redFlags.length > 0) {
		const flags = el("div", { className: "red-flags-list" });
		flags.appendChild(el("h3", { text: "Concerning symptoms:" }));
		const flagList = el("ul");
		for (const flag of result.redFlags) {
			flagList.appendChild(el("li", { text: flag }));
		}
		flags.appendChild(flagList);
		message.appendChild(flags);
	}

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

	const disclaimer = el("div", { className: "emergency-disclaimer" });
	disclaimer.appendChild(
		el("p", {
			text: "This is not a diagnosis. Many conditions can cause these symptoms, and most are not emergencies. However, these symptoms should be evaluated by a healthcare professional to rule out serious conditions.",
		}),
	);

	const resetBtn = el("button", {
		className: "btn btn-secondary",
		text: "Start Over",
		onClick: onReset,
	});

	emergency.appendChild(icon);
	emergency.appendChild(title);
	emergency.appendChild(message);
	emergency.appendChild(actions);
	emergency.appendChild(disclaimer);
	emergency.appendChild(resetBtn);

	container.appendChild(emergency);
}

/** Render loading state */
export function renderLoading(): void {
	const screen = clearScreen();
	screen.className = "screen loading-screen";

	const loader = el("div", { className: "loader" });
	const spinner = el("div", { className: "spinner" });
	const text = el("p", { text: "Analyzing your responses..." });

	loader.appendChild(spinner);
	loader.appendChild(text);
	screen.appendChild(loader);
}
