import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import Header from '../components/Header'
import RecipeList from '../components/RecipeList'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [chosenRecipe, setChosenRecipe] = useState('')

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <main className='main'>
      <Header />
      <section className='meals'>
        {goals.length > 0 ? (
          <div className='meals-chosen'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <span>You haven't chosen any meals!</span>
        )}
      </section>
      <section className='recipe-block'>
        <GoalForm chosenRecipe={chosenRecipe}/>
        <RecipeList setChosenRecipe={setChosenRecipe}/>
      </section>
    </main>
  )
}

export default Dashboard
