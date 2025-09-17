import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthRoute, GuestRoute } from './components/AuthRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { BugsList } from './pages/BugsList';
import { CreateBug } from './pages/CreateBug';
import { BugDetail } from './pages/BugDetail';
import { Profile } from './pages/Profile';
import { Navbar } from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Guest Routes */}
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <AuthRoute>
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                </AuthRoute>
              }
            />
            <Route
              path="/bugs"
              element={
                <AuthRoute>
                  <>
                    <Navbar />
                    <BugsList />
                  </>
                </AuthRoute>
              }
            />
            <Route
              path="/bugs/new"
              element={
                <AuthRoute>
                  <>
                    <Navbar />
                    <CreateBug />
                  </>
                </AuthRoute>
              }
            />
            <Route
              path="/bugs/:id"
              element={
                <AuthRoute>
                  <>
                    <Navbar />
                    <BugDetail />
                  </>
                </AuthRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <>
                    <Navbar />
                    <Profile />
                  </>
                </AuthRoute>
              }
            />

            {/* Redirect root to dashboard or login */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
