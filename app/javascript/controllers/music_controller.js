import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="music"
export default class extends Controller {
  static values = { authToken: String }
  static targets = ["img", "name", "song"]
  connect() {
    const headers = {'Authorization': `Bearer ${this.authTokenValue}`};
    fetch('https://api.spotify.com/v1/me/player/recently-played', {headers})
      .then(response => response.json ())
      .then ((data) => {
        const img = data.items[0].track.album.images[1].url
        const name = data.items[0].track.album.artists[0].name
        const song = data.items[0].track.name
        this.imgTarget.innerHTML = `<img src="${img}" alt="artwork_img" style="width:150px; height:150px; border-radius:20px;">`
        this.nameTarget.innerText = name
        this.songTarget.innerText = song
    });
  }
}
