// Simple, accessible lightbox for images with [data-lightbox]
(function () {
  // Elements
  const overlay  = document.getElementById('lightbox');
  const imgEl    = document.getElementById('lbImage');
  const capEl    = document.getElementById('lbCaption');
  const btnClose = document.getElementById('lbClose');
  const btnPrev  = document.getElementById('lbPrev');
  const btnNext  = document.getElementById('lbNext');

  // Thumbnails
  const thumbs = Array.from(document.querySelectorAll('[data-lightbox]'));

  // Group thumbnails by data-lightbox value
  const groups = {};
  thumbs.forEach(el => {
    const group = el.getAttribute('data-lightbox') || '_default';
    (groups[group] ||= []).push(el);
    el.style.cursor = 'zoom-in';
  });

  // State
  let currentGroup = null;
  let currentIndex = -1;

  // Open overlay for a clicked thumbnail
  function openFor(thumb) {
    currentGroup = thumb.getAttribute('data-lightbox') || '_default';
    currentIndex = groups[currentGroup].indexOf(thumb);
    updateSlide();
    overlay.classList.add('lb-open');
    document.body.classList.add('lb-lock');
    overlay.setAttribute('aria-hidden', 'false');
  }

  // Update image and caption
  function updateSlide() {
    const list = groups[currentGroup];
    if (!list || currentIndex < 0) return;
    const t = list[currentIndex];

    // If you add larger images later, use: t.dataset.full || t.src
    imgEl.src = t.src;
    imgEl.alt = t.alt || '';
    capEl.textContent = t.alt || '';

    btnPrev.style.display = currentIndex > 0 ? 'block' : 'none';
    btnNext.style.display = currentIndex < list.length - 1 ? 'block' : 'none';
  }

  // Close overlay
  function closeLB() {
    overlay.classList.remove('lb-open');
    document.body.classList.remove('lb-lock');
    overlay.setAttribute('aria-hidden', 'true');
    imgEl.src = '';
  }

  // Navigation
  function next() {
    const list = groups[currentGroup];
    if (!list) return;
    if (currentIndex < list.length - 1) {
      currentIndex++;
      updateSlide();
    }
  }
  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlide();
    }
  }

  // Bind events
  thumbs.forEach(t => t.addEventListener('click', () => openFor(t)));
  btnClose.addEventListener('click', closeLB);
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  // Click backdrop to close (ignore inner clicks)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLB();
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('lb-open')) return;
    if (e.key === 'Escape')      closeLB();
    if (e.key === 'ArrowRight')  next();
    if (e.key === 'ArrowLeft')   prev();
  });
})();
