/* =========================================================
   THE WIZARDING WORLD
   Magical Interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LOADER
  ===================================================== */

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {

    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1800);

  });


  /* =====================================================
     NAVBAR
  ===================================================== */

  const header = document.getElementById("site-header");

  window.addEventListener("scroll", () => {

    header.classList.toggle(
      "scrolled",
      window.scrollY > 50
    );

  });


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });

  });


  /* =====================================================
     HERO CTA
  ===================================================== */

  document
    .querySelectorAll(".magic-button")
    .forEach(button => {

      button.addEventListener("click", () => {

        createMagicBurst(button);

      });

    });

  document.getElementById("hero-cta")
    .addEventListener("click", () => {

      document
        .getElementById("hogwarts")
        .scrollIntoView({
          behavior: "smooth"
        });

    });


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: .15
    }
  );

  document
    .querySelectorAll(".reveal")
    .forEach(element => {

      observer.observe(element);

    });


  /* =====================================================
     HOUSE CARD SPARKLE
  ===================================================== */

  document
    .querySelectorAll(".house-card")
    .forEach(card => {

      card.addEventListener(
        "mouseenter",
        () => {
          createMagicBurst(card);
        },
        { once: true }
      );

    });


  /* =====================================================
     CHARACTER MODAL
  ===================================================== */

  const modal = document.getElementById("modal-overlay");

  const modalImage =
    document.getElementById("modal-image");

  const modalName =
    document.getElementById("modal-name");

  const modalHouse =
    document.getElementById("modal-house");

  const modalDescription =
    document.getElementById("modal-description");

  const closeModal =
    document.getElementById("modal-close");


  document
    .querySelectorAll(".character-card")
    .forEach(card => {

      const button =
        card.querySelector(".details-button");

      button.addEventListener("click", () => {

        modalImage.src =
          card.dataset.image;

        modalImage.alt =
          card.dataset.name;

        modalName.textContent =
          card.dataset.name;

        modalHouse.textContent =
          card.dataset.house;

        modalDescription.textContent =
          card.dataset.description;

        modal.classList.add("open");

        document.body.style.overflow =
          "hidden";

      });

    });


  function closeCharacterModal() {

    modal.classList.remove("open");

    document.body.style.overflow = "";

  }


  closeModal.addEventListener(
    "click",
    closeCharacterModal
  );


  modal.addEventListener("click", event => {

    if (event.target === modal) {
      closeCharacterModal();
    }

  });


  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      modal.classList.contains("open")
    ) {
      closeCharacterModal();
    }

  });


  /* =====================================================
     SPELL SYSTEM
  ===================================================== */

  const spellButtons =
    document.querySelectorAll(
      ".spell-buttons button"
    );

  const spellDisplay =
    document.getElementById(
      "spell-display"
    );

  const spellName =
    document.getElementById(
      "spell-name"
    );

  const spellMeaning =
    document.getElementById(
      "spell-meaning"
    );


  const screenFlash =
    document.getElementById(
      "screen-flash"
    );

  spellButtons.forEach(button => {

    button.addEventListener("click", () => {

      spellButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      spellName.textContent =
        button.dataset.spell;

      spellMeaning.textContent =
        button.dataset.meaning;

      spellDisplay.classList.remove(
        "active",
        "casting"
      );

      void spellDisplay.offsetWidth;

      spellDisplay.classList.add(
        "active",
        "casting"
      );

      screenFlash.classList.remove("flash");

      void screenFlash.offsetWidth;

      screenFlash.classList.add("flash");

      createMagicBurst(
        spellDisplay
      );

      createMagicBurst(
        button
      );

    });

  });


  /* =====================================================
     MAGIC BURST
  ===================================================== */

  function createMagicBurst(container) {

    const rect =
      container.getBoundingClientRect();

    for (let i = 0; i < 24; i++) {

      const particle =
        document.createElement("span");

      particle.textContent = "✦";

      particle.style.position = "fixed";

      particle.style.left =
        rect.left +
        rect.width / 2 +
        "px";

      particle.style.top =
        rect.top +
        rect.height / 2 +
        "px";

      particle.style.color =
        "#f1d58a";

      particle.style.fontSize =
        Math.random() * 12 + 7 + "px";

      particle.style.pointerEvents =
        "none";

      particle.style.zIndex = "999";

      document.body.appendChild(
        particle
      );

      const angle =
        Math.random() *
        Math.PI *
        2;

      const distance =
        70 +
        Math.random() *
        130;

      const x =
        Math.cos(angle) *
        distance;

      const y =
        Math.sin(angle) *
        distance;

      particle.animate(
        [
          {
            transform:
              "translate(-50%,-50%) scale(1)",
            opacity: 1
          },

          {
            transform:
              `translate(${x}px,${y}px) scale(0)`,
            opacity: 0
          }
        ],
        {
          duration:
            700 +
            Math.random() * 500,

          easing:
            "cubic-bezier(.22,1,.36,1)"
        }
      ).onfinish = () => {

        particle.remove();

      };

    }

  }


  /* =====================================================
     CURSOR MAGIC
  ===================================================== */

  const cursor =
    document.querySelector(
      ".cursor-glow"
    );

  if (
    window.matchMedia(
      "(hover:hover)"
    ).matches
  ) {

    document.addEventListener(
      "mousemove",
      event => {

        cursor.style.left =
          event.clientX + "px";

        cursor.style.top =
          event.clientY + "px";

      }
    );

  }


  /* =====================================================
     BACK TO TOP
  ===================================================== */

  const backTop =
    document.getElementById(
      "back-top"
    );

  window.addEventListener("scroll", () => {

    backTop.classList.toggle(
      "show",
      window.scrollY > 700
    );

  });


  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* =====================================================
     YEAR
  ===================================================== */

  document.getElementById(
    "year"
  ).textContent =
    new Date().getFullYear();


  /* =====================================================
     MAGICAL PARTICLES
  ===================================================== */

  initParticles();

});


