import '../css/main.css';
import { initNav } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try { initNav(); } catch (e) { console.error('[nav]', e); }
  initArtikelFilter();
});

function initArtikelFilter() {
  const filterBtns = document.querySelectorAll('.artikel-filter');
  const cards      = document.querySelectorAll('.artikel-card');
  const emptyState = document.getElementById('artikel-empty');

  if (!filterBtns.length) return;

  function applyFilter(activeBtn) {
    const filter = activeBtn.dataset.filter;

    // Show/hide cards
    let visible = 0;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.kategori === filter;
      card.hidden = !match;
      if (match) visible++;
    });

    // Toggle empty state
    if (emptyState) emptyState.classList.toggle('hidden', visible > 0);

    // Update button styles
    filterBtns.forEach(btn => {
      const isActive = btn === activeBtn;
      if (isActive) {
        btn.classList.remove('bg-gray-100', 'text-gray-700');
        btn.classList.add('bg-primary', 'text-white');
      } else {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
      }
    });
  }

  // Default: show all
  const defaultBtn = document.querySelector('.artikel-filter[data-filter="all"]');
  if (defaultBtn) applyFilter(defaultBtn);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn));
  });
}
