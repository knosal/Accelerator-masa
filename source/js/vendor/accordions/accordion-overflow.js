const openElements = document.querySelectorAll('[data-accordion="element"].is-active [data-accordion="content"]');

const updateElementHeight = () => {
  openElements.forEach((element) => {
    element.style.maxHeight = `${element.scrollHeight}px`;
  });
};

export const onElementsOverflow = () => {
  updateElementHeight();

  const target = new MutationObserver(updateElementHeight);
  openElements.forEach((element) => {
    target.observe(element, {
      childList: true,
      subtree: true,
    });
  });
};
