import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  let [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); 
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      // optionally, fetch user data from backend if you want to restore the user
      // API.get('/auth/login', {
      //   headers: { Authorization: `Bearer ${token}` }
      // })
      // .then(res => setUser(res.data.userData))
      // .catch(err => {
      //   console.error('Token invalid or expired');
      //   logout(); // Optional: force logout if error
      // });
    
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = (token, userData) => {
    
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
