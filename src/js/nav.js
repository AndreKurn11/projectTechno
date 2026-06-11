export function initNav() {
  const header = document.getElementById('site-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const mobileLinks = document.querySelectorAll('#mobile-menu a[href^="#"]');

  // Sticky nav: toggle 'is-sticky' class when scrolled past hero height
  // Pages with 'nav-dark' class keep dark background at all times (no toggle)
  const waBtn = document.getElementById('wa-btn');

  function updateSticky() {
    if (header.classList.contains('nav-dark')) return;
    const hero = document.getElementById('hero');
    const threshold = hero ? hero.offsetHeight : 80;
    const isScrolled = window.scrollY > threshold;

    header.classList.toggle('is-sticky', isScrolled);

    // WA button: transparan di atas, hijau saat scrolled
    if (waBtn) {
      if (isScrolled) {
        waBtn.classList.remove('bg-transparent', 'border-transparent');
        waBtn.classList.add('bg-[#25D366]', 'hover:bg-[#1ebe5a]', 'border-[#25D366]');
      } else {
        waBtn.classList.add('bg-transparent', 'border-transparent');
        waBtn.classList.remove('bg-[#25D366]', 'hover:bg-[#1ebe5a]', 'border-[#25D366]');
      }
    }
  }

  // Run on load to set correct initial state
  updateSticky();
  window.addEventListener('scroll', updateSticky);

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
