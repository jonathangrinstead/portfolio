import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dark-mode"
export default class extends Controller {
  toggle() {
    document.body.classList.toggle("dark-mode");
    this.element.classList.toggle("fa-sun");
    this.element.classList.toggle("fa-moon");
  }
}
