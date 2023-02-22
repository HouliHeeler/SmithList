import Controls from "../components/Controls"
import { FaPlus } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getGoals, reset } from '../features/goals/goalSlice'
import ListItem from "../components/ListItem";

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

  const [removedList, setRemovedList] = useState(() => {
    const saved = sessionStorage.getItem('removedList')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })  

  const firstDraft = []
  goals.map(recipe => recipe.text[0].sections.map(step => step.components.map(item => firstDraft.push(item.raw_text))))
  const secondDraft = firstDraft.filter(item => !removedList.includes(item))

  const [finalDraft, setFinalDraft] = useState(secondDraft)

  useEffect(() => {
    setFinalDraft([...personalList, ...secondDraft])

    // Disables Reacts 'missing dependency' issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalList, goals])

  const shoppingList = finalDraft.map((item, i) => {
    return (
      <ListItem 
        key={i}
        i={i} 
        item={item} 
        removeItem={removeItem} />
    )
  })

  function addItem() {
    setPersonalList(prevList => ([addOns, ...prevList]))
    setAddOns('')
  }

  useEffect(() => {
    localStorage.setItem('personalList', JSON.stringify(personalList))
  }, [personalList])

  useEffect(() => {
    sessionStorage.setItem('removedList', JSON.stringify(removedList))
  }, [removedList])

  function removeItem(item) {
    setRemovedList(list => [...list, item])
    setPersonalList(personalList.filter(el => el !== item))
  }

  return (
    <main className='main'>
      <Controls pageName="List" setChosenRecipe={setChosenRecipe} chosenRecipe={chosenRecipe} />
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
        </div>
      </section>
    </main>
  )
}

export default List