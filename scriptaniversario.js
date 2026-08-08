(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const intro = $('#intro');
  const startBtn = $('#startBtn');
  const videoScene = $('#videoScene');
  const loveVideo = $('#loveVideo');
  const videoOverlay = $('#videoOverlay');
  const skipVideo = $('#skipVideo');
  const story = $('#story');

  let storyStarted = false;

  function revealStory() {
    if (storyStarted) return;

    storyStarted = true;

    if (loveVideo) {
      loveVideo.pause();
      loveVideo.currentTime = 0;
    }

    videoScene?.classList.add('hidden');
    intro?.classList.add('hidden');
    story?.classList.remove('hidden');

    document.body.classList.remove('locked');

    requestAnimationFrame(() => {
      story?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  async function beginExperience() {
    document.body.classList.add('locked');

    intro?.classList.add('hidden');
    videoScene?.classList.remove('hidden');
    videoOverlay?.classList.add('hidden');

    if (!loveVideo) {
      revealStory();
      return;
    }

    try {
      await loveVideo.play();
    } catch (error) {
      // Si no existe el video o el navegador no puede reproducirlo,
      // entramos directamente a la historia.
      revealStory();
    }
  }

  startBtn?.addEventListener('click', beginExperience);

  skipVideo?.addEventListener('click', revealStory);

  loveVideo?.addEventListener('ended', () => {
    videoOverlay?.classList.remove('hidden');

    setTimeout(() => {
      revealStory();
    }, 2200);
  });

  loveVideo?.addEventListener('error', () => {
    revealStory();
  });


  /* ==========================================================
     ANIMACIONES AL HACER SCROLL
  ========================================================== */

  const revealElements = $$('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add('visible');
    });

  }


  /* ==========================================================
     TARJETAS "LO QUE MÁS AMO DE TI"
  ========================================================== */

  $$('.love-card').forEach((card) => {

    card.addEventListener('click', () => {

      const isActive = card.classList.contains('active');

      $$('.love-card.active').forEach((item) => {
        item.classList.remove('active');
      });

      if (!isActive) {
        card.classList.add('active');
      }

    });

  });


  /* ==========================================================
     CONSTELACIÓN DE RECUERDOS
  ========================================================== */

  const memoryPop = $('#memoryPop');

  $$('.memory-star').forEach((star) => {

    star.addEventListener('click', () => {

      const memory =
        star.dataset.memory ||
        'Un recuerdo nuestro ✨';

      if (!memoryPop) return;

      memoryPop.animate(
        [
          {
            opacity: 0.3,
            transform: 'translate(-50%, -46%) scale(.98)'
          },
          {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)'
          }
        ],
        {
          duration: 350,
          easing: 'ease-out'
        }
      );

      memoryPop.textContent = memory;

    });

  });


  /* ==========================================================
     CONTADOR DEL PRIMER MES
     15 JULIO 2026 → 15 AGOSTO 2026
  ========================================================== */

  const daysTogether = $('#daysTogether');

  if (daysTogether) {

    const start = new Date(2026, 6, 15);
    const anniversary = new Date(2026, 7, 15);

    const millisecondsPerDay =
      1000 * 60 * 60 * 24;

    const difference = Math.round(
      (anniversary - start) / millisecondsPerDay
    );

    daysTogether.textContent = String(difference);

  }


  /* ==========================================================
     CARTA PARA CYNTHIA
  ========================================================== */

  const openLetter = $('#openLetter');
  const letter = $('#letter');

  openLetter?.addEventListener('click', () => {

    const willOpen =
      !letter?.classList.contains('open');

    letter?.classList.toggle(
      'open',
      willOpen
    );

    openLetter.textContent =
      willOpen
        ? 'Cerrar mi carta'
        : 'Abrir mi carta';

    if (willOpen) {

      setTimeout(() => {

        letter?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

      }, 250);

    }

  });


  /* ==========================================================
     ÚLTIMA SORPRESA
  ========================================================== */

  const lastSurprise =
    $('#lastSurprise');

  const finalSecret =
    $('#finalSecret');

  lastSurprise?.addEventListener('click', () => {

    finalSecret?.classList.toggle('show');

    const visible =
      finalSecret?.classList.contains('show');

    finalSecret?.setAttribute(
      'aria-hidden',
      visible ? 'false' : 'true'
    );

    lastSurprise.textContent =
      visible
        ? 'Guardar la sorpresa'
        : 'Hay una última sorpresa';

  });


  /* ==========================================================
     FONDO ESTRELLADO
  ========================================================== */

  const canvas = $('#stars');

  const ctx =
    canvas?.getContext('2d');

  const reduceMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  let stars = [];

  let animationId = null;


  function resizeCanvas() {

    if (!canvas || !ctx) return;

    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    canvas.width =
      Math.floor(
        window.innerWidth * dpr
      );

    canvas.height =
      Math.floor(
        window.innerHeight * dpr
      );

    canvas.style.width =
      `${window.innerWidth}px`;

    canvas.style.height =
      `${window.innerHeight}px`;

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );


    const count =
      Math.max(
        55,
        Math.floor(
          (
            window.innerWidth *
            window.innerHeight
          ) / 14000
        )
      );


    stars =
      Array.from(
        { length: count },
        () => ({
          x:
            Math.random() *
            window.innerWidth,

          y:
            Math.random() *
            window.innerHeight,

          r:
            Math.random() *
            1.35 +
            0.25,

          a:
            Math.random() *
            0.75 +
            0.18,

          speed:
            Math.random() *
            0.008 +
            0.002,

          phase:
            Math.random() *
            Math.PI *
            2
        })
      );

  }


  function drawStars(time = 0) {

    if (!canvas || !ctx) return;

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );


    stars.forEach((star) => {

      const alpha =
        reduceMotion
          ? star.a
          : Math.max(
              0.12,
              Math.min(
                0.95,
                star.a +
                Math.sin(
                  time *
                  star.speed +
                  star.phase
                ) *
                0.2
              )
            );


      ctx.beginPath();

      ctx.arc(
        star.x,
        star.y,
        star.r,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(205, 225, 255, ${alpha})`;

      ctx.fill();

    });


    if (!reduceMotion) {

      animationId =
        requestAnimationFrame(
          drawStars
        );

    }

  }


  if (canvas && ctx) {

    resizeCanvas();

    drawStars();


    window.addEventListener(
      'resize',
      () => {

        cancelAnimationFrame(
          animationId
        );

        resizeCanvas();

        drawStars();

      },
      {
        passive: true
      }
    );

  }

})();
