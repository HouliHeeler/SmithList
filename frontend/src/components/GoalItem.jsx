import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='meal-block'>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        x
      </button>
      <span>{goal["text"][0].recipe}</span>
    </div>
  )
}

export default GoalItem
