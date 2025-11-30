;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LandingMain = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function qs(selector, ctx) { return (ctx || document).querySelector(selector); }
  function qsa(selector, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(selector)); }

  function initMobileMenu() {
    var toggle = qs('[data-landingsite-mobile-menu-toggle]');
    var menu = qs('[data-landingsite-mobile-menu]');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
      } else {
        menu.classList.add('hidden');
      }
    });
  }

  function initContactForm() {
    var form = qs('[data-landingsite-contact-form]');
    if (!form) return;

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      // Basic client-side validation example
      var name = qs('#name', form).value || '';
      var email = qs('#email', form).value || '';
      var message = qs('#message', form).value || '';

      // Here you would normally POST to your backend. For demo we'll show a friendly message.
      console.log('Contacto (simulado):', { name: name, email: email, message: message });
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }

      setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane mr-2"></i>Enviar Consulta';
        }
        alert('Gracias. Tu consulta se ha simulado correctamente (no se envió a ningún servidor).');
        form.reset();
      }, 900);
    });
  }

  function init() {
    // Safe init: DOMContentLoaded if needed
    try {
      initMobileMenu();
      initContactForm();
    } catch (e) {
      // avoid breaking page if something fails
      /* eslint-disable no-console */
      console.error('LandingMain init error', e);
    }
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }

  return { init: init };
}));
