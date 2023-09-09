// INTERSECTION OBSERVER
const galleryImages = document.querySelectorAll('.gallery-item');
const offerCards = document.querySelector('.offer-cards-container');
const offerText = document.querySelector('.offer-text-container');
const aboutText = document.querySelector('.about-text-container');
const realisationsText = document.querySelector('.realisations-text-container');

function observeElement(elements, threshold) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(
            'translate-y-1/2',
            'translate-y-1/3',
            'translate-y-full',
            'opacity-0'
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );
  elements.forEach(element => observer.observe(element));
}

observeElement([aboutText, offerCards, ...galleryImages], 0);
observeElement([offerText, realisationsText], 0.5);

// LAZY LOADING IMAGES
function runLazyLoadingImages() {
  const blurBg = document.querySelectorAll('.blur-load');

  blurBg.forEach(bg => {
    const img = bg.querySelector('img');

    function loaded() {
      bg.classList.add('loaded');
      console.log('loaded');
    }

    if (img.complete) loaded();
    else img.addEventListener('load', loaded);
  });
}

runLazyLoadingImages();

// NAVIGATION SEARCH BAR
const magnifier = document.querySelector('.magnifier');
const searchInput = document.querySelector('#search-input');

function toggleMagnifier(e) {
  e.preventDefault();

  if (searchInput.classList.contains('invisible')) {
    searchInput.classList.remove('invisible');
    setTimeout(() => searchInput.classList.add('w-48', 'px-1'), 0);
  } else {
    searchInput.classList.remove('w-48', 'px-1');
    setTimeout(() => searchInput.classList.add('invisible'), 250);
  }
}

magnifier.addEventListener('click', toggleMagnifier);

// SLIDER
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider-btn-left');
const btnRight = document.querySelector('.slider-btn-right');
const dotsContainer = document.querySelector('.slider-dots-container');

let isSliderVisible = true;
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

