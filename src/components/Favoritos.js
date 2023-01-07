import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Favoritos = (props) => {

  const { addOrRemoveFavorite, favourites } = props

  let token = sessionStorage.getItem('token')

  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <>
      <div className='row'>
        { !favourites.length && <h1 className='text-center'>No hay películas en favoritos</h1> }
        {
          favourites.map((movie, index) => (
            <div className='col-3' key={index}>
              <div className="card my-4">
                <img 
                  className="card-img-top" 
                  src={ `https://image.tmdb.org/t/p/w500${movie.imgURL}` }
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

export default Favoritos