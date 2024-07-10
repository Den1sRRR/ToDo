import React from 'react';

import '../components-style/footer.css';
import PropTypes from 'prop-types';

import TasksFilter from './tasksFilter';

export default class Footer extends React.Component {
  render() {
    const { tasksCompleted, clearList, filter, onFilterSelect } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{tasksCompleted} items left</span>
        <ul className="filters">
          <TasksFilter filter={filter} onFilterSelect={onFilterSelect} />
        </ul>
        <button className="clear-completed" onClick={clearList}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  tasksCompleted: 0,
  filter: 'all',
};

Footer.propTypes = {
  tasksCompleted: PropTypes.number.isRequired,
  clearList: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
};
