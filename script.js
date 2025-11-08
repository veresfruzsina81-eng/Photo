// ===== Interaktív funkciók: téma, animációk, scroll progress, 3D kártya =====
(() => {
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  const year = document.getElementById('year');
  const progress = document.querySelector('.scroll-progress span');

  // Év a láblécben
  if (year) year.textContent = new Date().getFullYear();

  // Téma beállítás/persistálás
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);
  themeBtn?.addEventListener('click', () => {
    const cur = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', cur);
    localStorage.setItem('theme', cur);
  });

  // Mobil menü
  navToggle?.addEventListener('click', () => {
    const exp = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!exp));
    menu?.classList.toggle('open');
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        menu?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Scroll progress
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.max(0, Math.min(1, scrollTop / (docHeight || 1)));
    if (progress) progress.style.width = (pct * 100).toFixed(2) + '%';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Projekt kártyák: enyhe parallax/3D hatás
  const cards = document.querySelectorAll('.project-card');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    cards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${x * 6}deg) rotateX(${ -y * 6}deg)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = 'rotateY(0) rotateX(0)';
      });
    });
  }

  // Segédfüggvény a contact formhoz
  window.copyEmail = () => {
    const el = document.getElementById('emailText');
    if (!el) return;
    const email = el.textContent.trim();
    navigator.clipboard?.writeText(email).then(() => {
      alert('E‑mail cím vágólapra másolva: ' + email);
    });
  };

  window.onContactSubmit = (ev) => {
    // mailto küldés előtt adunk egy kis visszajelzést
    alert('Köszönöm! A levelező programod megnyílik — ott véglegesítheted az üzenetet.');
    return true; // hagyjuk a böngészőt továbbmenni a mailto-ra
  };
})();
