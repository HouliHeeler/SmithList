import { useState } from 'react'

function RecipeList(props) {
    
    const [query, setQuery] = useState('')

    const recipes = [
        "Lasagna", 
        "Cinnamon Toast Crunch",
        "Mussels in White Wine Sauce",
        "Jack Fruit BBQ",
        "Astronaut Food",
        "Cornbread",
        "Dutch Baby",
        "Vegetarian Chili",
        "Prawn Salad",
        "Caprese Pizza",
    ]

    const foundRecipes = recipes.filter(e => e.toLowerCase().includes(query.toLowerCase()))

    return (
      <section className="recipe-list">
        <section className="recipe-items">
            <div>Recipes</div>
            <div className="recipe-box">
                {foundRecipes.map((recipe, index) => (
                  <div 
                    className='recipe-item' 
                    key={index}
                    value={recipe}
                    onClick={() => props.setChosenRecipe(recipe)}
                    >
                        {recipe}
                  </div>
                ))}
            </div>
            <input 
                placeholder="Search..." 
                className="recipe-search" 
                type="text" 
                onChange={e => setQuery(e.target.value)} />
        </section>
      </section>
    )
}

export default RecipeList