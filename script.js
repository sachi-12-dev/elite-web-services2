document.addEventListener('DOMContentLoaded', function() {
  // ===== Dark Mode Toggle with Persistence =====
  const darkToggles = document.querySelectorAll('.dark-toggle');
  const savedTheme = localStorage.getItem('ews-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
  darkToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      try { localStorage.setItem('ews-theme', isDark ? 'dark' : 'light'); }
      catch (e) { console.warn('Theme save failed:', e); }
    });
  });

  // ===== Mobile Menu Toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');
  navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // ===== Smooth Scrolling & Close Mobile Menu =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
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

  // ===== Reveal On Scroll (IntersectionObserver) =====
  const revealElems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealElems.forEach(el => revealObserver.observe(el));

  // ===== Scroll Progress Bar =====
  const progressBar = document.createElement('div');
  progressBar.id = 'scrollProgress';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', debounce(() => {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrolled / docHeight) * 100;
    progressBar.style.width = `${pct}%`;
  }, 20));

  // ===== Lazy Load Images =====
  document.querySelectorAll('img').forEach(img => img.setAttribute('loading', 'lazy'));

  // ===== Back-to-Top Button =====
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', debounce(() => {
      backBtn.style.display = (window.scrollY > window.innerHeight) ? 'flex' : 'none';
    }, 100));
  }

  // ===== Active Section Highlight =====
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(sec => sectionObserver.observe(sec));

  // ===== Modal Popup for Cards =====
  const modal = document.getElementById('infoModal');
  const closeBtn = modal?.querySelector('.modal-close');
  const titleEl = modal?.querySelector('#modalTitle');
  const descEl  = modal?.querySelector('#modalDesc');
  document.querySelectorAll('.card[data-title]').forEach(card => {
    card.addEventListener('click', () => {
      titleEl.textContent = card.dataset.title;
      descEl.textContent = card.dataset.details;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      // focus trap
      closeBtn.focus();
    });
  });
  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.activeElement.blur();
  });
  modal?.addEventListener('click', e => {
    if (e.target === modal) closeBtn.click();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeBtn.click();
  });
});
