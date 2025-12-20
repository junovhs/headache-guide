// ============================================================================
// HEADACHE.GUIDE - Main Application Entry Point
// ============================================================================

import type { AppState, Answer, DiagnosticSession } from './types';
import { questions } from './data';
import { runDiagnosis } from './engine';
import {
  renderWelcome,
  renderQuestion,
  renderResults,
  renderLoading,
} from './ui';

// ============================================================================
// APPLICATION STATE
// ============================================================================

let state: AppState = {
  currentScreen: 'welcome',
  session: null,
  isLoading: false,
  error: null,
};

/** Generate a unique session ID */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/** Create a new diagnostic session */
function createSession(): DiagnosticSession {
  return {
    id: generateSessionId(),
    startedAt: Date.now(),
    answers: [],
    currentQuestionIndex: 0,
    completed: false,
    result: undefined,
  };
}

/** Get the current answer for a question */
function getCurrentAnswer(questionId: string): Answer | undefined {
  if (!state.session) return undefined;
  return state.session.answers.find(a => a.questionId === questionId);
}

/** Filter questions based on red flag answers */
function getApplicableQuestions(): typeof questions {
  // Always show all questions for now
  // Could be enhanced to skip irrelevant questions based on previous answers
  return questions;
}

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/** Start a new session */
function startSession(): void {
  state = {
    currentScreen: 'questions',
    session: createSession(),
    isLoading: false,
    error: null,
  };
  render();
}

/** Handle answering a question */
function answerQuestion(answer: Answer): void {
  if (!state.session) return;

  const applicableQuestions = getApplicableQuestions();
  const currentQuestion = applicableQuestions[state.session.currentQuestionIndex];
  
  // Update or add the answer
  const existingIndex = state.session.answers.findIndex(
    a => a.questionId === answer.questionId
  );
  
  if (existingIndex >= 0) {
    state.session.answers[existingIndex] = answer;
  } else {
    state.session.answers.push(answer);
  }

  // For multiple choice, only advance if this is the "continue" action
  // (when the answer hasn't changed, it means user clicked continue)
  if (currentQuestion.type === 'multiple') {
    const existingAnswer = getCurrentAnswer(answer.questionId);
    const isContinue = existingAnswer && 
      JSON.stringify(existingAnswer.value) === JSON.stringify(answer.value);
    
    if (!isContinue) {
      // Just updating selection, don't advance
      render();
      return;
    }
  }

  // Check for red flags after first two questions
  if (state.session.currentQuestionIndex === 1) {
    const hasRedFlags = checkForRedFlags();
    if (hasRedFlags) {
      completeSession();
      return;
    }
  }

  // Advance to next question or complete
  if (state.session.currentQuestionIndex < applicableQuestions.length - 1) {
    state.session.currentQuestionIndex++;
    render();
  } else {
    completeSession();
  }
}

/** Check if red flags are present */
function checkForRedFlags(): boolean {
  if (!state.session) return false;
  
  const suddenAnswer = state.session.answers.find(a => a.questionId === 'red_flag_sudden');
  if (suddenAnswer?.value === 'yes') return true;
  
  const symptomsAnswer = state.session.answers.find(a => a.questionId === 'red_flag_symptoms');
  if (Array.isArray(symptomsAnswer?.value)) {
    const hasFlags = symptomsAnswer.value.some((v: string) => v !== 'none');
    if (hasFlags) return true;
  }
  
  return false;
}

/** Go back to previous question */
function goBack(): void {
  if (!state.session || state.session.currentQuestionIndex === 0) return;
  
  state.session.currentQuestionIndex--;
  render();
}

/** Complete the session and show results */
function completeSession(): void {
  if (!state.session) return;

  state.isLoading = true;
  render();

  // Simulate brief processing time for UX
  setTimeout(() => {
    if (!state.session) return;
    
    const result = runDiagnosis(state.session.answers);
    state.session.completed = true;
    state.session.result = result;
    state.currentScreen = 'results';
    state.isLoading = false;
    render();
  }, 800);
}

/** Reset to welcome screen */
function reset(): void {
  state = {
    currentScreen: 'welcome',
    session: null,
    isLoading: false,
    error: null,
  };
  render();
}

// ============================================================================
// RENDERING
// ============================================================================

/** Main render function */
function render(): void {
  if (state.isLoading) {
    renderLoading();
    return;
  }

  switch (state.currentScreen) {
    case 'welcome':
      renderWelcome(startSession);
      break;

    case 'questions':
      if (state.session) {
        const applicableQuestions = getApplicableQuestions();
        const currentQuestion = applicableQuestions[state.session.currentQuestionIndex];
        const currentAnswer = getCurrentAnswer(currentQuestion.id);
        
        renderQuestion(
          currentQuestion,
          state.session.currentQuestionIndex,
          applicableQuestions.length,
          currentAnswer,
          answerQuestion,
          state.session.currentQuestionIndex > 0 ? goBack : null,
        );
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
// INITIALIZATION
// ============================================================================

/** Initialize the application */
export function init(): void {
  // Ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      render();
    });
  } else {
    render();
  }
}

// Auto-initialize
init();
