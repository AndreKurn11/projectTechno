export function initGallery() {
  const images = Array.from(document.querySelectorAll('.gallery-img'));
  if (images.length === 0) return;

  // --- Lazy loading via IntersectionObserver ---
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      if (img.dataset.src) observer.observe(img);
    });
  } else {
    // Fallback: load all images immediately
    images.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }
    });
  }

  // --- Lightbox ---
  let currentIndex = 0;
  let dialog = null;
  let lightboxImg = null;
  let closeBtn = null;
  let prevBtn = null;
  let nextBtn = null;

  function buildDialog() {
    dialog = document.createElement('dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Image lightbox');
    dialog.style.cssText =
      'padding:0;border:none;background:transparent;max-width:90vw;max-height:90vh;';

    const wrapper = document.createElement('div');
    wrapper.style.cssText =
      'position:relative;display:flex;align-items:center;justify-content:center;background:#000;border-radius:8px;overflow:hidden;';

    lightboxImg = document.createElement('img');
    lightboxImg.alt = '';
    lightboxImg.style.cssText = 'max-width:80vw;max-height:80vh;object-fit:contain;display:block;';

    closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.style.cssText =
      'position:absolute;top:8px;right:12px;font-size:2rem;line-height:1;background:rgba(0,0,0,0.5);color:#fff;border:none;cursor:pointer;border-radius:4px;padding:2px 8px;z-index:1;';

    prevBtn = document.createElement('button');
    prevBtn.textContent = '‹';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.style.cssText =
      'position:absolute;left:8px;font-size:2rem;line-height:1;background:rgba(0,0,0,0.5);color:#fff;border:none;cursor:pointer;border-radius:4px;padding:4px 10px;z-index:1;';

    nextBtn = document.createElement('button');
    nextBtn.textContent = '›';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.style.cssText =
      'position:absolute;right:8px;font-size:2rem;line-height:1;background:rgba(0,0,0,0.5);color:#fff;border:none;cursor:pointer;border-radius:4px;padding:4px 10px;z-index:1;';

    wrapper.appendChild(lightboxImg);
    wrapper.appendChild(closeBtn);
    wrapper.appendChild(prevBtn);
    wrapper.appendChild(nextBtn);
    dialog.appendChild(wrapper);
    document.body.appendChild(dialog);

    // Close button
    closeBtn.addEventListener('click', () => dialog.close());

    // Prev / Next buttons
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Keyboard handlers
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dialog.close();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(1);
      } else if (e.key === 'Tab') {
        trapFocus(e);
      }
    });

    // Close on backdrop click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  function getImageSrc(img) {
    return img.src || img.dataset.src || '';
  }

  function updateLightbox() {
    const img = images[currentIndex];
    lightboxImg.src = getImageSrc(img);
    lightboxImg.alt = img.alt || '';
  }

  function navigate(delta) {
    currentIndex = (currentIndex + delta + images.length) % images.length;
    updateLightbox();
  }

  function trapFocus(e) {
    const focusable = [closeBtn, prevBtn, nextBtn];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openLightbox(index) {
    currentIndex = index;

    if (!dialog) buildDialog();

    updateLightbox();
    dialog.showModal();
    closeBtn.focus();
  }

  // Attach click handlers to each gallery image
  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(index));
  });
}
