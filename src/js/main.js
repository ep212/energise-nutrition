const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");
const yearEl = document.getElementById("year");
const waterForm = document.getElementById("water-form");
const waterResult = document.getElementById("water-result");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (waterForm && waterResult) {
  waterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(waterForm);
    const weight = Number(formData.get("weight"));
    const activityFactor = Number(formData.get("activity"));

    if (!Number.isFinite(weight) || weight <= 0) {
      waterResult.textContent = "Please enter a valid weight.";
      return;
    }

    const liters = ((weight * 0.033) * activityFactor).toFixed(2);
    waterResult.textContent = `Estimated daily water target: ${liters} L`;
  });
}

const revealSections = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealSections.length > 0) {
  const observer = new IntersectionObserver(
    (entries, sectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add("visible"));
}
