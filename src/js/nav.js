export function initNav() {
  const header = document.getElementById('site-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const mobileLinks = document.querySelectorAll('#mobile-menu a[href^="#"]');

  // Sticky nav: toggle 'is-sticky' class when scrolled past hero height
  // On pages without a hero section, apply sticky immediately after a small scroll
  window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const threshold = hero ? hero.offsetHeight : 80;
    header.classList.toggle('is-sticky', window.scrollY > threshold);
  });

  // Smooth scroll for all nav anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Hamburger toggle
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      const newExpanded = !isExpanded;

      hamburgerBtn.setAttribute('aria-expanded', String(newExpanded));
      mobileMenu.setAttribute('aria-hidden', String(!newExpanded));

      if (newExpanded) {
        mobileMenu.classList.remove('max-h-0');
        mobileMenu.classList.add('max-h-screen');
      } else {
        mobileMenu.classList.remove('max-h-screen');
        mobileMenu.classList.add('max-h-0');
      }
    });

    // Close mobile menu when a mobile nav link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.classList.remove('max-h-screen');
        mobileMenu.classList.add('max-h-0');
      });
    });
  }
}
