import Controls from "../components/Controls"

function Recipes({setChosenRecipe, chosenRecipe}) {
  return (
    <main className='main'>
      <Controls setChosenRecipe={setChosenRecipe} />
    </main>
  )
}

export default Recipes