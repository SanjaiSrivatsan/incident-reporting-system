import { useState, useEffect } from 'react';
import api from '../api/axios';

const ReporterDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('LOW');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchIncidents = async () => {
    try {
      const res = await api.get('/incidents/my');
      setIncidents(res.data);
    } catch (err) {
      setError('Failed to fetch incidents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.post('/incidents', { title, description, priority });
      setMessage('Incident reported successfully!');
      setTitle('');
      setDescription('');
      setPriority('LOW');
      fetchIncidents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to report incident');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Reporter Dashboard</h2>
      
      <div className="card mb-4">
        <h3>Report New Incident</h3>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4"></textarea>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Submit Incident</button>
        </form>
      </div>

      <div className="card" style={{ maxWidth: '100%' }}>
        <h3>My Incidents</h3>
        {loading ? <p>Loading...</p> : (
          incidents.length === 0 ? <p>No incidents reported yet.</p> : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map(inc => (
                    <tr key={inc._id}>
                      <td>
                        <strong>{inc.title}</strong>
                        <p className="text-small">{inc.description}</p>
                      </td>
                      <td><span className={`badge priority-${inc.priority.toLowerCase()}`}>{inc.priority}</span></td>
                      <td><span className={`badge status-${inc.status.toLowerCase()}`}>{inc.status}</span></td>
                      <td>{new Date(inc.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ReporterDashboard;
