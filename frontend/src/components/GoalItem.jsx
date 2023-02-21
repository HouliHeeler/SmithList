import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import { FaMinus } from 'react-icons/fa';

function GoalItem({ goal, showRecipe }) {
  const dispatch = useDispatch()

  return (
    <div className='meal-block' onClick={() => showRecipe(goal._id)}>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        <FaMinus />
      </button>
      <span>{goal["text"][0].recipe}</span>
    </div>
  )
}

export default GoalItem
