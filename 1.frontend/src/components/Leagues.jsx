import { useState, useEffect } from 'react'
import './Leagues.css'

function Leagues({ user }) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [selectedLeague, setSelectedLeague] = useState(null)
  const [newLeague, setNewLeague] = useState({ name: '', type: 'public' })
  const [joinKey, setJoinKey] = useState('')
  const [userLeagues, setUserLeagues] = useState([])
  const [availableLeagues, setAvailableLeagues] = useState([])

  useEffect(() => {
    const storedLeagues = localStorage.getItem('userLeagues')
    if (storedLeagues) setUserLeagues(JSON.parse(storedLeagues))

    const fetchLeagues = async () => {
      try {
        const privateRes = await fetch('http://localhost:3000/api/fantasy-private-league')
        const privateData = await privateRes.json()
        const privateLeagues = privateData.map(l => ({
          id: l.private_league_id,
          name: l.name,
          type: 'private',
          members: l.members || 0,
          creator: l.created_by,
          joinKey: l.invite_code,
          createdAt: new Date().toISOString().split('T')[0]
        }))

        const publicRes = await fetch('http://localhost:3000/api/league')
        const publicData = await publicRes.json()
        const publicLeagues = publicData.map(l => ({
          id: l.league_id,
          name: l.name,
          type: 'public',
          members: l.members || 0,
          creator: l.created_by,
          joinKey: null,
          createdAt: new Date(l.start_date).toISOString().split('T')[0]
        }))

        setAvailableLeagues([...privateLeagues, ...publicLeagues])
      } catch (err) {
        console.error('Error fetching leagues:', err)
      }
    }

    fetchLeagues()
  }, [])

  const generateJoinKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let key = ''
    for (let i = 0; i < 8; i++) key += chars.charAt(Math.floor(Math.random() * chars.length))
    return key
  }

  const handleCreateLeague = () => {
    if (!newLeague.name.trim()) {
      alert('Please enter a league name!')
      return
    }

    const createdLeague = {
      id: Date.now(),
      name: newLeague.name,
      type: newLeague.type,
      members: 1,
      creator: user?.username || 'User',
      createdAt: new Date().toISOString().split('T')[0],
      joinKey: newLeague.type === 'private' ? generateJoinKey() : null,
      userRank: 1,
      userPoints: 0
    }

    setAvailableLeagues(prev => [createdLeague, ...prev])

    const updatedUserLeagues = [...userLeagues, {
      id: createdLeague.id,
      name: createdLeague.name,
      rank: 1,
      points: 0,
      members: 1
    }]
    setUserLeagues(updatedUserLeagues)
    localStorage.setItem('userLeagues', JSON.stringify(updatedUserLeagues))

    if (createdLeague.joinKey) alert(`League created! Share this join key: ${createdLeague.joinKey}`)
    else alert('League created successfully!')

    setNewLeague({ name: '', type: 'public' })
    setShowCreateModal(false)
  }

  const handleJoinLeague = (league) => {
    if (userLeagues.find(l => l.id === league.id)) {
      alert('You have already joined this league!')
      return
    }

    if (league.type === 'private') {
      setSelectedLeague(league)
      setShowJoinModal(true)
    } else joinLeagueDirectly(league)
  }

  const joinLeagueDirectly = (league) => {
    const updatedUserLeagues = [...userLeagues, {
      id: league.id,
      name: league.name,
      rank: league.members + 1,
      points: 0,
      members: league.members
    }]
    setUserLeagues(updatedUserLeagues)
    localStorage.setItem('userLeagues', JSON.stringify(updatedUserLeagues))

    setAvailableLeagues(prev => prev.map(l => l.id === league.id ? { ...l, members: l.members + 1 } : l))

    alert(`Successfully joined ${league.name}!`)
    setShowJoinModal(false)
    setJoinKey('')
    setSelectedLeague(null)
  }

  const handleJoinPrivateLeague = () => {
    if (!joinKey.trim()) {
      alert('Please enter the join key!')
      return
    }

    if (joinKey.toUpperCase() === selectedLeague.joinKey) joinLeagueDirectly(selectedLeague)
    else alert('Invalid join key!')
  }

  const isLeagueJoined = (leagueId) => userLeagues.some(l => l.id === leagueId)

  return (
    <div className="leagues-container">
      <div className="leagues-header">
        <h1>🏆 Leagues</h1>
        <p>Join leagues and compete with other players</p>
      </div>

      <div className="league-actions">
        <button onClick={() => setShowJoinModal(true)} className="action-btn join-btn">Join a League</button>
        <button onClick={() => setShowCreateModal(true)} className="action-btn create-btn">Create a League</button>
      </div>

      <div className="my-leagues-section">
        <h2>My Leagues ({userLeagues.length})</h2>
        {userLeagues.length === 0 ? (
          <div className="empty-state"><p>You haven't joined any leagues yet. Join or create one to get started!</p></div>
        ) : (
          <div className="leagues-grid">
            {userLeagues.map(league => (
              <div key={league.id} className="league-card my-league">
                <div className="league-card-header">
                  <h3>{league.name}</h3>
                  <span className="members-badge">👥 {league.members || 'N/A'} members</span>
                </div>
                <div className="league-stats">
                  <div className="stat"><span className="stat-label">Your Rank</span><span className="stat-value">#{league.rank}</span></div>
                  <div className="stat"><span className="stat-label">Your Points</span><span className="stat-value">{league.points}</span></div>
                </div>
                <button className="view-details-btn">View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="available-leagues-section">
        <h2>Available Leagues</h2>
        <div className="leagues-grid">
          {availableLeagues.map(league => (
            <div key={league.id} className="league-card">
              <div className="league-card-header">
                <h3>{league.name}</h3>
                <span className={`type-badge ${league.type}`}>{league.type === 'private' ? '🔒 Private' : '🌐 Public'}</span>
              </div>
              <div className="league-info">
                <p><strong>Members:</strong> {league.members}</p>
                <p><strong>Created by:</strong> {league.creator}</p>
                <p><strong>Created:</strong> {league.createdAt}</p>
              </div>
              <button
                onClick={() => handleJoinLeague(league)}
                className={`join-league-btn ${isLeagueJoined(league.id) ? 'joined' : ''}`}
                disabled={isLeagueJoined(league.id)}
              >
                {isLeagueJoined(league.id) ? '✓ Joined' : 'Join League'}
              </button>
            </div>
          ))}
          {availableLeagues.length === 0 && <p>No leagues available yet.</p>}
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>Create New League</h2><button onClick={() => setShowCreateModal(false)} className="close-btn">×</button></div>
            <div className="modal-body">
              <div className="form-group">
                <label>League Name *</label>
                <input type="text" value={newLeague.name} onChange={(e) => setNewLeague({ ...newLeague, name: e.target.value })} placeholder="Enter league name" className="modal-input"/>
              </div>
              <div className="form-group">
                <label>League Type *</label>
                <div className="radio-group">
                  <label className="radio-label"><input type="radio" name="leagueType" value="public" checked={newLeague.type === 'public'} onChange={(e) => setNewLeague({ ...newLeague, type: e.target.value })}/><span>Public (Anyone can join)</span></label>
                  <label className="radio-label"><input type="radio" name="leagueType" value="private" checked={newLeague.type === 'private'} onChange={(e) => setNewLeague({ ...newLeague, type: e.target.value })}/><span>Private (Requires join key)</span></label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleCreateLeague} className="modal-btn add-btn">Create</button>
              <button onClick={() => { setNewLeague({ name: '', type: 'public' }); setShowCreateModal(false) }} className="modal-btn clear-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showJoinModal && selectedLeague && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h2>Join Private League</h2><button onClick={() => setShowJoinModal(false)} className="close-btn">×</button></div>
            <div className="modal-body">
              {selectedLeague.type === 'private' ? (
                <>
                  <p className="modal-description">"{selectedLeague.name}" is a private league. Please enter the join key to join.</p>
                  <div className="form-group">
                    <label>Join Key *</label>
                    <input type="text" value={joinKey} onChange={(e) => setJoinKey(e.target.value.toUpperCase())} placeholder="Enter join key" className="modal-input"/>
                  </div>
                </>
              ) : <p>Do you want to join "{selectedLeague.name}"?</p>}
            </div>
            <div className="modal-footer">
              <button onClick={() => selectedLeague.type === 'private' ? handleJoinPrivateLeague() : joinLeagueDirectly(selectedLeague)} className="modal-btn add-btn">Join</button>
              <button onClick={() => { setJoinKey(''); setShowJoinModal(false); setSelectedLeague(null) }} className="modal-btn clear-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leagues
