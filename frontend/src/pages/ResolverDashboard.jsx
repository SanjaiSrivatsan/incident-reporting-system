import { useState, useEffect } from 'react';
import api from '../api/axios';

const ResolverDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchIncidents = async () => {
    try {
      const res = await api.get('/incidents');
      setIncidents(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch incidents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleUpdate = async (id, field, value) => {
    try {
      setError('');
      await api.put(`/incidents/${id}`, { [field]: value });
      fetchIncidents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update incident');
      // Re-fetch to reset the dropdown UI to its actual state in the backend
      fetchIncidents();
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Resolver Dashboard</h2>
      {error && <div className="error mb-4">{error}</div>}
      
      <div className="card" style={{ maxWidth: '100%' }}>
        <h3>All Incidents</h3>
        {loading ? <p>Loading...</p> : (
          incidents.length === 0 ? <p>No incidents found.</p> : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Reporter</th>
                    <th>Status</th>
                    <th>Priority</th>
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
                      <td>{inc.createdBy?.name || 'Unknown'}</td>
                      <td>
                        <select 
                          value={inc.status} 
                          onChange={(e) => handleUpdate(inc._id, 'status', e.target.value)}
                        >
                          <option value="OPEN">Open</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>
                      </td>
                      <td>
                        <select 
                          value={inc.priority} 
                          onChange={(e) => handleUpdate(inc._id, 'priority', e.target.value)}
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HIGH">High</option>
                          <option value="CRITICAL">Critical</option>
                        </select>
                      </td>
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

export default ResolverDashboard;
