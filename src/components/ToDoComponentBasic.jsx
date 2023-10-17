import { useState } from 'react'
import { FaTrashCan } from 'react-icons/fa6'

const ToDoComponent = () => {
    const [tasks, setTasks] = useState([])

    const addTask = (task) => {
        setTasks([...tasks, task]) // Saco una copia de las tareas actuales y añado la ingresada en el input
    }

    const removeTask = (task) => {
        setTasks(tasks.filter( (t) => t !== task))
    }

    return (
        <div>
            <input 
                className='task-input'
                type="text" 
                placeholder='Add Task'
                onKeyUp={ (event) => {
                    if ( event.key === 'Enter') {
                        addTask(event.target.value)
                    }
                } }
            />
            <ul>
                {tasks.map( (task) => (
                    <li key={task}>
                        {task}
                        <button 
                            className='bg-red-500
                                    hover:bg-red-700
                                    text-white
                                    py-1
                                    px-2
                                    ms-2
                                    rounded-md'
                            onClick={ ()=> removeTask(task) }
                        >
                            <FaTrashCan />
                        </button>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default ToDoComponent