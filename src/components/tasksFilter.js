import React from 'react';
import PropTypes from 'prop-types';

function TasksFilter({ filter, onFilterSelect }) {
  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const active = filter === name;
    const clazz = active ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={`btn ${clazz}`} onClick={() => onFilterSelect(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul>{buttons}</ul>;
}

export default TasksFilter;

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
};
