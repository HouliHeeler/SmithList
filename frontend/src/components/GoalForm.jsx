import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm(props) {
  // const [text, setText] = useState('')
  const text = props.chosenRecipe

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
          <span>{props.chosenRecipe}</span>
        </div>
        <button className='btn btn-block' type='submit' onClick={handleClick}>
          Add Recipe
        </button>
      </div>
    </section>
  )
}

export default GoalForm
