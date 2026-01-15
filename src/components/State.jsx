import User from "../User";
import { useState } from "react";

const movie = {
  title: "Inception",
  director: "Christopher Nolan",
  year: 2010,
};

function State() {
  const [film, setMovie] = useState(movie);
  const handleClick = () => {
    setMovie({ ...film, title: "The Matrix" }); //it creates a new object with updated title and that's why it rerenders
  };

  return (
    <>
      <User isValid={true} />
      <div>
        <h1>{film.title}</h1>
        <p>Directed by: {film.director}</p>
        <p>Year: {film.year}</p>
      </div>
      <button onClick={handleClick}>Change movie</button>
    </>
  );
}

export default State;
