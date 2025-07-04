/ script.js

document.addEventListener('DOMContentLoaded', () => {
  // HERO ENTRY ANIMATION
  const hero = document.querySelector('.hero-content');
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = 'translateY(20px)';
    setTimeout(() => {
      hero.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
      hero.style.opacity = 1;
      hero.style.transform = 'translateY(0)';
    }, 100);
  }

  // 1) Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // 2) Dark-mode toggle with persistence
  const darkToggles = document.querySelectorAll('.dark-toggle');
  const storedTheme = localStorage.getItem('ews-theme');
  if (storedTheme === 'dark') {
    document.body.classList.add('dark');
  }
  darkToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('ews-theme', isDark ? 'dark' : 'light');
    });
  });

  // 3) Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  reveals.forEach(el => revealObserver.observe(el));

  // 4) Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetID = this.getAttribute('href');
      if (targetID.length > 1 && document.querySelector(targetID)) {
        e.preventDefault();
        document.querySelector(targetID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu after click
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
        }
      }
    });
  });

  // 5) Back-to-top button
  const backToTop = document.createElement('button');
  backToTop.id = 'backToTop';
  backToTop.innerHTML = '↑';
  backToTop.title = 'Back to Top';
  backToTop.style.display = 'none';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });

  // 6) Calendly embed fade-in
  const calendlyWidget = document.querySelector('.calendly-inline-widget');
  if (calendlyWidget) {
    calendlyWidget.style.opacity = 0;
    const iframe = calendlyWidget.querySelector('iframe');
    if (iframe) {
      iframe.addEventListener('load', () => {
        calendlyWidget.style.transition = 'opacity 0.6s ease-in';
        calendlyWidget.style.opacity = 1;
      });
    }
  }

  // 7) Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 80;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sec.id) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});

