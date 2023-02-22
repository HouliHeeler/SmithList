import Controls from "../components/Controls"

function List({setChosenRecipe, chosenRecipe}) {

  let ingredients;
  
  if(chosenRecipe['sections'] !== undefined) {
    const componentArray = []
    chosenRecipe['sections'].map(section => section["components"].map(list => componentArray.push(list["raw_text"])))
    ingredients = componentArray.map((item, i) => {
      return <div key={i}>{item}</div>
    })
  }

  return (
    <main className='main'>
      <Controls setChosenRecipe={setChosenRecipe} />
      <section className="page-block">
        <div className="individual-ingredients">
          <h3>Recipe Ingredients</h3>
          <div className="recipe-instructions">
            {ingredients}
          </div>
          <h3>{chosenRecipe["name"]}</h3>
        </div>
        <div className="page-instructions">
          <h3>Total Ingredients</h3>
          <div className="recipe-instructions">

          </div>
        </div>
      </section>
    </main>
  )
}

export default List