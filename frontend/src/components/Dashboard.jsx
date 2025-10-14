import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [teams, setTeams] = useState([])
  const [leagues, setLeagues] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Load user info from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (!storedUser) {
      navigate('/login')
    } else {
      setUser(storedUser)
      fetchDashboardData(storedUser.userId || storedUser.id)
    }
  }, [navigate])

  const fetchDashboardData = async (userId) => {
    try {
      // Fetch user teams
      const teamsRes = await fetch(`http://localhost:3000/api/teams?userId=${userId}`)
      const teamsData = await teamsRes.json()
      setTeams(teamsData || [])

      // Fetch leagues user is part of
      const leaguesRes = await fetch(`http://localhost:3000/api/league/user/${userId}`)
      const leaguesData = await leaguesRes.json()
      setLeagues(leaguesData || [])
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading dashboard...</p>

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'} 🎉</h1>
        <button className="profile-btn" onClick={() => navigate('/profile')}>
        {user?.name || 'Profile'}
        </button>
      </div>

      <div className="dashboard-section">
        <h2>Your Teams</h2>
        {teams.length === 0 ? <p>You have no teams yet.</p> : (
          <div className="teams-grid">
            {teams.map(team => (
              <div key={team.id} className="team-card">
                <h3>{team.name}</h3>
                <p>Points: {team.points ?? 0}</p>
                <p>Players: {team.players?.length ?? 0}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Your Leagues</h2>
        {leagues.length === 0 ? <p>You have not joined any leagues yet.</p> : (
          <div className="leagues-grid">
            {leagues.map(league => (
              <div key={league.id} className="league-card">
                <h3>{league.name}</h3>
                <p>Status: {league.status}</p>
                <p>Points: {league.userPoints ?? 0}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <button className="join-league-btn" onClick={() => navigate('/league')}>
          Join a New League
        </button>
      </div>
    </div>
  )
}

export default Dashboard
