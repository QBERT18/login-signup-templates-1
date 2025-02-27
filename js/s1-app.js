const s1_slider = document.querySelector(".s1-slider");
const s1_slides = Array.from(document.querySelectorAll(".s1-slide"));
const s1_slideIndicator = document.querySelectorAll(".s1-indicator");

const s1_firstClone = s1_slides[0].cloneNode(true);
const s1_lastClone = s1_slides[s1_slides.length - 1].cloneNode(true);

s1_slider.appendChild(s1_firstClone);
s1_slider.insertBefore(s1_lastClone, s1_slides[0]);

let s1_currentIndex = 1; // Start at 1 because the first slide is now a clone
let s1_isTransitioning = false;

const s1_updatedSlides = document.querySelectorAll(".s1-slide"); // Update the slide list

s1_slider.style.transform = `translateX(-${s1_currentIndex * 100}%)`;

function s1_goToSlide(index) {
  if (s1_isTransitioning) return;
  s1_isTransitioning = true;

  s1_slider.style.transition = "transform 0.5s ease";
  s1_slider.style.transform = `translateX(-${index * 100}%)`;

  setTimeout(() => {
    s1_isTransitioning = false;

    if (index === s1_updatedSlides.length - 1) {
      s1_currentIndex = 1;
      s1_slider.style.transition = "none";
      s1_slider.style.transform = `translateX(-${s1_currentIndex * 100}%)`;
    } else if (index === 0) {
      s1_currentIndex = s1_updatedSlides.length - 2;
      s1_slider.style.transition = "none";
      s1_slider.style.transform = `translateX(-${s1_currentIndex * 100}%)`;
    } else {
      s1_currentIndex = index;
    }

    // Update active indicator
    document
      .querySelector(".s1-indicator.s1-active")
      ?.classList.remove("s1-active");
    if (s1_currentIndex > 0 && s1_currentIndex < s1_updatedSlides.length - 1) {
      s1_slideIndicator[s1_currentIndex - 1]?.classList.add("s1-active");
    }
  }, 500);
}

function s1_autoSlide() {
  s1_goToSlide(s1_currentIndex + 1);
}

setInterval(s1_autoSlide, 3000);

function s1_showPassword(element) {
  const passwordInput = element.previousElementSibling.previousElementSibling;
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    element.classList.remove("fa-eye");
    element.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    element.classList.remove("fa-eye-slash");
    element.classList.add("fa-eye");
  }
}
