import React from 'react';

const TaskFilter = ({
  filter,
  setFilter,
  tasks,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter
}) => {
  const counts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' }
  ];

  return (
    <>
      {/* Status Filter */}
      <div className="filter-tabs">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={filter === value ? 'active' : ''}
          >
            {label} ({counts[value]})
          </button>
        ))}
      </div>

      {/* Priority Filter */}
      <div className="filter-tabs">
        {['all', 'High', 'Medium', 'Low'].map(level => (
          <button
            key={level}
            onClick={() => setPriorityFilter(level)}
            className={priorityFilter === level ? 'active' : ''}
          >
            {level} Priority
          </button>
        ))}
      </div>

      {/* Category Filter */}
     <div className="filter-tabs">
  {['all', 'Work', 'Personal', 'Urgent', 'Others'].map(category => (
    <button
      key={category}
      onClick={() => setCategoryFilter(category)}
      className={`category-btn ${category.toLowerCase()} ${categoryFilter === category ? 'active' : ''}`}
    >
      {category}
    </button>
  ))}
</div>

    </>
  );
};

export default TaskFilter;
