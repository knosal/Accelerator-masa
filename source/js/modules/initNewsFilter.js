const buttonContainer = document.querySelector('[data-news="button-container"]');
const newsBtns = buttonContainer.querySelectorAll('[data-name="news-button"]');
const newsSlides = document.querySelectorAll('[data-news="slide"]');
const isActive = 'is-active';

// Функция для обработки клика на кнопке новостей
const handleNewsButtonClick = (clickedButton) => {
  newsBtns.forEach((button) => button.classList.remove(isActive));
  clickedButton.classList.add(isActive);
};

// Функция для обновления отображения слайдов в зависимости от выбранной категории
const updateNewsSlides = (filter) => {
  newsSlides.forEach((slide) => {
    const slideFilter = slide.dataset.filter;
    const shouldShow = filter === 'all' || slideFilter === filter;

    slide.style.opacity = '0';
    slide.style.display = shouldShow ? 'block' : 'none';

    setTimeout(() => {
      slide.style.opacity = '1';
    }, 300);
  });
};

// Обработчик клика на контейнере кнопок новостей
const onBtnContainerClick = (evt) => {
  const currentBtn = evt.target.closest('[data-name="news-button"]');
  if (currentBtn) {
    if (!currentBtn.classList.contains(isActive)) {
      handleNewsButtonClick(currentBtn);
    }

    const filter = currentBtn.dataset.filter || 'all';
    updateNewsSlides(filter);
  }
};

export const initNewsFilter = () => {
  if (buttonContainer && newsBtns) {
    buttonContainer.addEventListener('click', onBtnContainerClick);
  }
};
