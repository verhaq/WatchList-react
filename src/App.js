import "./App copy.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import MovieScreen from "./components/MovieScreen";
import Watchlist from "./components/Watchlist";
// import MovieCard from "./components/MovieCard"

function App() {
  const [list, setList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  const addMovie = (movie) => setList([...list, movie]);

  
  const getData = () => {
    axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieList(res.data.results);
      });
    };
    
    useEffect(() => {
      getData();
    }, [page]);
    
    const removeMovie = (movie) => {
      const newState = list.filter((item) => {
        return item.id !== movie.id;
      });
      setList(newState);
    };

    return (
    <div className="App">
      <Header />
      <main>
        <MovieScreen
          addMovie={addMovie}
          movieList={movieList}
          page={page}
          setPage={setPage}
          list={list}
          removeMovie={removeMovie}
        />
        <Watchlist list={list} removeMovie={removeMovie}/>
      </main>
    </div>
  );
}

export default App;

