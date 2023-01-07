import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import swal from '@sweetalert/with-react'

const Resultados = () => {

  const [ searchs, setSearchs ] = useState([])

  let query = new URLSearchParams(window.location.search)
  let keyword = (query.get('keyword'))

  useEffect(() => {
    const data = 
    `https://api.themoviedb.org/3/search/movie?api_key=fafdbee44b2f0f66360e7abaf3c096f6&language=en-US&page=1&include_adult=false&query=${keyword}`
    axios.get(data)
    .then(res => {
      if(res.data.results.length === 0) {
        swal(<h2>No hay resultados para tu busqueda</h2>)
      }
      setSearchs(res.data.results)
    })
    .catch(err => {
      console.log(err)
    })
  }, [keyword])

  return (
    <>
    { searchs.length > 0 && <h2>Resultados para: { keyword }</h2> }
    { searchs.length === 0 && <h2>No hay resultados para tu busqueda</h2> }
      <div className='row'>
        {
          searchs.map((movie, index) => (
            <div className='col-4' key={index}>
              <div className="card my-4">
                <img 
                  className="card-img-top" 
                  src={ `https://image.tmdb.org/t/p/w500${movie.poster_path}` } 
                  alt="Card cap" 
                />
                <div className="card-body">
                  <h5 className="card-title">{ movie.title.substring(0, 30) }...</h5>
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

export default Resultados