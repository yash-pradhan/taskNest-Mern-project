import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthContextProvider } from './Context/AuthContextProvider';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './Context/AuthContextProvider'

function AppRouter() {
  const {isAuthenticated} = useAuth();
  return (
      <Routes>
        <Route path='/' element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    
  )
}

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
