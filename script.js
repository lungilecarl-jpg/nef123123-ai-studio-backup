const today = new Date();
document.getElementById('today').textContent = today.toLocaleDateString('en-ZA',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase();
document.getElementById('year').textContent = today.getFullYear();
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
}));
document.getElementById('joinForm').addEventListener('submit', event => {
  event.preventDefault();
  const message = document.getElementById('formMessage');
  message.textContent = 'Thank you for your interest. The subscription service must be connected by the site administrator before sign-ups can be stored.';
  message.classList.add('form-success');
});
