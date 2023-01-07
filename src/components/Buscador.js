import React from 'react'
import swal from '@sweetalert/with-react'
import { useNavigate } from 'react-router-dom'

const Buscador = () => {

  const navigate = useNavigate()

  const handlerSubmit = (e) => {
    e.preventDefault()
    const keyword = e.currentTarget.keyword.value.trim()
    if(keyword.length === 0) {
      swal(<h5>El campo de búsqueda no puede estar vacío</h5>)
      return
    } else if (keyword.length < 4){
      swal(<h5>El campo de búsqueda debe tener al menos 4 caracteres</h5>)
      return
    } else{
      e.currentTarget.keyword.value = ''
      navigate(`/resultados?keyword=${keyword}`)
    }
  }

  return (
    <form
      className='d-flex align-items-center'
      onSubmit={handlerSubmit}
    >
      <label className='form-label mb-0 mx-2'>
        <input
          type='text'
          name='keyword'
          className='form-control'
        />
      </label>
      <button
        type='submit'
        className='btn btn-success'
        >Buscar
      </button>
    </form>
  )
}

export default Buscador