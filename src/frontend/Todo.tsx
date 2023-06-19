import { FormEvent, useState } from 'react'
import { Task } from '../models/Task'

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([])
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
    </main>
  )
}
