import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import League from './components/League'
import LeagueDetails from './components/LeagueDetails'
import TeamSelection from './components/TeamSelection'
import './App.css'

function App() {
  // Load persisted user from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const [user, setUser] = useState(storedUser)
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedUser)

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} user={user} />
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup onSignup={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/league"
            element={isAuthenticated ? <League user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/league/:leagueId"
            element={isAuthenticated ? <LeagueDetails user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/team-selection"
            element={isAuthenticated ? <TeamSelection user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
