import React from 'react';
import './Tasks.css'; // If not already, link a CSS file or use App.css

function Tasks({ tasks, toggleDone, deleteTask, startEditing, editingTaskId, editedText, setEditedText, saveEditedTask }) {
  return (
    <div className="container">
      <h2>Existing Tasks</h2>
      <div className="tasks-container">
        {tasks.map((task) => (
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
                  <button onClick={() => toggleDone(task.id)}>{task.done ? "Undo" : "Done"}</button>
                  <button onClick={() => startEditing(task)}>✏️</button>
                  <button onClick={() => deleteTask(task.id)}>❌</button>
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
