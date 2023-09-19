const featureTitles = document.querySelectorAll('[data-name="feature-title"]');
const breakpoint = window.matchMedia('(max-width: 767px)');

const breakpointChecker = () => {
  featureTitles.forEach((title) => {
    const lineBreak = title.querySelector('br');
    if (lineBreak) {
      lineBreak.classList.toggle('hide-break', breakpoint.matches);
    }
  });
};

export const initLineBreaksk = () => {
  if (featureTitles.length > 0) {
    breakpointChecker();
    window.addEventListener('resize', breakpointChecker);
  }
};
