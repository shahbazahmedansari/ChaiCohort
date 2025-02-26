const images = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Beautiful Mountain Landscape',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Ocean Sunset View',
  },
  {
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Autumn Forest Path',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Urban City Skyline',
  },
];


const carouselTrack = document.getElementById("carouselTrack");
const caption = document.getElementById("caption");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const carouselNav = document.getElementById("carouselNav");
const autoPlayButton = document.getElementById("autoPlayButton");
const timerDisplay = document.getElementById("timerDisplay");

let currentIndex = 0;
let autoPlayInterval;
let countdownInterval;
let countdown = 3;


images.forEach((image, index) => {
  const slide = document.createElement("div");
  slide.classList.add("carousel-slide");
  slide.style.backgroundImage = `url(${image.url})`;
  carouselTrack.appendChild(slide);

  const indicator = document.createElement('div');
  indicator.classList.add("carousel-indicator");
  if (index === 0) indicator.classList.add("active");
  indicator.setAttribute("data-index", index);
  indicator.addEventListener("click", () => goToSlide(index));
  carouselNav.appendChild(indicator);
});

function updateCarousel() {
  const slideWidth = document.querySelector(".carousel-slide").offsetWidth;
  carouselTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
  caption.innerText = images[currentIndex].caption;

  document.querySelectorAll(".carousel-indicator").forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

function prevSlide() {
  resetAutoPlay();
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  updateCarousel();
}

function nextSlide() {
  resetAutoPlay();
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  updateCarousel();
}

function goToSlide(index) {
  resetAutoPlay();
  currentIndex = index;
  updateCarousel();
}

let isPlaying = false;

function toggleAutoPLay() {
  if (isPlaying) {
    clearInterval(autoPlayInterval);
    clearInterval(countdownInterval);
    autoPlayButton.innerText = "Start Auto Play";
    timerDisplay.innerText = "";
  } else {
    startCountDown();
    autoPlayButton.innerText = "Stop Auto Play";
  }
  isPlaying = !isPlaying;
}

function startCountDown() {
  clearInterval(countdownInterval);
  countdown = 3;
  timerDisplay.innerText = `Next slide in ${countdown}...`;

  countdownInterval = setInterval(() => {
    countdown--;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      nextSlide();
      startCountDown();
    } else {
      timerDisplay.innerText = `Next slide in ${countdown}...`;
    }
  }, 1000);
}

function resetAutoPlay() {
  if (isPlaying) {
    clearInterval(countdownInterval);
    startCountDown();
  }
}

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);
autoPlayButton.addEventListener("click", toggleAutoPLay);

updateCarousel();