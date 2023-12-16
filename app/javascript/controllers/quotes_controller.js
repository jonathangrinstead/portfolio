import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="quotes"
export default class extends Controller {
    static targets = ["content", "author"]
  connect() {
  }
  refresh() {
    fetch('https://raw.githubusercontent.com/skolakoda/programming-quotes-api/master/Data/quotes.json')
    .then(response => response.json ())
    .then ((data) => {
      console.log(data)
      const randQuote = data[Math.floor(Math.random()*data.length)];
      const quoteTag = `❝ ${randQuote.en} ❞`
      const authorTag = `- ${randQuote.author}`
      this.contentTarget.innerText = quoteTag
      this.authorTarget.innerText = authorTag
    });
  }
}
