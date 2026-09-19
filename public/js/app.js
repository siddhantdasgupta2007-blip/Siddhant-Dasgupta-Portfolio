/* =========================================================
   SIDDHANT DASGUPTA
   NEO-BRUTALIST PORTFOLIO
   APP.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";


  /* =======================================================
     01. ELEMENT REFERENCES
     ======================================================= */

  const body = document.body;

  const navbar = document.querySelector(".navbar");

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  const navLinks = document.querySelectorAll(".nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  const sections = document.querySelectorAll("main section[id]");

  const taglineLines = document.querySelectorAll(".tagline-line");

  const footerYear = document.querySelector(".footer");


  /* =======================================================
     02. CUSTOM CURSOR
     ======================================================= */

  const supportsHover =
    window.matchMedia("(hover: hover)").matches &&
    window.matchMedia("(pointer: fine)").matches;

  if (supportsHover && cursorDot && cursorRing) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener("mousemove", (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

    });


    const animateCursor = () => {

      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);

    };

    animateCursor();


    const interactiveElements = document.querySelectorAll(
      "a, button, .skill-card, .photo-frame, .sticker, .social-box"
    );


    interactiveElements.forEach((element) => {

      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hover");
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hover");
      });

    });

  }


  /* =======================================================
     03. MOBILE MENU
     ======================================================= */

  const closeMobileMenu = () => {

    if (!menuButton || !mobileMenu) {
      return;
    }

    menuButton.classList.remove("open");

    mobileMenu.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");

    body.classList.remove("menu-open");

  };


  if (menuButton && mobileMenu) {

    menuButton.setAttribute("aria-expanded", "false");


    menuButton.addEventListener("click", () => {

      const isOpen = mobileMenu.classList.toggle("open");

      menuButton.classList.toggle("open", isOpen);

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      body.classList.toggle("menu-open", isOpen);

    });


    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        closeMobileMenu();

      });

    });


    document.addEventListener("click", (event) => {

      if (!mobileMenu.classList.contains("open")) {
        return;
      }

      const target = event.target;

      if (
        target instanceof Node &&
        !mobileMenu.contains(target) &&
        !menuButton.contains(target)
      ) {
        closeMobileMenu();
      }

    });


    window.addEventListener("resize", () => {

      if (window.innerWidth > 760) {
        closeMobileMenu();
      }

    });

  }


  /* =======================================================
     04. NAVBAR SCROLL EFFECT
     ======================================================= */

  const updateNavbar = () => {

    if (!navbar) {
      return;
    }

    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  };

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );


  /* =======================================================
     05. ACTIVE NAVIGATION
     ======================================================= */

  const updateActiveSection = () => {

    const scrollPosition =
      window.scrollY +
      window.innerHeight * 0.35;


    let currentSection = "";


    sections.forEach((section) => {

      const sectionTop = section.offsetTop;

      const sectionBottom =
        sectionTop + section.offsetHeight;


      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionBottom
      ) {
        currentSection = section.id;
      }

    });


    if (!currentSection) {
      return;
    }


    navLinks.forEach((link) => {

      const href = link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${currentSection}`
      );

    });

  };


  updateActiveSection();


  window.addEventListener(
    "scroll",
    updateActiveSection,
    { passive: true }
  );


  /* =======================================================
     06. SMOOTH ANCHOR NAVIGATION
     ======================================================= */

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
  );


  anchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }


      const target = document.querySelector(href);

      if (!target) {
        return;
      }


      event.preventDefault();


      const navbarHeight =
        navbar?.offsetHeight || 0;


      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight +
        2;


      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     07. HERO TAGLINE ROTATION
     ======================================================= */

  if (taglineLines.length > 0) {

    let currentTagline = 0;


    const showTagline = (index) => {

      taglineLines.forEach((line, i) => {

        line.style.display =
          i === index
            ? "block"
            : "none";

      });

    };


    showTagline(currentTagline);


    setInterval(() => {

      currentTagline =
        (currentTagline + 1) %
        taglineLines.length;

      showTagline(currentTagline);

    }, 3000);

  }


  /* =======================================================
     08. SCROLL REVEAL
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".about-content, " +
    ".about-visual, " +
    ".skill-card, " +
    ".achievement-card, " +
    ".education-card, " +
    ".contact-content, " +
    ".contact-links"
  );


  revealElements.forEach((element) => {

    element.classList.add("reveal");

  });


  if ("IntersectionObserver" in window) {

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
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     09. STAGGER SKILL CARDS
     ======================================================= */

  const skillCards =
    document.querySelectorAll(".skill-card");


  skillCards.forEach((card, index) => {

    card.style.transitionDelay =
      `${index * 80}ms`;

  });


  /* =======================================================
     10. STAGGER EDUCATION CARDS
     ======================================================= */

  const educationCards =
    document.querySelectorAll(".education-card");


  educationCards.forEach((card, index) => {

    card.style.transitionDelay =
      `${index * 120}ms`;

  });


  /* =======================================================
     11. PHOTO PARALLAX
     ======================================================= */

  const heroVisual =
    document.querySelector(".hero-visual");

  const photoFrame =
    document.querySelector(".photo-frame");

  const photoBackdrop =
    document.querySelector(".photo-backdrop");


  if (
    supportsHover &&
    heroVisual &&
    photoFrame &&
    photoBackdrop
  ) {

    heroVisual.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          heroVisual.getBoundingClientRect();


        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;


        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;


        const rotateX =
          y * -4;


        const rotateY =
          x * 4;


        photoFrame.style.transform =
          `rotate(-3deg) perspective(900px) ` +
          `rotateX(${rotateX}deg) ` +
          `rotateY(${rotateY}deg)`;


        photoBackdrop.style.transform =
          `rotate(3deg) translate(${x * 8}px, ${y * 8}px)`;

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        photoFrame.style.transform =
          "rotate(-3deg)";

        photoBackdrop.style.transform =
          "rotate(3deg)";

      }
    );

  }


  /* =======================================================
     12. RANDOMIZED STICKER TILT
     ======================================================= */

  const tags =
    document.querySelectorAll(".vertical-tags .tag");


  tags.forEach((tag, index) => {

    const rotations = [
      -2,
      2,
      -1,
      2,
      -2
    ];

    tag.style.transform =
      `rotate(${rotations[index % rotations.length]}deg)`;

  });


  /* =======================================================
     13. SKILL CARD MOUSE EFFECT
     ======================================================= */

  if (supportsHover) {

    skillCards.forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            (event.clientX - rect.left) /
            rect.width;


          const y =
            (event.clientY - rect.top) /
            rect.height;


          const moveX =
            (x - 0.5) * 4;


          const moveY =
            (y - 0.5) * 4;


          card.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     14. CERTIFICATE BUTTON FEEDBACK
     ======================================================= */

  const certificateButton =
    document.querySelector(".certificate-button");


  if (certificateButton) {

    certificateButton.addEventListener(
      "click",
      () => {

        certificateButton.classList.add("clicked");


        setTimeout(() => {

          certificateButton.classList.remove(
            "clicked"
          );

        }, 500);

      }
    );

  }


  /* =======================================================
     15. BACK TO TOP
     ======================================================= */

  const backToTop =
    document.querySelector('.footer a[href="#home"]');


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =======================================================
     16. CURRENT YEAR
     ======================================================= */

  if (footerYear) {

    const year =
      new Date().getFullYear();

    footerYear.innerHTML =
      footerYear.innerHTML.replace(
        /©\s*\d{4}/,
        `© ${year}`
      );

  }


  /* =======================================================
     17. IMAGE ERROR HANDLING
     ======================================================= */

  const profileImages =
    document.querySelectorAll(
      'img[src="/images/siddhu.jpg"]'
    );


  profileImages.forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        console.warn(
          "Profile image could not be loaded. " +
          "Make sure /public/images/siddhu.jpg exists."
        );

      }
    );

  });


  /* =======================================================
     18. KEYBOARD ACCESSIBILITY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        mobileMenu &&
        mobileMenu.classList.contains("open")
      ) {

        closeMobileMenu();

      }

    }
  );


  /* =======================================================
     19. PAGE LOADED
     ======================================================= */

  requestAnimationFrame(() => {

    document.body.classList.add("page-loaded");

  });

});