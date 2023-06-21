import { localStorage, localStorageKeys } from "./storage.js";

class Theme {
  themeBlock = document.querySelector(".js-theme");
  themeBlockBtns = this.themeBlock.querySelectorAll(
    "button[data-theme-variant]"
  );

  changeThemeByClick() {
    this.themeBlock.addEventListener("click", (e) => {
      const themeVariant = e.target.getAttribute("data-theme-variant");
      if (!themeVariant) return;

      this.themeBlockBtns.forEach((themeButton) =>
        e.target === themeButton
          ? e.target.classList.add("active")
          : themeButton.classList.remove("active")
      );

      document.body.setAttribute("data-theme", themeVariant);
      localStorage.set(localStorageKeys.theme, themeVariant);
    });
  }

  changeThemeByStorageEvent() {
    localStorage.addStorageEvent(
      localStorageKeys.theme,
      ({ value: themeVariant }) => {
        this.themeBlockBtns.forEach((themeButton) =>
          themeButton.classList.contains(themeVariant)
            ? themeButton.classList.add("active")
            : themeButton.classList.remove("active")
        );

        document.body.setAttribute("data-theme", themeVariant);
      }
    );
  }

  init() {
    this.changeThemeByClick();
    this.changeThemeByStorageEvent();
  }
}

new Theme().init();
