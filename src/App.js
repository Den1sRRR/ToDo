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
    };
  }

  addItem = (title) => {
    const newItem = {
      title,
      completed: false,
      timeCreated: new Date().toString(),
      id: uuidv4(),
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  onCompleted = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      }),
    }));
  };

  clearList = () => {
    this.setState(({ data }) => ({
      data: data.filter((item) => !item.completed),
    }));
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case 'done':
        return items.filter((item) => item.completed);
      case 'active':
        return items.filter((item) => !item.completed);
      case 'all':
        return items;
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, filter } = this.state;
    const tasksCompleted = this.state.data.filter((item) => item.completed).length;
    const visibleData = this.filterPost(data, filter);

    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.addItem} />
        <section className="main">
          <ul className="todo-list">
            <TaskList data={visibleData} onDelete={this.deleteItem} onCompleted={this.onCompleted} />
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
