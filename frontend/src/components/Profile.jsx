import { useState, useEffect } from 'react';
import './Profile.css';

function Profile({ user }) {
  const [stats, setStats] = useState({
    totalPoints: 0,
    matchesPlayed: 0,
    wins: 0,
    rank: 0,
    teamsCreated: 0,
    achievements: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        // Example: fetch user stats from your backend
        const res = await fetch(`http://localhost:3000/api/fantasyteam/playerStats/${user.id}`);
        const data = await res.json();

        // Map backend response to your frontend format
        setStats({
          totalPoints: data.totalPoints || 0,
          matchesPlayed: data.matchesPlayed || 0,
          wins: data.wins || 0,
          rank: data.rank || 0,
          teamsCreated: data.teamsCreated || 0,
          achievements: data.achievements || []
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (!user) return <p>Please log in to view your profile.</p>;
  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <div className="profile-info">
          <h1>{user.username || 'Cricket Fan'}</h1>
          <p>{user.email || 'user@example.com'}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalPoints}</div>
          <div className="stat-label">Total Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.matchesPlayed}</div>
          <div className="stat-label">Matches Played</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.wins}</div>
          <div className="stat-label">Wins</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">#{stats.rank}</div>
          <div className="stat-label">Global Rank</div>
        </div>
      </div>

      <div className="achievements-section">
        <h2>🏅 Achievements</h2>
        <div className="achievements-list">
          {stats.achievements.length === 0 ? (
            <p>No achievements yet.</p>
          ) : (
            stats.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                {achievement}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
