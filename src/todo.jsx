import './todo.css'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Todos from './todos'
import EditForm from './editForm'

function Todo() {
    const [ready, setReady] = useState(false)
    const [value, setValue] = useState('')
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
        setTodos(savedTodos)
        setReady(true)
    }, [])

    const handleTodos = () => {
        if (value.trim() !== "") {
            setReady(true)
            const newTodos = [...todos, { data: value, completed: false, id: uuidv4(), edit: false }]
            setTodos(newTodos)
            localStorage.setItem('todos', JSON.stringify(newTodos))
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
        setTodos()
        const newTodos = todos.filter(e => e.data !== data)
        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos))
    }

    const handleEdit = (id) => {
        const newTodos = todos.map(t => t.id === id ? { ...t, edit: !t.edit } : t)
        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos))
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
        const newTodos = todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t)
        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos))
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