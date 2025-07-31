// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import Header from './components/Header';
import TaskBox from "./components/TaskBox"; // or wherever it is
import './App.css';
import { set } from "mongoose";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("");

  const addTask = () => {
    if (newTaskText.trim() === "") return;
    const newTask = {
      id: tasks.length + 1,
      text: newTaskText,
      done: false,
      description: newTaskDescription,
      dueDate: newTaskDueDate,
      priority: newTaskPriority,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
    setNewTaskDescription("");
    setNewTaskDueDate("");
    setNewTaskPriority("");
  };

  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));
  const toggleDone = (id) => setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedText(task.text);
  };
  const saveEditedTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: editedText } : task));
    setEditingTaskId(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={
          <Tasks
            tasks={tasks}
            setTasks={setTasks}
            toggleDone={toggleDone}
            deleteTask={deleteTask}
            startEditing={startEditing}
            editingTaskId={editingTaskId}
            editedText={editedText}
            setEditedText={setEditedText}
            saveEditedTask={saveEditedTask}
          />
        } />
        <Route path="/add-task" element={
          <AddTask
          tasks={tasks}
          setTasks={setTasks}
            newTaskText={newTaskText}
            setNewTaskText={setNewTaskText}
            newTaskDescription={newTaskDescription}
            setNewTaskDescription={setNewTaskDescription}
            newTaskDueDate={newTaskDueDate}
            setNewTaskDueDate={setNewTaskDueDate}
            newTaskPriority={newTaskPriority}
            setNewTaskPriority={setNewTaskPriority}
            addTask={addTask}
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;
