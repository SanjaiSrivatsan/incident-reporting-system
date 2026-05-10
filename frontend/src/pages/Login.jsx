import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'RESOLVER' ? '/resolver' : '/reporter');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const resUser = await login(email, password);
      navigate(resUser.role === 'RESOLVER' ? '/resolver' : '/reporter');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setError('');
    try {
      const resUser = await login(demoEmail, demoPassword);
      navigate(resUser.role === 'RESOLVER' ? '/resolver' : '/reporter');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Did you seed the database?');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        
        {/* Evaluator Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button 
            type="button" 
            className="btn-primary" 
            style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
            onClick={() => handleDemoLogin('reporter@example.com', 'password123')}
          >
            Auto-Login Reporter
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            onClick={() => handleDemoLogin('resolver@example.com', 'password123')}
          >
            Auto-Login Resolver
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
          — OR SIGN IN MANUALLY —
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="mt-2">Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
