import { FormEvent, useEffect, useState } from 'react'
import { Task } from '../models/Task'
import { remult } from 'remult'

const taskRepo = remult.repo(Task)
export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  useEffect(() => {
    return taskRepo
      .liveQuery({
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          completed: undefined,
        },
      })
      .subscribe((info) => setTasks(info.applyChanges))
  }, [])

  async function addTask(e: FormEvent) {
    e.preventDefault()
    try {
      const newTask = await taskRepo.insert({
        title: newTaskTitle,
      })
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
    <main>
      {taskRepo.metadata.apiInsertAllowed() && (
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button>Add</button>
        </form>
      )}
      {tasks.map((task) => {
        async function setCompleted(completed: boolean) {
          const updatedTask = await taskRepo.save({ ...task, completed })
          setTasks((tasks) => tasks.map((t) => (t === task ? updatedTask : t)))
        }
        async function deleteTask() {
          try {
            await taskRepo.delete(task)
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
            <span>{task.title}</span>
            <button onClick={deleteTask}>x</button>
          </div>
        )
      })}
    </main>
  )
}
