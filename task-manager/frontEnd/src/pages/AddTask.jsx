import React from 'react';
import TaskBox from '../components/TaskBox';

function AddTask(props) {
  return (
    <div>
      <TaskBox {...props} />
    </div>
  );
}

export default AddTask;
