import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaUser } from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  function onSubmit(e) {
    e.preventDefault()

    if(password !== password2) {
      toast.error('Passwords do not match')
    }else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please Create an Account</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input className='form-control' 
                   type='text' 
                   name='name'
                   id='name'
                   placeholder='Enter Your Name'
                   onChange={handleChange} 
                   value={name}/>
          </div>
          <div className='form-group'>
            <input className='form-control' 
                   type='email' 
                   name='email'
                   id='email'
                   placeholder='Enter Your Email'
                   onChange={handleChange} 
                   value={email}/>
          </div>
          <div className='form-group'>
            <input className='form-control' 
                   type='text' 
                   name='password'
                   id='password'
                   placeholder='Enter Your Password'
                   onChange={handleChange} 
                   value={password}/>
          </div>
          <div className='form-group'>
            <input className='form-control' 
                   type='text' 
                   name='password2'
                   id='password2'
                   placeholder='Confirm Your Password'
                   onChange={handleChange} 
                   value={password2}/>
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register