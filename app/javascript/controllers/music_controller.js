import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="music"
export default class extends Controller {
  static targets = ["img", "name", "song"]
  connect() {
    const headers = {'Authorization': `Bearer ${gon.token}`};
    fetch('https://api.spotify.com/v1/me/player/recently-played', {headers})
      .then(response => response.json ())
      .then ((data) => {
        const img = data.items[0].track.album.images[1].url
        const name = data.items[0].track.album.artists[0].name
        const song = data.items[0].track.name
        this.imgTarget.innerHTML = `<img src="${img}" alt="artwork_img" style="width:150px; height:150px; border-radius:20px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">`
        this.nameTarget.innerText = name
        this.songTarget.innerText = song
    });
  }
}
