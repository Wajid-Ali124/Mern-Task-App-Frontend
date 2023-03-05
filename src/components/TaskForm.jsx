
const TaskForm = ({ createTask, name, handleChange, isEdit, updateTask }) => {
    return (
        <form className="task-form" onSubmit={isEdit ? updateTask : createTask}>
            <input type="text" placeholder="Add a Task" name="name" value={name} onChange={handleChange} />
            <button type="submit">{isEdit ? "Edit" : "Add"}</button>
        </form>
    )
}

export default TaskForm
