document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const navToggle = header.querySelector('.nav-toggle');
  const navMenu = header.querySelector('.nav-menu');
  const navIcon = navToggle ? navToggle.querySelector('.nav-icon, .nav-toggle-icon') : null;

  if (!navToggle || !navMenu) return;

  function setMenu(open) {
    navMenu.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    navToggle.classList.toggle('is-active', open);
    if (navIcon) navIcon.classList.toggle('is-active', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setMenu(!isOpen);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 880px)').matches) {
        setMenu(false);
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 881px)').matches) {
      setMenu(false);
    }
  });

  // ================= SCROLL REVEAL =================
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // ================= SIMPLE PARALLAX =================
  const parallaxEls = document.querySelectorAll('.parallax');
  if (parallaxEls.length) {
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      parallaxEls.forEach((el) => {
        const depth = parseFloat(el.dataset.parallaxDepth || '0.08');
        el.style.transform = `translateY(${scrollY * depth * -0.3}px) scale(1.02)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
