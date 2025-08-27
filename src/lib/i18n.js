import en from '../locales/en';
import id from '../locales/id';

const languages = {
  en,
  id,
};

export const getLanguage = () => {
  const lang = localStorage.getItem('lang') || navigator.language.split('-')[0] || 'en';
  return languages[lang] ? lang : 'en';
};

export const setLanguage = (lang) => {
  localStorage.setItem('lang', lang);
  window.location.reload();
};

export const translate = (key) => {
  const lang = getLanguage();
  return languages[lang][key] || key;
};