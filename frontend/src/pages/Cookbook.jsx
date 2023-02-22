import Controls from '../components/Controls'
import GoalForm from '../components/GoalForm'
import RecipeList from '../components/RecipeList'

function Cookbook({setChosenRecipe, chosenRecipe}) {
  return (
    <main className='main'>
      <Controls setChosenRecipe={setChosenRecipe} chosenRecipe={chosenRecipe} />
      <section className='recipe-block'>
        <GoalForm chosenRecipe={chosenRecipe} />
        <RecipeList setChosenRecipe={setChosenRecipe}/>
      </section>
    </main>
  )
}

export default Cookbook
