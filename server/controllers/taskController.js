import { createTask, getTasksByUser, updateTask, deleteTask } from '../models/taskModel.js';

export const addTask = async (req, res) => {
  const userId = req.userId;
  const { title, description, dueDate, priority, category } = req.body;
  try {
    await createTask(userId, title, description, dueDate, priority, category);
    res.status(201).json({ message: 'Task created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.userId;
  try {
    const tasks = await getTasksByUser(userId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, priority, category, completed } = req.body;
  console.log(title, description, due_date, priority, category, completed )
  try {
    await updateTask(id, title, description, due_date, priority, category, completed);
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeTask = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTask(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
