/* ============================================
   SNIPER LEAD ENGINE — Landing Page JS v2.0
   Language Switcher + Scroll Reveal + Mobile Menu
   + FAQ Accordion
   ============================================ */

(function () {
  'use strict';

  // ---------- Language Switcher ----------
  const langToggle = document.getElementById('langToggle');
  let currentLang = 'pl';

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-pl][data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (text.includes('&') || text.includes('<')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    langToggle.querySelectorAll('button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      if (lang === 'pl') {
        metaDesc.content = 'Przestań płacić agencjom za leady. Wdrożymy w Twojej firmie autonomiczny silnik AI, który zautomatyzuje prospecting i cold mailing — pod Twoją kontrolą.';
      } else {
        metaDesc.content = 'Stop paying agencies for leads. We deploy an autonomous AI engine inside your company that automates prospecting and cold email — under your control.';
      }
    }

    if (lang === 'pl') {
      document.title = 'Sniper Lead Engine — Wdrożenia Infrastruktury Sprzedażowej AI';
    } else {
      document.title = 'Sniper Lead Engine — AI Sales Infrastructure Implementations';
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

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- FAQ Accordion ----------
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
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
    el.style.transitionDelay = `${index * 80}ms`;
    revealObserver.observe(el);
  });

  // ---------- Navbar Background on Scroll ----------
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.background = 'rgba(7, 7, 13, 0.95)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    } else {
      navbar.style.background = 'rgba(7, 7, 13, 0.8)';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.04)';
    }
  }, { passive: true });

  // ---------- Smooth Scroll ----------
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

  // ---------- Active Nav Highlight ----------
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
