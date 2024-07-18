import '../components-style/newTaskForm.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'min' && /^\d*$/.test(value)) {
      setMin(value);
    } else if (name === 'sec' && /^\d*$/.test(value)) {
      setSec(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      return;
    }
    onAdd(title, min, sec);
    setTitle('');
    setMin('');
    setSec('');
  };

  return (
    <form className="header" onSubmit={onSubmit}>
      <h1>Todos</h1>
      <input
        className="new-todo"
        placeholder="Task"
        value={title}
        name="title"
        onChange={onInputChange}
        style={{ width: '50%' }}
      />
      <input
        className="new-todo"
        value={min}
        name="min"
        onChange={onInputChange}
        placeholder="Min"
        style={{ width: '25%' }}
      />
      <input
        className="new-todo"
        value={sec}
        name="sec"
        onChange={onInputChange}
        placeholder="Sec"
        style={{ width: '25%' }}
      />
      <button type="submit" style={{ display: 'none' }}>
        submit from Enter-button dont work without me
      </button>
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;
