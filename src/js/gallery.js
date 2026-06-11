export function initGallery() {
  const images = Array.from(document.querySelectorAll(".gallery-img"));
  if (images.length === 0) return;

  // --- Lazy loading via IntersectionObserver ---
  if ("IntersectionObserver" in window) {
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
}
