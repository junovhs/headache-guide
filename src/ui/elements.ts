// ============================================================================
// DOM Element Utilities
// ============================================================================

interface ElementOptions {
  className?: string;
  text?: string;
  html?: string;
  attrs?: Record<string, string>;
  children?: HTMLElement[];
  onClick?: () => void;
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: ElementOptions
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (options?.className) element.className = options.className;
  if (options?.text) element.textContent = options.text;
  if (options?.html) element.innerHTML = options.html;

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
    element.addEventListener('click', options.onClick);
  }

  return element;
}

export function getScreen(): HTMLElement {
  const app = document.getElementById('app');
  if (!app) throw new Error('App container not found');

  let screen = document.getElementById('screen');
  if (!screen) {
    screen = document.createElement('div');
    screen.id = 'screen';
    app.appendChild(screen);
  }

  return screen;
}

export function clearScreen(): HTMLElement {
  const screen = getScreen();
  screen.innerHTML = '';
  return screen;
}
