import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContextProvider'
import NavBar from '../components/NavBar'
import TaskList from '../components/TaskList'
import AddTaskForm from '../components/AddTaskForm'
import API from '../services/api'


function Dashboard() {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState([])

  const toggleForm = () => {
    setShowForm((prev) => !prev)
  }

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks')
      setTasks(res.data)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    }
  }

  

  return (
    <div className="min-h-screen h-auto bg-gray-100 py-4 px-6">
      <NavBar>{user.username}</NavBar>

      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-700">
            {user ? `Welcome, ${user.username}!` : 'Loading...'}
          </h2>
          <button
            onClick={toggleForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            {showForm ? 'Close Form' : 'Add Task'}
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <AddTaskForm onTaskAdded={toggleForm} fetchTasks={fetchTasks} />
          </div>
        )}

        <TaskList tasks = {tasks} fetchTasks={fetchTasks}  />
      </div>
    </div>
  )
}

export default Dashboard
