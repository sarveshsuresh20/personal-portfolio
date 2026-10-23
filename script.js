
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const typingText = document.getElementById("typingText");
  const progress = document.getElementById("progress");
  const year = document.getElementById("year");

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("click", event => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  }

  // Typing animation
  if (typingText) {
    const words = ["Python", "C", "Java", "Web Development"];
    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingText.textContent = currentWord.substring(0, charIndex);

      let delay = deleting ? 65 : 110;

      if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      } else if (!deleting && charIndex === words[wordIndex].length) {
        deleting = true;
        delay = 1200;
      }

      window.setTimeout(typeEffect, delay);
    }

    window.setTimeout(typeEffect, 1600);
  }

  // Scroll progress bar
  function updateProgress() {
    if (!progress) return;

    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage =
      scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

    progress.style.width = `${percentage}%`;
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Current year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Reveal sections as they enter the screen
  const revealItems = document.querySelectorAll(
    ".section-heading, .glass-card, .skill-card, .project-card, .education-card, .learning-banner"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(item => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }
});
