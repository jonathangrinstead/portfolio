import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="music"
export default class extends Controller {
  static values = {
    client: String,
    clientSecret: String
  }
  connect() {
    console.log(this.clientValue)
    console.log(this.clientSecretValue)
  }
}
