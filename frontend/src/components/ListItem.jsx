import { FaBackspace } from 'react-icons/fa'
import { useState } from 'react'

function ListItem({ item, removeItem }) {
    const [checked, setChecked] = useState(false)

    function handleClick() {
        setChecked(prevState => !prevState)
    }

    //Conditional styling that strikes through grocery items on click
    //** Currently has a bug where the checked State stays with the index of Array, not with the item itself
    const strikethrough = {textDecoration: checked ? 'line-through' : 'none', cursor: 'pointer'}

    return (
      <div className="grocery-item">
          <FaBackspace
              className="delete"
              onClick={() => removeItem(item)}/>
          <div style={strikethrough} onClick={handleClick} >{item}</div>
      </div>
    )
}

export default ListItem