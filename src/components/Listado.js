import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import swal from '@sweetalert/with-react'

const Listado = (props) => {

  const { addOrRemoveFavorite } = props

  const [ movies, setMovies ] = useState([])

  const navigate = useNavigate()

  let token = sessionStorage.getItem('token')

  useEffect(() => {
    if(!token) {
      navigate('/')
    }
  }, [token, navigate])

  useEffect(() => {
    const data = 'https://api.themoviedb.org/3/discover/movie?api_key=fafdbee44b2f0f66360e7abaf3c096f6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
    axios.get(data)
      .then(res => {
        setMovies(res.data.results)
      })
      .catch(err => {
        console.log(err)
        swal(<h2>Hubo un error. Intenta mas tarde</h2>)
      })
  }, [])

  return (
    <>
      <div className='row'>
        {
          movies.map((movie, index) => (
            <div className='col-3' key={index}>
              <div className="card my-4">
                <img 
                  className="card-img-top" 
                  src={ `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                  alt="Card cap" 
                />
                <button
                  onClick={addOrRemoveFavorite}
                  className='favourite-btn'
                  data-movie-id={movie.id}
                  >🖤 
                </button>
                <div className="card-body">
                  <h5 className="card-title">{ movie.title.substring(0, 30) }...</h5>
                  <p className="card-text">{ movie.overview.substring(0, 100) }...</p>
                  <Link 
                    to={`/detalle?movieId=${movie.id}`} 
                    className="btn btn-primary"
                    >Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Listado