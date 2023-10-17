import './App.css'
import ToDoComponent from './components/ToDoComponent'

const App = () => {
  return (
    <>
      <div className='text-center'>
        <h1 className='font-sans font-semibold'>To Do List</h1>
        <ToDoComponent />
      </div>
    </>
  )
}

export default App