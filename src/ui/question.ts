// ============================================================================
// Question Screen
// ============================================================================

import type { QuestionRenderOptions } from '../types';
import { el, clearScreen } from './elements';
import { renderSingleOptions, renderMultipleOptions, renderScaleOptions } from './options';

function createProgress(currentIndex: number, totalQuestions: number): HTMLElement {
  const progress = el('div', { className: 'progress-container' });
  const progressBar = el('div', { className: 'progress-bar' });
  const progressFill = el('div', {
    className: 'progress-fill',
    attrs: { style: `width: ${((currentIndex + 1) / totalQuestions) * 100}%` },
  });
  progressBar.appendChild(progressFill);
  progress.appendChild(progressBar);
  progress.appendChild(
    el('span', {
      className: 'progress-text',
      text: `${currentIndex + 1} of ${totalQuestions}`,
    })
  );
  return progress;
}

function createQuestionHeader(text: string, subtext?: string): HTMLElement {
  const header = el('div', { className: 'question-header' });
  header.appendChild(el('h2', { className: 'question-text', text }));
  if (subtext) {
    header.appendChild(el('p', { className: 'question-subtext', text: subtext }));
  }
  return header;
}

export function renderQuestion(opts: QuestionRenderOptions): void {
  const { question, currentIndex, totalQuestions, currentAnswer, onAnswer, onBack } = opts;

  const screen = clearScreen();
  screen.className = 'screen question-screen';

  const container = el('div', { className: 'question-container' });

  container.appendChild(createProgress(currentIndex, totalQuestions));
  container.appendChild(createQuestionHeader(question.text, question.subtext));

  const optionsContainer = el('div', { className: 'options-container' });

  if (question.type === 'single' && question.options) {
    renderSingleOptions(optionsContainer, question, currentAnswer, onAnswer);
  } else if (question.type === 'multiple' && question.options) {
    renderMultipleOptions(optionsContainer, question, currentAnswer, onAnswer);
  } else if (question.type === 'scale') {
    renderScaleOptions(optionsContainer, question, currentAnswer, onAnswer);
  }

  container.appendChild(optionsContainer);

  const nav = el('div', { className: 'question-nav' });
  if (onBack) {
    nav.appendChild(
      el('button', { className: 'btn btn-secondary', text: '← Back', onClick: onBack })
    );
  }
  container.appendChild(nav);

  screen.appendChild(container);
}
