import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import logo from '../app/images/logoblack.svg'

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
      <ul>
        <li><Link to='/' className='header-link'>Cookbook</Link></li>
        <li><Link to='/recipes' className='header-link'>Recipes</Link></li>
        <li><Link to='/list' className='header-link'>List</Link></li>
      </ul>
      <img src={logo} alt="SmithList Logo" />
      <button className='header-btn' onClick={onLogout}>
        Logout
      </button>
    </header>
  )
}

export default Header
