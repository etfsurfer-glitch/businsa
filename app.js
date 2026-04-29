/* 엘리프 성성호수공원 — one-page interactions */
(function () {
  'use strict';

  // Hero slider
  const slides = document.querySelectorAll('.hero .slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  let cur = 0;
  function go(i) {
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');
  }
  if (slides.length > 1) {
    setInterval(() => go(cur + 1), 4500);
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  }

  // Tabs
  document.querySelectorAll('[data-tab-group]').forEach((group) => {
    const buttons = group.querySelectorAll('.tab');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        const groupName = group.dataset.tabGroup;
        const section = group.parentElement;

        section.querySelectorAll('.tab').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        section.querySelectorAll('.tab-panel').forEach((p) => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });
    });
  });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document
      .querySelectorAll('.why-list li, .block-head, .full-img, .tab-panel.active img')
      .forEach((el) => io.observe(el));
  }
})();
