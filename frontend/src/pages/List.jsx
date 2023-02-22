import Controls from "../components/Controls"
import { FaPlus, FaMinus, FaSave, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getGoals, reset } from '../features/goals/goalSlice'

function List({setChosenRecipe, chosenRecipe}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isError, message } = useSelector(
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

  let ingredients;
  
  if(chosenRecipe['sections'] !== undefined) {
    const componentArray = []
    chosenRecipe['sections'].map(section => section["components"].map(list => componentArray.push(list["raw_text"])))
    ingredients = componentArray.map((item, i) => {
      return <div key={i}>{item}</div>
    })
  }

  const [addOns, setAddOns] = useState("")

  const onChange = (e) => {
    setAddOns(e.target.value)
  }

  const [personalList, setPersonalList] = useState(() => {
    const saved = localStorage.getItem('personalList')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  

  const firstDraft = []
  goals.map(recipe => recipe.text[0].sections.map(step => step.components.map(item => firstDraft.push(item.raw_text))))

  const [finalDraft, setFinalDraft] = useState(firstDraft)

  useEffect(() => {
    setFinalDraft([...personalList, ...firstDraft])

    // Disables Reacts 'missing dependency' issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalList, goals])

  const shoppingList = finalDraft.map((item, i) => {
    return (
      <div className="grocery-item" key={i}>
        <FaMinus 
          className="delete"
          onClick={() => removeItem(item)}/>
        <div>{item}</div>
      </div>
    )
  })

  function addItem() {
    setPersonalList(prevList => ([addOns, ...prevList]))
    setAddOns('')
  }

  useEffect(() => {
    localStorage.setItem('personalList', JSON.stringify(personalList))
  }, [personalList])

  function removeItem(item) {
    setPersonalList(personalList.filter(el => el !== item))
  }

  return (
    <main className='main'>
      <Controls setChosenRecipe={setChosenRecipe} chosenRecipe={chosenRecipe} />
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
            {shoppingList}
          </div>
          <div className="add-groceries">
            <FaSave />
            <div>
              <input
                type="text"
                id="addOn"
                name="addOn"
                placeholder="Add groceries..." 
                value={addOns}
                onChange={onChange} 
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    addItem()
                  }
                }}/>
              <FaPlus className='add' onClick={addItem}/>
            </div>
            <FaTrash />
          </div>
        </div>
      </section>
    </main>
  )
}

export default List