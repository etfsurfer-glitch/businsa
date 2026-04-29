/* 엘리프 성성호수공원 — one-page interactions */
(function () {
  'use strict';

  // ---- Phone routing -------------------------------------------------
  const PHONES = ['010-8356-4009', '010-8008-4106', '010-7772-1133'];
  const KAKAO_URL = 'https://open.kakao.com/o/gKXSTOXf';
  const isMobile =
    /iphone|ipad|ipod|android|mobile/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  const pickPhone = () => PHONES[Math.floor(Math.random() * PHONES.length)];

  // Top bar + floating call button: rotate across 3 numbers per page load.
  document.querySelectorAll('.topbar-call, .fb-call').forEach((el) => {
    if (isMobile) {
      el.href = 'tel:' + pickPhone();
    } else {
      el.href = KAKAO_URL;
      el.target = '_blank';
      el.rel = 'noopener';
      el.title = 'PC에서는 카카오톡 상담으로 연결됩니다';
    }
  });

  // Contact-card tel: links — keep the displayed number on mobile,
  // but on desktop redirect to KakaoTalk since tel: dialer is unavailable.
  if (!isMobile) {
    document.querySelectorAll('.call-list a[href^="tel:"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(KAKAO_URL, '_blank', 'noopener');
      });
    });
  }

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
