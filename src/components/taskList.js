import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';
import '../components-style/taskList.css';

export default class TaskList extends React.Component {
  render() {
    const { onDelete, onCompleted, startTimer, stopTimer, onEditTitle } = this.props;
    const elements = this.props.data.map((elem) => {
      return (
        <Task
          id={elem.id}
          key={elem.id}
          title={elem.title}
          onDelete={() => onDelete(elem.id)}
          onCompleted={() => onCompleted(elem.id)}
          completed={elem.completed}
          timeCreated={elem.timeCreated}
          startTimer={startTimer}
          stopTimer={stopTimer}
          remainingTime={elem.minNSec}
          onEditTitle={onEditTitle}
        />
      );
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
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      timeCreated: PropTypes.string.isRequired,
      min: PropTypes.string.isRequired,
      sec: PropTypes.string.isRequired,
      remainingTime: PropTypes.number.isRequired,
    })
  ).isRequired,
};
