import Controls from '../components/Controls'
import RecipeForm from '../components/RecipeForm'
import RecipeList from '../components/RecipeList'

function Cookbook({setChosenRecipe, chosenRecipe}) {
  return (
    <main className='main'>
      <Controls pageName="Cookbook" setChosenRecipe={setChosenRecipe} chosenRecipe={chosenRecipe} />
      <section className='recipe-block'>
        <RecipeForm chosenRecipe={chosenRecipe} />
        <RecipeList setChosenRecipe={setChosenRecipe}/>
      </section>
    </main>
  )
}

export default Cookbook
