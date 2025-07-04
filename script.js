// script.js

document.addEventListener('DOMContentLoaded', function() {
  // ===== Dark Mode Toggle with Persistence =====
  var darkBtns = document.querySelectorAll('.dark-toggle');
  var savedTheme = localStorage.getItem('ews-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
  for (var i = 0; i < darkBtns.length; i++) {
    darkBtns[i].addEventListener('click', function() {
      var isDark = document.body.classList.toggle('dark');
      try { localStorage.setItem('ews-theme', isDark ? 'dark' : 'light'); } catch(e) {}
    });
  }

  // ===== Mobile Menu Toggle =====
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // ===== Reveal On Scroll =====
  var reveals = document.querySelectorAll('.reveal');
  function revealScroll() {
    var vh = window.innerHeight;
    for (var j = 0; j < reveals.length; j++) {
      var rect = reveals[j].getBoundingClientRect().top;
      if (rect < vh * 0.8) {
        reveals[j].classList.add('active');
      }
    }
  }
  window.addEventListener('scroll', revealScroll);
  revealScroll();

  // ===== Smooth Scrolling & Close Mobile Menu =====
  var links = document.querySelectorAll('a[href^="#"]');
  for (var k = 0; k < links.length; k++) {
    links[k].addEventListener('click', function(e) {
      var targetID = this.getAttribute('href');
      if (targetID.length > 1 && document.querySelector(targetID)) {
        e.preventDefault();
        document.querySelector(targetID).scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    cw.style.opacity = '0';
    var iframe = cw.querySelector('iframe');
    if (iframe) {
      iframe.addEventListener('load', function() {
        cw.style.transition = 'opacity 0.6s ease-in';
        cw.style.opacity = '1';
      });
    }
  }

  // ===== Modal Popup for Cards =====
  var modal = document.getElementById('infoModal');
  var closeBtns = modal ? modal.querySelectorAll('.modal-close') : [];
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
  // Close actions
  for (var c = 0; c < closeBtns.length; c++) {
    closeBtns[c].addEventListener('click', function() {
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


