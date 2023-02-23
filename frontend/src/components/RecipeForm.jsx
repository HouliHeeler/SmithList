import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { createRecipe } from '../features/recipes/recipeSlice'
import cereal from '../app/images/cereal.jpg'

function RecipeForm({ chosenRecipe }) {

  //Data used to fill out many places on the site
  const [text, setText] = useState({
    recipe: '',
    instructions: [],
    sections: [],
    image: ''
  })

  useEffect(() => {
    setText({
      recipe: chosenRecipe["name"],
      instructions: chosenRecipe["instructions"],
      sections: chosenRecipe["sections"],
      image: chosenRecipe["thumbnail_url"]
    })
  }, [chosenRecipe])

  let instructions = 'Add Milk. Enjoy.'
  let ingredients = 'One family sized box of your preferred cereal. One quart of milk'

  if(chosenRecipe['instructions'] !== undefined) {
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
  
  //Adds selected recipe to MongoDB database
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(createRecipe({ text }))
  }

  //Sets state and allows user to toggle between seeing Ingredients or Instructions on Cookbook page
  const [information, setInformation] = useState(true)

  function toggle(bool) {
    setInformation(bool)
  }

  const showButton = {display: chosenRecipe !== "" ? "block" : 'none'}

  return (
    <section className='recipe'>
      <div className='recipe-header'>
        <span>{chosenRecipe === '' ? "Cereal" : chosenRecipe["name"]}</span>
        <button 
          className='btn' 
          type='submit' 
          onClick={handleClick}
          style={showButton}>
          Add Recipe
        </button>
      </div>
      <section className='recipe-blurb'>
        <div className='recipe-image'>
          <img src={chosenRecipe === '' ? cereal : chosenRecipe["thumbnail_url"]} alt={chosenRecipe["name"]} />
        </div>
        <section className='recipe-information'>
          <div className='recipe-toggle'>
            <span onClick={() => toggle(true)}>Instructions</span>
            <span onClick={() => toggle(false)}>Ingredients</span>
          </div>
          <div className='recipe-instructions'>
            {information ? instructions : ingredients}
          </div>
        </section>
      </section>
    </section>
  )
}

export default RecipeForm
