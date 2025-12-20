// ============================================================================
// Question Option Renderers
// ============================================================================

import type { Question, Answer } from '../types';
import { el } from './elements';

export function renderSingleOptions(
  container: HTMLElement,
  question: Question,
  currentAnswer: Answer | undefined,
  onAnswer: (answer: Answer) => void
): void {
  const options = question.options || [];

  for (const option of options) {
    const isSelected = currentAnswer?.value === option.value;
    const optionEl = el('button', {
      className: `option-btn ${isSelected ? 'selected' : ''}`,
      onClick: () => {
        onAnswer({
          questionId: question.id,
          value: option.value,
          timestamp: Date.now(),
        });
      },
    });

    if (option.emoji) {
      optionEl.appendChild(el('span', { className: 'option-emoji', text: option.emoji }));
    }
    optionEl.appendChild(el('span', { className: 'option-label', text: option.label }));
    container.appendChild(optionEl);
  }
}

export function renderMultipleOptions(
  container: HTMLElement,
  question: Question,
  currentAnswer: Answer | undefined,
  onAnswer: (answer: Answer) => void
): void {
  const options = question.options || [];
  const selectedValues: string[] = Array.isArray(currentAnswer?.value)
    ? (currentAnswer.value as string[])
    : [];

  const wrapper = el('div', { className: 'multi-options-wrapper' });

  for (const option of options) {
    const isSelected = selectedValues.includes(option.value);
    const optionEl = createMultiOption(option, isSelected, selectedValues, question.id, onAnswer);
    wrapper.appendChild(optionEl);
  }

  container.appendChild(wrapper);
  container.appendChild(createContinueButton(selectedValues, question.id, onAnswer));
}

function createMultiOption(
  option: { value: string; label: string; emoji?: string },
  isSelected: boolean,
  selectedValues: string[],
  questionId: string,
  onAnswer: (answer: Answer) => void
): HTMLElement {
  const optionEl = el('button', {
    className: `option-btn multi ${isSelected ? 'selected' : ''}`,
    onClick: () => {
      const newValues = computeNewSelection(option.value, isSelected, selectedValues);
      onAnswer({ questionId, value: newValues, timestamp: Date.now() });
    },
  });

  const checkbox = el('span', {
    className: `checkbox ${isSelected ? 'checked' : ''}`,
    text: isSelected ? '✓' : '',
  });
  optionEl.appendChild(checkbox);

  if (option.emoji) {
    optionEl.appendChild(el('span', { className: 'option-emoji', text: option.emoji }));
  }
  optionEl.appendChild(el('span', { className: 'option-label', text: option.label }));

  return optionEl;
}

function computeNewSelection(
  value: string,
  isSelected: boolean,
  currentValues: string[]
): string[] {
  if (value === 'none') return ['none'];

  const withoutNone = currentValues.filter((v) => v !== 'none');
  if (isSelected) {
    return withoutNone.filter((v) => v !== value);
  }
  return [...withoutNone, value];
}

function createContinueButton(
  selectedValues: string[],
  questionId: string,
  onAnswer: (answer: Answer) => void
): HTMLElement {
  const disabled = selectedValues.length === 0;
  return el('button', {
    className: `btn btn-primary ${disabled ? 'disabled' : ''}`,
    text: 'Continue →',
    attrs: disabled ? { disabled: 'true' } : {},
    onClick: () => {
      if (selectedValues.length > 0) {
        onAnswer({ questionId, value: selectedValues, timestamp: Date.now() });
      }
    },
  });
}

export function renderScaleOptions(
  container: HTMLElement,
  question: Question,
  currentAnswer: Answer | undefined,
  onAnswer: (answer: Answer) => void
): void {
  const min = question.min || 1;
  const max = question.max || 10;
  const currentValue = typeof currentAnswer?.value === 'number' ? currentAnswer.value : null;

  const wrapper = el('div', { className: 'scale-wrapper' });

  const labels = el('div', { className: 'scale-labels' });
  labels.appendChild(el('span', { text: 'Mild' }));
  labels.appendChild(el('span', { text: 'Severe' }));
  wrapper.appendChild(labels);

  const buttons = el('div', { className: 'scale-buttons' });
  for (let i = min; i <= max; i++) {
    const severity = i <= 3 ? 'low' : i <= 6 ? 'medium' : 'high';
    const isSelected = currentValue === i;
    buttons.appendChild(
      el('button', {
        className: `scale-btn ${isSelected ? 'selected' : ''} ${severity}`,
        text: String(i),
        onClick: () => onAnswer({ questionId: question.id, value: i, timestamp: Date.now() }),
      })
    );
  }
  wrapper.appendChild(buttons);

  container.appendChild(wrapper);
}
