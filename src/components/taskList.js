import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';
import '../components-style/taskList.css';
export default class TaskList extends React.Component {
  render() {
    const { onDelete, onCompleted } = this.props;
    const elements = this.props.data.map((elem) => {
      const { id, ...itemProps } = elem;
      return <Task key={id} {...itemProps} onDelete={() => onDelete(id)} onCompleted={() => onCompleted(id)} />;
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.defaultProps = {
  data: [],
  onDelete: () => {
    console.log('Task deleted');
  },
  onCompleted: () => {
    console.log('Task completed');
  },
};

TaskList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      timeCreated: PropTypes.string.isRequired,
    })
  ).isRequired,
};
