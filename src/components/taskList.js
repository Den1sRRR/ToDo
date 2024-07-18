import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';
import '../components-style/taskList.css';

function TaskList({
  data,
  onDelete,
  onCompleted,
  startTimer,
  stopTimer,
  onEditTitle,
  editingTaskId,
  setEditingTaskId,
}) {
  return (
    <ul className="todo-list">
      {data.map((elem) => (
        <Task
          id={elem.id}
          key={elem.id}
          title={elem.title}
          completed={elem.completed}
          timeCreated={elem.timeCreated}
          remainingTime={elem.minNSec}
          onDelete={() => onDelete(elem.id)}
          onCompleted={() => onCompleted(elem.id)}
          startTimer={startTimer}
          stopTimer={stopTimer}
          onEditTitle={onEditTitle}
          editingTaskId={editingTaskId === elem.id}
          setEditingTaskId={(isEditing) => setEditingTaskId(isEditing ? elem.id : null)}
        />
      ))}
    </ul>
  );
}

export default TaskList;

TaskList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
  setEditingTaskId: PropTypes.func.isRequired,
  editingTaskId: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      timeCreated: PropTypes.string.isRequired,
      min: PropTypes.string.isRequired,
      sec: PropTypes.string.isRequired,
    })
  ).isRequired,
};
