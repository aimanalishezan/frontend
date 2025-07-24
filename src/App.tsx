import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CompanyDetail from './pages/CompanyDetail';
import ClassificationCategorizer from './components/ClassificationCategorizer';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/companies/:id"
              element={
                <PrivateRoute>
                  <CompanyDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/classifications"
              element={
                <PrivateRoute>
                  <ClassificationCategorizerWrapper />
                </PrivateRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Wrapper component to handle query parameters for ClassificationCategorizer
function ClassificationCategorizerWrapper() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode');
  const from = searchParams.get('from');
  
  const isFilterMode = mode === 'filter';
  const showBackButton = from === 'dashboard';
  
  const handleCategoriesSelect = (categories: string[]) => {
    if (isFilterMode && from === 'dashboard') {
      // Store selected categories in sessionStorage to pass back to dashboard
      sessionStorage.setItem('selectedClassifications', JSON.stringify(categories));
      navigate('/dashboard');
    }
  };
  
  return (
    <ClassificationCategorizer 
      showBackButton={showBackButton}
      onCategoriesSelect={isFilterMode ? handleCategoriesSelect : undefined}
    />
  );
}

export default App;
