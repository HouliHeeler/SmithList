import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import logo from '../app/images/logoblack.svg'

function Header({ pageName }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  //Conditional Styling to only display Links of the page not currently served
  const showCookbook = {display: pageName === "Cookbook" ? "none" : 'block'}
  const showRecipes = {display: pageName === "Recipes" ? "none" : 'block'}
  const showList = {display: pageName === "List" ? "none" : 'block'}

  return (
    <header className='header'>
      <ul>
        <li style={showCookbook} ><Link to='/' className='header-link'>Cookbook</Link></li>
        <li style={showRecipes} ><Link to='/recipes' className='header-link'>Recipes</Link></li>
        <li style={showList} ><Link to='/list' className='header-link'>List</Link></li>
      </ul>
      <img src={logo} alt="SmithList Logo" />
      <button className='header-btn' onClick={onLogout}>
        Logout
      </button>
    </header>
  )
}

export default Header
