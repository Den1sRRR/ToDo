import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from './tasksFilter';
import '../components-style/footer.css';

function Footer({ tasksCompleted, clearList, filter, onFilterSelect }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksCompleted} items left</span>
      <ul className="filters">
        <TasksFilter filter={filter} onFilterSelect={onFilterSelect} />
      </ul>
      <button type="button" className="clear-completed" onClick={clearList}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  tasksCompleted: PropTypes.number.isRequired,
  clearList: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
};

export default Footer;
