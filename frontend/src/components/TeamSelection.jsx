import { useState, useEffect } from 'react'
import './TeamSelection.css'

function TeamSelection({ user }) {
  const [budget, setBudget] = useState(100)
  const [remainingBudget, setRemainingBudget] = useState(100)
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch('http://localhost:3000/api/player/')
        const data = await res.json()
        setPlayers(data)
      } catch (err) {
        console.error('Error fetching players:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  const handleSelectPlayer = (player) => {
    if (selectedPlayers.find(p => p.player_id === player.player_id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p.player_id !== player.player_id))
      setRemainingBudget(remainingBudget + player.price)
    } else {
      if (selectedPlayers.length < 11 && remainingBudget >= player.price) {
        setSelectedPlayers([...selectedPlayers, player])
        setRemainingBudget(remainingBudget - player.price)
      }
    }
  }

  const isPlayerSelected = (playerId) =>
    selectedPlayers.some(p => p.player_id === playerId)

  const handleSaveTeam = async () => {
    if (selectedPlayers.length !== 11) {
      alert('You must select exactly 11 players!')
      return
    }

    try {
      const res = await fetch('http://localhost:3000/api/fantasyteam/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id, // adjust according to your auth
          players: selectedPlayers.map(p => p.player_id)
        })
      })
      const data = await res.json()
      alert(data.message || 'Team saved successfully!')
    } catch (err) {
      console.error('Error saving team:', err)
      alert('Failed to save team')
    }
  }

  if (loading) return <div>Loading players...</div>

  return (
    <div className="team-selection-container">
      <div className="team-header">
        <h1>🏏 Build Your Dream Team</h1>
        <div className="team-stats">
          <div className="stat-box">
            <span className="stat-label">Budget Remaining</span>
            <span className="stat-value">₹{remainingBudget.toFixed(1)}M</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Players Selected</span>
            <span className="stat-value">{selectedPlayers.length}/11</span>
          </div>
        </div>
      </div>

      <div className="team-content">
        <div className="players-section">
          <h2>Available Players</h2>
          <div className="players-grid">
            {players.map(player => (
              <div
                key={player.player_id}
                className={`player-card ${isPlayerSelected(player.player_id) ? 'selected' : ''}`}
              >
                <div className="player-image">🏏</div> {/* optional: real images */}
                <div className="player-info">
                  <h3>{player.name}</h3>
                  <div className="player-meta">
                    <span className="player-team">{player.real_team_id}</span>
                    <span className="player-role">{player.role}</span>
                  </div>
                  <div className="player-stats">
                    <span className="player-price">₹{player.price}M</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectPlayer(player)}
                  className={`select-btn ${isPlayerSelected(player.player_id) ? 'remove' : ''}`}
                  disabled={
                    !isPlayerSelected(player.player_id) &&
                    (selectedPlayers.length >= 11 || remainingBudget < player.price)
                  }
                >
                  {isPlayerSelected(player.player_id) ? 'Remove' : 'Add'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="selected-team-section">
          <h2>Your Team ({selectedPlayers.length}/11)</h2>
          {selectedPlayers.length === 0 ? (
            <div className="empty-team">
              <p>Start selecting players to build your team!</p>
            </div>
          ) : (
            <>
              <div className="selected-players-list">
                {selectedPlayers.map(player => (
                  <div key={player.player_id} className="selected-player-item">
                    <span className="player-icon">🏏</span>
                    <div className="player-details">
                      <strong>{player.name}</strong>
                      <span className="role-text">{player.role}</span>
                    </div>
                    <span className="price-tag">₹{player.price}M</span>
                  </div>
                ))}
              </div>
              <button
                className={`save-team-btn ${selectedPlayers.length === 11 ? 'active' : ''}`}
                disabled={selectedPlayers.length !== 11}
                onClick={handleSaveTeam}
              >
                {selectedPlayers.length === 11
                  ? 'Save Team'
                  : `Select ${11 - selectedPlayers.length} more players`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamSelection
