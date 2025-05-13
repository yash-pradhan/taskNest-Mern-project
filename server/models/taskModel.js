import pool from '../db.js';

export const createTask = async (userId, title, description, dueDate, priority, category) => {
  await pool.query(
    'INSERT INTO tasks (user_id, title, description, due_date, priority, category) VALUES ($1, $2, $3, $4, $5, $6)',
    [userId, title, description, dueDate, priority, category]
  );
};

export const getTasksByUser = async (userId) => {
  const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
  return result.rows;
};

export const updateTask = async (taskId, title, description, due_date, priority, category, completed) => {
  await pool.query(
    'UPDATE tasks SET title=$1, description=$2, due_date=$3, priority=$4, category=$5, completed=$6 WHERE id=$7',
    [title, description, due_date, priority, category, completed, taskId]
  );
};

export const deleteTask = async (taskId) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
};
