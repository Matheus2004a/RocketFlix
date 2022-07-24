import { API_KEY, IMG_URL, language } from './api.js'

const buttonSearchMovie = document.querySelector(".search-movie")
buttonSearchMovie.addEventListener("click", searchMovie)

function contentMovie(data) {
  console.log(data)

  const date = new Date(data.release_date)
  const main = document.querySelector("main")
  const section = document.querySelector(".section-movie")

  const detailsIsUndefined = data.title === undefined && data.overview === undefined && !data.success

  if (detailsIsUndefined) {
    section.innerHTML = `<figure>
      <img src=./assets/poster.svg>
        <figcaption>
          <p id="descriptionMovies">Filme não disponível.
          Bora codar! 🚀</p>
        </figcaption>
      </figure>`
    main.prepend(section)
    throw new Error("Filme não disponível")
  }

  const dateFormatted = (`${date.getDate() + 1}/${((date.getMonth() + 1))}/${date.getFullYear()}`); 

  section.innerHTML = `<figure>
      <img src=${IMG_URL}/${data.poster_path}>
        <figcaption>
          <h3 id="titleMovie">${data.title}</h3>
          <p>Data de lançamento: ${dateFormatted}</p>
          <p id="descriptionMovies">${data.overview}</p>
          <p><strong>Gêneros:</strong> ${data.genres.map(item => item.name)}</p>
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
        try {
          contentMovie(dataRequest)
        } catch (error) {
          console.log(error.message)
        }
      })
  }).catch(error => {
    console.log(error)
  })
}