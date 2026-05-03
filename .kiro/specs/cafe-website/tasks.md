# Implementation Plan: Cafe Website

## Overview

Build a single-page, mobile-first cafe website using HTML5, Tailwind CSS v3, and Vanilla JS (ES2020+) with a Vite + PostCSS build pipeline. Implementation proceeds section-by-section, progressively enhancing a static HTML skeleton with JS modules and data files, validated throughout with Vitest + fast-check property-based tests.

## Tasks

- [x] 1. Project setup and build configuration
  - Initialise `package.json` with `npm init`
  - Install dependencies: `vite`, `tailwindcss`, `postcss`, `autoprefixer`, `vitest`, `jsdom`, `fast-check`
  - Create `tailwind.config.js` extending theme with `primary-dark`, `primary`, `accent` colors and `display`/`body` font families
  - Create `vite.config.js` with PostCSS and Tailwind integration
  - Create `vitest.config.js` with `environment: 'jsdom'` and `globals: true`
  - Create `src/css/main.css` with `@tailwind` directives and CSS custom properties (color tokens, animation tokens, `prefers-reduced-motion` block)
  - Create `public/images/` placeholder directory
  - Create `src/data/` directory with empty `menu.json`, `testimonials.json`, `gallery.json` stubs
  - _Requirements: 11.1, 11.2, 11.4_

- [ ] 2. Data files
  - [x] 2.1 Create `src/data/menu.json` with ≥9 items across `coffee`, `non-coffee`, and `food` categories, each with `id`, `category`, `name`, `description` (≤15 words), `price`, `image`, `available`, `featured`, and optional `badge` fields; include 3–6 items with `featured: true` and at least one with `available: false`
    - _Requirements: 4.1, 4.2, 4.6, 5.1, 5.3_
  - [x] 2.2 Create `src/data/testimonials.json` with ≥4 testimonials, each with `id`, `reviewerName`, optional `avatar`, `rating` (1–5), and `text` (≤60 words)
    - _Requirements: 7.1_
  - [x] 2.3 Create `src/data/gallery.json` with ≥6 gallery images, each with `id`, `src`, `alt`, `width`, and `height`
    - _Requirements: 6.1_

- [x] 3. HTML skeleton — `index.html`
  - Create `index.html` with `<!DOCTYPE html>`, `<html lang="en">`, `<head>` (charset, viewport, Google Fonts link for Playfair Display + Inter, CSS link), and `<body>`
  - Add `<header>` containing `<nav>` with logo, desktop link list, and hamburger button (SVG icon, `aria-expanded="false"`, `aria-controls`)
  - Add `<main>` containing all nine `<section>` elements with correct `id` attributes: `hero`, `about`, `menu`, `featured`, `gallery`, `testimonials`, `location`, `contact`
  - Add `<footer id="footer">` with three-column grid structure
  - Use semantic elements throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
  - Add `<script type="module" src="/src/js/main.js">` at end of `<body>`
  - _Requirements: 11.6, 2.1_

- [ ] 4. Global styles and design system
  - [x] 4.1 Define CSS custom properties in `src/css/main.css`: all six color tokens, `btn-primary` and `btn-outline` utility classes, `menu-card` hover transition, `featured-card` overlay transition, focus-visible ring styles for all interactive elements
    - _Requirements: 11.1, 11.5, 11.7_
  - [ ]* 4.2 Write property test for interactive element focus indicators (Property 11)
    - **Property 11: Interactive Element Focus Indicators**
    - **Validates: Requirements 11.7**
    - Use jsdom to query all `button`, `a`, `input`, `select`, `textarea` elements and assert each has a non-default `:focus-visible` style or a `focus-ring` class applied

- [ ] 5. Hero section
  - [x] 5.1 Implement Hero section HTML in `index.html`: full-viewport `<section id="hero">` with background image container, `::after` overlay div using `--color-overlay` (60% opacity), `<h1>` headline (≤10 words), `<p>` subheadline (≤20 words), `btn-primary` CTA linking to `#menu`, and `btn-outline` CTA linking to `#contact`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 1.7_
  - [ ]* 5.2 Write property test for content word count constraints (Property 1)
    - **Property 1: Content Word Count Constraints**
    - **Validates: Requirements 1.2, 1.3, 4.2, 7.1, 10.1**
    - Use fast-check to generate strings and assert word-count helper returns correct counts; verify hero headline ≤10 words, subheadline ≤20 words

- [ ] 6. Navigation module
  - [x] 6.1 Implement `src/js/nav.js`: sticky trigger on scroll past hero height (toggle `is-sticky` class adding `bg-primary-dark` and `shadow-lg`), smooth-scroll on nav link click (`scrollIntoView({ behavior: 'smooth' })`), hamburger toggle (flip `aria-expanded`, toggle mobile menu `max-h` transition)
    - _Requirements: 2.2, 2.3, 2.4, 2.5_
  - [ ]* 6.2 Write unit tests for nav.js
    - Test sticky class is added when `scrollY > heroHeight` and removed when `scrollY ≤ heroHeight`
    - Test hamburger toggles `aria-expanded` between `"true"` and `"false"`
    - Test smooth-scroll is called on nav link click
    - _Requirements: 2.2, 2.4, 2.5_
  - [ ]* 6.3 Write property test for navigation tap target size (Property 12)
    - **Property 12: Navigation Tap Target Size**
    - **Validates: Requirements 2.6**
    - For each nav interactive element, assert computed `offsetWidth` and `offsetHeight` are both ≥44

