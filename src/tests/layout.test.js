import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

const html = readFileSync('./index.html', 'utf-8');
const dom = new JSDOM(html);
const { document } = dom.window;

describe('Responsive layout class presence', () => {
  test('About section has md:grid-cols-2 class', () => {
    const aboutGrid = document.querySelector('#about .grid');
    expect(aboutGrid).not.toBeNull();
    expect(aboutGrid.className).toContain('md:grid-cols-2');
  });

  test('Menu grid has responsive grid classes', () => {
    const menuGrid = document.querySelector('.menu-grid');
    expect(menuGrid).not.toBeNull();
    expect(menuGrid.className).toContain('md:grid-cols-2');
    expect(menuGrid.className).toContain('lg:grid-cols-3');
  });

  test('Featured section has md:grid-cols-3 class', () => {
    const featuredGrid = document.querySelector('#featured .flex');
    expect(featuredGrid).not.toBeNull();
    expect(featuredGrid.className).toContain('md:grid-cols-3');
  });

  test('Gallery grid has responsive column-count via gallery-grid class', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    expect(galleryGrid).not.toBeNull();
  });

  test('Location section has md:grid-cols-2 class', () => {
    const locationGrid = document.querySelector('#location .grid');
    expect(locationGrid).not.toBeNull();
    expect(locationGrid.className).toContain('md:grid-cols-2');
  });

  test('Footer has md:grid-cols-3 class', () => {
    const footerGrid = document.querySelector('#footer .grid');
    expect(footerGrid).not.toBeNull();
    expect(footerGrid.className).toContain('md:grid-cols-3');
  });

  test('Desktop nav links are hidden on mobile (hidden md:flex)', () => {
    const desktopNav = document.querySelector('nav ul.hidden');
    expect(desktopNav).not.toBeNull();
    expect(desktopNav.className).toContain('hidden');
    expect(desktopNav.className).toContain('md:flex');
  });

  test('Hamburger button is hidden on desktop (md:hidden)', () => {
    const hamburger = document.getElementById('hamburger-btn');
    expect(hamburger).not.toBeNull();
    expect(hamburger.className).toContain('md:hidden');
  });

  test('Hero section has min-h-screen class', () => {
    const hero = document.getElementById('hero');
    expect(hero).not.toBeNull();
    expect(hero.className).toContain('min-h-screen');
  });

  test('All sections have py-16 padding', () => {
    const sections = ['about', 'menu', 'gallery', 'testimonials', 'location', 'contact'];
    sections.forEach(id => {
      const section = document.getElementById(id);
      expect(section).not.toBeNull();
      expect(section.className).toContain('py-16');
    });
  });
});
