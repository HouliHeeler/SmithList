import { useDispatch } from 'react-redux'
import { deleteRecipe } from '../features/recipes/recipeSlice'
import { FaMinus } from 'react-icons/fa';

function RecipeItem({ recipe, showRecipe }) {
  const dispatch = useDispatch()

  return (
    <div className='meal-block' onClick={() => showRecipe(recipe._id)}>
      <button onClick={() => dispatch(deleteRecipe(recipe._id))} className='close'>
        <FaMinus />
      </button>
      <span>{recipe["text"][0].recipe}</span>
    </div>
  )
}

export default RecipeItem
