import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>🔎 No tasks found</p>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} setTasks={setTasks} />
        ))
      )}
    </div>
  );
};

export default TaskList;
