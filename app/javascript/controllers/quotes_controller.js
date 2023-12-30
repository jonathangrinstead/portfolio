import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="quotes"
export default class extends Controller {
    static targets = ["content", "author"]
  connect() {
  }
  refresh(event) {
    const button = event.currentTarget;
    button.classList.add('fa-spin');
    fetch('https://raw.githubusercontent.com/skolakoda/programming-quotes-api/master/Data/quotes.json')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const randQuote = data[Math.floor(Math.random() * data.length)];
          const quoteTag = `❝ ${randQuote.en} ❞`;
          const authorTag = `- ${randQuote.author}`;
          this.contentTarget.innerText = quoteTag;
          this.authorTarget.innerText = authorTag;
        } else {
          console.error('Empty or invalid data array');
        }
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => {
        setTimeout(() => {
          button.classList.remove('fa-spin');
        }, 1000);
      });
  }
}
