import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        email: formData.email,
        firstName: 'John',
        lastName: 'Doe',
        mobileNumber: '+1234567890',
        bloodGroup: 'O+',
        location: 'Mumbai, India'
      };
      login(userData);
      navigate('/menu');
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    const userData = {
      id: 2,
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '+1234567890',
      bloodGroup: 'O+',
      location: 'Mumbai, India'
    };
    login(userData);
    navigate('/menu');
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px 30px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        {/* RESQ Header */}
        <div style={{
          background: 'var(--primary-red)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            RESQ
          </h1>
          <p style={{ fontSize: '14px', opacity: '0.9' }}>
            Welcome to RESQ Disaster Aids mobile application, we're glad you're here. Already have an account? login.
          </p>
        </div>

        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: 'var(--text-dark)',
          fontSize: '22px'
        }}>
          {t('signIn')}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <svg style={{
                position: 'absolute',
                left: '12px',
                width: '20px',
                height: '20px',
                color: 'var(--text-light)'
              }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                type="email"
                name="email"
                placeholder={t('email')}
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                style={{ paddingLeft: '45px' }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <svg style={{
                position: 'absolute',
                left: '12px',
                width: '20px',
                height: '20px',
                color: 'var(--text-light)'
              }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                type="password"
                name="password"
                placeholder={t('password')}
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                style={{ paddingLeft: '45px' }}
                required
              />
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <Link to="/forgot-password" style={{
              color: 'var(--primary-red)',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              {t('forgotPassword')}
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}
          >
            {loading ? 'Signing In...' : t('login')}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-secondary"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('loginWithGoogle')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: 'var(--text-light)' }}>Don't have an account? </span>
          <Link to="/register" style={{
            color: 'var(--primary-red)',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            {t('signUp')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;