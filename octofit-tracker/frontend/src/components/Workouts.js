import React, { useEffect, useState } from 'react';

const difficultyBadge = (level) => {
  const map = {
    easy: 'bg-success',
    medium: 'bg-warning text-dark',
    hard: 'bg-danger',
  };
  const cls = map[(level || '').toLowerCase()] || 'bg-secondary';
  return <span className={`badge ${cls} octofit-badge`}>{level}</span>;
};

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched Workouts:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="card octofit-card mb-4">
      <div className="card-header d-flex align-items-center gap-2">
        <span>&#128170;</span> Workouts
      </div>
      <div className="card-body">
        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-danger" role="status">
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
                  <th scope="col">#</th>
                  <th scope="col">Workout Name</th>
                  <th scope="col">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">No workouts found.</td>
                  </tr>
                ) : (
                  workouts.map((workout, idx) => (
                    <tr key={workout.id || idx}>
                      <td><span className="badge bg-secondary">{workout.id || idx + 1}</span></td>
                      <td className="fw-semibold">{workout.name}</td>
                      <td>{difficultyBadge(workout.difficulty)}</td>
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

export default Workouts;
