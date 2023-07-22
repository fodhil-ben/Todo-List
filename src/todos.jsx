function Todos({ id, data, handleDelete, handleEdit, toggleTask, completed }) {
    return (
        <div >
            <input id={id} readOnly className={`${completed ? 'completed' : ''}`} type="text" value={data} onClick={() => { toggleTask(id) }} />
            <div id='btns'>
                <input type="button" value="Delete" onClick={() => handleDelete(data)} />
                <input type="button" value="Edit" onClick={() => handleEdit(id)} />
            </div>

        </div>
    )
}
export default Todos