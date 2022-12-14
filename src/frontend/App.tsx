import { FormEvent, useState } from 'react'
import { Task } from './Task'

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Setup', completed: true },
    { id: 2, title: 'Entities', completed: false },
    { id: 3, title: 'Paging, Sorting and Filtering', completed: false },
    { id: 4, title: 'CRUD Operations', completed: false },
    { id: 5, title: 'Validation', completed: false },
    { id: 6, title: 'Backend methods', completed: false },
    { id: 7, title: 'Database', completed: false },
    { id: 8, title: 'Authentication and Authorization', completed: false },
    { id: 9, title: 'Deployment', completed: false }
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const addTask = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setTasks([
        ...tasks,
        {
          title: newTaskTitle,
          completed: false,
          id: tasks.length + 1
        }
      ])
      setNewTaskTitle('')
    } catch (error: any) {
      alert(error.message)
    }
  }

  const setAllCompleted = async (completed: boolean) => {
    setTasks(tasks.map((task) => ({ ...task, completed })))
  }

  return (
    <div>
      <main>
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </form>
        {tasks.map((task) => {
          const setTask = (value: typeof task) =>
            setTasks(tasks.map((t) => (t === task ? value : t)))

          const setCompleted = async (completed: boolean) => {
            setTask({ ...task, completed })
          }
          const setTitle = (title: string) => {
            setTask({ ...task, title })
          }
          const deleteTask = async () => {
            setTasks(tasks.filter((t) => t !== task))
          }
          return (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <input
                value={task.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={deleteTask}>x</button>
            </div>
          )
        })}
      </main>
      <div>
        <button onClick={() => setAllCompleted(true)}>
          Set all as completed
        </button>
        <button onClick={() => setAllCompleted(false)}>
          Set all as uncompleted
        </button>
      </div>
    </div>
  )
}
export default App
