(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------- */
  var menuToggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  function closeMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
  }

  function openMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    mobileMenu.hidden = false;
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var expanded = menuToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
      }
    });

    var mq = window.matchMedia("(min-width: 861px)");
    mq.addEventListener("change", function (e) {
      if (e.matches) closeMenu();
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal (progressive enhancement — content is visible without JS)
     ------------------------------------------------------------------- */
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(
      ".feature-card, .showcase-item, .spotlight-copy, .spotlight-visual, .pill-list, .faq-item, .benefit-strip li"
    );

    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal-init");
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });

    /* Safety net: a fast or instant scroll (anchor jump, Page Down/End,
       fling momentum) can carry an element clean across the viewport
       between two sampled frames, so 'scroll'-driven checks — and even
       the observer itself — can miss it entirely and it stays invisible
       forever. A short poll is immune to that: it isn't tied to scroll
       events firing at all, so it always catches up shortly after any
       jump, however it happened. Stops itself once nothing is left. */
    var pending = Array.prototype.slice.call(revealTargets);
    function sweepPending() {
      pending = pending.filter(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("is-visible");
          observer.unobserve(el);
          return false;
        }
        return true;
      });
      if (!pending.length) {
        clearInterval(sweepTimer);
      }
    }
    var sweepTimer = setInterval(sweepPending, 200);
    sweepPending();
  }
})();
