document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CUSTOM CURSOR
  ========================= */

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let ringX = mouseX;
  let ringY = mouseY;

  document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }

  });

  function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();


  const interactiveElements = document.querySelectorAll(
    "a, button, .skill-card, .certificate-btn"
  );

  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursorRing?.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
      cursorRing?.classList.remove("hover");
    });

  });


  /* =========================
     MOBILE MENU
  ========================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  function closeMobileMenu() {

    mobileMenu?.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  }

  menuToggle?.addEventListener("click", () => {

    const isOpen =
      mobileMenu?.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(Boolean(isOpen))
    );

  });


  document.querySelectorAll(".mobile-link, .mobile-resume")
    .forEach((link) => {

      link.addEventListener("click", () => {
        closeMobileMenu();
      });

    });


  document.addEventListener("click", (event) => {

    if (
      mobileMenu?.classList.contains("open") &&
      !mobileMenu.contains(event.target) &&
      !menuToggle?.contains(event.target)
    ) {
      closeMobileMenu();
    }

  });


  window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {
      closeMobileMenu();
    }

  });


  /* =========================
     NAVBAR SCROLL
  ========================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {

    if (window.scrollY > 30) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

  }

  updateNavbar();

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });


  /* =========================
     ACTIVE NAV
  ========================= */

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {

    const scrollPosition =
      window.scrollY + 180;

    let currentSection = "home";

    sections.forEach((section) => {

      if (
        scrollPosition >= section.offsetTop
      ) {
        currentSection = section.id;
      }

    });

    navLinks.forEach((link) => {

      const target =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        target === `#${currentSection}`
      );

    });

  }

  window.addEventListener("scroll", updateActiveNav, {
    passive: true
  });

  updateActiveNav();


  /* =========================
     SMOOTH ANCHOR SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const navbarHeight =
        navbar?.offsetHeight || 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =========================
     HERO TAGLINE ROTATION
  ========================= */

  const taglineLines =
    document.querySelectorAll(".tagline-line");

  let currentTagline = 0;

  function showTagline(index) {

    taglineLines.forEach((line, i) => {

      line.classList.toggle(
        "active",
        i === index
      );

    });

  }

  if (taglineLines.length > 0) {

    showTagline(0);

    setInterval(() => {

      currentTagline =
        (currentTagline + 1) %
        taglineLines.length;

      showTagline(currentTagline);

    }, 3000);

  }


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealTargets = document.querySelectorAll(
    ".about-content, .about-image-wrap, .skill-card, .achievement-wrapper, .education-item, .contact-heading, .contact-links"
  );

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
  });


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12
      }
    );


  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =========================
     SKILL STAGGER
  ========================= */

  document.querySelectorAll(".skill-card")
    .forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 80}ms`;

    });


  /* =========================
     EDUCATION STAGGER
  ========================= */

  document.querySelectorAll(".education-item")
    .forEach((item, index) => {

      item.style.transitionDelay =
        `${index * 100}ms`;

    });


  /* =========================
     HERO PHOTO PARALLAX
  ========================= */

  const heroPhoto =
    document.querySelector(".photo-frame");

  if (
    heroPhoto &&
    window.matchMedia("(hover: hover)").matches
  ) {

    document.addEventListener("mousemove", (event) => {

      if (window.innerWidth < 900) {
        return;
      }

      const x =
        (event.clientX / window.innerWidth - 0.5) * 8;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 8;

      heroPhoto.style.transform =
        `translate(${x}px, ${y}px) rotate(-3deg)`;

    });

  }


  /* =========================
     RANDOM TAG ROTATION
  ========================= */

  document.querySelectorAll(".vertical-tags span")
    .forEach((tag, index) => {

      const rotations = [-2, 1, -1, 2, -2];

      tag.style.transform =
        `rotate(${rotations[index % rotations.length]}deg)`;

    });


  /* =========================
     CERTIFICATE BUTTON
  ========================= */

  const certificateButton =
    document.querySelector(".certificate-btn");

  certificateButton?.addEventListener("click", () => {

    certificateButton.classList.add("clicked");

    setTimeout(() => {
      certificateButton.classList.remove("clicked");
    }, 500);

  });


  /* =========================
     BACK TO TOP
  ========================= */

  const backTop =
    document.querySelector(".back-top");

  backTop?.addEventListener("click", (event) => {

    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* =========================
     CURRENT YEAR
  ========================= */

  const currentYear =
    document.querySelector("#current-year");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* =========================
     PROFILE IMAGE CHECK
  ========================= */

  document.querySelectorAll("img")
    .forEach((image) => {

      image.addEventListener("error", () => {

        console.warn(
          `Image failed to load: ${image.src}`
        );

      });

    });


  /* =========================
     ESCAPE KEY
  ========================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMobileMenu();
    }

  });


  /* =========================
     PAGE LOADED
  ========================= */

  document.body.classList.add("page-loaded");

});