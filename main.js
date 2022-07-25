import { API_KEY, IMG_URL, language } from './api.js'

const body = document.querySelector("body")
const buttonSearchMovie = document.querySelector(".search-movie")
buttonSearchMovie.addEventListener("click", searchMovie)

function contentMovie(data) {
  const date = new Date(data.release_date)
  const main = document.querySelector("main")
  const section = document.querySelector(".section-movie")

  function changeHeightScreen() {
    main.contains(section.firstElementChild) ? body.classList.add("has-content") : body.classList.remove("has-content")
  }

  const detailsIsUndefined = data.title === undefined && data.overview === undefined && !data.success

  if (detailsIsUndefined) {
    section.innerHTML = `<figure>
      <img src=./assets/poster.svg>
        <figcaption>
          <p>Filme não disponível.
          Bora codar! 🚀</p>
        </figcaption>
      </figure>`
    main.prepend(section)
    changeHeightScreen()
    throw new Error("Filme não disponível")
  }

  const dateFormatted = (`${date.getDate() + 1}/${((date.getMonth() + 1))}/${date.getFullYear()}`)

  let statusPhotoMovie = data.poster_path

  if (statusPhotoMovie == null || statusPhotoMovie == undefined) {
    statusPhotoMovie = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfUowadXV1ZKEA2jolBp8iR06x148FkNTfhHq_xkC1a2NiU8-JqGaa7qESUGhz5wjzSR0&usqp=CAU`
  } else {
    statusPhotoMovie = `${IMG_URL}/${statusPhotoMovie}`
  }

  section.innerHTML = `<figure>
  <img src=${statusPhotoMovie}>
  <figcaption>
  <h3>${data.title}</h3>
  <p>Data de lançamento: ${dateFormatted}</p>
  <p>${data.overview}</p>
  <p><strong>Gêneros:</strong> ${data.genres.map(item => item.name)}</p>
  </figcaption>
  </figure>`
  main.prepend(section)
  changeHeightScreen()
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