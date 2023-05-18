import { FormEvent, useState } from 'react'
import { Task } from './Task'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Setup', completed: true },
    { id: '2', title: 'Entities', completed: false },
    { id: '3', title: 'Paging, Sorting and Filtering', completed: false },
    { id: '4', title: 'CRUD Operations', completed: false },
    { id: '5', title: 'Live Query', completed: false },
    { id: '6', title: 'Validation', completed: false },
    { id: '7', title: 'Updating multiple tasks', completed: false },
    { id: '8', title: 'Database', completed: false },
    { id: '9', title: 'Authentication and Authorization', completed: false },
    { id: '10', title: 'Deployment', completed: false }
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  async function addTask(e: FormEvent) {
    e.preventDefault()
    try {
      const newTask = {
        title: newTaskTitle,
        completed: false,
        id: (tasks.length + 1).toString(),
        createdAt: new Date()
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
    } catch (error: any) {
      alert(error.message)
    }
  }

  async function setAllCompleted(completed: boolean) {
    setTasks(tasks.map((task) => ({ ...task, completed })))
  }

  return (
    <main>
      <form onSubmit={addTask}>
        <input
          value={newTaskTitle}
          placeholder="What needs to be done?"
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button>Add</button>
      </form>
      {tasks.map((task) => {
        function setTask(value: Task) {
          setTasks((tasks) => tasks.map((t) => (t === task ? value : t)))
        }

        async function setCompleted(completed: boolean) {
          setTask({ ...task, completed })
        }
        function setTitle(title: string) {
          setTask({ ...task, title })
        }
        async function deleteTask() {
          try {
            setTasks(tasks.filter((t) => t !== task))
          } catch (error: any) {
            alert(error.message)
          }
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
      <footer>
        <button onClick={() => setAllCompleted(true)}>Set all completed</button>
        <button onClick={() => setAllCompleted(false)}>
          Set all uncompleted
        </button>
      </footer>
    </main>
  )
}
