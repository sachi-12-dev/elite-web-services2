// script.js

document.addEventListener('DOMContentLoaded', function() {
  // HERO ENTRY ANIMATION
  var hero = document.querySelector('.hero-content');
  if (hero) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    setTimeout(function() {
      hero.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
    }, 100);
  }

  // 1) Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu   = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // 2) Dark-mode toggle with persistence
  var darkToggles = document.querySelectorAll('.dark-toggle');
  var storedTheme = localStorage.getItem('ews-theme');
  if (storedTheme === 'dark') {
    document.body.classList.add('dark');
  }
  Array.prototype.forEach.call(darkToggles, function(btn) {
    btn.addEventListener('click', function() {
      var isDark = document.body.classList.toggle('dark');
      try {
        localStorage.setItem('ews-theme', isDark ? 'dark' : 'light');
      } catch (e) {}
    });
  });

  // 3) Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    Array.prototype.forEach.call(reveals, function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    Array.prototype.forEach.call(reveals, function(el) {
      el.classList.add('active');
    });
  }

  // 4) Smooth scrolling for in-page links
  var anchors = document.querySelectorAll('a[href^="#"]');
  Array.prototype.forEach.call(anchors, function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetID = anchor.getAttribute('href');
      if (targetID.length > 1 && document.querySelector(targetID)) {
        e.preventDefault();
        document.querySelector(targetID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // close mobile menu
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
        }
      }
    });
  });

  // 5) Back-to-top button
  var backBtn = document.createElement('button');
  backBtn.id = 'backToTop';
  backBtn.className = 'back-to-top';
  backBtn.textContent = '↑';
  backBtn.title = 'Back to Top';
  backBtn.style.display = 'none';
  document.body.appendChild(backBtn);
  backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', function() {
    backBtn.style.display = (window.scrollY > window.innerHeight) ? 'flex' : 'none';
  });

  // 6) Calendly embed fade-in
  var cw = document.querySelector('.calendly-inline-widget');
  if (cw) {
    cw.style.opacity = '0';
    var iframe = cw.querySelector('iframe');
    if (iframe) {
      iframe.addEventListener('load', function() {
        cw.style.transition = 'opacity 0.6s ease-in';
        cw.style.opacity = '1';
      });
    }
  }

  // 7) Active nav link on scroll
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY + 80;
    Array.prototype.forEach.call(sections, function(sec) {
      if (sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
        Array.prototype.forEach.call(navLinks, function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sec.id) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});


