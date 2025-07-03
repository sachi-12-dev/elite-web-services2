// ————————————————————————
// ELITE WEB SERVICES CONTROL
// Dark Mode Toggle, Reveal Animations & Mock Charts
// ————————————————————————

const DARK_KEY = 'theme';
const toggleButton = document.getElementById('darkToggle');

// Apply saved theme & run animations on load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem(DARK_KEY) === 'dark') {
    document.body.classList.add('dark');
  }
  initReveal();
  initCharts();
});

// Dark mode toggle handler
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem(DARK_KEY, mode);
  });
}

// Reveal-on-scroll logic
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const animate = () => {
    const windowH = window.innerHeight;
    for (let el of reveals) {
      const top = el.getBoundingClientRect().top;
      if (top < windowH - 150) el.classList.add('active');
      else el.classList.remove('active');
    }
  };
  animate();
  window.addEventListener('scroll', animate);
}

// Initialize Chart.js mock charts
function initCharts() {
  const costCtx = document.getElementById('costChart')?.getContext('2d');
  const ec2Ctx  = document.getElementById('ec2Chart')?.getContext('2d');
  
  if (costCtx) {
    new Chart(costCtx, {
      type: 'line',
      data: {
        labels: ['Feb','Mar','Apr','May','Jun','Jul'],
        datasets: [{
          label: 'Monthly Spend ($)',
          data: [800,950,1200,1100,1450,1920],
          borderColor: '#d4af37',
          backgroundColor: 'rgba(212,175,55,0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
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
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

