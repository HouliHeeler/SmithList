import Controls from "../components/Controls"
import cereal from '../app/images/cereal.jpg'

function Recipes({setChosenRecipe, chosenRecipe}) {

  let instructions = 'Add Milk. Enjoy.'
  let ingredients = 'One family sized box of your preferred cereal. One quart of milk'
  let imgUrl = cereal

  if(chosenRecipe['instructions'] !== undefined) {
    imgUrl = chosenRecipe["thumbnail_url"]
    instructions = chosenRecipe['instructions'].map((step, i) => {
      return <div key={i}>{step['display_text']}</div>
    })
  }
  
  if(chosenRecipe['sections'] !== undefined) {
    const componentArray = []
    chosenRecipe['sections'].map(section => section["components"].map(list => componentArray.push(list["raw_text"])))
    ingredients = componentArray.map((item, i) => {
      return <div key={i}>{item}</div>
    })
  }

  return (
    <main className='main'>
      <Controls pageName="Recipes" setChosenRecipe={setChosenRecipe} chosenRecipe={chosenRecipe}/>
      <section className="page-block">
        <div className="page-img-ingredients">
          <div className="page-img">
            <img src={imgUrl} alt={chosenRecipe["name"]} />
          </div>
          <div className="page-ingredients">
            <h3>Ingredients</h3>
            <div className="recipe-instructions">
              {ingredients}
          </div>
          </div>
        </div>
        <div className="page-instructions">
          <h3>Instructions</h3>
          <div className="recipe-instructions">
            {instructions}
          </div>
          <h3>{chosenRecipe["name"]}</h3>
        </div>
      </section>
    </main>
  )
}

export default Recipes