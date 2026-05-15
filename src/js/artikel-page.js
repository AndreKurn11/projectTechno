import '../css/main.css';
import { initNav } from './nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try { initNav(); } catch (e) { console.error('[nav]', e); }

  await loadArtikelList();
});

async function loadArtikelList() {
  const grid      = document.getElementById('artikel-grid');
  const emptyEl   = document.getElementById('artikel-empty');
  const filterBtns = document.querySelectorAll('.artikel-filter');

  if (!grid) return;

  try {
    const res = await fetch('/src/data/articles.json');
    if (!res.ok) throw new Error('Gagal memuat artikel');
    const articles = await res.json();

    // Render semua cards
    grid.innerHTML = articles.map(a => renderCard(a)).join('');

    // Inisialisasi filter setelah cards dirender
    initFilter(filterBtns, grid, emptyEl);

  } catch (err) {
    console.error('[artikel-page]', err);
    grid.innerHTML = `
      <div class="col-span-3 text-center py-16 text-gray-400">
        <p class="text-lg font-semibold">Gagal memuat artikel. Coba refresh halaman.</p>
      </div>`;
  }
}

function renderCard(a) {
  const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

  return `
    <article class="artikel-card bg-white rounded-2xl overflow-hidden shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md" data-kategori="${a.kategori}">
      <img
        src="${a.gambar}"
        alt="${escapeHtml(a.gambarAlt)}"
        loading="lazy"
        width="600"
        height="400"
        class="w-full h-56 object-cover"
      />
      <div class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <span class="bg-accent/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">${escapeHtml(a.kategoriLabel)}</span>
          <span class="text-gray-400 text-xs">${escapeHtml(a.tanggal)}</span>
        </div>
        <h2 class="font-display text-xl font-bold mb-2 leading-snug">${escapeHtml(a.judul)}</h2>
        <p class="text-gray-600 text-sm leading-relaxed mb-4">${escapeHtml(a.ringkasan)}</p>
        <a href="/artikel-detail.html?id=${a.id}" class="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:text-accent transition-colors duration-200">
          Baca Selengkapnya
          ${arrowIcon}
        </a>
      </div>
    </article>`;
}

function initFilter(filterBtns, grid, emptyEl) {
  if (!filterBtns.length) return;

  function applyFilter(activeBtn) {
    const filter = activeBtn.dataset.filter;
    const cards  = grid.querySelectorAll('.artikel-card');

    let visible = 0;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.kategori === filter;
      card.hidden = !match;
      if (match) visible++;
    });

    if (emptyEl) emptyEl.classList.toggle('hidden', visible > 0);

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

  // Default: tampilkan semua
  const defaultBtn = document.querySelector('.artikel-filter[data-filter="all"]');
  if (defaultBtn) applyFilter(defaultBtn);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn));
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
