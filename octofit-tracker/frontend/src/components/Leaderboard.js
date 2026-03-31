import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched Leaderboard:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="card octofit-card mb-4">
      <div className="card-header d-flex align-items-center gap-2">
        <span>&#127942;</span> Leaderboard
      </div>
      <div className="card-body">
        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaders.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">No leaderboard data found.</td>
                  </tr>
                ) : (
                  leaders.map((leader, idx) => (
                    <tr key={leader.id || idx}>
                      <td>
                        {idx === 0 && <span className="badge bg-warning text-dark">&#129351; 1st</span>}
                        {idx === 1 && <span className="badge bg-secondary">&#129352; 2nd</span>}
                        {idx === 2 && <span className="badge bg-danger">&#129353; 3rd</span>}
                        {idx > 2 && <span className="badge bg-light text-dark">#{idx + 1}</span>}
                      </td>
                      <td className="fw-semibold">{leader.team}</td>
                      <td><span className="badge bg-success octofit-badge fs-6">{leader.points}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        Endpoint: <code>{endpoint}</code>
      </div>
    </div>
  );
};

export default Leaderboard;
