import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm(props) {
  // const [text, setText] = useState('')
  const text = props.chosenRecipe['name']

  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text }))
    // setText('')
  }

  return (
    <section className='recipe'>
      <div className='recipe-header'>
        <div className='recipe-name'>
          <span>{props.chosenRecipe["name"]}</span>
        </div>
        <button className='btn btn-block' type='submit' onClick={handleClick}>
          Add Recipe
        </button>
      </div>
      <div className='recipe-image'>
        <img src={props.chosenRecipe["thumbnail_url"]} alt={props.chosenRecipe["name"]} />
      </div>
    </section>
  )
}

export default GoalForm
