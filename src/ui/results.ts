// ============================================================================
// Results Screen
// ============================================================================

import type { DiagnosticResult } from '../types';
import { el, clearScreen } from './elements';
import { getCategoryLabel, getCategoryDescription } from '../engine';
import { renderRemedy } from './remedy';
import { renderEmergencyResult } from './emergency';

export function renderResults(result: DiagnosticResult, onReset: () => void): void {
  const screen = clearScreen();
  screen.className = 'screen results-screen';

  const container = el('div', { className: 'results-container' });

  if (result.seekMedicalAttention) {
    renderEmergencyResult(container, result, onReset);
    screen.appendChild(container);
    return;
  }

  container.appendChild(createHeader());
  container.appendChild(createDiagnosisCard(result));
  container.appendChild(createRemediesSection(result));
  container.appendChild(createDisclaimer(result.disclaimer));
  container.appendChild(createActions(onReset));

  screen.appendChild(container);
}

function createHeader(): HTMLElement {
  const header = el('div', { className: 'results-header' });
  header.appendChild(el('div', { className: 'results-icon', text: '✓' }));
  header.appendChild(el('h1', { className: 'results-title', text: 'Assessment Complete' }));
  return header;
}

function createDiagnosisCard(result: DiagnosticResult): HTMLElement {
  const card = el('div', { className: 'diagnosis-card' });

  card.appendChild(el('div', { className: 'diagnosis-label', text: 'Most Likely Cause' }));
  card.appendChild(
    el('h2', { className: 'diagnosis-name', text: getCategoryLabel(result.primaryCause) })
  );
  card.appendChild(
    el('div', { className: 'diagnosis-confidence', text: `${result.confidence}% confidence` })
  );
  card.appendChild(
    el('p', {
      className: 'diagnosis-description',
      text: getCategoryDescription(result.primaryCause),
    })
  );

  if (result.reasoning.length > 0) {
    card.appendChild(createReasoningSection(result.reasoning));
  }

  if (result.secondaryCauses.length > 0) {
    card.appendChild(createSecondaryCauses(result.secondaryCauses));
  }

  return card;
}

function createReasoningSection(reasoning: string[]): HTMLElement {
  const section = el('div', { className: 'reasoning-section' });
  section.appendChild(el('h3', { text: 'Why we think this:' }));
  for (const reason of reasoning) {
    section.appendChild(el('p', { text: reason }));
  }
  return section;
}

function createSecondaryCauses(
  causes: Array<{ cause: string; confidence: number }>
): HTMLElement {
  const section = el('div', { className: 'secondary-causes' });
  section.appendChild(el('h4', { text: 'Contributing factors:' }));

  for (const cause of causes) {
    const causeEl = el('div', { className: 'secondary-cause' });
    causeEl.appendChild(
      el('span', { className: 'secondary-name', text: getCategoryLabel(cause.cause as any) })
    );
    causeEl.appendChild(
      el('span', { className: 'secondary-confidence', text: `${cause.confidence}%` })
    );
    section.appendChild(causeEl);
  }

  return section;
}

function createRemediesSection(result: DiagnosticResult): HTMLElement {
  const section = el('div', { className: 'remedies-section' });
  section.appendChild(el('h2', { className: 'remedies-title', text: 'Recommended Actions' }));

  const immediate = result.remedies.filter((r) => r.category === 'immediate');
  const other = result.remedies.filter((r) => r.category !== 'immediate');

  if (immediate.length > 0) {
    section.appendChild(el('h3', { className: 'remedy-category', text: '⚡ Do Now' }));
    for (const remedy of immediate) {
      section.appendChild(renderRemedy(remedy));
    }
  }

  if (other.length > 0) {
    section.appendChild(el('h3', { className: 'remedy-category', text: '📋 Also Consider' }));
    for (const remedy of other) {
      section.appendChild(renderRemedy(remedy));
    }
  }

  return section;
}

function createDisclaimer(disclaimer: string): HTMLElement {
  const section = el('div', { className: 'results-disclaimer' });
  section.appendChild(el('h4', { text: '⚠️ Important' }));
  section.appendChild(el('p', { text: disclaimer }));
  return section;
}

function createActions(onReset: () => void): HTMLElement {
  const actions = el('div', { className: 'results-actions' });
  actions.appendChild(
    el('button', { className: 'btn btn-secondary', text: 'Start Over', onClick: onReset })
  );
  return actions;
}
