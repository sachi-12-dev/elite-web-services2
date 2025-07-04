// script.js

document.addEventListener('DOMContentLoaded', () => {
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

  // 3) Smooth scrolling for internal links
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
});
