import './App.css';
import octofitLogo from './octofitapp-small.png';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg octofit-navbar mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src={octofitLogo}
              alt="OctoFit Logo"
              className="octofit-navbar-logo me-2"
            />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Navigation umschalten"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/workouts">Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="/"
            element={
              <div className="octofit-hero text-center">
                <img
                  src={octofitLogo}
                  alt="OctoFit Logo"
                  style={{ height: '110px', width: '110px', borderRadius: '50%', border: '3px solid #e94560', boxShadow: '0 0 24px #e9456066', marginBottom: '1.5rem' }}
                />
                <h1 className="display-4 fw-bold">Welcome to OctoFit Tracker</h1>
                <p className="lead mt-3">Track activities, manage teams, and climb the leaderboard.</p>
                <div className="mt-4 d-flex flex-wrap justify-content-center gap-2">
                  <NavLink to="/users" className="btn btn-light btn-lg fw-semibold">Users</NavLink>
                  <NavLink to="/teams" className="btn btn-outline-light btn-lg fw-semibold">Teams</NavLink>
                  <NavLink to="/activities" className="btn btn-outline-light btn-lg fw-semibold">Activities</NavLink>
                  <NavLink to="/leaderboard" className="btn btn-outline-light btn-lg fw-semibold">Leaderboard</NavLink>
                  <NavLink to="/workouts" className="btn btn-outline-light btn-lg fw-semibold">Workouts</NavLink>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
