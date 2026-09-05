document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Efecto de escritura (borra y vuelve a escribir) ---------- */
  const phrases = [
    "Desarrollador Junior en formación",
    "Python · JavaScript · HTML · CSS",
    "Siempre aprendiendo algo nuevo"
  ];
  const roleEl = document.getElementById("role-text");
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      roleEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600); // pausa antes de borrar
        return;
      }
    } else {
      charIndex--;
      roleEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  if (roleEl) typeLoop();

  /* ---------- 2. Resaltar el enlace del menú según la sección visible ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));

  /* ---------- 3. Revelar secciones al hacer scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- 4. Mini explosión de pixeles en cada click ---------- */
  const colors = ["#ff3fa4", "#2ee6d6", "#ffcf3f", "#f2ecff"];

  function spawnBurst(x, y) {
    const count = 12;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = "burst-particle";
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const distance = 40 + Math.random() * 50;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rotation = Math.random() * 360;

      document.body.appendChild(particle);

      particle.animate(
        [
          { transform: "translate(-50%, -50%) rotate(0deg) scale(1)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rotation}deg) scale(0)`,
            opacity: 0
          }
        ],
        { duration: 500 + Math.random() * 200, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" }
      ).onfinish = () => particle.remove();
    }
  }

  document.addEventListener("click", (e) => spawnBurst(e.clientX, e.clientY));
});
