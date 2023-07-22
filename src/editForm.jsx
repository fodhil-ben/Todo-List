import { useState } from "react"



function EditForm({ id, value, handleEdits }) {
    const [newValue, setNewValue] = useState(value)

    const handleSub = (e) => {
        e.preventDefault()
        handleEdits(id, newValue)

    }
    return (
        <form onSubmit={handleSub} >
            <input className="userInput" type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
            <input type="button" value="Update" onClick={() => handleEdits(id, newValue)} />
        </form>)
}

export default EditForm