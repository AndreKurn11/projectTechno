export function initCarousel() {
  const cards = Array.from(document.querySelectorAll('.testimonial-card'));
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!cards.length) return;

  let current = 0;

  function showCard(index) {
    cards.forEach((card, i) => {
      if (i === index) {
        card.removeAttribute('hidden');
      } else {
        card.setAttribute('hidden', '');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('bg-primary');
        dot.classList.remove('bg-gray-300');
      } else {
        dot.classList.remove('bg-primary');
        dot.classList.add('bg-gray-300');
      }
    });

    current = index;
  }

  function advance() {
    showCard((current + 1) % cards.length);
  }

  let interval = setInterval(advance, 5000);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(interval);
      showCard((current - 1 + cards.length) % cards.length);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(interval);
      showCard((current + 1) % cards.length);
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      const index = parseInt(dot.dataset.index, 10);
      if (!isNaN(index)) showCard(index);
    });
  });

  // Show first card on init
  showCard(0);
}
