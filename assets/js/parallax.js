/**
 * RANA AVENTURA - PARALLAX.JS
 * Parallax multi-capa en el hero al hacer scroll
 */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  var hero = document.querySelector('.hero');
  if (!hero) return;

  var layers = [
    { el: document.querySelector('.hero__stars'), speed: 0.05 },
    { el: document.querySelector('.hero__moon'), speed: 0.1 },
    { el: document.querySelector('.hero__mountains--far'), speed: 0.15 },
    { el: document.querySelector('.hero__mountains--mid'), speed: 0.22 },
    { el: document.querySelector('.hero__clouds'), speed: 0.18 },
    { el: document.querySelector('.hero__floating-islands'), speed: 0.25 },
    { el: document.querySelector('.hero__mountains--near'), speed: 0.32 },
    { el: document.querySelector('.hero__vegetation'), speed: 0.35 },
    { el: document.querySelector('.hero__platforms'), speed: 0.4 },
  ];

  // Filter out nulls
  layers = layers.filter(function (l) { return l.el !== null; });

  if (layers.length === 0) return;

  var ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    var scrollY = window.scrollY;
    var heroHeight = hero.offsetHeight;

    // Only apply when hero is visible
    if (scrollY > heroHeight) {
      ticking = false;
      return;
    }

    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var yOffset = scrollY * layer.speed;
      layer.el.style.transform = 'translateY(' + yOffset + 'px)';
    }

    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Also add content fade based on scroll
  var heroContent = document.querySelector('.hero__content');
  var scrollIndicator = document.querySelector('.hero__scroll-indicator');

  function updateContentFade() {
    var scrollY = window.scrollY;
    var fadeStart = 50;
    var fadeEnd = 350;

    if (heroContent) {
      var opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      opacity = Math.max(0, Math.min(1, opacity));
      heroContent.style.opacity = opacity;
      heroContent.style.transform = 'translateY(' + (scrollY * 0.5) + 'px)';
    }

    if (scrollIndicator) {
      var sOpacity = 1 - scrollY / 200;
      sOpacity = Math.max(0, Math.min(1, sOpacity));
      scrollIndicator.style.opacity = sOpacity;
    }
  }

  window.addEventListener('scroll', function () {
    requestAnimationFrame(updateContentFade);
  }, { passive: true });
})();
