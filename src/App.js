import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import {
  loadTasks,
  saveTasks,
  getUsername,
  saveUsername
} from './utils/localStorage';
import './styles/App.css';

const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    completed: false,
    priority: "Medium",
    category: "Work",
    dueDate: "2025-07-05",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    completed: true,
    priority: "High",
    category: "Personal",
    dueDate: "2025-07-03",
    createdAt: "2024-01-14T15:30:00Z"
  }
];

function App() {
  const [username, setUsername] = useState(getUsername());
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filter, setFilter] = useState('all');

  const [tasks, setTasks] = useState(() => {
    if (!username) return [];
    const stored = loadTasks(username);
    if (stored.length === 0) {
      saveTasks(sampleTasks, username);
      return sampleTasks;
    }
    return stored;
  });

  // Update when username changes
  useEffect(() => {
    if (username) {
      const stored = loadTasks(username);
      setTasks(stored.length > 0 ? stored : sampleTasks);
      saveUsername(username);
    }
  }, [username]);

  useEffect(() => {
    if (username) saveTasks(tasks, username);
  }, [tasks, username]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed;
    const matchesPriority = priorityFilter === 'all' ? true : task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' ? true : task.category === categoryFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  return username ? (
    <div className="app">
      <div className="top-bar">
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <h2>Welcome, {username}</h2>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-btn" onClick={() => setSearchQuery('')}>
            ❌
          </button>
        )}
      </div>

      <TaskForm setTasks={setTasks} tasks={tasks} />
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        tasks={tasks}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  ) : (
    <Login onLogin={setUsername} />
  );
}

export default App;
