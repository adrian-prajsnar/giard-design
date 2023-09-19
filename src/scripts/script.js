// INTERSECTION OBSERVER
const elementsWithThreshold0 = document.querySelectorAll('.obs-thresh-0');
const elementsWithThreshold05 = document.querySelectorAll('.obs-thresh-05');
const elementsWithThreshold1 = document.querySelectorAll('.obs-thresh-1');

function observeElement(elements, threshold) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(
            'translate-y-1/2',
            'translate-y-1/4',
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

observeElement([...elementsWithThreshold0], 0);
observeElement([...elementsWithThreshold05], 0.5);
observeElement([...elementsWithThreshold1], 1);

// LAZY LOADING IMAGES
function loadLazyImages() {
  const blurBg = document.querySelectorAll('.blur-load');

  blurBg.forEach(bg => {
    const img = bg.querySelector('img');

    function loaded() {
      bg.classList.add('loaded');
    }

    if (img.complete) loaded();
    else img.addEventListener('load', loaded);
  });
}

loadLazyImages();

// MOBILE NAVIGATION
const navMobile = document.querySelector('.nav-mobile');
const btnExpandNav = document.querySelector('.btn-expand-nav');
const btnCloseNav = document.querySelector('.btn-close-nav');
const btnToggleNav = document.querySelector('.btn-toggle-nav');
const navItems = document.querySelectorAll('nav li a');
const magnifier = document.querySelector('.magnifier');

let isNavOpen = false;

function toggleNav() {
  isNavOpen = !isNavOpen;

  navMobile.classList.toggle('media-1024:invisible');
  navMobile.classList.toggle('media-1024:opacity-0');
  navMobile.classList.toggle('media-1024:translate-x-full');
  btnExpandNav.classList.toggle('invisible');
  btnExpandNav.classList.toggle('opacity-0');
  btnExpandNav.classList.toggle('-rotate-90');
  btnCloseNav.classList.toggle('invisible');
  btnCloseNav.classList.toggle('opacity-0');
  btnCloseNav.classList.toggle('-rotate-90');

  if (isNavOpen) {
    removeFocusFromAllElements();
    navItems.forEach(navItem => navItem.removeAttribute('tabindex'));
    btnToggleNav.removeAttribute('tabindex');
    magnifier.removeAttribute('tabindex');
    searchInput.removeAttribute('tabindex');
  } else {
    restoreFocusToAllElements();
  }
}

btnToggleNav.addEventListener('click', toggleNav);
navItems.forEach(navItem => navItem.addEventListener('click', toggleNav));

// NAVIGATION SEARCH BAR
const sectionOfferQueries = [
  'oferta',
  'działamy kompleksowo',
  'inwestycje',
  'tereny zielone',
  'ogród',
  'nowoczesne ogrody',
  'obsługa',
  'wizualizacje',
]
  .join('')
  .replaceAll(' ', '');

const sectionAboutQueries = [
  'o firmie',
  'tworzymy z pasją',
  'zespół',
  'projektant',
  'projektanci',
  'architekt',
  'architekci',
  'specjalizacja',
  'poznaj nas bliżej',
]
  .join('')
  .replaceAll(' ', '');

const sectionRealisationsQueries = [
  'projekt',
  'nasze projekty',
  'realizacje',
  'rozwiń',
  'pokaż',
  'zdjęcia',
  'ogrody',
]
  .join('')
  .replaceAll(' ', '');

const sectionInstagramQueries = 'instagram';

const sectionFooterQueries = [
  'skontaktuj się z nami',
  'kontakt',
  'facebook',
  'linkedin',
  'numer telefonu',
  'e-mail',
  'email',
]
  .join('')
  .replaceAll(' ', '');

const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const queryError = document.querySelector('.query-error');

form.addEventListener('submit', e => {
  e.preventDefault();

  const query = searchInput.value.toLowerCase().trim().replaceAll(' ', '');

  if (!query) toggleMagnifier();
  else if (query.length > 2) {
    if (sectionOfferQueries.includes(query)) moveToSection('offer');
    else if (sectionAboutQueries.includes(query)) moveToSection('about');
    else if (sectionRealisationsQueries.includes(query))
      moveToSection('realisations');
    else if (sectionInstagramQueries.includes(query))
      moveToSection('instagram');
    else if (sectionFooterQueries.includes(query)) moveToSection('footer');
    else throwQueryError(query);
  } else throwQueryError(query);

  searchInput.value = '';
});

searchInput.addEventListener('error', () => {
  throwQueryError();
});

function toggleMagnifier() {
  if (searchInput.classList.contains('invisible')) {
    searchInput.classList.remove('invisible');
    setTimeout(() => searchInput.classList.add('w-48', 'px-1'), 0);
  } else {
    searchInput.classList.remove('w-48', 'px-1');
    setTimeout(() => searchInput.classList.add('invisible'), 250);
  }
}

function toggleQueryError() {
  queryError.classList.toggle('opacity-0');
  queryError.classList.toggle('invisible');
  setTimeout(() => queryError.classList.toggle('opacity-0'), 4000);
  setTimeout(() => queryError.classList.toggle('invisible'), 4500);
}

function moveToSection(section) {
  toggleMagnifier();
  toggleNav();
  window.location.href = `#section-${section}`;
}

function throwQueryError(query) {
  if (queryError.classList.contains('opacity-0', 'invisible'))
    toggleQueryError();

  query.length < 3
    ? (queryError.textContent =
        'Prosimy o wpisanie co najmniej trzech znaków aby wyszukać daną frazę.')
    : (queryError.textContent = `Niestety nie znaleziono wyszukiwanej frazy, spróbuj ponownie...`);

  searchInput.focus();
}

// SLIDER
const slider = document.querySelector('.slider');
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
      `<button class="slider-dot w-3 h-3 border-2 border-solid border-beige rounded-full transition-colors duration-300 media-1024:w-2.5 media-1024:h-2.5" data-slide="${i}"></button>`
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
const galleryImages = document.querySelectorAll('.gallery-item');
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
          class="obs-thresh-0 gallery-item blur-load relative pt-[100%] bg-cover bg-center overflow-hidden rounded-3xl opacity-0 translate-y-1/4 transition-all duration-500 cursor-magnifier"
          style="
            background-image: url(./public/assets/images/gallery-images/gallery-${i}-small.webp);
          "
        >
          <img
            src="./public/assets/images/gallery-images/gallery-${i}.webp"
            alt="Zdjecie pięknie zaprojektowanego ogrodu"
            class="absolute top-0 left-0 w-full h-full block object-center object-cover opacity-0 hover:scale-110 transition-all duration-500"
            loading="lazy"
          />
        </button>
   `;
    galleryItemsHTML.push(galleryItem);
    const imageSrc = `./public/assets/images/gallery-images/gallery-${i}.webp`;
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
      loadLazyImages();
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
const imgNumEl = document.querySelector('.image-number');

let maxImages = galleryImages.length;
let isGalleryVisible = false;

function togglePopUp() {
  overlay.classList.toggle('invisible');
  overlay.classList.toggle('opacity-0');
  popup.classList.toggle('invisible');
  popup.classList.toggle('opacity-0');
  popUpImg.classList.add('opacity-0');
  imgNumEl.classList.add('opacity-0');

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
    document.addEventListener('keydown', handleArrowKeysGallery);
  } else {
    restoreFocusToAllElements();
    document.removeEventListener('keydown', handleKeyDownEscape);
    document.removeEventListener('keydown', handleArrowKeysGallery);
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
  if (image === 1) btnPopUpLeft.classList.add('invisible', 'opacity-0');
  else btnPopUpLeft.classList.remove('invisible', 'opacity-0');

  if (image === maxImages)
    btnPopUpRight.classList.add('invisible', 'opacity-0');
  else btnPopUpRight.classList.remove('invisible', 'opacity-0');

  imgNumEl.classList.add('opacity-0');
  popUpImg.classList.add('opacity-0');

  setTimeout(() => {
    const newSrc = `./public/assets/images/gallery-images/gallery-${image}.webp`;
    popUpImg.src = newSrc;
    popUpImg.classList.remove('opacity-0');
    imgNumEl.textContent = `${image}/${maxImages}`;
    imgNumEl.classList.remove('opacity-0');
  }, 300);
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
