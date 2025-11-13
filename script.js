
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!navToggle || !navMenu) return;

  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    navMenu.classList.add('is-open');
    document.body.classList.add('nav-open');
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      // Only close on mobile (when toggle is visible)
      if (window.getComputedStyle(navToggle).display === 'none') return;
      closeMenu();
    });
  });

  // Sync with your CSS breakpoint (768px here)
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches) closeMenu();
  });

  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, io) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
      );

      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('in'));
    }
  }
});