// ============================================================================
// HEADACHE.GUIDE - Main Application
// ============================================================================

import type { Answer, DiagnosticSession } from './types';
import { questions } from './data';
import { runDiagnosis } from './engine';
import { renderWelcome, renderQuestion, renderResults, renderLoading } from './ui';

// ============================================================================
// State
// ============================================================================

interface AppState {
  screen: 'welcome' | 'questions' | 'results';
  session: DiagnosticSession | null;
  isLoading: boolean;
}

let state: AppState = {
  screen: 'welcome',
  session: null,
  isLoading: false,
};

// ============================================================================
// Session Management
// ============================================================================

function createSession(): DiagnosticSession {
  return {
    id: `session_${Date.now()}`,
    startedAt: Date.now(),
    answers: [],
    currentQuestionIndex: 0,
    completed: false,
  };
}

function getCurrentAnswer(questionId: string): Answer | undefined {
  return state.session?.answers.find((a) => a.questionId === questionId);
}

function updateAnswer(answer: Answer): void {
  if (!state.session) return;

  const idx = state.session.answers.findIndex((a) => a.questionId === answer.questionId);
  if (idx >= 0) {
    state.session.answers[idx] = answer;
  } else {
    state.session.answers.push(answer);
  }
}

// ============================================================================
// Red Flag Detection
// ============================================================================

function hasRedFlags(): boolean {
  if (!state.session) return false;

  const sudden = state.session.answers.find((a) => a.questionId === 'red_flag_sudden');
  if (sudden?.value === 'yes') return true;

  const symptoms = state.session.answers.find((a) => a.questionId === 'red_flag_symptoms');
  if (Array.isArray(symptoms?.value)) {
    return symptoms.value.some((v: string) => v !== 'none');
  }

  return false;
}

// ============================================================================
// Actions
// ============================================================================

function startSession(): void {
  state = { screen: 'questions', session: createSession(), isLoading: false };
  render();
}

function goBack(): void {
  if (!state.session || state.session.currentQuestionIndex === 0) return;
  state.session.currentQuestionIndex--;
  render();
}

function reset(): void {
  state = { screen: 'welcome', session: null, isLoading: false };
  render();
}

function answerQuestion(answer: Answer): void {
  if (!state.session) return;

  const currentQ = questions[state.session.currentQuestionIndex];
  updateAnswer(answer);

  // For multiple choice, check if just updating selection
  if (currentQ.type === 'multiple') {
    const existing = getCurrentAnswer(answer.questionId);
    if (existing && JSON.stringify(existing.value) !== JSON.stringify(answer.value)) {
      render();
      return;
    }
  }

  // Check red flags after second question
  if (state.session.currentQuestionIndex === 1 && hasRedFlags()) {
    completeSession();
    return;
  }

  // Advance or complete
  if (state.session.currentQuestionIndex < questions.length - 1) {
    state.session.currentQuestionIndex++;
    render();
  } else {
    completeSession();
  }
}

function completeSession(): void {
  if (!state.session) return;

  state.isLoading = true;
  render();

  setTimeout(() => {
    if (!state.session) return;
    state.session.result = runDiagnosis(state.session.answers);
    state.session.completed = true;
    state.screen = 'results';
    state.isLoading = false;
    render();
  }, 800);
}

// ============================================================================
// Render
// ============================================================================

function render(): void {
  if (state.isLoading) {
    renderLoading();
    return;
  }

  switch (state.screen) {
    case 'welcome':
      renderWelcome(startSession);
      break;

    case 'questions':
      if (state.session) {
        const q = questions[state.session.currentQuestionIndex];
        renderQuestion({
          question: q,
          currentIndex: state.session.currentQuestionIndex,
          totalQuestions: questions.length,
          currentAnswer: getCurrentAnswer(q.id),
          onAnswer: answerQuestion,
          onBack: state.session.currentQuestionIndex > 0 ? goBack : null,
        });
      }
      break;

    case 'results':
      if (state.session?.result) {
        renderResults(state.session.result, reset);
      }
      break;
  }
}

// ============================================================================
// Init
// ============================================================================

function init(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
}

init();
