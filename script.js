// script.js

;(function(){
  // 1) Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu   = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(){
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // 2) Dark-mode toggle with persistence
  var darkBtns = document.querySelectorAll('.dark-toggle');
  var theme    = localStorage.getItem('ews-theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
  }
  for (var i = 0; i < darkBtns.length; i++) {
    darkBtns[i].addEventListener('click', function(){
      var isDark = document.body.classList.toggle('dark');
      try { localStorage.setItem('ews-theme', isDark ? 'dark' : 'light'); }
      catch(e){}
    });
  }

  // 3) Simple reveal-on-scroll (no observer)
  var reveals = document.querySelectorAll('.reveal');
  function revealAll(){
    for (var j=0; j<reveals.length; j++) {
      var r = reveals[j];
      var rect = r.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        r.classList.add('active');
      }
    }
  }
  window.addEventListener('scroll', revealAll);
  revealAll(); // run on load

  // 4) Smooth scroll for in-page links
  var links = document.querySelectorAll('a[href^="#"]');
  for (var k=0; k<links.length; k++){
    links[k].addEventListener('click', function(e){
      var tgt = this.getAttribute('href');
      if (tgt.length > 1 && document.querySelector(tgt)) {
        e.preventDefault();
        document.querySelector(tgt).scrollIntoView({ behavior:'smooth' });
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
        }
      }
    });
  }

  // 5) Back-to-top button
  var btn = document.createElement('button');
  btn.id = 'backToTop'; btn.className = 'back-to-top'; btn.textContent = '↑';
  document.body.appendChild(btn);
  btn.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
  window.addEventListener('scroll', function(){
    btn.style.display = window.scrollY > window.innerHeight ? 'flex' : 'none';
  });

  // 6) Calendly fade-in
  var cw = document.querySelector('.calendly-inline-widget');
  if (cw) {
    cw.style.opacity = '0';
    var ifr = cw.querySelector('iframe');
    if (ifr) ifr.addEventListener('load', function(){
      cw.style.transition = 'opacity 0.6s ease-in';
      cw.style.opacity = '1';
    });
  }

  // 7) Hero intro
  var hero = document.querySelector('.hero-content');
  if (hero) {
    hero.style.opacity = '0';
    setTimeout(function(){
      hero.style.transition = 'opacity 1s ease-out';
      hero.style.opacity = '1';
    }, 100);
  }
})();
