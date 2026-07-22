/**
 * RANA AVENTURA - MAIN.JS
 * Navbar, smooth scroll, FAQ accordion,
 * scroll-reveal, stat counter, active nav
 */
(function () {
  'use strict';

  /* ----------------------------------------
     NAVBAR
     ---------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.navbar__link');

  // Scroll state
  let lastScroll = 0;
  const SCROLL_THRESHOLD = 60;

  function onScroll() {
    const y = window.scrollY;

    // Background + shadow
    if (y > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close on link click
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('main section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    let currentId = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('navbar__link--active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('navbar__link--active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ----------------------------------------
     SMOOTH SCROLL
     ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const offset = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: top,
        behavior: 'smooth',
      });
    });
  });

  /* ----------------------------------------
     FAQ ACCORDION
     ---------------------------------------- */
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('active');

      // Close all
      faqItems.forEach(function (other) {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq__question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----------------------------------------
     SCROLL REVEAL
     ---------------------------------------- */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: reveal everything
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ----------------------------------------
     STAT COUNTER ANIMATION
     ---------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-item__number[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 2000;
    const start = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * target);

      el.textContent = current.toLocaleString('es-ES');

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  /* ----------------------------------------
     KEYBOARD - Skip to content
     ---------------------------------------- */
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById('hero');
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }

  /* ----------------------------------------
     MODALES - Contenido y apertura
     ---------------------------------------- */
  const modalContents = {
    ayuda: {
      title: 'Centro de Ayuda',
      body: [
        '<h4>Descarga</h4>',
        '<p><strong>Android:</strong> Descarga el APK desde la pagina oficial de Rana Aventura.</p>',
        '<p><strong>Web:</strong> Accede desde el navegador en cualquier dispositivo con conexion a internet.</p>',
        '<p><strong>Docentes (Escritorio):</strong> Descarga la app de escritorio desde el portal de la institucion.</p>',
        '<h4>Cuenta y acceso</h4>',
        '<p>Los estudiantes reciben sus credenciales del docente. Si no puedes iniciar sesion, verifica con tu docente que tu usuario y contrasena sean correctos.</p>',
        '<h4>Problemas tecnicos</h4>',
        '<p>Si la app no carga o presenta errores, intenta cerrarla y abrirla de nuevo. Verifica tu conexion a internet (version web) o revisa que tengas almacenamiento disponible en tu dispositivo (app Android).</p>',
        '<h4>Contacto</h4>',
        '<p>Para soporte adicional, contacta al equipo tecnico de la institucion o escribe a soporte@ranaaventura.com.</p>'
      ].join('')
    },
    privacidad: {
      title: 'Politica de Privacidad',
      body: [
        '<p><strong>Rana Aventura</strong> esta comprometido con la proteccion de la informacion de los estudiantes, docentes y familias.</p>',
        '<h4>Datos que recopilamos</h4>',
        '<ul>',
        '<li>Nombres y datos de los estudiantes (creados por el docente)</li>',
        '<li>Progreso de aprendizaje y actividades completadas</li>',
        '<li>Informacion de la institucion educativa</li>',
        '</ul>',
        '<h4>Donde se almacenan los datos</h4>',
        '<p>Toda la informacion se guarda en un servidor privado, accesible unicamente por la institucion educativa y el equipo de desarrollo de Rana Aventura.</p>',
        '<h4>Comparticion con terceros</h4>',
        '<p><strong>No compartimos datos con terceros.</strong> No se vende, alquila ni comparte informacion con personas o empresas fuera de la institucion educativa.</p>',
        '<h4>Seguridad</h4>',
        '<p>Se utilizan protocolos de seguridad y encriptacion para proteger la informacion almacenada en el servidor.</p>',
        '<h4>Derechos</h4>',
        '<p>La institucion educativa puede solicitar la eliminacion o modificacion de los datos de sus estudiantes en cualquier momento.</p>'
      ].join('')
    },
    terminos: {
      title: 'Terminos y Condiciones',
      body: [
        '<p>El uso de la plataforma <strong>Rana Aventura</strong> esta sujeto a los siguientes terminos:</p>',
        '<h4>Uso de la plataforma</h4>',
        '<p>Rana Aventura es una herramienta educativa disenada para ser utilizada en el ambito escolar. El acceso esta restringido a estudiantes, docentes y personal autorizado de la institucion.</p>',
        '<h4>Cuentas</h4>',
        '<p>Las cuentas de los estudiantes son creadas por los docentes. El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso.</p>',
        '<h4>Contenido</h4>',
        '<p>El contenido educativo, actividades, niveles y materiales dentro de la plataforma son propiedad de Rana Aventura y la institucion. No esta permitido copiar, redistribuir o modificar el contenido sin autorizacion.</p>',
        '<h4>Uso aceptable</h4>',
        '<ul>',
        '<li>No compartir credenciales con usuarios no autorizados</li>',
        '<li>No intentar acceder a areas restringidas del servidor</li>',
        '<li>No modificar o manipular el contenido de la plataforma</li>',
        '</ul>',
        '<h4>Disponibilidad</h4>',
        '<p>Rana Aventura esta en desarrollo activo. La disponibilidad del servicio puede variar. Se realizan actualizaciones periodicas que pueden afectar temporalmente el acceso.</p>',
        '<h4>Limitacion de responsabilidad</h4>',
        '<p>Rana Aventura no se responsabiliza por perdida de datos derivada del uso inadecuado de la plataforma o fallas en la conectividad del usuario.</p>'
      ].join('')
    }
  };

  const overlay = document.getElementById('modalOverlay');
  const modalEl = overlay ? overlay.querySelector('.modal') : null;
  const modalTitle = overlay ? overlay.querySelector('.modal__title') : null;
  const modalBody = overlay ? overlay.querySelector('.modal__body') : null;
  const modalClose = overlay ? overlay.querySelector('.modal__close') : null;

  function openModal(id) {
    var data = modalContents[id];
    if (!data || !overlay) return;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    overlay.classList.add('active');
    document.body.classList.add('modal-open');
    setTimeout(function () {
      modalClose.focus();
    }, 50);
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    modalTitle.textContent = '';
    modalBody.innerHTML = '';
  }

  document.querySelectorAll('[data-modal]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(this.getAttribute('data-modal'));
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
      closeModal();
    }
  });
})();
