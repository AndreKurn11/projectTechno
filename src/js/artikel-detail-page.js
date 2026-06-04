import '../css/main.css';
import { initNav } from './nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try { initNav(); } catch (e) { console.error('[nav]', e); }

  await loadArtikelDetail();
});

async function loadArtikelDetail() {
  const loadingEl = document.getElementById('artikel-loading');
  const errorEl   = document.getElementById('artikel-error');
  const contentEl = document.getElementById('artikel-content');

  // Ambil ?id= dari URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    showError(loadingEl, errorEl);
    return;
  }

  try {
    const res = await fetch('/data/articles.json');
    if (!res.ok) throw new Error('Gagal memuat data artikel');
    const articles = await res.json();

    const artikel = articles.find(a => a.id === id);
    if (!artikel) {
      showError(loadingEl, errorEl);
      return;
    }

    renderArtikel(artikel);
    renderRelated(articles, artikel);

    // Update meta tags untuk SEO
    document.title = `${artikel.judul} — Bloom Coffee & Place`;
    setMeta('description', artikel.ringkasan);
    setMeta('keywords', generateKeywords(artikel));
    setOG('og:title', artikel.judul);
    setOG('og:description', artikel.ringkasan);
    setOG('og:image', `https://bloomcafe.id${artikel.gambar}`);
    setOG('og:url', `https://bloomcafe.id/artikel-detail.html?id=${artikel.id}`);

    // Tampilkan konten
    loadingEl.classList.add('hidden');
    contentEl.classList.remove('hidden');

  } catch (err) {
    console.error('[artikel-detail]', err);
    showError(loadingEl, errorEl);
  }
}

function renderArtikel(artikel) {
  // Gambar hero
  const img = document.getElementById('detail-gambar');
  img.src = artikel.gambar;
  img.alt = artikel.gambarAlt;

  // Meta info
  document.getElementById('detail-kategori-breadcrumb').textContent = artikel.kategoriLabel;
  document.getElementById('detail-kategori-badge').textContent = artikel.kategoriLabel;
  document.getElementById('detail-tanggal').textContent = artikel.tanggal;
  document.getElementById('detail-judul').textContent = artikel.judul;

  // Body konten
  const bodyEl = document.getElementById('detail-body');
  bodyEl.innerHTML = artikel.konten.map(blok => {
    if (blok.tipe === 'subjudul') {
      return `<h2 class="font-display text-xl font-bold mt-8 mb-2 text-gray-900">${escapeHtml(blok.teks)}</h2>`;
    }
    return `<p class="text-base leading-relaxed">${escapeHtml(blok.teks)}</p>`;
  }).join('');
}

function renderRelated(articles, current) {
  const grid = document.getElementById('related-grid');
  if (!grid) return;

  // Ambil 3 artikel lain (prioritaskan kategori sama)
  const sameKat = articles.filter(a => a.id !== current.id && a.kategori === current.kategori);
  const others  = articles.filter(a => a.id !== current.id && a.kategori !== current.kategori);
  const related = [...sameKat, ...others].slice(0, 3);

  grid.innerHTML = related.map(a => `
    <article class="bg-white rounded-2xl overflow-hidden shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md">
      <img src="${a.gambar}" alt="${escapeHtml(a.gambarAlt)}" loading="lazy" width="600" height="400" class="w-full h-48 object-cover" />
      <div class="p-5">
        <div class="flex items-center gap-2 mb-2">
          <span class="bg-accent/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">${escapeHtml(a.kategoriLabel)}</span>
          <span class="text-gray-400 text-xs">${escapeHtml(a.tanggal)}</span>
        </div>
        <h3 class="font-semibold text-base leading-snug mb-3">${escapeHtml(a.judul)}</h3>
        <a href="/artikel-detail.html?id=${a.id}" class="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:text-accent transition-colors duration-200">
          Baca Selengkapnya
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </article>
  `).join('');
}

function showError(loadingEl, errorEl) {
  loadingEl.classList.add('hidden');
  errorEl.classList.remove('hidden');
}

function generateKeywords(artikel) {
  // Gunakan keywords dari JSON jika ada, atau auto-generate
  if (artikel.keywords) return artikel.keywords;

  const base = 'Bloom Coffee & Place, cafe Jambi, coffee shop Jambi, kopi Jambi';
  const kategoriMap = {
    'kopi':       'kopi, espresso, latte, cafe',
    'brewing':    'brewing guide, cara membuat kopi, tips kopi',
    'gaya-hidup': 'gaya hidup, cafe lifestyle, remote working',
  };
  const kategoriKeywords = kategoriMap[artikel.kategori] || artikel.kategoriLabel;

  return `${artikel.judul}, ${kategoriKeywords}, ${base}`;
}

function setMeta(name, content) {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) el.setAttribute('content', content);
}

function setOG(property, content) {
  const el = document.querySelector(`meta[property="${property}"]`);
  if (el) el.setAttribute('content', content);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
