import { useState, useEffect } from 'react'
import './AddTeam.css'

function AddTeam({ user }) {
  const [players, setPlayers] = useState([])
  const [teamName, setTeamName] = useState('')
  const [selectedPlayers, setSelectedPlayers] = useState({
    batsman1: null,
    batsman2: null,
    batsman3: null,
    wicketKeeper: null,
    bowler1: null,
    bowler2: null,
    bowler3: null,
    mixRole1: null,
    mixRole2: null,
    mixRole3: null,
    mixRole4: null
  })
  const [captain, setCaptain] = useState(null)
  const [viceCaptain, setViceCaptain] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/api/player")
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.error(err))
  }, [])

  const handlePlayerSelect = (position, playerId) => {
    const player = players.find(p => p.player_id === parseInt(playerId))
    
    if (selectedPlayers[position]) {
      if (captain === selectedPlayers[position].player_id) setCaptain(null)
      if (viceCaptain === selectedPlayers[position].player_id) setViceCaptain(null)
    }

    setSelectedPlayers(prev => ({
      ...prev,
      [position]: player || null
    }))
  }

  const handleCaptainSelect = (playerId) => {
    if (viceCaptain === playerId) {
      alert('This player is already the vice captain!')
      return
    }
    setCaptain(captain === playerId ? null : playerId)
  }

  const handleViceCaptainSelect = (playerId) => {
    if (captain === playerId) {
      alert('This player is already the captain!')
      return
    }
    setViceCaptain(viceCaptain === playerId ? null : playerId)
  }

  const handleClearAll = () => {
    setTeamName('')
    setSelectedPlayers({
      batsman1: null, batsman2: null, batsman3: null,
      wicketKeeper: null,
      bowler1: null, bowler2: null, bowler3: null,
      mixRole1: null, mixRole2: null, mixRole3: null, mixRole4: null
    })
    setCaptain(null)
    setViceCaptain(null)
    setShowSuccess(false)
  }

  const allPlayers = players
  const batsmen = players.filter(p => p.role === 'batsman')
  const wicketKeepers = players.filter(p => p.role === 'wicket-keeper')
  const bowlers = players.filter(p => p.role === 'bowler')

  return (
    <div className="add-team-container">
      <div className="add-team-header">
        <h1>🏏 Add Your Team</h1>
        <p>Create your dream cricket team</p>
      </div>

      <div className="team-form">
        <div className="form-section">
          <label htmlFor="teamName" className="section-label">Team Name *</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter unique team name"
            className="team-name-input"
          />
        </div>

        {/* Batsmen */}
        <div className="players-section">
          <h2>Select Batsmen (3 Required)</h2>
          <div className="player-selects">
            {['batsman1', 'batsman2', 'batsman3'].map((pos, i) => (
              <div key={pos} className="player-select-group">
                <label>Batsman {i + 1}</label>
                <select
                  value={selectedPlayers[pos]?.player_id || ''}
                  onChange={(e) => handlePlayerSelect(pos, e.target.value)}
                  className="player-select"
                >
                  <option value="">Select Batsman</option>
                  {batsmen.map(p => (
                    <option key={p.player_id} value={p.player_id}>
                      {p.name} ({p.team}) - {p.price} pts
                    </option>
                  ))}
                </select>

                {selectedPlayers[pos] && (
                  <div className="captain-selects">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={captain === selectedPlayers[pos].player_id}
                        onChange={() => handleCaptainSelect(selectedPlayers[pos].player_id)}
                      /> Captain
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={viceCaptain === selectedPlayers[pos].player_id}
                        onChange={() => handleViceCaptainSelect(selectedPlayers[pos].player_id)}
                      /> Vice Captain
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Wicket Keeper */}
        <div className="players-section">
          <h2>Select Wicket Keeper (1 Required)</h2>
          <div className="player-selects">
            <div className="player-select-group">
              <label>Wicket Keeper</label>
              <select
                value={selectedPlayers.wicketKeeper?.player_id || ''}
                onChange={(e) => handlePlayerSelect('wicketKeeper', e.target.value)}
              >
                <option value="">Select Wicket Keeper</option>
                {wicketKeepers.map(p => (
                  <option key={p.player_id} value={p.player_id}>
                    {p.name} ({p.team}) - {p.price} pts
                  </option>
                ))}
              </select>

              {selectedPlayers.wicketKeeper && (
                <div className="captain-selects">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={captain === selectedPlayers.wicketKeeper.player_id}
                      onChange={() => handleCaptainSelect(selectedPlayers.wicketKeeper.player_id)}
                    /> Captain
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={viceCaptain === selectedPlayers.wicketKeeper.player_id}
                      onChange={() => handleViceCaptainSelect(selectedPlayers.wicketKeeper.player_id)}
                    /> Vice Captain
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bowlers */}
        <div className="players-section">
          <h2>Select Bowlers (3 Required)</h2>
          <div className="player-selects">
            {['bowler1', 'bowler2', 'bowler3'].map((pos, i) => (
              <div key={pos} className="player-select-group">
                <label>Bowler {i + 1}</label>
                <select
                  value={selectedPlayers[pos]?.player_id || ''}
                  onChange={(e) => handlePlayerSelect(pos, e.target.value)}
                >
                  <option value="">Select Bowler</option>
                  {bowlers.map(p => (
                    <option key={p.player_id} value={p.player_id}>
                      {p.name} ({p.team}) - {p.price} pts
                    </option>
                  ))}
                </select>

                {selectedPlayers[pos] && (
                  <div className="captain-selects">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={captain === selectedPlayers[pos].player_id}
                        onChange={() => handleCaptainSelect(selectedPlayers[pos].player_id)}
                      /> Captain
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={viceCaptain === selectedPlayers[pos].player_id}
                        onChange={() => handleViceCaptainSelect(selectedPlayers[pos].player_id)}
                      /> Vice Captain
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button onClick={() => setShowSuccess(true)} className="add-btn">Show Selected</button>
          <button onClick={handleClearAll} className="clear-btn">Clear All</button>
        </div>
      </div>

      {showSuccess && (
        <div className="selected-team-display">
          <h2>Your Selected Team</h2>
          <div className="team-grid">
            {Object.values(selectedPlayers).filter(p => p).map((p, i) => (
              <div key={i} className="team-player-card">
                <div className="player-info">
                  <h4>{p.name}</h4>
                  <p>{p.team} - {p.role}</p>
                  <p className="player-cost">{p.price} pts</p>
                </div>
                {captain === p.player_id && <span className="badge captain-badge">C</span>}
                {viceCaptain === p.player_id && <span className="badge vc-badge">VC</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTeam
