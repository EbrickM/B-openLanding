import { defaultLang, translate } from './translations.js';

export function getStoredLang() {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
  return stored === 'en' || stored === 'es' ? stored : defaultLang;
}

export function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = translate(lang, el.getAttribute('data-i18n'));
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', translate(lang, el.getAttribute('data-i18n-placeholder')));
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    el.setAttribute('aria-label', translate(lang, el.getAttribute('data-i18n-aria-label')));
  });

  document.querySelectorAll('[data-lang-select]').forEach((el) => {
    el.value = lang;
  });

  localStorage.setItem('lang', lang);
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function initLanguage() {
  const lang = getStoredLang();
  applyLanguage(lang);
  return lang;
}
