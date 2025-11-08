(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!navToggle || !navMenu) return;

  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      navMenu.classList.add('is-open');
      document.body.classList.add('nav-open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navToggle.offsetParent === null) return; // menu hidden on desktop
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 761px)').matches) {
      closeMenu();
    }
  });
})();
