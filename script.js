document.addEventListener('DOMContentLoaded', function () {
  // --- Loading Screen Logic ---
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // Add 'loaded' class to body to trigger CSS transition for fade-out
    document.body.classList.add('loaded');
    // Hide loading screen completely after transition
    setTimeout(function () {
      loadingScreen.style.display = 'none';
    }, 700); // Matches CSS transition duration
  }

  // --- Smooth Scrolling for Navigation Links ---
  document.querySelectorAll('nav#navbar a').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      // Ensure it's an internal anchor link
      if (hash && hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          // Get the height of the fixed navbar to offset scroll position
          const navbarHeight = document.getElementById('navbar').offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navbarHeight - 20; // -20px for extra padding

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile nav if open after clicking a link
          const navMenu = document.querySelector('.nav-menu');
          const navToggle = document.querySelector('.nav-toggle');
          if (navMenu && navToggle && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
          }
        }
      }
    });
  });

  // --- Dynamic Year in Footer ---
  const yearElem = document.getElementById('year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  // --- Skill Progress Bar Animation (on scroll into view) ---
  const skillBars = document.querySelectorAll('.skill-progress');
  const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width;
        }
        observer.unobserve(bar); // Stop observing once animated
      }
    });
  };

  const skillObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5 // Trigger when 50% of the element is visible
  });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });

  // --- Back to Top Button Logic ---
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      // Show button if scrolled down more than 300px
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // --- Sticky Navbar on Scroll ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) { // Add 'scrolled' class after scrolling 50px
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- Scroll-reveal for sections (Optional, inspired by Rooday.com) ---
  // This adds a simple fade-in effect when sections come into view.
  const sections = document.querySelectorAll('.section, .hero-section, .footer');

  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null, // viewport
    threshold: 0.15, // Trigger when 15% of the section is visible
    rootMargin: '0px'
  });

  sections.forEach(section => {
    section.classList.add('fade-in-on-scroll'); // Add initial class for styling
    sectionObserver.observe(section);
  });
});
