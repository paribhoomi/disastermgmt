import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/menu':
        return t('menu');
      case '/services':
        return t('services');
      case '/emergency':
        return t('emergency');
      case '/profile':
        return t('profile');
      case '/news':
        return t('latestNews');
      case '/menu2':
        return t('menu');
      default:
        return 'RESQ';
    }
  };

  return (
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ 
          width: '4px', 
          height: '24px', 
          background: 'white', 
          marginRight: '12px',
          borderRadius: '2px' 
        }}></div>
        <h1>{getPageTitle()}</h1>
      </div>
      <div className="notification-icon" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </div>
    </div>
  );
};

export default Header;