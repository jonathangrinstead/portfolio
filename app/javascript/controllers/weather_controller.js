import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="weather"
export default class extends Controller {
    static targets = ["location", "img", "temp", "description"]
    connect() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${"1ebff6fdcdba27d05abaf54150e6e7e5"}&units=metric`)
      .then(response => response.json ())
      .then ((data) => {
        console.log(data)
        const weatherImage = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
        this.imgTarget.innerHTML = `<img src="${weatherImage}" alt="weather_img">`
        this.tempTarget.innerText = `${parseInt(data.main.temp)}°`
        this.locationTarget.innerText = data.name
        this.descriptionTarget.innerText = data.weather[0].description
    });
  }
}
