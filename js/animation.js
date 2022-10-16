
const heroBtn = document.querySelector(".hero-section__button");
const heroCircle = document.querySelector(".circle");

// Анимация стрелки на hero section
heroBtn.addEventListener("mouseout", () => {
  outAnimation();
});

function outAnimation() {
  heroCircle.classList.add("out");
  heroBtn.classList.add("out");

  setTimeout(() => {
    heroCircle.classList.remove("out");
    heroBtn.classList.remove("out");
  }, 300);
}

