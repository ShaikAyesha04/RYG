// localStorage.js

export const getUsername = () => localStorage.getItem('username');

export const saveUsername = (username) => {
  localStorage.setItem('username', username);
};

export const saveTasks = (tasks, username) => {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

export const loadTasks = (username) => {
  const data = localStorage.getItem(`tasks_${username}`);
  if (data) return JSON.parse(data);

  // Sample tasks for new users
  return [
    {
      id: 1,
      title: "Welcome task",
      description: "This is a sample task",
      priority: "Low",
      category: "Others",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
      createdAt: new Date().toISOString(),
    }
  ];
};
