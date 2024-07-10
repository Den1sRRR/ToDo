/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Footer from './components/footer';
import NewTaskForm from './components/newTaskForm';
import TaskList from './components/taskList';
import './components-style/app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: 'all',
      remainingTime: 0,
    };
  }

  addItem = (title, min, sec) => {
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
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  editTaskTitle = (taskId, newTitle) => {
    this.setState(({ data }) => ({
      data: data.map((task) => (task.id === taskId ? { ...task, title: newTitle } : task)),
    }));
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((elem) => elem.id !== id),
      };
    });
  };

  onCompleted = (id) => {
    this.setState(({ data }) => ({
      data: data.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            completed: !elem.completed,
          };
        }
        return elem;
      }),
    }));
  };

  clearList = () => {
    this.setState(({ data }) => ({
      data: data.filter((elem) => !elem.completed),
    }));
  };

  filterPost = (items, filter) => {
    switch (filter) {
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

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  stopTimer = (id) => {
    const task = this.state.data.find((elem) => elem.id === id);
    if (task.timerInterval && task.minNSec > 0) {
      clearInterval(task.timerInterval);
      task.timerInterval = null;
      this.setState((prevState) => ({
        data: prevState.data.map((elem) => (elem.id === id ? { ...elem, timerInterval: null } : elem)),
      }));
    }
  };

  startTimer = (id) => {
    const task = this.state.data.find((elem) => elem.id === id);

    if (task) {
      if (task.timerInterval) {
        clearInterval(task.timerInterval);
        task.timerInterval = null;
      }

      const startFromZero = task.minNSec === 0;

      this.setState(
        (prevState) => ({
          data: prevState.data.map((elem) =>
            elem.id === id ? { ...elem, minNSec: startFromZero ? +elem.min * 60 + +elem.sec : elem.minNSec } : elem
          ),
        }),
        () => {
          const timerInterval = setInterval(() => {
            this.setState((prevState) => ({
              data: prevState.data.map((elem) => {
                if (elem.id === id && !elem.completed && elem.minNSec > 0) {
                  return { ...elem, minNSec: elem.minNSec - 1 };
                }
                return elem;
              }),
            }));
          }, 1000);

          this.setState((prevState) => ({
            data: prevState.data.map((elem) => (elem.id === id ? { ...elem, timerInterval } : elem)),
          }));
        }
      );
    }
  };

  render() {
    const { data, filter } = this.state;
    const tasksCompleted = this.state.data.filter((elem) => elem.completed).length;
    const visibleData = this.filterPost(data, filter);
    console.log(this.state);
    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.addItem} />
        <section className="main">
          <ul className="todo-list">
            <TaskList
              data={visibleData}
              onDelete={this.deleteItem}
              onCompleted={this.onCompleted}
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
              onEditTitle={this.editTaskTitle}
            />
          </ul>
        </section>
        <Footer
          tasksCompleted={tasksCompleted}
          clearList={this.clearList}
          filter={filter}
          onFilterSelect={this.onFilterSelect}
        />
      </section>
    );
  }
}
