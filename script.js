(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const yearNodes = document.querySelectorAll("[data-year]");

  yearNodes.forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav && header) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !open);
      header.classList.toggle("nav-open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        nav.classList.remove("is-open");
        header.classList.remove("nav-open");
      });
    });
  }

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const dotsWrap = carousel.querySelector("[data-carousel-dots]");
    if (!track || slides.length < 2) return;

    let index = 0;

    const dots = slides.map((slide, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Go to photo ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap?.appendChild(dot);
      return dot;
    });

    const goTo = (next) => {
      index = (next + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, i) => {
        slide.setAttribute("aria-hidden", String(i !== index));
      });
      dots.forEach((dot, i) => {
        dot.setAttribute("aria-current", String(i === index));
      });
    };

    carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => goTo(index - 1));
    carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => goTo(index + 1));

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "ArrowRight") goTo(index + 1);
    });

    goTo(0);
  });
})();
