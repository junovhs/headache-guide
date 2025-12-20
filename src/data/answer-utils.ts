// ============================================================================
// Answer Matching Utilities
// ============================================================================

import type { Answer } from '../types';

export const getAnswer = (
  answers: Map<string, Answer>,
  id: string
): string | string[] | number | null => {
  const answer = answers.get(id);
  return answer?.value ?? null;
};

export const hasValue = (
  answers: Map<string, Answer>,
  id: string,
  value: string
): boolean => {
  const answer = getAnswer(answers, id);
  if (Array.isArray(answer)) return answer.includes(value);
  return answer === value;
};

export const hasAnyValue = (
  answers: Map<string, Answer>,
  id: string,
  values: string[]
): boolean => {
  return values.some((v) => hasValue(answers, id, v));
};
