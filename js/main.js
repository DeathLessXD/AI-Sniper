/* ============================================
   SNIPER LEAD ENGINE — Landing Page JS
   Language Switcher + Scroll Reveal + Mobile Menu
   ============================================ */

(function () {
  'use strict';

  // ---------- Language Switcher ----------
  const langToggle = document.getElementById('langToggle');
  let currentLang = 'pl';

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update all elements with data-pl / data-en
    document.querySelectorAll('[data-pl][data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        // Use innerHTML for elements that might have HTML entities
        if (text.includes('&') || text.includes('<')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update toggle buttons
    langToggle.querySelectorAll('button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      if (lang === 'pl') {
        metaDesc.content = 'Zautomatyzuj pozyskiwanie klientów B2B High-Ticket. Spersonalizowane kampanie cold email do CEO i CTO — zero spamu, maksymalna konwersja.';
      } else {
        metaDesc.content = 'Automate B2B High-Ticket client acquisition. Personalized cold email campaigns to CEOs and CTOs — zero spam, maximum conversion.';
      }
    }

    // Update title
    if (lang === 'pl') {
      document.title = 'Sniper Lead Engine — Dedykowane Wdrożenia Automatyzacji Sprzedaży B2B';
    } else {
      document.title = 'Sniper Lead Engine — Dedicated B2B Sales Automation Implementations';
    }
  }

  langToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn && btn.dataset.lang) {
      setLanguage(btn.dataset.lang);
    }
  });

  // ---------- Mobile Menu ----------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Scroll Reveal (IntersectionObserver) ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el, index) => {
    // Stagger the reveal animations
    el.style.transitionDelay = `${index * 80}ms`;
    revealObserver.observe(el);
  });

  // ---------- Navbar Background on Scroll ----------
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      navbar.style.background = 'rgba(7, 7, 13, 0.95)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    } else {
      navbar.style.background = 'rgba(7, 7, 13, 0.8)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.04)';
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Active Nav Link Highlight ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav a, .mobile-nav a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--text-primary)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
