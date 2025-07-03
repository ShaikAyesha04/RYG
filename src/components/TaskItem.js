import React, { useState } from 'react';

const TaskItem = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(prev => prev.filter(t => t.id !== task.id));
    }
  };

  const toggleComplete = () => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleEdit = () => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, title: editTitle, description: editDesc } : t
      )
    );
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
  <strong>Category:</strong>{' '}
  <span style={{ padding: '2px 6px', borderRadius: '6px' }}>
    {task.category}
  </span>
</p>

        <p><strong>Priority:</strong> {task.priority}</p>
<p><strong>Due:</strong> {task.dueDate}</p>
          <p><small>Created At: {new Date(task.createdAt).toLocaleString()}</small></p>
          <p>Status: <strong>{task.completed ? 'Completed' : 'Pending'}</strong></p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={toggleComplete}>
        {task.completed ? 'Mark Pending' : 'Mark Complete'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
