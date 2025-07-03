import React, { useState } from 'react';

const TaskForm = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Work'); // ✅ Add this

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      dueDate,
      category, // ✅ Now this will work
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);

    // Reset fields after submit
    setTitle('');
    setDescription('');
    setPriority('Low');
    setDueDate('');
    setCategory('Work');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">🧑‍💼 Work</option>
        <option value="Personal">🏠 Personal</option>
        <option value="Urgent">🚨 Urgent</option>
        <option value="Others">📦 Others</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
