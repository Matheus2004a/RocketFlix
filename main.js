import { API_KEY, IMG_URL, language } from './api.js'

const buttonSearchMovie = document.querySelector(".search-movie")
buttonSearchMovie.addEventListener("click", searchMovie)

function contentMovie(data) {
  console.log(data)

  const main = document.querySelector("main")
  const section = document.querySelector(".section-movie")

  section.innerHTML = `<figure>
      <img src=${IMG_URL}/${data.poster_path}>
        <figcaption>
          <h3 id="titleMovie">${data.title}</h3>
          <p id="descriptionMovies">${data.overview}</p>
        </figcaption>
      </figure>`
  main.prepend(section)
}

async function searchMovie() {
  const randomId = Math.floor(Math.random() * 4000)
  const url = `https://api.themoviedb.org/3/movie/${randomId}?${API_KEY}&${language}`;

  await fetch(url).then(requestUrl => {
    requestUrl.json()
      .then(dataRequest => {
        contentMovie(dataRequest)
      })
  }).catch(error => {
    console.log(error)
  })
}

/* img.classList.add("img-error")
img.src = "./assets/poster.svg"
titleMovie.textContent = `Ops, hoje não é dia de assistir filme.
Bora codar! 🚀` */