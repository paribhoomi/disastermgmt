import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Menu = () => {
  const { t } = useLanguage();

  const menuItems = [
    {
      title: '2019 Flood Statistics',
      image: 'disastermanagement\src\img\download (2).jpeg',
      link: '/news',
      type: 'featured'
    }
  ];

  const quickActions = [
    {
      title: t('emergencySOS'),
      link: '/emergency',
      color: '#dc3545',
      icon: '🚨'
    },
    {
      title: t('services'),
      link: '/services',
      color: '#28a745',
      icon: '🛠️'
    },
    {
      title: 'MAP',
      link: '/map',
      color: '#007bff',
      icon: '🗺️'
    }
  ];

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      {/* Featured Section */}
      <div style={{ marginBottom: '24px' }}>
        {menuItems.map((item, index) => (
          <Link 
            key={index}
            to={item.link} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card" style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/api/placeholder/400/200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
              minHeight: '160px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              border: 'none'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600',
                margin: '0',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                {item.title}
              </h3>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '12px' 
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  margin: '0 4px'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  margin: '0 4px'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  margin: '0 4px'
                }}></div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        {quickActions.slice(0, 2).map((action, index) => (
          <Link 
            key={index}
            to={action.link}
            style={{ textDecoration: 'none' }}
          >
            <div className="card" style={{
              background: action.color,
              color: 'white',
              textAlign: 'center',
              minHeight: '100px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              border: 'none'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                {action.icon}
              </div>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {action.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Full width MAP button */}
      <Link to="/map" style={{ textDecoration: 'none' }}>
        <div className="card" style={{
          background: quickActions[2].color,
          color: 'white',
          textAlign: 'center',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          border: 'none',
          marginBottom: '24px'
        }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: '600',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '20px' }}>{quickActions[2].icon}</span>
            {quickActions[2].title}
          </div>
        </div>
      </Link>

      {/* Emergency Number (Clickable) */}
      <a href="tel:108" style={{ textDecoration: 'none' }}>
        <div className="card" style={{
          background: 'var(--primary-red)',
          color: 'white',
          textAlign: 'center',
          padding: '16px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span style={{ fontSize: '16px', fontWeight: '600' }}>
                {t('emergencyNumber')}
              </span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: '700', marginTop: '4px' }}>
              108
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Menu;
