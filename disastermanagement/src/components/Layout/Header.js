import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/global.css'; // <-- import the sidebar CSS file

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Map routes to translated titles
  const titles = {
    '/menu': t('menu'),
    '/menu2': t('menu'),
    '/services': t('services'),
    '/emergency': t('emergency'),
    '/profile': t('profile'),
    '/news': t('latestNews'),
  };

  const pageTitle = titles[location.pathname] || '';

  return (
    <>
      <div
        className="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: '#222',
          color: 'white',
        }}
      >
        {/* Left section with hamburger + page title */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Hamburger Icon */}
          <div
            className="hamburger"
            onClick={() => setIsOpen(true)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '20px',
              height: '16px',
              cursor: 'pointer',
              marginRight: '12px',
            }}
          >
            <span style={{ height: '2px', background: 'white', borderRadius: '2px' }}></span>
            <span style={{ height: '2px', background: 'white', borderRadius: '2px' }}></span>
            <span style={{ height: '2px', background: 'white', borderRadius: '2px' }}></span>
          </div>

          {/* Page title (dynamic) */}
          <h1 style={{ fontSize: '18px', margin: 0 }}>{pageTitle}</h1>
        </div>

        {/* Right side - App name */}
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>ALERTIFY</div>
      </div>

      {/* Sidebar */}
      {isOpen && (
        <div className="sidebar">
          {/* Close button */}
          <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>

          {/* Menu items */}
          <ul>
            <li onClick={() => { navigate('/menu'); setIsOpen(false); }}>{t('menu')}</li>
            <li onClick={() => { navigate('/services'); setIsOpen(false); }}>{t('services')}</li>
            <li onClick={() => { navigate('/emergency'); setIsOpen(false); }}>{t('emergency')}</li>
            <li onClick={() => { navigate('/profile'); setIsOpen(false); }}>{t('profile')}</li>
            <li onClick={() => { navigate('/news'); setIsOpen(false); }}>{t('latestNews')}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
