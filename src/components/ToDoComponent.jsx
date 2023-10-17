import { useState } from "react";
import { LuTrash2 } from 'react-icons/lu'

const ToDoComponent = () => {
  const [tasks, setTasks] = useState([]); // Lista de tareas
  const [inputValue, setInputValue] = useState(""); // Valor de entrada de texto
  const [isPendingTasksVisible, setIsPendingTasksVisible] = useState(true); // Visibilidad de tareas pendientes
  const [isCompletedTasksVisible, setIsCompletedTasksVisible] = useState(true); // Visibilidad de tareas completadas

  const addTask = (task) => { // Agrega una nueva tarea a la lista de tareas si el campo de entrada no está vacío
    if (inputValue !== "") {
      setTasks([...tasks, {
        id: Math.random().toString(36).substring(7),
        text: task,
        completed: false,
      }]);
    }
  };

  const removeTask = (task) => { // Elimina una tarea de la lista
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const markTaskAsCompleted = (task) => { // Marca una tarea como completada
    task.completed = true;
    setTasks(tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    }));
  };

  const handleInputChange = (event) => { // Toma el valor del input
    setInputValue(event.target.value);
  };

  const getCompletedTasks = (tasks) => { // Devuelve el array de tareas completadas
    return tasks.filter((task) => task.completed);
  };

  const getPendingTasks = (tasks) => { // Devuelve el array de tareas pendientes
    return tasks.filter((task) => !task.completed);
  };

  return (
    <>
      <div>
        <input
          className='border
                  border-slate-300 
                  rounded-md
                  py-2 pl-9 pr-3
                  placeholder:italic
                  focus:outline-none 
                  focus:border-sky-300'
          type="text"
          placeholder="Add Task"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={(event) => { // Evento depués de oprimir una tecla
            if (event.key === "Enter") {
              if (inputValue !== "") {
                addTask(inputValue);
              }
              setInputValue("");
            }
          }}
        />
      </div>
      <br />
      <div className='flex justify-center gap-8'>
        <div className='border border-red-200 p-10 rounded-md shadow-lg'>
          <h2 className='font-sans font-semibold'>Pending Task</h2>
          <br />
          <ul>
            {isPendingTasksVisible && getPendingTasks(tasks).map((task) => (
              <li
                className='flex justify-between mb-2'
                key={task.id}
              >
                <input
                  className='mr-2'
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => markTaskAsCompleted(task)}
                />
                <span style={task.completed
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }}>{task.text}
                </span>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white 
                                            font-bold py-1 px-2 ms-2 rounded-md'
                  onClick={() => removeTask(task)}
                >
                  <LuTrash2 />
                </button>
              </li>
            ))}
          </ul>
          <button
            className='bg-red-100 hover:bg-slate-100 rounded py-2 px-3'
            onClick={() => setIsPendingTasksVisible(!isPendingTasksVisible)}>
            {isPendingTasksVisible
              ? "Ocultar"
              : "Ver"}
          </button>
        </div>
        <div className='border border-lime-200 p-10 rounded-md shadow-lg'>
          <h2 className='font-sans font-semibold'>Completed Task</h2>
          <br />
          <ul>
            {isCompletedTasksVisible && getCompletedTasks(tasks).map((task) => (
              <li
                className='flex justify-between mb-2'
                key={task.id}
              >
                <input
                  className='mr-2'
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    task.completed = !task.completed;
                    setTasks(tasks.map((t) => {
                      if (t.id === task.id) {
                        return task;
                      } else {
                        return t;
                      }
                    }));
                  }}
                />
                <span
                  style={task.completed
                    ? { textDecoration: "line-through" }
                    : { textDecoration: "none" }}>
                  {task.text}
                </span>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white 
                                                font-bold py-1 px-2 ms-2 rounded-md'
                  onClick={() => removeTask(task)}
                >
                  <LuTrash2 />
                </button>
              </li>
            ))}
          </ul>
          <button
            className='bg-lime-100 hover:bg-slate-100 rounded py-2 px-3'
            onClick={() => setIsCompletedTasksVisible(!isCompletedTasksVisible)}>
            {isCompletedTasksVisible
              ? "Ocultar"
              : "Ver"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ToDoComponent