/* =========================================================
   PARTICLE ENGINE
========================================================= */

function initParticles() {

  const canvas =
    document.getElementById(
      "particle-canvas"
    );

  const ctx =
    canvas.getContext("2d");

  let particles = [];
  let shootingStars = [];

  function maybeSpawnShootingStar() {

    if (Math.random() < .006) {

      shootingStars.push({
        x: Math.random() * canvas.width * .6 + canvas.width * .2,
        y: Math.random() * canvas.height * .3,
        length: 120 + Math.random() * 100,
        speed: 9 + Math.random() * 6,
        angle: Math.PI / 5,
        life: 1
      });

    }

  }

  function drawShootingStars() {

    shootingStars.forEach(star => {

      const tailX =
        star.x - Math.cos(star.angle) * star.length;

      const tailY =
        star.y - Math.sin(star.angle) * star.length;

      const gradient =
        ctx.createLinearGradient(
          star.x, star.y, tailX, tailY
        );

      gradient.addColorStop(0, `rgba(255,250,230,${star.life})`);
      gradient.addColorStop(1, "rgba(255,250,230,0)");

      ctx.globalAlpha = 1;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      star.life -= .02;

    });

    shootingStars =
      shootingStars.filter(
        star => star.life > 0
      );

  }

  function resize() {

    canvas.width =
      window.innerWidth;

    canvas.height =
      window.innerHeight;

  }


  function createParticles() {

    const count =
      Math.min(
        100,
        Math.floor(
          window.innerWidth *
          window.innerHeight /
          15000
        )
      );

    particles =
      Array.from(
        { length: count },
        () => ({

          x:
            Math.random() *
            canvas.width,

          y:
            Math.random() *
            canvas.height,

          size:
            Math.random() * 2 + .4,

          speed:
            Math.random() * .4 + .05,

          alpha:
            Math.random() * .7 + .1,

          phase:
            Math.random() *
            Math.PI *
            2

        })
      );

  }


  function animate() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach(p => {

      p.phase += .02;

      const alpha =
        p.alpha *
        (
          .5 +
          Math.sin(p.phase) * .5
        );

      ctx.globalAlpha =
        alpha;

      ctx.fillStyle =
        "#eecb7a";

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );

      ctx.fill();

      p.y -= p.speed;

      p.x +=
        Math.sin(p.phase) *
        .08;

      if (p.y < -10) {
        p.y =
          canvas.height + 10;
      }

    });

    maybeSpawnShootingStar();
    drawShootingStars();

    requestAnimationFrame(
      animate
    );

  }


  resize();
  createParticles();
  animate();


  window.addEventListener(
    "resize",
    () => {

      resize();
      createParticles();

    }
  );

}