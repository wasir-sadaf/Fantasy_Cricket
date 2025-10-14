import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ isAuthenticated, onLogout, user }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="cricket-icon">🏏</span>
          <h2>Fantasy Cricket</h2>
        </div>
        <ul className="navbar-menu">
          {isAuthenticated ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/league">Leagues</Link></li>
              <li><Link to="/team-selection">Team Selection</Link></li>
              <li>
                <button
                  className="profile-btn"
                  onClick={() => navigate('/profile')}
                >
                  {user?.name || 'Profile'}
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
