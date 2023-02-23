import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import RecipeItem from '../components/RecipeItem'
import { getRecipes, reset } from '../features/recipes/recipeSlice'

function Controls({ pageName, setChosenRecipe, chosenRecipe }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { recipes, isLoading, isError, message } = useSelector(
    (state) => state.recipes
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getRecipes())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  function showRecipe(id) {
    const recipeClicked = recipes.filter(recipe => recipe._id === id)
    setChosenRecipe({
      "thumbnail_url": recipeClicked[0].text[0].image,
      "name": recipeClicked[0].text[0].recipe,
      "instructions": recipeClicked[0].text[0].instructions,
      "sections": recipeClicked[0].text[0].sections,
    })
    localStorage.setItem('chosenRecipe', JSON.stringify(chosenRecipe))
  }

  return (
    <div>
      <Header pageName={pageName}/>
      <section className='meals'>
        {recipes.length > 0 ? (
          <div className='meals-chosen'>
            {recipes.map((recipe) => (
              <RecipeItem key={recipe._id} recipe={recipe} showRecipe={showRecipe} />
            ))}
          </div>
        ) : (
          <span>You haven't chosen any meals!</span>
        )}
      </section>
    </div>
  )
}

export default Controls