document.addEventListener('DOMContentLoaded', () => {
  console.log('🔧 main.js loaded');

  // ===== Feather Icons =====
  if (window.feather) {
    try {
      feather.replace();
    } catch (err) {
      console.warn('Feather replace failed:', err);
    }
  }

  // ===== Dark Mode Toggle =====
  const darkToggle = document.getElementById('darkToggle');
  const savedTheme = localStorage.getItem('ews-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
  darkToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('ews-theme', isDark ? 'dark' : 'light');
  });

  // ===== Mobile Menu Toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // ===== Smooth Hash Scroll & Nav Close =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
      }
    });
  });

  // ===== Debounce Utility =====
  const debounce = (fn, delay = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  // ===== Reveal-On-Scroll =====
  const revealElems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealElems.forEach(el => revealObserver.observe(el));

  // ===== Scroll Progress Bar =====
  const progressBar = document.createElement('div');
  progressBar.id = 'scrollProgress';
  Object.assign(progressBar.style, {
    position: 'fixed', top: '0', left: '0', height: 'var(--progress-height)',
    background: 'var(--primary)', width: '0%', zIndex: '9999'
  });
  document.body.prepend(progressBar);
  window.addEventListener('scroll', debounce(() => {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = ((scrolled / docHeight) * 100) + '%';
  }, 20));

  // ===== Lazy Load Images =====
  document.querySelectorAll('img').forEach(img => img.loading = 'lazy');

  // ===== Back-to-Top =====
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', debounce(() => {
    backBtn?.classList.toggle('show', window.scrollY > window.innerHeight);
  }, 100));
  backBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ===== Active Section Highlight =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        activeLink?.classList.add('active');
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(sec => sectionObserver.observe(sec));

  // ===== Card Modal Popup =====
  const modal = document.getElementById('infoModal');
  const closeBtn = modal?.querySelector('.modal-close');
  const titleEl = modal?.querySelector('#modalTitle');
  const descEl = modal?.querySelector('#modalDesc');

  document.querySelectorAll('.card[data-title]').forEach(card => {
    card.addEventListener('click', e => {
      // ignore clicks on inner links
      if (e.target.closest('a')) return;
      titleEl.textContent = card.dataset.title || '';
      descEl.textContent = card.dataset.details || '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn?.focus();
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });
  modal?.addEventListener('click', e => { if (e.target === modal) closeBtn?.click(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal?.classList.contains('open')) closeBtn?.click(); });
});
