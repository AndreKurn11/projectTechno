import '../css/main.css';
import { initNav } from './nav.js';
import { initGallery } from './gallery.js';
import { initCarousel } from './carousel.js';
import { initFeatured } from './featured.js';
import { initHours } from './hours.js';

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try { initNav(); }      catch (e) { console.error('[nav]', e); }
  try { initGallery(); }  catch (e) { console.error('[gallery]', e); }
  try { initCarousel(); } catch (e) { console.error('[carousel]', e); }
  try { initFeatured(); } catch (e) { console.error('[featured]', e); }
  try { initHours(); }    catch (e) { console.error('[hours]', e); }

  loadFeaturedArtikel();
});

async function loadFeaturedArtikel() {
  const grid = document.getElementById('featured-artikel-grid');
  if (!grid) return;

  try {
    const res = await fetch('/data/articles.json');
    if (!res.ok) throw new Error('Gagal memuat artikel');
    const articles = await res.json();

    // Ambil 3 artikel pertama
    const featured = articles.slice(0, 3);

    const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

    grid.innerHTML = featured.map(a => `
      <article class="bg-white rounded-2xl overflow-hidden shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md">
        <img
          src="${a.gambar}"
          alt="${escapeHtml(a.gambarAlt)}"
          loading="lazy"
          width="600"
          height="400"
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="bg-accent/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">${escapeHtml(a.kategoriLabel)}</span>
            <span class="text-gray-400 text-xs">${escapeHtml(a.tanggal)}</span>
          </div>
          <h3 class="font-display text-lg font-bold mb-2 leading-snug">${escapeHtml(a.judul)}</h3>
          <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">${escapeHtml(a.ringkasan)}</p>
          <a href="/artikel-detail.html?id=${a.id}" class="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:text-accent transition-colors duration-200">
            Baca Selengkapnya ${arrowIcon}
          </a>
        </div>
      </article>
    `).join('');

  } catch (e) {
    console.error('[featured-artikel]', e);
    if (grid) grid.innerHTML = '';
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
