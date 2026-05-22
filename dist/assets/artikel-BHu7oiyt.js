import{t as e}from"./nav-DFznZLoB.js";document.addEventListener(`DOMContentLoaded`,async()=>{let n=document.getElementById(`footer-year`);n&&(n.textContent=new Date().getFullYear());try{e()}catch(e){console.error(`[nav]`,e)}await t()});async function t(){let e=document.getElementById(`artikel-grid`),t=document.getElementById(`artikel-empty`),i=document.querySelectorAll(`.artikel-filter`);if(e)try{let a=await fetch(`/data/articles.json`);if(!a.ok)throw Error(`Gagal memuat artikel`);e.innerHTML=(await a.json()).map(e=>n(e)).join(``),r(i,e,t)}catch(t){console.error(`[artikel-page]`,t),e.innerHTML=`
      <div class="col-span-3 text-center py-16 text-gray-400">
        <p class="text-lg font-semibold">Gagal memuat artikel. Coba refresh halaman.</p>
      </div>`}}function n(e){return`
    <article class="artikel-card bg-white rounded-2xl overflow-hidden shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md" data-kategori="${e.kategori}">
      <img
        src="${e.gambar}"
        alt="${i(e.gambarAlt)}"
        loading="lazy"
        width="600"
        height="400"
        class="w-full h-56 object-cover"
      />
      <div class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <span class="bg-accent/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">${i(e.kategoriLabel)}</span>
          <span class="text-gray-400 text-xs">${i(e.tanggal)}</span>
        </div>
        <h2 class="font-display text-xl font-bold mb-2 leading-snug">${i(e.judul)}</h2>
        <p class="text-gray-600 text-sm leading-relaxed mb-4">${i(e.ringkasan)}</p>
        <a href="/artikel-detail.html?id=${e.id}" class="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:text-accent transition-colors duration-200">
          Baca Selengkapnya
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </article>`}function r(e,t,n){if(!e.length)return;function r(r){let i=r.dataset.filter,a=t.querySelectorAll(`.artikel-card`),o=0;a.forEach(e=>{let t=i===`all`||e.dataset.kategori===i;e.hidden=!t,t&&o++}),n&&n.classList.toggle(`hidden`,o>0),e.forEach(e=>{e===r?(e.classList.remove(`bg-gray-100`,`text-gray-700`),e.classList.add(`bg-primary`,`text-white`)):(e.classList.remove(`bg-primary`,`text-white`),e.classList.add(`bg-gray-100`,`text-gray-700`))})}let i=document.querySelector(`.artikel-filter[data-filter="all"]`);i&&r(i),e.forEach(e=>{e.addEventListener(`click`,()=>r(e))})}function i(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}