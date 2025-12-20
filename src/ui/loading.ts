// ============================================================================
// Loading Screen
// ============================================================================

import { el, clearScreen } from './elements';

export function renderLoading(): void {
  const screen = clearScreen();
  screen.className = 'screen loading-screen';

  const loader = el('div', { className: 'loader' });
  loader.appendChild(el('div', { className: 'spinner' }));
  loader.appendChild(el('p', { text: 'Analyzing your responses...' }));

  screen.appendChild(loader);
}
