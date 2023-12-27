import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="weather"
export default class extends Controller {
    static targets = ["location", "img", "temp", "description","min", "max"]
    static values = {apiKey: String}
    connect() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${this.apiKeyValue}&units=metric`)
      .then(response => response.json ())
      .then ((data) => {
        const weatherImage = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
        this.imgTarget.innerHTML = `<img src="${weatherImage}" alt="weather_img" style="width:120px; height:120px;">`
        this.tempTarget.innerText = `${parseInt(data.main.temp)}°`
        this.maxTarget.innerText = `H: ${parseInt(data.main.temp_max)}°`
        this.minTarget.innerText = `L: ${parseInt(data.main.temp_min)}°`
        this.locationTarget.innerText = data.name
        this.descriptionTarget.innerText = data.weather[0].description
    });
  }
}
