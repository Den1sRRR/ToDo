/* eslint-disable operator-linebreak */
/* eslint-disable react/self-closing-comp */
import '../components-style/task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editedTitle: this.props.title,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleEdit = () => {
    this.setState({ editing: true, editedTitle: this.props.title });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleSave();
    } else if (e.key === 'Escape') {
      this.handleCancelEdit();
    }
  };

  handleChange = (e) => {
    this.setState({ editedTitle: e.target.value });
  };

  handleCancelEdit = () => {
    this.setState((prevState) => ({
      editing: false,
      editedTitle: prevState.initialTitle,
    }));
  };

  handleSave = () => {
    const newTitle = this.state.editedTitle;

    if (!newTitle) {
      this.setState((prevState) => ({
        editing: false,
        editedTitle: prevState.initialTitle,
      }));

      return;
    }

    this.props.onEditTitle(this.props.id, newTitle);
    this.setState({ editing: false });
  };

  render() {
    const { title, onDelete, onCompleted, completed, timeCreated, startTimer, stopTimer, remainingTime, id } =
      this.props;
    const { editing, editedTitle } = this.state;
    const taskTimer = formatDistanceToNow(timeCreated, { includeSeconds: true, addSuffix: true });
    const completeClazz = completed ? 'completed' : '';

    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;

    return (
      <>
        {editing ? (
          <li className={completeClazz}>
            <div className="view">
              <label>
                <span className="description">
                  <input
                    className="new-todo"
                    type="text"
                    value={editedTitle}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                  />
                </span>
              </label>
            </div>
          </li>
        ) : (
          <li className={completeClazz}>
            <div className="view">
              <input className="toggle" type="checkbox" checked={completed} onChange={onCompleted} />
              <label>
                <span className="description">
                  {title}
                  <span className="btns">
                    <button className="icon icon-play" onClick={() => startTimer(id)}></button>
                    <button className="icon icon-pause" onClick={() => stopTimer(id)}></button>
                    <span className="result-timer">
                      {remainingMinutes} min : {remainingSeconds} sec
                    </span>
                  </span>
                </span>
                <span className="created">{taskTimer}</span>
              </label>
              <button className="icon icon-edit" onClick={this.handleEdit} />
              <button className="icon icon-destroy" onClick={onDelete} />
              <input type="text" className="edit" />
            </div>
          </li>
        )}
      </>
    );
  }
}

export default Task;

Task.defaultProps = {
  title: 'Tilte',
  completed: false,
  timeCreated: new Date(),
};

Task.propTypes = {
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  timeCreated: PropTypes.string.isRequired,
  // minNSec: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  onEditTitle: PropTypes.func.isRequired,
  remainingTime: PropTypes.number.isRequired,
};
