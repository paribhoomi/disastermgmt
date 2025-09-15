import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('contacts'),
      icon: '👥',
      link: '/contacts',
      color: '#007bff'
    },
    {
      title: t('safeRoute'),
      icon: '🛣️',
      link: '/safe-route',
      color: '#28a745'
    },
    {
      title: t('hospital'),
      icon: '🏥',
      link: '/hospital',
      color: '#dc3545'
    },
    {
      title: t('news'),
      icon: '📰',
      link: '/news',
      color: '#ffc107'
    },
    {
      title: t('support'),
      icon: '🆘',
      link: '/support',
      color: '#6f42c1'
    },
    {
      title: t('sheltersEvacuation'),
      icon: '🏠',
      link: '/shelters',
      color: '#fd7e14'
    },
    {
      title: t('safetyTips'),
      icon: '💡',
      link: '/safety-tips',
      color: '#20c997'
    },
    {
      title: t('emergencyKit'),
      icon: '🎒',
      link: '/emergency-kit',
      color: '#e83e8c'
    },
    {
      title: t('firstAid'),
      icon: '🩹',
      link: '/first-aid',
      color: '#17a2b8'
    },
    {
      title: t('dmc'),
      icon: '🏢',
      link: '/dmc',
      color: '#6c757d'
    }
  ];

  const informationServices = [
    {
      title: 'Information',
      items: [
        { name: 'Safety Tips', icon: '⚠️', link: '/safety-tips' },
        { name: 'Emergency Kit', icon: '🎒', link: '/emergency-kit' },
        { name: 'First Aid', icon: '🩹', link: '/first-aid' },
        { name: 'DMC', icon: '🏢', link: '/dmc' }
      ]
    }
  ];

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      {/* Main Services Grid */}
      <div className="services-grid">
        {services.map((service, index) => (
          <Link 
            key={index}
            to={service.link}
            className="service-card"
            style={{ 
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            <div 
              className="service-icon"
              style={{ 
                background: service.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}
            >
              {service.icon}
            </div>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: '500',
              textAlign: 'center',
              color: 'var(--text-dark)',
              lineHeight: '1.2'
            }}>
              {service.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Information Section */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'var(--text-dark)'
        }}>
          Information
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {informationServices[0].items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              style={{
                textDecoration: 'none',
                background: 'white',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease',
                color: 'var(--text-dark)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                background: 'var(--background-gray)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Emergency Button */}
      <div style={{ marginTop: '32px' }}>
        <Link to="/emergency">
          <button 
            className="btn btn-emergency"
            style={{
              width: '100%',
              background: 'var(--primary-red)',
              border: 'none',
              borderRadius: '12px',
              padding: '20px',
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--dark-red)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary-red)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {t('emergencySOS')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Services;