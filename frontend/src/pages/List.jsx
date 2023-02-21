import Controls from "../components/Controls"

function List({setChosenRecipe, chosenRecipe}) {
  return (
    <main className='main'>
      <Controls setChosenRecipe={setChosenRecipe} />
    </main>
  )
}

export default List