import { get } from "mongoose";
import { AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

const Task = ({ task, index, deleteTask, getSingleTask, setToCompleted }) => {
    return (
        <div className={task.completed ? "task completed" : "task"}>
            <p>
                <b>{index + 1}. </b>
                {task.name}
            </p>
            <div className="task-icons">
                <BsCheckLg className="first" color="green" onClick={() => { setToCompleted(task) }} />
                <AiOutlineEdit color="purple" onClick={() => { getSingleTask(task) }} />
                <TiDelete color="red" onClick={() => { deleteTask(task._id) }} />
            </div>
        </div>
    )
}

export default Task
