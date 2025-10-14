import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './LeagueDetails.css';

function LeagueDetails() {
  const { leagueId } = useParams();
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeagueDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/fantasy-private-league/${leagueId}`);
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
      <p>Created By: <strong>{league.created_by}</strong></p>
      <p>Max Users: <strong>{league.max_users}</strong></p>
      <p>Invite Code: <strong>{league.invite_code}</strong></p>
    </div>
  );
}

export default LeagueDetails;
