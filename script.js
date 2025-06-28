// Sticky Navbar
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 10) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
const scrollReveal = () => {
  reveals.forEach(el => {
    if (!el.classList.contains('active')) {
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) {
        el.classList.add('active');
      }
    }
  });
};
window.addEventListener('scroll', scrollReveal);
document.addEventListener('DOMContentLoaded', scrollReveal);

// Dark Mode Toggle
const toggle = document.getElementById('darkToggle');
const body = document.body;

// Load dark mode from localStorage or system preference
if (
  localStorage.getItem('darkMode') === 'true' ||
  (localStorage.getItem('darkMode') === null &&
   window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  body.classList.add('dark');
  localStorage.setItem('darkMode', true);
}

if (toggle) {
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('darkMode', body.classList.contains('dark'));
  });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
