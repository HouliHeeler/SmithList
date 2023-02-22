import { FaBackspace } from 'react-icons/fa'
import { useState } from 'react'

function ListItem({ i, item, removeItem }) {
    const [checked, setChecked] = useState(false)

    function handleClick() {
        setChecked(prevState => !prevState)
    }

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