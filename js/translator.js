import translations from "./locales.js";
import { localStorage, localStorageKeys } from "./storage.js";

class Translator {
  static allowedLangs = Object.keys(translations);

  button = document.querySelector("button[data-change-lang]");
  elements = document.querySelectorAll("[data-i18n]");
  lang = localStorage.get(localStorageKeys.lang) ?? "ru";

  static validateLang(lang) {
    if (!Translator.allowedLangs.includes(lang)) {
      throw "the lang is not allowed";
    }
  }

  static validatePath(path) {
    if (typeof path !== "string") {
      throw "the path should be a string";
    }
  }

  static validateLangAndPath(lang, path) {
    Translator.validateLang(lang);
    Translator.validatePath(path);
  }

  changeLang(lang) {
    try {
      Translator.validateLang(lang);

      this.lang = lang;
      this.changeTranslation();
    } catch (err) {
      console.log(err);
    }
  }

  toggleLangByClick() {
    this.button.onclick = () => {
      const nextLang = this.lang === "ru" ? "en" : "ru";

      this.button.innerText = nextLang;
      this.changeLang(nextLang);
      localStorage.set(localStorageKeys.lang, nextLang);
    };
  }

  getTranslation(lang, path) {
    try {
      Translator.validateLangAndPath(lang, path);

      let res = translations[lang];
      const splittedPath = path.split(".");

      while (splittedPath.length) {
        const key = splittedPath.shift();

        if (!res[key]) {
          return "error in path";
        }

        res = res[key];
      }

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  changeTranslation() {
    this.elements.forEach((element) => {
      const path = element.getAttribute("data-i18n");
      element.innerText = this.getTranslation(this.lang, path);
    });
  }

  init() {
    this.changeTranslation();
    this.toggleLangByClick();

    this.button.innerText = this.lang;
  }
}

new Translator().init();
