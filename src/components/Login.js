import React, { useEffect } from 'react'
import axios from 'axios'
import swal from '@sweetalert/with-react'

import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  let token = sessionStorage.getItem('token')

  useEffect(() => {
    if(token) {
      navigate('/listado')
    }
  }, [token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
  
    const email = e.target.email.value
    const password = e.target.password.value
  
    const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  
    if(email === '' || password === '') {
      swal(<h2>Todos los campos son obligatorios</h2>)
      return
    }
  
    if(email !== '' && !regexEmail.test(email)) {
      swal(<h2>El correo electrónico no es válido</h2>)
      return
    }
  
    if(email !== 'challenge@alkemy.org' || password !== 'react') {
      swal(<h2>El correo electrónico o la contraseña son incorrectos</h2>)
      return
    }
    axios
      .post('http://challenge-react.alkemy.org/', { email, password})
      .then(res => { 
        swal(<h2>Inicio de sesión exitoso</h2>)
        const token = res.data.token
        sessionStorage.setItem('token', token)
        navigate('/listado')
      })
  }

  return (
    <>
      <div className="row">
        <div className='col-6 offset-3'>
          <h2>formulario de Login</h2>
          <form
            onSubmit={handleSubmit}
          >
            <label className='form-label d-block mt-2'>
              <span>Correo electronico:</span> <br />
              <input
                type='text'
                name='email'
                className='form-control'
              />
            </label>
            <label className='form-label d-block mt-2'>
              <span>Contraseña:</span><br />
              <input
                type='password'
                name='password'
                className='form-control'
              />
            </label>
            <button
              type='submit'
              className='btn btn-success mt-2'
              >Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login