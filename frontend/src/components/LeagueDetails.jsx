import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './LeagueDetails.css';

function LeagueDetails() {
  const { leagueId } = useParams(); // grab league ID from URL
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeagueDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/league/${leagueId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setLeague(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch league details');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueDetails();
  }, [leagueId]);

  if (loading) return <p className="loading">Loading league details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!league) return <p className="error">League not found</p>;

  return (
    <div className="league-details-container">
      <h1>{league.name}</h1>
      <p>Type: <strong>{league.type}</strong></p>
      <p>Created By: <strong>{league.created_by_name || league.created_by}</strong></p>
      <p>Start Date: <strong>{league.start_date}</strong></p>
      <p>End Date: <strong>{league.last_date}</strong></p>
      <p>Participants: <strong>{league.participants}/{league.max_participants}</strong></p>
      <p>Entry Fee: <strong>{league.entry_fee}</strong></p>
      <p>Prize Pool: <strong>{league.prize_pool}</strong></p>

      <h2>Teams in this League</h2>
      {league.teams && league.teams.length > 0 ? (
        <ul className="teams-list">
          {league.teams.map(team => (
            <li key={team.real_team_id}>{team.name} ({team.country})</li>
          ))}
        </ul>
      ) : (
        <p>No teams yet.</p>
      )}

      <button className="join-league-btn">Join League</button>
    </div>
  );
}

export default LeagueDetails;
