// Smooth scrolling for nav links
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for nav anchor links
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
  var yearElem = document.getElementById('year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  // Hide loading screen when content is ready
  document.body.classList.add('loaded');
  var loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(function () {
      loadingScreen.style.display = 'none';
    }, 700); // allows CSS transition to finish
  }

  // Animate skill progress bars
  document.querySelectorAll('.skill-progress').forEach(function(bar) {
    var width = bar.getAttribute('data-width');
    if (width) {
      setTimeout(function () {
        bar.style.width = width;
      }, 500);
    }
  });

  // Back to Top button logic
  var backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }
});
