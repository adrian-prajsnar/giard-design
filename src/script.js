// NAVIGATION SEARCH BAR
const magnifier = document.querySelector('.magnifier');
const searchInput = document.querySelector('.search-input');

function toggleMagnifier() {
  if (searchInput.classList.contains('invisible')) {
    searchInput.classList.remove('invisible');
    setTimeout(() => searchInput.classList.add('expanded'), 0);
  } else {
    searchInput.classList.remove('expanded');
    setTimeout(() => searchInput.classList.add('invisible'), 250);
  }
}

magnifier.addEventListener('click', toggleMagnifier);
magnifier.addEventListener('keydown', e => {
  if (e.key === 'Enter') toggleMagnifier();
});

// SLIDER
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider-btn-left');
const btnRight = document.querySelector('.slider-btn-right');
const dotsContainer = document.querySelector('.slider-dots-container');

let curSlide = 0;
const maxSlide = slides.length;

function goToSlide(slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
}

function nextSlide() {
  curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
}

function prevSlide() {
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

function createDots() {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="slider-dot w-3 h-3 border-2 border-solid border-white-darker rounded-full" data-slide="${i}"></button>`
    );
  });
}

function activateDot(slide) {
  document.querySelectorAll('.slider-dot').forEach(dot => {
    dot.classList.add('bg-transparent');
    dot.classList.remove('bg-white-darker');
  });

  const activeSlide = document.querySelector(
    `.slider-dot[data-slide="${slide}"]`
  );
  activeSlide.classList.remove('bg-transparent');
  activeSlide.classList.add('bg-white-darker');
}

dotsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('slider-dot')) {
    const slide = e.target.dataset.slide;
    curSlide = Number(slide);
    goToSlide(curSlide);
    activateDot(curSlide);
  }
});

function initSlider() {
  goToSlide(0);
  createDots();
  activateDot(0);
}

initSlider();

// GALLERY
const gallery = document.querySelector('.gallery');
const btnExpandGallery = document.querySelector('.btn-expand-gallery');
const gradient = document.querySelector('.linear-gradient');

btnExpandGallery.addEventListener('click', () => {
  for (let i = 13; i <= 24; i++) {
    const galleryItem = `
        <button
          class="gallery-item overflow-hidden opacity-0 translate-x-1/2 transition-all duration-500"
        >
          <img
            src="src/assets/gallery-images/gallery-${i}.webp"
            alt="Zdjęcie pięknie zaprojektowanego ogrodu"
            class="block w-full h-full hover:scale-110 transition-all duration-500"
          />
        </button>
   `;
    gallery.insertAdjacentHTML('beforeend', galleryItem);
  }
  gradient.classList.add('invisible');
  btnExpandGallery.classList.add('invisible');
  loadGalleryItems();
});

function loadGalleryItems() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('translate-x-1/2');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  galleryItems.forEach(item => observer.observe(item));
}

loadGalleryItems();
