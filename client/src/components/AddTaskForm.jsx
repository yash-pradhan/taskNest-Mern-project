import React, { useState } from 'react'
import API from '../services/api'

function AddTaskForm({ onTaskAdded, fetchTasks }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [category, setCategory] = useState('General')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/tasks', {
        title,
        description,
        dueDate,
        priority,
        category,
      })

      // Clear fields
      setTitle('')
      setDescription('')
      setDueDate('')
      setPriority('Medium')
      setCategory('General')
      fetchTasks();

      if (onTaskAdded) onTaskAdded()
    } catch (err) {
      console.error('Error creating task:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-md shadow">
      <input
        type="text"
        placeholder="Task title"
        className="w-full px-4 py-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Task description"
        className="w-full px-4 py-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="w-full px-4 py-2 border rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      <select
        className="w-full px-4 py-2 border rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <input
        type="text"
        placeholder="Category (e.g. Work, Personal)"
        className="w-full px-4 py-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        
      >
        Add Task
      </button>
    </form>
  )
}

export default AddTaskForm