function handleArrowKeysSlider(e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', handleArrowKeysSlider);

function createDots() {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="slider-dot w-3 h-3 border-2 border-solid border-beige rounded-full transition-colors duration-300" data-slide="${i}"></button>`
    );
  });
}

function activateDot(slide) {
  document.querySelectorAll('.slider-dot').forEach(dot => {
    dot.classList.add('bg-transparent');
    dot.classList.remove('bg-beige');
  });

  const activeSlide = document.querySelector(
    `.slider-dot[data-slide="${slide}"]`
  );

  activeSlide.classList.remove('bg-transparent');
  activeSlide.classList.add('bg-beige');
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
const gradient = document.querySelector('.gradient');
const loadingSpinner = document.querySelector('.loading-spinner');

function loadImageAsync(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
}

btnExpandGallery.addEventListener('click', () => {
  const imagePromises = [];
  const galleryItemsHTML = [];

  loadingSpinner.classList.remove('hidden');

  for (let i = 13; i <= 24; i++) {
    const galleryItem = `
        <button
          class="gallery-item blur-load bg-cover bg-center overflow-hidden opacity-0 translate-y-1/3 transition-all duration-500"
          style="
            background-image: url(src/assets/gallery-images/gallery-${i}-small.webp);
          "
        >
          <img
            src="src/assets/gallery-images/gallery-${i}.webp"
            alt="Zdjecie pięknie zaprojektowanego ogrodu"
            class="block w-full h-full object-center object-cover opacity-0 hover:scale-110 transition-all duration-500 cursor-magnifier"
            loading="lazy"
          />
        </button>
   `;
    galleryItemsHTML.push(galleryItem);
    const imageSrc = `src/assets/gallery-images/gallery-${i}.webp`;
    imagePromises.push(loadImageAsync(imageSrc));
  }

  Promise.all(imagePromises)
    .then(() => {
      gallery.insertAdjacentHTML('beforeend', galleryItemsHTML.join(''));

      const galleryImages = document.querySelectorAll('.gallery-item');
      maxImages = galleryImages.length;

      gradient.classList.add('invisible');
      btnExpandGallery.classList.add('invisible');
      loadingSpinner.classList.add('hidden');
      observeElement([...galleryImages], 0);
      runLazyLoadingImages();
    })
    .catch(error => {
      console.error('Image loading error:', error);
    });
});

// GALLERY POPUP
const overlay = document.querySelector('.popup-overlay');
const popup = document.querySelector('.gallery-popup');
const popUpImg = document.querySelector('.gallery-popup img');
const btnPopUpLeft = document.querySelector('.btn-popup-left');
const btnPopUpRight = document.querySelector('.btn-popup-right');
const btnClosePopUp = document.querySelector('.btn-close-popup');

let maxImages = galleryImages.length;
let isGalleryVisible = false;

function togglePopUp() {
  overlay.classList.toggle('invisible');
  overlay.classList.toggle('opacity-0');
  popup.classList.toggle('invisible');
  popup.classList.toggle('opacity-0');
  popUpImg.classList.toggle('-translate-x-[9999px]');

  isSliderVisible = !isSliderVisible;
  isGalleryVisible = !isGalleryVisible;

  isSliderVisible
    ? document.addEventListener('keydown', handleArrowKeysSlider)
    : document.removeEventListener('keydown', handleArrowKeysSlider);

  if (isGalleryVisible) {
    removeFocusFromAllElements();
    btnClosePopUp.removeAttribute('tabindex');
    btnPopUpLeft.removeAttribute('tabindex');
    btnPopUpRight.removeAttribute('tabindex');
    document.addEventListener('keydown', handleKeyDownEscape);
  } else {
    restoreFocusToAllElements();
    document.removeEventListener('keydown', handleKeyDownEscape);
  }
}

gallery.addEventListener('click', e => {
  const button = e.target.closest('.gallery-item');
  if (!button) return;

  const img = button.querySelector('img');
  let currentImage = parseInt(img.src.match(/gallery-(\d+)/)[1]);

  updateDisplayedPopUpImage(currentImage);
  togglePopUp();
});

btnClosePopUp.addEventListener('click', togglePopUp);

function updateDisplayedPopUpImage(image) {
  if (image === 1) btnPopUpLeft.classList.add('hidden');
  else btnPopUpLeft.classList.remove('hidden');

  if (image === maxImages) btnPopUpRight.classList.add('hidden');
  else btnPopUpRight.classList.remove('hidden');

  const newSrc = `src/assets/gallery-images/gallery-${image}.webp`;
  popUpImg.src = newSrc;
}

function nextImage() {
  let currentImage = parseInt(popUpImg.src.match(/gallery-(\d+)/)[1]);

  if (currentImage === maxImages) return;

  currentImage++;
  updateDisplayedPopUpImage(currentImage);
}

function prevImage() {
  let currentImage = parseInt(popUpImg.src.match(/gallery-(\d+)/)[1]);

  if (currentImage === 1) return;

  currentImage--;
  updateDisplayedPopUpImage(currentImage);
}

function handleArrowKeysGallery(e) {
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
}

function handleKeyDownEscape(e) {
  if (e.key === 'Escape') togglePopUp();
}

btnPopUpRight.addEventListener('click', nextImage);
btnPopUpLeft.addEventListener('click', prevImage);
document.addEventListener('keydown', handleArrowKeysGallery);

function removeFocusFromAllElements() {
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    if (element.getAttribute('tabindex') !== '-1')
      element.setAttribute('tabindex', -2);
  });
}

function restoreFocusToAllElements() {
  const elementsWithRemovedFocus = document.querySelectorAll('[tabindex="-2"]');
  elementsWithRemovedFocus.forEach(element =>
    element.removeAttribute('tabindex')
  );
}

// FOOTER - CURRENT YEAR COPYRIGHT
const curYearElement = document.querySelector('.current-year');
const curYear = new Date().getFullYear();
curYearElement.textContent = curYear;