- [x] 7. About section
  - Implement About section HTML in `index.html`: `<section id="about">` with `md:grid-cols-2` layout, `<h2>`, body text paragraph (80–150 words), three icon-and-label brand value pairs, and `<img loading="lazy">` for cafe interior photo
  - Apply `text-base leading-relaxed` (font-size 16px, line-height 1.6) to body text
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 8. Menu section and filtering
  - [x] 8.1 Implement Menu section HTML in `index.html`: `<section id="menu">` with `role="tablist"` tab bar (Coffee, Non-Coffee, Food buttons with `role="tab"` and `data-category`), and `<div class="menu-grid">` populated by rendering `menu.json` items as `<article class="menu-card" data-category="...">` elements (image, name, description, price; sold-out badge if `available: false`)
    - _Requirements: 4.1, 4.2, 4.4, 4.6_
  - [x] 8.2 Implement `src/js/menu.js`: on tab click set `card.hidden` for non-matching categories, update `aria-selected` on tabs, default to showing all items on load
    - _Requirements: 4.3_
  - [ ]* 8.3 Write property test for category filter correctness (Property 2)
    - **Property 2: Category Filter Correctness**
    - **Validates: Requirements 4.3**
    - Use fast-check to generate arbitrary category strings and item arrays; assert all visible cards match selected category
  - [ ]* 8.4 Write property test for unavailable items sold-out badge (Property 3)
    - **Property 3: Unavailable Items Show Sold-Out Badge**
    - **Validates: Requirements 4.6**
    - For any item with `available: false`, assert rendered card contains `.badge-sold-out` element

- [ ] 9. Featured Products section
  - [x] 9.1 Implement Featured Products section HTML in `index.html`: `<section id="featured">` populated from `menu.json` items where `featured: true`; each card has image, name, description, price, badge, and hover overlay div; mobile horizontal scroll with `overflow-x-auto snap-x`; desktop `grid-cols-3`
    - _Requirements: 5.1, 5.2, 5.3, 5.5_
  - [x] 9.2 Implement `src/js/featured.js`: attach hover listeners to reveal `.cta-btn` on card hover (or use CSS-only approach with `group` classes)
    - _Requirements: 5.4_
  - [ ]* 9.3 Write property test for featured items count and rendering completeness (Property 4)
    - **Property 4: Featured Items Count and Rendering Completeness**
    - **Validates: Requirements 5.1, 5.2, 5.3**
    - Assert featured item count is between 3 and 6; for each rendered card assert presence of image, name, description, price, and badge elements

- [ ] 10. Gallery section and lightbox
  - [x] 10.1 Implement Gallery section HTML in `index.html`: `<section id="gallery">` with CSS column masonry (`column-count: 3` desktop, 2 tablet, 1 mobile); render `gallery.json` items as `<img loading="lazy" data-src="...">` elements
    - _Requirements: 6.1, 6.2, 6.5_
  - [x] 10.2 Implement `src/js/gallery.js`: `IntersectionObserver` fallback swapping `data-src` → `src` for lazy loading; on image click create/show `<dialog>` lightbox with `<img>`, prev/next buttons, and close button; keyboard handlers for `Escape` (close) and `ArrowLeft`/`ArrowRight` (navigate); focus trap inside dialog
    - _Requirements: 6.3, 6.4, 6.5_
  - [ ]* 10.3 Write property test for gallery images count and lazy loading (Property 5)
    - **Property 5: Gallery Images Count and Lazy Loading**
    - **Validates: Requirements 6.1, 6.5**
    - Assert gallery image count ≥6; for every `<img>` in gallery assert `loading` attribute equals `"lazy"`
  - [ ]* 10.4 Write property test for lightbox opens on image click (Property 6)
    - **Property 6: Lightbox Opens on Image Click**
    - **Validates: Requirements 6.3**
    - For any gallery image element, simulate click and assert `<dialog>` is open and its `<img src>` matches the clicked image's source

- [ ] 11. Testimonials carousel
  - [x] 11.1 Implement Testimonials section HTML in `index.html`: `<section id="testimonials">` with single-card display area, dot navigation, prev/next arrow buttons, and reviewer avatar (initials fallback); render star ratings as five SVG icons (filled/unfilled based on `rating` value)
    - _Requirements: 7.1, 7.2, 7.5_
  - [x] 11.2 Implement `src/js/carousel.js`: `setInterval` auto-advance every 5000ms; on dot/arrow click `clearInterval` and navigate to target index; wrap-around on first/last; update active dot indicator
    - _Requirements: 7.3, 7.4_
  - [ ]* 11.3 Write property test for testimonials count and star rating rendering (Property 7)
    - **Property 7: Testimonials Count and Star Rating Rendering**
    - **Validates: Requirements 7.1, 7.2**
    - Assert testimonials count ≥4; for any rating `n` (1–5) assert rendered star component has exactly `n` filled and `5 - n` unfilled star icons
  - [ ]* 11.4 Write unit tests for carousel.js
    - Test auto-advance calls `setInterval` with 5000ms interval
    - Test clicking dot/arrow calls `clearInterval`
    - Test wrap-around from last to first and first to last
    - _Requirements: 7.3, 7.4_

