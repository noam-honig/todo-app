import { useEffect, useState } from "react";
import { remult } from "remult";
import { Task } from "../shared/Task";
import { TasksController } from "../shared/TasksController";

if (import.meta.env.DEV)
  remult.apiClient.url = 'http://localhost:3002/api';

const taskRepo = remult.repo(Task);

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);
  useEffect(() =>
    taskRepo.query({
      where: {
        completed: hideCompleted ? false : undefined
      }
    }).subscribe(setTasks)
    , [hideCompleted]);

  const addTask = async () => {
    if (newTaskTitle) {
      await taskRepo.insert({
        title: newTaskTitle,
        completed: false,
        id: tasks.length + 1
      });
      setNewTaskTitle('');
    }
  }

  const setAll = async (completed: boolean) => {
    await TasksController.setAll(completed);
  }

  return (
    <div>
      <input type="checkbox" checked={hideCompleted}
        onChange={e => setHideCompleted(e.target.checked)}
      />
      Hide completed
      <main>
        <input
          value={newTaskTitle}
          onBlur={addTask}
          onKeyDown={e => { if (e.key === "Enter") addTask() }}
          placeholder="What needs to be done?"
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        {tasks
          .map(task => {
            const setTask = (value: typeof task) =>
              setTasks(tasks.map(t => t === task ? value : t));

            const setCompleted = (completed: boolean) => {
              setTask({ ...task, completed });
              taskRepo.save({ ...task, completed });
            };
            const setTitle = (title: string) => {
              setTask({ ...task, title });
            };
            const deleteTask = async () => {
              await taskRepo.delete(task);
            };
            const saveTask = async () => {
              try {
                await taskRepo.save(task);
              } catch (error: any) {
                alert(error.message);
              }
            }
            return (
              <div key={task.id}>
                <input type="checkbox"
                  checked={task.completed}
                  onChange={e => setCompleted(e.target.checked)} />
                <input
                  value={task.title}
                  onChange={e => setTitle(e.target.value)}
                  onBlur={saveTask}
                />
                <button onClick={deleteTask}>x</button>
              </div>
            );
          })}
      </main>
      <div>
        <button onClick={() => setAll(true)}>Set all as completed</button>
        <button onClick={() => setAll(false)}>Set all as uncompleted</button>
      </div>
    </div>
  );
}
export default App;