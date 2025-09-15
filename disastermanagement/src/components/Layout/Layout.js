import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="layout">
      <Header />
      <main style={{ paddingBottom: '80px', minHeight: 'calc(100vh - 64px)' }}>
        {children}
      </main>
      <Navigation currentPath={location.pathname} />
    </div>
  );
};

export default Layout;