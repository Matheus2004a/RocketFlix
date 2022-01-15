import { API_KEY, BASE_URL, IMG_URL, language } from './api.js'

const buttonSearchMovie = document.querySelector(".search-movie")
buttonSearchMovie.addEventListener("click", searchMovie)

async function searchMovie() {
  const url = BASE_URL
  await fetch(url).then(requestUrl => {
    requestUrl.json()
      .then(dataRequest => {
        console.log(dataRequest)
        titleMovie.textContent = dataRequest.original_title
        descriptionMovies.textContent = dataRequest.overview
      })
  }).catch(error => {
    let containerImg = document.createElement("figure")
    let imgError = document.createElement("img")
    imgError.classList.add("img-error")
    imgError.src = "./assets/poster.svg"
    containerImg.appendChild(imgError)
    document.querySelectorAll(".containerMovies figure")[0].appendChild(containerImg)
    titleMovie.textContent = `Ops, hoje não é dia de assistir filme.
    Bora codar! 🚀`
    console.log(error)
  })
} 