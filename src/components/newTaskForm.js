import '../components-style/newTaskForm.css';
import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      min: '',
      sec: '',
    };
  }

  onInputChange = (e) => {
    const { name, value } = e.target;

    if (!/^\d*$/.test(value)) {
      e.preventDefault();
    } else {
      this.setState({ [name]: value });
    }
  };

  onValueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.title.trim() === '') {
      return;
    }
    this.props.onAdd(this.state.title, this.state.min, this.state.sec);
    this.setState({
      title: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { title, min, sec } = this.state;
    return (
      <>
        <form className="header" onSubmit={this.onSubmit}>
          <h1>Todos</h1>
          <input
            className="new-todo"
            placeholder="Task"
            value={title}
            name="title"
            onChange={this.onValueChange}
            style={{ width: '50%' }}
          />
          <input
            className="new-todo"
            value={min}
            name="min"
            onChange={this.onInputChange}
            placeholder="Min"
            style={{ width: '25%' }}
          />
          <input
            className="new-todo"
            value={sec}
            name="sec"
            onChange={this.onInputChange}
            placeholder="Sec"
            style={{ width: '25%' }}
          />
          <button type="submit" style={{ display: 'none' }}>
            submit from Enter-button dont work without me
          </button>
        </form>
      </>
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
