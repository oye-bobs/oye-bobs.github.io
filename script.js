// Smooth scrolling for nav links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('nav#navbar a').forEach(function(anchor) {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        e.preventDefault();
        document.querySelector(hash).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Dynamic year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});
