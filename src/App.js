import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";

import './app.css'
import Favoritos from "./components/Favoritos";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {

  const [ favourites, setFavourites ] = useState([])

  useEffect(() => {
    const favsInLocal = localStorage.getItem('favs')
    if(favsInLocal !== null) {
      setFavourites(JSON.parse(favsInLocal))
    }
  }, [])

  const addOrRemoveFavorite = e => {

    const favMovies = localStorage.getItem('favs')
    let tempMovieInFavs; 
    if (favMovies === null){
      tempMovieInFavs = []
    } else {
      tempMovieInFavs = JSON.parse(favMovies)
    }

    const btn = e.currentTarget
    const parent = btn.parentElement
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText
    const movieData = {
      imgURL, 
      title, 
      overview,
      id: btn.dataset.movieId
    }

    let movieIsInArray = tempMovieInFavs.find(movie => movie.id === movieData.id)

    if (!movieIsInArray) {
      tempMovieInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMovieInFavs)) 
      setFavourites(tempMovieInFavs)
      console.log('added')

    } else {
      let removeMovies = tempMovieInFavs.filter(movie => movie.id !== movieData.id)
      localStorage.setItem('favs', JSON.stringify(removeMovies))
      setFavourites(removeMovies)
      console.log('removed')
    }
  }

  return (
    <>
      <Header 
        favourites={favourites}
      />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/listado" element={<Listado addOrRemoveFavorite={addOrRemoveFavorite}/>}/>
          <Route path="/detalle" element={<Detalle />}/>
          <Route path="/resultados" element={<Resultados />}/>
          <Route path="/favoritos" element=
          {
            <Favoritos 
            addOrRemoveFavorite={addOrRemoveFavorite} 
            favourites={favourites}/>
          }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
