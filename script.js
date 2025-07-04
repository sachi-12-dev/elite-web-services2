// script.js

document.addEventListener('DOMContentLoaded', function() {
  // ===== Dark Mode Toggle with Persistence =====
  var darkToggles = document.querySelectorAll('.dark-toggle');
  var currentTheme = localStorage.getItem('ews-theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
  }
  for (var i = 0; i < darkToggles.length; i++) {
    darkToggles[i].addEventListener('click', function() {
      var isDark = document.body.classList.toggle('dark');
      try {
        localStorage.setItem('ews-theme', isDark ? 'dark' : 'light');
      } catch (e) {
        console.warn('Could not save theme preference:', e);
      }
    });
  }

  // ===== Mobile Menu Toggle =====
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu   = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // ===== Reveal On Scroll =====
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    var windowHeight = window.innerHeight;
    for (var j = 0; j < reveals.length; j++) {
      var element = reveals[j];
      var position = element.getBoundingClientRect().top;
      if (position < windowHeight * 0.8) {
        element.classList.add('active');
      }
    }
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ===== Smooth Scrolling & Close Mobile Menu =====
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var k = 0; k < anchors.length; k++) {
    anchors[k].addEventListener('click', function(e) {
      var targetID = this.getAttribute('href');
      if (targetID.length > 1 && document.querySelector(targetID)) {
        e.preventDefault();
        document.querySelector(targetID).scrollIntoView({ behavior: 'smooth' });
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
        }
      }
    });
  }

  // ===== Back-to-Top Button =====
  var backBtn = document.createElement('button');
  backBtn.id = 'backToTop';
  backBtn.className = 'back-to-top';
  backBtn.textContent = '↑';
  document.body.appendChild(backBtn);
  backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', function() {
    backBtn.style.display = (window.scrollY > window.innerHeight) ? 'flex' : 'none';
  });

  // ===== Calendly Fade-In =====
  var cw = document.querySelector('.calendly-inline-widget');
  if (cw) {
    cw.style.opacity = 0;
    var iframe = cw.querySelector('iframe');
    if (iframe) {
      iframe.addEventListener('load', function() {
        cw.style.transition = 'opacity 0.6s ease-in';
        cw.style.opacity = 1;
      });
    }
  }

  // ===== Modal Popup for Cards =====
  var modal = document.getElementById('infoModal');
  var closeBtn = modal ? modal.querySelector('.modal-close') : null;
  var titleEl = modal ? modal.querySelector('#modalTitle') : null;
  var descEl = modal ? modal.querySelector('#modalDesc') : null;

  var cards = document.querySelectorAll('.card[data-title]');
  for (var m = 0; m < cards.length; m++) {
    cards[m].addEventListener('click', function() {
      if (!modal) return;
      titleEl.textContent = this.getAttribute('data-title');
      descEl.textContent = this.getAttribute('data-details');
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
