import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="smooth-scroll"
export default class extends Controller {
  connect() {
    // Add smooth scroll behavior to anchor links
    this.element.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", this.scrollToTarget.bind(this));
    });
  }

  scrollToTarget(event) {
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
}
