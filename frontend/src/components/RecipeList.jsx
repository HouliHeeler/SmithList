import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Select from 'react-select'

function RecipeList(props) {
    
    const [query, setQuery] = useState('')
    const prefix = query.split(" ").join("%20")

    const [list, setList] = useState(() => {
      const saved = localStorage.getItem('list')
      const initialValue = JSON.parse(saved)
      return initialValue || []
    })

    const filteredList = list.filter(item => item['instructions'] !== undefined).filter(item => item["sections"] !== undefined)

    const cuisines = [
      {value: "indian", label: "Indian"},
      {value: "mexican", label: "Mexican"},
      {value: "italian", label: "Italian"},
      {value: "thai", label: "Thai"},
      {value: "french", label: "French"},
      {value: "british", label: "British"}
    ]

    const [cuisine, setCuisine] = useState('')

    const onChange = (e) => {
      setCuisine(e.value)
    }

    async function getRecipes(prefix, cuisine) {
      fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=${cuisine}&q=${prefix}`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '81f0f8a38bmsh024375d5af83615p170190jsnee4713d76fa2',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
          }
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("ERROR (response not ok)");
        })
        .then((data) => {
          setList(data.results)
          localStorage.setItem('list', JSON.stringify(data.results))
        })
        .catch(() => {
          console.log("error");
      })
    }

    function handleClick() {
      getRecipes(prefix, cuisine)
    }

    return (
      <section className="recipe-list">
        <section className="recipe-items">
            <Select 
              options={cuisines}
              onChange={onChange}
              className="recipe-cuisines"/>
            <div className="recipe-box">
                {filteredList.length < 1 ? 
                  <div className='blank-message'>Pick a cuisine and search for what you're dying to try!</div>: 
                  filteredList.map((recipe) => (
                    <div 
                      className='recipe-item' 
                      key={recipe.id}
                      value={recipe.name}
                      onClick={() => props.setChosenRecipe(recipe)}
                      >
                          {recipe.name}
                    </div>
                  ))
                }
            </div>
            <div className='recipe-search-bar'>
              <input 
                  placeholder="Search..." 
                  className="recipe-search" 
                  type="text" 
                  onChange={e => setQuery(e.target.value)} 
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      handleClick()
                    }
                  }}
              />
              <FaSearch className='recipe-search-button' onClick={handleClick} />
            </div>  
        </section>
      </section>
    )
}

export default RecipeList