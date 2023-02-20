import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div>
        <Link to='/' className='header-link'>GoalSetter</Link>
      </div>
      <button className='header-btn' onClick={onLogout}>
        Logout
      </button>
    </header>
  )
}

export default Header
