const l1_slider = document.querySelector(".l1-slider");
const l1_slides = Array.from(document.querySelectorAll(".l1-slide"));
const l1_slideIndicator = document.querySelectorAll(".l1-indicator");

const l1_firstClone = l1_slides[0].cloneNode(true);
const l1_lastClone = l1_slides[l1_slides.length - 1].cloneNode(true);

l1_slider.appendChild(l1_firstClone);
l1_slider.insertBefore(l1_lastClone, l1_slides[0]);

let l1_currentIndex = 1; // Start at 1 because the first slide is now a clone
let l1_isTransitioning = false;

const l1_updatedSlides = document.querySelectorAll(".l1-slide"); // Update the slide list

l1_slider.style.transform = `translateX(-${l1_currentIndex * 100}%)`;

function l1_goToSlide(index) {
  if (l1_isTransitioning) return;
  l1_isTransitioning = true;

  l1_slider.style.transition = "transform 0.5s ease";
  l1_slider.style.transform = `translateX(-${index * 100}%)`;

  setTimeout(() => {
    l1_isTransitioning = false;

    if (index === l1_updatedSlides.length - 1) {
      l1_currentIndex = 1;
      l1_slider.style.transition = "none";
      l1_slider.style.transform = `translateX(-${l1_currentIndex * 100}%)`;
    } else if (index === 0) {
      l1_currentIndex = l1_updatedSlides.length - 2;
      l1_slider.style.transition = "none";
      l1_slider.style.transform = `translateX(-${l1_currentIndex * 100}%)`;
    } else {
      l1_currentIndex = index;
    }

    // Update active indicator
    document
      .querySelector(".l1-indicator.l1-active")
      ?.classList.remove("l1-active");
    if (l1_currentIndex > 0 && l1_currentIndex < l1_updatedSlides.length - 1) {
      l1_slideIndicator[l1_currentIndex - 1]?.classList.add("l1-active");
    }
  }, 500);
}

function l1_autoSlide() {
  l1_goToSlide(l1_currentIndex + 1);
}

setInterval(l1_autoSlide, 3000);

function l1_showPassword(element) {
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
