import React, { useEffect, useState } from 'react'
import API from '../services/api'

function TaskItem({ task, onDelete, onToggle }) {
  const [oneTask, setOneTask] = useState(task)
  const [timeoutId, setTimeoutId] = useState(null)

  // Detect field changes and debounce auto-save
  useEffect(() => {
    const hasChanges =
      oneTask.title !== task.title ||
      oneTask.description !== task.description ||
      oneTask.due_date !== task.due_date ||
      oneTask.priority !== task.priority ||
      oneTask.category !== task.category ||
      oneTask.completed !==task.completed

    if (hasChanges) {
      if (timeoutId) clearTimeout(timeoutId)

      const newId = setTimeout(() => {
        API.put(`/tasks/${task.id}`, oneTask).catch((error) =>
          console.error('Auto-save error:', error)
        )
      }, 1000)

      setTimeoutId(newId)
    }
  }, [oneTask])

  // Handle field changes
  function handleChange(e) {
    const { name, value } = e.target
    setOneTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Get dynamic color for priority badge
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500'
      case 'Medium':
        return 'bg-yellow-500'
      case 'Low':
      default:
        return 'bg-green-500'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 border hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            <input
              type="text"
              name="title"
              value={oneTask.title}
              onChange={handleChange}
              className="text-lg font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none sm:w-1/2 lg:w-100 focus:border-purple-500"
              disabled = {oneTask.completed}
            />
          </h3>
          <p className="text-sm text-gray-500">
            Due Date:{' '}
            <span className="font-medium text-gray-700">
              {new Date(oneTask.due_date).toLocaleDateString()}
            </span>
          </p>
        </div>

        <span
          className={`text-xs text-white px-3 py-1 rounded-full ${getPriorityColor(
            oneTask.priority
          )}`}
        >
          {oneTask.priority} Priority
        </span>
      </div>

      <textarea
        name="description"
        value={oneTask.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        disabled = {oneTask.completed}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Due Date</label>
          <input
            type="date"
            name="due_date"
            value={oneTask.due_date ? oneTask.due_date.slice(0, 10) : ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled = {oneTask.completed}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <input
            type="text"
            name="category"
            placeholder="e.g. Work, Personal"
            value={oneTask.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled = {oneTask.completed}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">Priority</label>
        <select
          name="priority"
          value={oneTask.priority}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          disabled = {oneTask.completed}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onToggle(oneTask.id)}
          className={`px-4 py-2 rounded text-white ${
            oneTask.completed ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {oneTask.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>

        <button
          onClick={() => onDelete(oneTask.id)}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
