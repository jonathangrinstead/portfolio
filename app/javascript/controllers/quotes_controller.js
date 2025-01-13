import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="quotes"
export default class extends Controller {
    static targets = ["content", "author"]
  connect() {
  }
  refresh(event) {
    const button = event.currentTarget;
    button.classList.add('fa-spin');
    fetch('https://programming-quotesapi.vercel.app/api/random')
      .then(response => response.json())
      .then(data => {
        try {
          const quoteTag = `❝ ${data.quote} ❞`;
          const authorTag = `- ${data.author}`;
          this.contentTarget.innerText = quoteTag;
          this.authorTarget.innerText = authorTag;
        } catch (error) {
          console.error('Error parsing data:', error);
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
