// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// Navbar shadow + scroll spy
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 6px 32px rgba(10,30,79,0.15)'
    : '0 2px 20px rgba(10,30,79,0.1)';

  // scroll spy
  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// Intersection Observer – animate sections in
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animate-in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.info-card, .facility-card, .gallery-item, .stat-item, .badge')
  .forEach(el => observer.observe(el));

// Enquiry form submit
document.getElementById('enquiryForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = '✔ Enquiry Submitted!';
  btn.style.background = '#16a34a';
  btn.style.boxShadow = '0 6px 20px rgba(22,163,74,0.35)';
  setTimeout(() => {
    btn.textContent = 'Submit Enquiry →';
    btn.style.background = '';
    btn.style.boxShadow = '';
    e.target.reset();
  }, 3000);
});
