import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Footer from './components/footer';
import NewTaskForm from './components/newTaskForm';
import TaskList from './components/taskList';
import './components-style/app.css';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addItem = (title, min, sec) => {
    const newItem = {
      title,
      min,
      sec,
      minNSec: +min * 60 + +sec,
      completed: false,
      timeCreated: new Date().toString(),
      id: uuidv4(),
      timerInterval: null,
    };
    setData((prevData) => [...prevData, newItem]);
  };

  const editTaskTitle = (taskId, newTitle) => {
    setData((prevData) => prevData.map((elem) => (elem.id === taskId ? { ...elem, title: newTitle } : elem)));
  };

  const deleteItem = (id) => {
    setData((prevData) => prevData.filter((elem) => elem.id !== id));
  };

  const onCompleted = (id) => {
    setData((prevData) => prevData.map((elem) => (elem.id === id ? { ...elem, completed: !elem.completed } : elem)));
  };

  const clearList = () => {
    setData((prevData) => prevData.filter((elem) => !elem.completed));
  };

  const filterPost = (items, funcFilter) => {
    switch (funcFilter) {
      case 'done':
        return items.filter((elem) => elem.completed);
      case 'active':
        return items.filter((elem) => !elem.completed);
      case 'all':
        return items;
      default:
        return items;
    }
  };

  const onFilterSelect = (funcFilter) => {
    setFilter(funcFilter);
  };

  const stopTimer = (id) => {
    const task = data.find((elem) => elem.id === id);
    if (task.timerInterval && task.minNSec > 0) {
      clearInterval(task.timerInterval);
      task.timerInterval = null;
      setData((prevData) => prevData.map((elem) => (elem.id === id ? { ...elem, timerInterval: null } : elem)));
    }
  };

  const startTimer = (id) => {
    const task = data.find((elem) => elem.id === id);

    if (task) {
      if (task.timerInterval) {
        clearInterval(task.timerInterval);
        task.timerInterval = null;
      }

      const startFromZero = task.minNSec === 0;

      setData((prevData) =>
        prevData.map((elem) => {
          if (elem.id === id) {
            return { ...elem, minNSec: startFromZero ? +elem.min * 60 + +elem.sec : elem.minNSec };
          }
          return elem;
        })
      );

      const timerInterval = setInterval(() => {
        setData((prevData) =>
          prevData.map((elem) => {
            if (elem.id === id && !elem.completed && elem.minNSec > 0) {
              return { ...elem, minNSec: elem.minNSec - 1 };
            }
            return elem;
          })
        );
      }, 1000);
      setData((prevData) => prevData.map((elem) => (elem.id === id ? { ...elem, timerInterval } : elem)));
    }
  };

  const tasksCompleted = data.filter((elem) => elem.completed).length;
  const visibleData = filterPost(data, filter);

  return (
    <section className="todoapp">
      <NewTaskForm onAdd={addItem} />
      <section className="main">
        <ul className="todo-list">
          <TaskList
            data={visibleData}
            onDelete={deleteItem}
            onCompleted={onCompleted}
            startTimer={startTimer}
            stopTimer={stopTimer}
            onEditTitle={editTaskTitle}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
          />
        </ul>
      </section>
      <Footer tasksCompleted={tasksCompleted} clearList={clearList} filter={filter} onFilterSelect={onFilterSelect} />
    </section>
  );
}

export default App;
