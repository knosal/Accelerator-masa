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
      autoplay: {
        delay: 3000, // Задержка автопрокрутки
      },
      clickable: true, // Включение кликабельных точек пагинации
      focusableElements: 'a, button', // Фокусируемые элементы
      keyboard: true, // Включение управления клавишами
      loop: true, // Зацикливание слайдов
      pagination: {
        bulletActiveClass: 'hero__pagination-bullet--active', // Класс активной точки пагинации
        bulletClass: 'hero__pagination-bullet', // Класс точки пагинации
        el: '.hero__pagination', // Элемент пагинации
        type: 'bullets', // Тип пагинации (точки)
      },
      slideClass: 'swiper__slide', // Класс слайда
      wrapperClass: 'swiper__wrapper', // Класс обертки слайдера
    },
  },
  {
    selector: '.programs__swiper',
    options: {
      breakpoints: {
        1259: {
          slidesPerView: 3, // Количество видимых слайдов
          spaceBetween: 32, // Расстояние между слайдами
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          scrollbar: {
            dragSize: 324, // Размер драга скроллбара
            el: '.programs__scrollbar', // Элемент скроллбара
            draggable: true, // Включение перетаскивания скроллбара
            hide: false, // Показывать скроллбар
          },
          slidesPerView: 'auto',
          spaceBetween: 30,
        },
        320: {
          slidesPerView: 1,
          scrollbar: {
            el: '',
            enabled: false, // Отключение скроллбара
          },
        },
      },
      keyboard: true,
      navigation: {
        nextEl: '.programs__swiper-button--next', // Элемент кнопки "Следующий слайд"
        prevEl: '.programs__swiper-button--prev', // Элемент кнопки "Предыдущий слайд"
      },
      slideClass: 'swiper__slide',
      wrapperClass: 'swiper__wrapper',
    },
  },
  {
    selector: '.news__swiper',
    options: {
      breakpoints: {
        1200: {
          slidesPerView: 'auto',
        },
        768: {
          slidesPerView: 4,
        },
        320: {
          slidesPerGroup: 2, // Количество слайдов в группе
          slidesPerView: 2,
        },
      },
      cssMode: 'true', // Включение CSS режима
      keyboard: true,
      navigation: {
        nextEl: '.news__swiper-button--next',
        prevEl: '.news__swiper-button--prev',
      },
      pagination: {
        bulletActiveClass: 'news__pagination-button--active',
        bulletClass: 'news__pagination-button',
        clickable: true,
        el: '.news__pagination',
        renderBullet: (index, className) => {
          return '<button class="' + className + '">' + (index + 1) + '</button>'; // Функция для рендеринга точек пагинации
        },
      },
      slideClass: 'swiper__slide',
      wrapperClass: 'swiper__wrapper',
    },
  },
  {
    selector: '.feedback__swiper',
    options: {
      breakpoints: {
        1200: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        768: {
          scrollbar: {
            dragSize: 324,
            el: '.feedback__scrollbar',
            draggable: true,
            hide: false,
          },
          slidesPerView: 'auto',
          spaceBetween: 30,
        },
        320: {
          slidesPerView: 1,
          scrollbar: {
            el: '',
            enabled: false,
          },
        },
      },
      keyboard: true,
      navigation: {
        nextEl: '.feedback__swiper-button--next',
        prevEl: '.feedback__swiper-button--prev',
      },
      slideClass: 'swiper__slide',
      wrapperClass: 'swiper__wrapper',
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
