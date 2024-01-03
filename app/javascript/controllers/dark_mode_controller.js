import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dark-mode"
export default class extends Controller {
  connect() {
    if (localStorage.getItem("darkMode") === "true") {
      this.applyDarkMode(true);
    }
  }

  toggle() {
    const isDarkMode = !document.body.classList.contains("dark-mode");

    setTimeout(() => {
      this.element.classList.toggle("fa-sun", !isDarkMode);
      this.element.classList.toggle("fa-moon", isDarkMode);
    }, 150);

    this.applyDarkMode(isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }


  applyDarkMode(enable) {
    document.body.classList.toggle("dark-mode", enable);
    this.element.classList.toggle("fa-sun", !enable);
    this.element.classList.toggle("fa-moon", enable);
  }
}
