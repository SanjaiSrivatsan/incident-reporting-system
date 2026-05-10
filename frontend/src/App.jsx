import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ReporterDashboard from './pages/ReporterDashboard';
import ResolverDashboard from './pages/ResolverDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route 
              path="/reporter" 
              element={
                <ProtectedRoute roles={['REPORTER']}>
                  <ReporterDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/resolver" 
              element={
                <ProtectedRoute roles={['RESOLVER']}>
                  <ResolverDashboard />
                </ProtectedRoute>
              } 
            />

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
