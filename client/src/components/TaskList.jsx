import React, { useState, useEffect } from 'react'
import TaskItem from './TaskItem'
import API from '../services/api'
function TaskList({fetchTasks, tasks}) {
 
  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`)
      fetchTasks();
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const handleToggle = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId)
    try {
      await API.put(`/tasks/${taskId}`, {...task, completed: true})
      fetchTasks()
    } catch (error) {
      console.error('Toggle error:', error)
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  console.log('hi');
  
  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))
      )}
    </div>
  )
}

export default TaskList
