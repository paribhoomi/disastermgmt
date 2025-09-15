import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Menu2 = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const menuItems = [
    {
      title: t('notification'),
      icon: '🔔',
      link: '/notifications',
      color: '#007bff'
    },
    {
      title: t('services'),
      icon: '🛠️',
      link: '/services',
      color: '#28a745'
    },
    {
      title: t('home'),
      icon: '🏠',
      link: '/menu',
      color: '#6f42c1'
    },
    {
      title: t('emergency'),
      icon: '🚨',
      link: '/emergency',
      color: '#dc3545'
    },
    {
      title: t('maps'),
      icon: '🗺️',
      link: '/maps',
      color: '#17a2b8'
    },
    {
      title: t('help'),
      icon: '❓',
      link: '/help',
      color: '#fd7e14'
    }
  ];

  const quickAccessItems = [
    {
      title: t('sos'),
      icon: '🚨',
      link: '/emergency',
      color: '#dc3545',
      isEmergency: true
    }
  ];

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      {/* User Welcome Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-red), var(--light-red))',
        color: 'white',
        padding: '24px',
        borderRadius: '16px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          margin: '0 auto 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          👤
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
          {t('userName')} - {user?.firstName} {user?.lastName}
        </h2>
        <p style={{ fontSize: '14px', opacity: '0.9' }}>
          View profile
        </p>
      </div>

      {/* Main Menu Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            style={{
              textDecoration: 'none',
              background: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100px',
              transition: 'all 0.3s ease',
              color: 'var(--text-dark)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              marginBottom: '8px'
            }}>
              {item.icon}
            </div>
            <span style={{
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'center'
            }}>
              {item.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Quick Access Section */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'var(--text-dark)'
        }}>
          Quick Access
        </h3>
        
        {quickAccessItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            style={{
              textDecoration: 'none',
              background: item.color,
              color: 'white',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '18px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: `0 4px 15px ${item.color}33`,
              transition: 'all 0.3s ease',
              animation: item.isEmergency ? 'emergencyPulse 3s infinite' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${item.color}55`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 15px ${item.color}33`;
            }}
          >
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </div>

      {/* Settings Section */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'var(--text-dark)'
        }}>
          Settings
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link
            to="/profile"
            style={{
              textDecoration: 'none',
              background: 'var(--background-gray)',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-dark)',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary-red)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--background-gray)';
              e.currentTarget.style.color = 'var(--text-dark)';
            }}
          >
            <span style={{ fontSize: '16px' }}>⚙️</span>
            Settings
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes emergencyPulse {
          0% { box-shadow: 0 4px 15px #dc354533; }
          50% { box-shadow: 0 4px 15px #dc354555, 0 0 0 20px rgba(220, 53, 69, 0.1); }
          100% { box-shadow: 0 4px 15px #dc354533; }
        }
      `}</style>
    </div>
  );
};

export default Menu2;