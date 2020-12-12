import React, { useState as uState } from "react"
import Popup from "./Popup"

const img_api = "https://image.tmdb.org/t/p/w500"

const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "green"
  } else if (vote >= 6) {
    return "yellow"
  } else {
    return "red"
  }
}

const MovieList = ({
  title,
  poster_path,
  overview,
  vote_average,
  release_date,
}) => {
  const [isOpen, setIsOpen] = uState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section className="interface">
      <img
        src={
          poster_path
            ? img_api + poster_path
            : "https://images.pexels.com/photos/3693701/pexels-photo-3693701.jpeg?cs=srgb&dl=pexels-olenka-sergienko-3693701.jpg&fm=jpg"
        }
        alt={title}
      />
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div>
        <input
          className="btn"
          type="button"
          value="Read More"
          onClick={togglePopup}
        />
        {isOpen && (
          <Popup
            content={
              <>
                <h2>{title}</h2>
                <div>
                  <h5>Vote Average:</h5>
                  <span className={`tag ${setVoteClass(vote_average)}`}>
                    {" "}
                    {vote_average}{" "}
                  </span>
                </div>
                <h5>Release Date: {release_date}</h5>
                <p>{overview}</p>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </section>
  )
}

export default MovieList
