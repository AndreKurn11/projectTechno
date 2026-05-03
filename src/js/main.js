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
});
