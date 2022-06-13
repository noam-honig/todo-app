import './App.css';
import { useState } from "react";
import { Task } from "./shared/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'a', title: "Setup", completed: true },
    { id: 'b', title: "Entities", completed: false },
    { id: 'c', title: "Paging, Sorting and Filtering", completed: false },
    { id: 'd', title: "CRUD Operations", completed: false },
    { id: 'e', title: "Validation", completed: false },
    { id: 'f', title: "Backend methods", completed: false },
    { id: 'g', title: "Authentication and Authorization", completed: false },
    { id: 'h', title: "Postgres", completed: false },
    { id: 'i', title: "Deployment", completed: false }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<Task>();
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  const createNewTask = async () => {
    if (newTaskTitle) {
      const newTask: Task = { title: newTaskTitle, completed: false, id: tasks.length.toString() };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  }

  const setAll = async (completed: boolean) => {
    setTasks(tasks.map(task => ({ ...task, completed })));
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            onBlur={createNewTask}
            onKeyDown={e => { if (e.key === 'Enter') createNewTask() }} />
        </header>

        <section className="main">
          <input id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={tasks.length > 0 && tasks[0].completed}
            onChange={e => setAll(e.target.checked)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {tasks.filter(task => !hideCompleted || !task.completed)
              .map(task => {
                if (!editingTask || task.id != editingTask.id) {

                  const setCompleted = async (completed: boolean) => {
                    const updatedTask: Task = { ...task, completed };
                    setTasks(tasks.map(t => t === task ? updatedTask : t));
                  }
                  const deleteTask = async () => {
                    setTasks(tasks.filter(t => t !== task));
                  };
                  return <li key={task.id} className={task.completed ? 'completed' : ''}>
                    <div className="view">
                      <input className="toggle" type="checkbox"
                        checked={task.completed}
                        onChange={e => setCompleted(e.target.checked)}
                      />
                      <label onDoubleClick={() => setEditingTask(task)}>{task.title}</label>
                      <button className="destroy" onClick={deleteTask}></button>
                    </div>
                  </li>
                }
                else {

                  const saveTask = async () => {
                    setTasks(tasks.map(t => t === task ? editingTask : t));
                    setEditingTask(undefined);
                  };
                  const titleChange = (title: string) => {
                    setEditingTask({ ...editingTask, title });
                  };
                  return <li key={task.id} className="editing">
                    <input className="edit"
                      value={editingTask.title}
                      onBlur={saveTask}
                      onChange={e => titleChange(e.target.value)} />
                  </li>
                }

              })}
          </ul>
        </section>
        <footer className="footer">
          <button onClick={() => setHideCompleted(false)} >All </button>
          <button onClick={() => setHideCompleted(true)}>Active</button>
        </footer>
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Based on <a href="http://todomvc.com">TodoMVC</a></p>
        <p><a href="https://www.github.com/remult/remult" target="_blank"> Give remult a ⭐ on github</a></p>
      </footer>
    </>
  );
}
export default App;