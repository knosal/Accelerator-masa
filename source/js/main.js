import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
// ---------------------------------

// ---------------------------------
window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();
  window.addEventListener('load', () => {
    //createScript() //pixelperfect;
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});
