import Swiper from '../vendor/swiper';
import {isMobile} from '../utils/is-mobile';

const initSwiper = (selector, options) => {
  const element = document.querySelector(selector);
  if (element) {
    return new Swiper(selector, {
      allowTouchMove: isMobile(),
      ...options,
    });
  }
  return null;
};

const sliderConfigs = [
  {
    selector: '.hero__swiper',
    options: {
      pagination: {
        el: '.hero__pagination',
        type: 'bullets',
        bulletClass: 'hero__pagination-bullet',
        bulletActiveClass: 'hero__pagination-bullet--active',
        clickable: true,
      },
      keyboard: true,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      focusableElements: 'a, button',

      wrapperClass: 'swiper__wrapper',
      slideClass: 'swiper__slide',
    },
  },
  {
    selector: '.programs__swiper',
    options: {
      keyboard: true,
      wrapperClass: 'swiper__wrapper',
      slideClass: 'swiper__slide',

      scrollbar: {
        el: '.programs__scrollbar',
        draggable: true,
        dragSize: 392,
        hide: false,
      },

      navigation: {
        nextEl: '.programs__swiper-button--next',
        prevEl: '.programs__swiper-button--prev',
      },

      breakpoints: {
        1259: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          spaceBetween: 30,
          slidesPerView: 'auto',
          scrollbar: {
            dragSize: 324,
          },
        },
        320: {
          slidesPerView: 1,
          scrollbar: {
            el: '',
            enabled: false,
          },
        },
      },
    },
  },
  {
    selector: '.news__swiper',
    options: {
      keyboard: true,
      wrapperClass: 'swiper__wrapper',
      slideClass: 'swiper__slide',
      cssMode: 'true',

      navigation: {
        nextEl: '.news__swiper-button--next',
        prevEl: '.news__swiper-button--prev',
      },

      pagination: {
        el: '.news__pagination',
        clickable: true,
        bulletClass: 'news__pagination-button',
        bulletActiveClass: 'news__pagination-button--active',
        renderBullet: (index, className) => {
          return '<button class="' + className + '">' + (index + 1) + '</button>';
        },
      },

      breakpoints: {
        1200: {
          slidesPerView: 'auto',
        },
        768: {
          slidesPerView: 4,
        },
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
      },
    },
  },
  {
    selector: '.feedback__swiper',
    options: {
      keyboard: true,
      wrapperClass: 'swiper__wrapper',
      slideClass: 'swiper__slide',

      scrollbar: {
        el: '.feedback__scrollbar',
        draggable: true,
        dragSize: 392,
        hide: false,
      },

      breakpoints: {
        1200: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 30,
          scrollbar: {
            dragSize: 324,
          },
        },
        320: {
          slidesPerView: 1,
          scrollbar: {
            el: '',
            enabled: false,
          },
        },
      },

      navigation: {
        nextEl: '.feedback__swiper-button--next',
        prevEl: '.feedback__swiper-button--prev',
      },
    },
  },
];

const sliders = {}; // Объект для хранения всех слайдеров

const setTabIndexAndInert = (slide, pagination, button) => {
  if (!slide.classList.contains('swiper-slide-duplicate')) {
    slide.setAttribute('tabindex', 0);
    pagination.removeAttribute('inert');
    button.removeAttribute('tabindex');
  } else {
    pagination.setAttribute('inert', '');
    button.setAttribute('tabindex', '-1');
  }
};

const initAllSliders = () => {
  sliderConfigs.forEach((config) => {
    const slider = initSwiper(config.selector, config.options);
    if (slider) {
      sliders[config.selector] = slider;
    }
  });
};

const heroSlider = sliders['.hero__swiper'];
const heroSlides = heroSlider ? heroSlider.querySelectorAll('.hero__slide') : [];

heroSlides.forEach((slide) => {
  const pagination = slide.querySelector('.hero__pagination');
  const button = slide.querySelector('.hero__slide-button');
  setTabIndexAndInert(slide, pagination, button);
});

export {initAllSliders};
