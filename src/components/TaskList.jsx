import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Task from "./Task"
import TaskForm from "./TaskForm"
import axios from "axios"
import loadingImg from "../assets/loader.gif";
import { URL } from "../App"


const TaskList = () => {

    const [task, setTask] = useState([])
    const [completedTask, setCompletedTask] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [taskId, setTaskId] = useState("")

    // useState to store formdata
    const [formData, setformData] = useState({
        name: "",
        completed: false
    })

    const { name } = formData

    // handleChange Function
    const handleChange = (e) => {
        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }

    // Get All Task
    const getTasks = async () => {
        setIsloading(true)
        try {
            const { data } = await axios.get(`${URL}/api/tasks`)
            setIsloading(false)
            setTask(data)
        } catch (error) {
            toast.error(error.message);
            setIsloading(false)
        }
    }

    //Run Get all Task function
    useEffect(() => {
        getTasks();
    }, [])

    // createTask Function
    const createTask = async (e) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("Input can't be empty")
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData)
            setformData({ ...formData, name: "" });
            toast.success("Task Added Succesfully")
            getTasks()
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Delete a Task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${URL}/api/tasks/${id}`)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Get All completed Tasks
    useEffect(() => {
        const cTask = task.filter((task) => {
            return task.completed === true
        })
        setCompletedTask(cTask)
    }, [task])


    //Get a Single Task to Form Bar
    const getSingleTask = async (task) => {
        setformData({ name: task.name, completed: false });
        setTaskId(task._id);
        setIsEdit(true)
    }

    //Update Task
    const updateTask = async (e) => {
        e.preventDefault()
        if (name === "") {
            return toast.error("Input can't be empty!")
        }
        try {
            await axios.put(`${URL}/api/tasks/${taskId}`, formData)
            setformData({ ...formData, name: "" })
            setIsEdit(false)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Set Status Completed
    const setToCompleted = async (task) => {
        const newdata = {
            name: task.name,
            completed: true
        }
        try {
            await axios.put(`${URL}/api/tasks/${task._id}`, newdata)
            getTasks()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <h2>Task Manager</h2>
            {/* Task Form */}
            <TaskForm name={name} handleChange={handleChange} createTask={createTask} isEdit={isEdit} updateTask={updateTask} />

            {task.length > 0 && (
                <div className="--flex-between --pb">
                    <p>
                        <b>Total Tasks:</b> {task.length}
                    </p>
                    <p>
                        <b>Completed Tasks:</b> {completedTask.length}
                    </p>
                </div>
            )}

            <hr />
            {
                isloading && (
                    <div className="--flex-center">
                        <img src={loadingImg} alt="Loading..." />
                    </div>
                )
            }

            {
                !isloading && task.length === 0 ? (
                    <p className="--py">No Task added please add a Task</p>

                ) : (
                    <>
                        {
                            task.map((task, index) => {
                                return (
                                    // Task 
                                    <Task
                                        key={task._id}
                                        task={task}
                                        index={index}
                                        deleteTask={deleteTask}
                                        getSingleTask={getSingleTask}
                                        setToCompleted={setToCompleted}
                                    />
                                )
                            })
                        }
                    </>
                )
            }
        </div>
    )
}

export default TaskList
