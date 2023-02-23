import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookbook from './pages/Cookbook'
import Recipes from './pages/Recipes'
import List from './pages/List'
import Login from './pages/Login'
import Register from './pages/Register'
import { useState } from 'react'

function App() {

  //Stores selected recipe in State to be passed down throughout app
  const [chosenRecipe, setChosenRecipe] = useState(() => {
    const saved = localStorage.getItem('chosenRecipe')
    const initialValue = JSON.parse(saved)
    return initialValue || ''
  })

  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Cookbook chosenRecipe={chosenRecipe} setChosenRecipe={setChosenRecipe} />} />
            <Route path='/recipes' element={<Recipes chosenRecipe={chosenRecipe} setChosenRecipe={setChosenRecipe} />} />
            <Route path='/list' element={<List chosenRecipe={chosenRecipe} setChosenRecipe={setChosenRecipe}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
