import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ currentPath }) => {
  const navItems = [
    {
      path: '/profile',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      label: 'profile'
    },
    {
      path: '/menu2',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      ),
      label: 'menu 2'
    },
    {
      path: '/menu',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
      ),
      label: 'home'
    },
    {
      path: '/services',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      label: 'services'
    },
    {
      path: '/news',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2z"/>
          <polyline points="14,2 14,8 17,5 20,8 20,2"/>
        </svg>
      ),
      label: 'latest news'
    }
  ];

  return (
    <div className="nav-bottom">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
        >
          <div style={{ marginBottom: '4px' }}>
            {item.icon}
          </div>
          <span style={{ fontSize: '10px', textAlign: 'center' }}>
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;