- [ ] 12. Location & Hours section
  - [x] 12.1 Implement Location section HTML in `index.html`: `<section id="location">` with `md:grid-cols-2` layout; left column has Google Maps `<iframe loading="lazy">` and "Get Directions" `<a href="https://maps.google.com/?q=...">` link; right column has full address and `<table>` with `<tr class="hours-row" data-day="...">` for each day
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6_
  - [x] 12.2 Implement `src/js/hours.js`: get today's day name via `new Date().toLocaleDateString('en-US', { weekday: 'long' })`; find matching `.hours-row[data-day]` and add highlight classes; ensure no other row receives the highlight class
    - _Requirements: 8.4_
  - [ ]* 12.3 Write property test for opening hours completeness and today highlight (Property 8)
    - **Property 8: Opening Hours Completeness and Today Highlight**
    - **Validates: Requirements 8.3, 8.4**
    - Assert hours dataset contains all 7 days; for any day string passed to highlighter, assert only the matching row receives the highlight class

- [ ] 13. Contact / Reservation form
  - [x] 13.1 Implement Contact section HTML in `index.html`: `<section id="contact">` with centered form (max-width 640px) containing fields for `fullName`, `email`, `phone`, `preferredDate`, `preferredTime`, `guests`, and optional `message` textarea; clickable `mailto:` and `tel:` links for cafe contact details
    - _Requirements: 9.1, 9.6_
  - [x] 13.2 Implement `src/js/form.js`: on submit prevent default; validate required fields (non-empty), email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), phone (`/^\d{8,15}$/`); for each invalid field add `.field-error` class and insert `<p role="alert">` error message; on all-valid submit replace form with `.success-message` div within 1 second; clear errors when user corrects a field
    - _Requirements: 9.2, 9.3, 9.4, 9.5_
  - [ ]* 13.3 Write property test for form field validation — email and phone (Property 9)
    - **Property 9: Form Field Validation (Email and Phone)**
    - **Validates: Requirements 9.4, 9.5**
    - Use `fc.emailAddress()` to assert `validateEmail` returns `true` for valid emails and `false` for invalid; use `fc.stringOf(fc.digit(), { minLength: 8, maxLength: 15 })` to assert `validatePhone` returns `true` for valid phone strings and `false` for strings with non-digits or wrong length
  - [ ]* 13.4 Write property test for form validation error display (Property 10)
    - **Property 10: Form Validation Error Display**
    - **Validates: Requirements 9.3**
    - For any submission with one or more invalid fields, assert each invalid field has an adjacent `[role="alert"]` element and all valid field values remain unchanged

- [x] 14. Footer
  - Implement Footer HTML in `index.html`: `<footer id="footer" class="bg-primary-dark text-white">` with `md:grid-cols-3` layout; column 1: logo/brand name, tagline (≤10 words), copyright with current year; column 2: section navigation links; column 3: Instagram, Facebook, TikTok social icon links with `hover:text-accent transition-colors duration-200`
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 15. Entry point wiring — `src/js/main.js`
  - Import and initialise all modules: `initNav()`, `initMenu()`, `initGallery()`, `initCarousel()`, `initFeatured()`, `initHours()`, `initForm()`
  - Wrap each initialisation in `try/catch` so a failing module does not break others
  - Fetch and inject dynamic data from JSON files into the DOM before module init where needed
  - _Requirements: 11.4_

- [x] 16. Checkpoint — core functionality complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 17. Accessibility and responsive polish
  - [x] 17.1 Audit all interactive elements for visible `:focus-visible` outlines; add `focus:ring-2 focus:ring-accent` Tailwind classes where missing
    - _Requirements: 11.7_
  - [x] 17.2 Verify layout at 320px, 768px, and 1280px viewports using jsdom viewport resize tests; assert correct Tailwind responsive class presence
    - _Requirements: 11.3_
  - [x] 17.3 Add `defer` attribute to all non-critical `<script>` tags and confirm all `<img>` outside the initial viewport have `loading="lazy"`
    - _Requirements: 11.4_
  - [ ]* 17.4 Write unit tests for reduced-motion support
    - Assert `prefers-reduced-motion: reduce` media query block is present in compiled CSS
    - Assert animation/transition durations are overridden to `0.01ms`
    - _Requirements: 11.5_

- [x] 18. Final checkpoint — all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `numRuns: 100` minimum and include the tag comment `// Feature: cafe-website, Property N: <property_text>`
- Unit tests and property tests are complementary — both should be run via `npx vitest --run`
- Checkpoints ensure incremental validation before moving to the next phase
