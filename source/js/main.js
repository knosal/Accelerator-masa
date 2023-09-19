import {initAccordions} from './vendor/accordions/init-accordion';
import {CustomSelect} from './vendor/custom-select/custom-select';
import {initModals} from './vendor/modals/init-modals';
import {iosVhFix} from './utils/ios-vh-fix';
import {Form} from './vendor/form-validate/form';

import {initAllSliders} from './modules/initSwiperSlider';
import {initNewsFilter} from './modules/initNewsFilter';
import {initLineBreaksk} from './modules/removeLineBreaks';
import {initButtonMenu} from './modules/menuToggle';
import {initMap} from './modules/map';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();
  initButtonMenu();

  window.addEventListener('load', () => {
    //createScript() //pixelperfect;
    initModals();
    initAllSliders();
    initAccordions();
    initNewsFilter();
    initLineBreaksk();
    initMap();

    const select = new CustomSelect();
    select.init();

    const form = new Form();
    if (window.form) {
      window.form = form;
    }
    form.init();
  });
});
