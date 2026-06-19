/* =========================================================
   HORIZONTE BLOCKCHAIN — shared interactivity
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector(".nav-toggle-btn");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("active");
      });
    });
  }

  /* ---- Active nav link highlighting ---- */
  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a[href]").forEach((link) => {
    const href = link.getAttribute("href").toLowerCase();
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Stat count-up animation ---- */
  const statEls = document.querySelectorAll("[data-count]");
  if (statEls.length) {
    const animateCount = (el) => {
      const raw = el.getAttribute("data-count");
      const match = raw.match(/^([\d,]+)(\+?)$/);
      if (!match) return;
      const target = parseInt(match[1].replace(/,/g, ""), 10);
      const suffix = match[2] || "";
      const duration = 1200;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString("en-US") + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString("en-US") + suffix;
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statEls.forEach((el) => observer.observe(el));
  }

  /* ---- Contact form (static demo submit) ---- */
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const successEl = document.querySelector("#contact-success");
      contactForm.reset();
      contactForm.classList.add("hidden");
      if (successEl) successEl.classList.remove("hidden");
    });
  }

  /* ---- Reveal-on-scroll for cards/sections ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }
});
