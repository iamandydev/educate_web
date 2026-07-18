/**
 * RANA AVENTURA - PARTICLES.JS
 * Sistema de particulas: luciérnagas y polvo mágico en el hero
 */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const fireflyContainer = document.getElementById('heroFireflies');
  const particleContainer = document.getElementById('heroParticles');

  if (!fireflyContainer && !particleContainer) return;

  /* ----------------------------------------
     FIREFLIES
     ---------------------------------------- */
  const FIREFLY_COUNT = 8;

  function createFireflies() {
    if (!fireflyContainer) return;

    for (var i = 0; i < FIREFLY_COUNT; i++) {
      var el = document.createElement('div');
      el.className = 'firefly';

      var x = 10 + Math.random() * 80;
      var y = 20 + Math.random() * 60;
      var size = 3 + Math.random() * 3;
      var delay = Math.random() * 5;
      var duration = 5 + Math.random() * 6;

      el.style.left = x + '%';
      el.style.top = y + '%';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.animationDelay = delay + 's, ' + (delay + 1) + 's';
      el.style.animationDuration = duration + 's, ' + (duration * 1.5) + 's';

      fireflyContainer.appendChild(el);
    }
  }

  /* ----------------------------------------
     DUST PARTICLES
     ---------------------------------------- */
  var PARTICLE_COUNT = 12;

  function createParticles() {
    if (!particleContainer) return;

    for (var j = 0; j < PARTICLE_COUNT; j++) {
      var p = document.createElement('div');
      p.className = 'particle';

      var px = 5 + Math.random() * 90;
      var py = 30 + Math.random() * 60;
      var pDelay = Math.random() * 8;
      var pDuration = 7 + Math.random() * 8;

      p.style.left = px + '%';
      p.style.top = py + '%';
      p.style.animationDelay = pDelay + 's';
      p.style.animationDuration = pDuration + 's';

      particleContainer.appendChild(p);
    }
  }

  /* ----------------------------------------
     INIT
     ---------------------------------------- */
  createFireflies();
  createParticles();
})();
