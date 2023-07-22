import './todo.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Todos from './todos'
import EditForm from './editForm'

function Todo() {
    const [ready, setReady] = useState(false)
    const [value, setValue] = useState('')
    const [todos, setTodos] = useState([])

    const handleTodos = () => {
        if (value.trim() !== "") {
            setReady(true)
            setTodos([...todos, { data: value, completed: false, id: uuidv4(), edit: false }])
            setValue('')
        }
    }
    const handleInput = (e) => {
        setValue(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handleTodos()
    }

    const handleDelete = (data) => {
        setTodos(todos.filter(e => e.data !== data))
    }

    const handleEdit = (id) => {
        setTodos(todos.map(t =>
            t.id === id ? { ...t, edit: !t.edit }
                : t
        ))
        console.log(todos)
    }

    const handleEdits = (id, nv) => {
        setTodos(todos.map(t => {
            if (t.id === id) {
                if (nv.trim() !== '') {
                    return { ...t, data: nv, edit: false }
                }
                else {
                    return t
                }
            }
            else {
                return t
            }

        })
        )
    }
    const toggleTask = (id) => {
        setTodos(todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t))
        console.log(todos)
    }


    return (
        <>
            <form className="todoForm" onSubmit={handleSubmit} >
                <input className="userInput" type="text" placeholder="add new todo" onChange={handleInput} value={value} />
                <input type="button" value="Add" onClick={handleTodos} />
            </form>
            <div id="todos">
                {ready && todos.map(ele => (
                    ele.edit
                        ? <EditForm key={ele.id} handleSubmit={handleSubmit} value={ele.data} id={ele.id} handleEdits={handleEdits} />
                        : <Todos key={ele.id} handleDelete={handleDelete} id={ele.id} data={ele.data} completed={ele.completed} handleEdit={handleEdit} toggleTask={toggleTask} />
                ))}
            </div>
        </>
    )
}

export default Todo