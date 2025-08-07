document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.getElementById("navbtn");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

 

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTop");

  // Show/hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  // Smooth scroll to top
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  
const sliderTrack = document.querySelector('.slider-track');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const slides = document.querySelectorAll('.slider-card');
const sliderContainer = document.querySelector('.slider-container');

let slideIndex = 0;

function getGap() {
  return parseInt(getComputedStyle(sliderTrack).gap) || 0;
}

function getSlideWidth() {
  return slides[0].offsetWidth;
}

function getVisibleCards() {
  return Math.floor(sliderContainer.offsetWidth / (getSlideWidth() + getGap()));
}

function updateSlider() {
  const gap = getGap();
  const slideWidth = getSlideWidth();
  const visibleCards = getVisibleCards();
  const maxTranslateX = (slides.length * (slideWidth + gap)) - sliderContainer.offsetWidth;

  // Calculate desired translateX
  let translateX = slideIndex * (slideWidth + gap);

  // Clamp translateX so it never goes beyond maxTranslateX (no blank space)
  if (translateX > maxTranslateX) {
    translateX = maxTranslateX;
    // Adjust slideIndex accordingly to keep in sync
    slideIndex = Math.floor(maxTranslateX / (slideWidth + gap));
  }
  if (translateX < 0) {
    translateX = 0;
    slideIndex = 0;
  }

  sliderTrack.style.transform = `translateX(-${translateX}px)`;
}

function nextSlide() {
  slideIndex++;
  if (slideIndex > slides.length - 1) {
    slideIndex = 0;  // loop back to start
  }
  updateSlider();
}

function prevSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;  // loop to end
  }
  updateSlider();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

window.addEventListener('resize', updateSlider);

let autoSlideInterval = setInterval(nextSlide, 3000);

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 3000);
}

updateSlider();





});


