import React, {useState} from 'react';
import './Tasks.css'; // If not already, link a CSS file or use App.css

function Tasks({ tasks, toggleDone, deleteTask, startEditing, editingTaskId, editedText, setEditedText, saveEditedTask }) {
  const [showPriority, setShowPriority] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showDone, setShowDone] = useState("All");
  const filteredTasks = tasks.filter((task) => {
  const matchesPriority = showPriority === "All" || task.priority === showPriority;
  const matchesDone =
    showDone === "All" ||
    (showDone === "Done" && task.done) ||
    (showDone === "Not Done" && !task.done);
  return matchesPriority && matchesDone;
});
const sortedTasks = [...filteredTasks].sort((a, b) => {
  return sortOrder === 'asc'
    ? new Date(a.dueDate) - new Date(b.dueDate)
    : new Date(b.dueDate) - new Date(a.dueDate);
});


  return (
    <div className="container">
      <h2>Existing Tasks</h2>
      <div className="filter-controls">
        <label>Filter by Priority:</label>
        <select value={showPriority} onChange={(e) => setShowPriority(e.target.value)}>
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Filter by Status:</label>
        <select value={showDone} onChange={(e) => setShowDone(e.target.value)}>
          <option value="All">All</option>
          <option value="Done">Done</option>
          <option value="Not Done">Not Done</option>
        </select>
      </div>
      <label>
        Sort by Due Date :   
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Earliest First</option>
          <option value="desc">Latest First</option>
        </select>
      </label>

      <div className="tasks-container">
        {sortedTasks.map((task) => (
          <div className="task-card" key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <div className="task-actions">
                  <button onClick={() => saveEditedTask(task.id)}>Save</button>
                  <button onClick={() => setEditedText('')}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="task-info">
                  <h3 className={task.done ? "done" : ""}>{task.text}</h3>
                  <p>{task.description}</p>
                  <p><strong>Due:</strong> {task.dueDate}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                </div>
                <div className="task-actions">
                  <button onClick={() => toggleDone(task.id)}>{task.done ? "Undo" : "Task Done"}</button>
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
