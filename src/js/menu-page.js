import '../css/main.css';
import { initNav } from './nav.js';
import { initMenu } from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try { initNav(); } catch (e) { console.error('[nav]', e); }
  try { initMenu(); } catch (e) { console.error('[menu]', e); }
});
