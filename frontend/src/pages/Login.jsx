import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

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

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and Start Setting Goals</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
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
            <button className='btn btn-block' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login