import Controls from "../components/Controls"
import { FaPlus } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRecipes, reset } from '../features/recipes/recipeSlice'
import ListItem from "../components/ListItem";

function List({setChosenRecipe, chosenRecipe}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { recipes, isError, message } = useSelector(
    (state) => state.recipes
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getRecipes())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  //Pulls ingredients from chosen recipe to be shown
  let ingredients;
  
  if(chosenRecipe['sections'] !== undefined) {
    const componentArray = []
    chosenRecipe['sections'].map(section => section["components"].map(list => componentArray.push(list["raw_text"])))
    ingredients = componentArray.map((item, i) => {
      return <div key={i}>{item}</div>
    })
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
  recipes.map(recipe => recipe.text[0].sections.map(step => step.components.map(item => firstDraft.push(item.raw_text))))
  const secondDraft = firstDraft.filter(item => !removedList.includes(item))

  const [finalDraft, setFinalDraft] = useState(secondDraft)

  //Combines personal list and recipes list after having removed list filtered out to create final grocery list
  useEffect(() => {
    setFinalDraft([...personalList, ...secondDraft])

    // Disables Reacts 'missing dependency' issue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalList, recipes])

  const shoppingList = finalDraft.map((item, i) => {
    return (
      <ListItem 
        key={i}
        item={item} 
        removeItem={removeItem} />
    )
  })

  //Allows user to add in items to shopping list
  const [addOns, setAddOns] = useState("")

  const onChange = (e) => {
    setAddOns(e.target.value)
  }

  function addItem() {
    setPersonalList(prevList => ([addOns, ...prevList]))
    setAddOns('')
  }

  //Updates localStorage of personalList and removedList when they are changed
  useEffect(() => {
    localStorage.setItem('personalList', JSON.stringify(personalList))
  }, [personalList])

  useEffect(() => {
    sessionStorage.setItem('removedList', JSON.stringify(removedList))
  }, [removedList])

  //Delete item functions by building a list of items to be filtered out of the shopping list
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