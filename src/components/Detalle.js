import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from '@sweetalert/with-react'

const Detalle = () => {

  const [ movie, setMovie ] = useState(null)

  const navigate = useNavigate()

  let token = sessionStorage.getItem('token')

  useEffect(() => {
    if(!token) {
      navigate('/')
    }
  }, [token, navigate])

  let query = new URLSearchParams(window.location.search)
  let movieId = (query.get('movieId'))

  useEffect(() => {
    const data = 
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=fafdbee44b2f0f66360e7abaf3c096f6&language=en-US`
    axios.get(data)
      .then(res => {
        setMovie(res.data)
      })
      .catch(err => {
        console.log(err)
        swal(<h2>Hubo un error. Intenta mas tarde</h2>)
      })
  }, [movieId])
  
  return (
    <>
    { movie && 
      <>
        <h2>Titulo: { movie.title }</h2>
        <div className='row'>
          <div className='col-4'>
            <img 
              src={ `https://image.tmdb.org/t/p/w500${movie.poster_path}` } 
              alt="Card cap" 
              className='img-fluid'
            />
          </div>
          <div className='col-8'>
            <h5>Fecha de estreno: { movie.release_date }</h5>
            <h5>Reseña:</h5>
            <p>{ movie.overview }</p>
            <h5>Rating: { movie.vote_average }</h5>
            <ul>
              {
                movie.genres.map((genre, index) => (
                  <li key={index}>{ genre.name }</li>
                ))
              }
            </ul>
          </div>
        </div>
      </>
    }
    </>
  )
}

export default Detalle