import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        bloodGroup: '',
        location: ''
      };
      register(userData);
      navigate('/menu');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #000000ff 0%, #000000ff 100%)', 
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
        {/* ALERTIFY Header */}
        <div style={{
          background: 'var(--primary-red)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            ALERTIFY
          </h1>
          <p style={{ fontSize: '14px', opacity: '0.9' }}>
            Welcome to ALERTIFY Disaster Aids mobile application, we're glad you're here. Already have an account? login.
          </p>
        </div>

        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: 'var(--text-dark)',
          fontSize: '22px'
        }}>
          {t('signUp')}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              name="firstName"
              placeholder={t('firstName')}
              value={formData.firstName}
              onChange={handleChange}
              className="input-field"
              style={{ marginBottom: errors.firstName ? '4px' : '0' }}
            />
            {errors.firstName && (
              <div style={{ color: '#dc3545', fontSize: '14px' }}>
                {errors.firstName}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              name="lastName"
              placeholder={t('lastName')}
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
              style={{ marginBottom: errors.lastName ? '4px' : '0' }}
            />
            {errors.lastName && (
              <div style={{ color: '#dc3545', fontSize: '14px' }}>
                {errors.lastName}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="tel"
              name="mobileNumber"
              placeholder={t('mobileNumber')}
              value={formData.mobileNumber}
              onChange={handleChange}
              className="input-field"
              style={{ marginBottom: errors.mobileNumber ? '4px' : '0' }}
            />
            {errors.mobileNumber && (
              <div style={{ color: '#dc3545', fontSize: '14px' }}>
                {errors.mobileNumber}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="email"
              name="email"
              placeholder={t('email')}
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              style={{ marginBottom: errors.email ? '4px' : '0' }}
            />
            {errors.email && (
              <div style={{ color: '#dc3545', fontSize: '14px' }}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              name="password"
              placeholder={t('password')}
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              style={{ marginBottom: errors.password ? '4px' : '0' }}
            />
            {errors.password && (
              <div style={{ color: '#dc3545', fontSize: '14px' }}>
                {errors.password}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              name="confirmPassword"
              placeholder={t('confirmPassword')}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field"
              style={{ marginBottom: errors.confirmPassword ? '4px' : '0' }}
            />
            {errors.confirmPassword && (
              <div style={{ color: '#dc3545', fontSize: '14px' }}>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              id="terms" 
              style={{ marginRight: '8px' }}
              required
            />
            <label htmlFor="terms" style={{ fontSize: '14px', color: 'var(--text-light)' }}>
              By signing up you agree to the terms & conditions
            </label>
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
              background: '#ff8c00'
            }}
          >
            {loading ? 'Creating Account...' : t('submit')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: 'var(--text-light)' }}>Already have an account? </span>
          <Link to="/login" style={{
            color: 'var(--primary-red)',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            {t('signIn')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;