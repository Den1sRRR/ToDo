import '../components-style/newTaskForm.css';
import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  onValueChange = (e) => {
    this.setState({ [e.target.title]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.title.trim() === '') {
      return;
    }
    this.props.onAdd(this.state.title);
    this.setState({
      title: '',
    });
  };

  render() {
    const { title } = this.state;
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>Todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          title="title"
          onChange={this.onValueChange}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onAdd: () => {
    console.log('Task added');
  },
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
