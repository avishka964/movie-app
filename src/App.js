import React, { useEffect, useState } from "react"
import MovieList from "./components/MovieList"
require("dotenv").config()

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=`

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    getMovies(FEATURED_API)
  }, [])

  const getMovies = (api) => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results)
      })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (search) {
      getMovies(SEARCH_API + search)
      setSearch("")
    }
  }

  const handleOnChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie_container">
        {movies.length > 0 &&
          movies.map((movie) => <MovieList key={movie.id} {...movie} />)}
      </div>
      <div className="footer">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
          alt="TMDb Logo"
          height="50"
          width="200"
        />
      </div>
    </>
  )
}

export default App
