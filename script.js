// ====== DARK MODE PERSISTENCE ======
const toggleButton = document.getElementById('darkToggle');

// Load theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  // Reveal animations on scroll
  revealOnScroll();
});

// Toggle dark mode and save preference
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
  });
}

// ====== SCROLL REVEAL ANIMATION ======
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  function animate() {
    for (const el of reveals) {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 150;

      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  }

  animate(); // Run on load
  window.addEventListener('scroll', animate);
}
// ————————————————
// EWSC Dashboard: Dark Mode & Reveal
// ————————————————
const toggleButton = document.getElementById('darkToggle');

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
  // run reveal animations
  document.querySelectorAll('.reveal').forEach(el => {
    const anim = () => {
      const rect = el.getBoundingClientRect().top;
      if (rect < window.innerHeight - 150) el.classList.add('active');
      else el.classList.remove('active');
    };
    anim();
    window.addEventListener('scroll', anim);
  });
});

if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
  });
}

// ————————————————
// EWSC Dashboard: Mock Charts
// ————————————————
window.addEventListener('DOMContentLoaded', () => {
  const costCtx = document.getElementById('costChart')?.getContext('2d');
  const ec2Ctx  = document.getElementById('ec2Chart')?.getContext('2d');

  if (costCtx) {
    new Chart(costCtx, {
      type: 'line',
      data: {
        labels: ['Feb','Mar','Apr','May','Jun','Jul'],
        datasets: [{
          label: 'Cost ($)',
          data: [800,950,1200,1100,1450,1920],
          borderColor: '#d4af37',
          backgroundColor: 'rgba(212,175,55,0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }

  if (ec2Ctx) {
    new Chart(ec2Ctx, {
      type: 'bar',
      data: {
        labels: ['us-east-1','us-west-2','eu-central-1'],
        datasets: [{
          label: 'Running Instances',
          data: [12,9,6],
          backgroundColor: '#d4af37'
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }
});
