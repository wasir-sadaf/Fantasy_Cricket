import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './League.css'

function League({ user }) {
  const [leagues, setLeagues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/league')
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()

        if (!Array.isArray(data) || data.length === 0) {
          setLeagues([])
        } else {
          const mapped = data.map(l => ({
            id: l.league_id || l.id,
            name: l.name || 'Unnamed League',
            participants: l.participants ?? l.total_participants ?? 0,
            maxParticipants: l.max_participants ?? l.maxParticipants ?? 100,
            entryFee: l.entry_fee ?? l.entryFee ?? 'N/A',
            prize: l.prize_pool ?? l.prize ?? 'N/A',
            status: l.status ?? 'Open',
            startDate: l.start_date ?? l.startDate ?? 'TBA'
          }))
          setLeagues(mapped)
        }
      } catch (err) {
        console.error('Failed to fetch leagues:', err)
        setError('Failed to load leagues. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchLeagues()
  }, [])

  const handleJoin = (leagueId) => {
    if (!user) {
      navigate('/login')
    } else {
      navigate(`/league/${leagueId}`)
    }
  }

  if (loading) return <p>Loading leagues...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="league-container">
      <div className="league-section">
        <h1>🎯 Available Leagues</h1>
        <div className="leagues-grid">
          {leagues.length === 0 ? (
            <p>No leagues available.</p>
          ) : (
            leagues.map(league => (
              <div
                key={league.id}
                className={`league-card ${league.status.toLowerCase() === 'full' ? 'full' : ''}`}
              >
                <div className="league-header">
                  <h3>{league.name}</h3>
                  <span className={`status-badge ${league.status.toLowerCase()}`}>
                    {league.status}
                  </span>
                </div>

                <div className="league-details">
                  <div className="detail-row">
                    <span className="detail-icon">💰</span>
                    <span className="detail-text">
                      Prize Pool: <strong>{league.prize}</strong>
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🎫</span>
                    <span className="detail-text">
                      Entry Fee: <strong>{league.entryFee}</strong>
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">👥</span>
                    <span className="detail-text">
                      Participants: <strong>{league.participants}/{league.maxParticipants}</strong>
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <span className="detail-text">
                      Starts: <strong>{league.startDate}</strong>
                    </span>
                  </div>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(league.participants / league.maxParticipants) * 100}%` }}
                  ></div>
                </div>

                <button
                  className={`join-btn ${league.status.toLowerCase() === 'full' ? 'disabled' : ''}`}
                  disabled={league.status.toLowerCase() === 'full'}
                  onClick={() => handleJoin(league.id)}
                >
                  {league.status.toLowerCase() === 'full' ? 'League Full' : 'Join League'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default League
