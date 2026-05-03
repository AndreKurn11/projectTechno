export function initFeatured() {
  const cards = document.querySelectorAll('.featured-card');
  cards.forEach(card => {
    const ctaBtn = card.querySelector('.cta-btn');
    if (!ctaBtn) return;
    // Show CTA on focus (keyboard accessibility)
    ctaBtn.addEventListener('focusin', () => {
      ctaBtn.classList.remove('hidden');
      ctaBtn.classList.add('flex');
    });
    ctaBtn.addEventListener('focusout', () => {
      ctaBtn.classList.remove('flex');
      ctaBtn.classList.add('hidden');
    });
  });
}
