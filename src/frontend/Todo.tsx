import { FormEvent, useState } from 'react'
import { Task } from '../models/Task'

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Setup', completed: true },
    { id: '2', title: 'Entities', completed: false },
    { id: '3', title: 'Paging, Sorting and Filtering', completed: false },
    { id: '4', title: 'CRUD Operations', completed: false },
    { id: '5', title: 'Live Query', completed: false },
    { id: '6', title: 'Validation', completed: false },
    { id: '7', title: 'Authentication and Authorization', completed: false },
    { id: '8', title: 'Deployment', completed: false },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  async function addTask(e: FormEvent) {
    e.preventDefault()
    try {
      const newTask = {
        title: newTaskTitle,
        completed: false,
        id: (tasks.length + 1).toString(),
        createdAt: new Date(),
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
    } catch (error: any) {
      alert(error.message)
    }
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
        async function setCompleted(completed: boolean) {
          const updatedTask = { ...task, completed }
          setTasks((tasks) => tasks.map((t) => (t === task ? updatedTask : t)))
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
            {task.title}
            <button onClick={deleteTask}>x</button>
          </div>
        )
      })}
    </main>
  )
}
