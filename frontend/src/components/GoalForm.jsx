import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm({chosenRecipe}) {
  // const [text, setText] = useState('')
  const text = chosenRecipe['name']

  let instructions = ''
  let ingredients = ''

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
  
  const [information, setInformation] = useState(true)

  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text }))
    // setText('')
  }

  function toggle(bool) {
    setInformation(bool)
  }

  return (
    <section className='recipe'>
      <div className='recipe-header'>
        <div className='recipe-name'>
          <span>{chosenRecipe["name"]}</span>
        </div>
        <button className='btn btn-block' type='submit' onClick={handleClick}>
          Add Recipe
        </button>
      </div>
      <section className='recipe-blurb'>
        <div className='recipe-image'>
          <img src={chosenRecipe["thumbnail_url"]} alt={chosenRecipe["name"]} />
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

export default GoalForm
