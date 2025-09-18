import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout/Layout';
import LanguageSelection from './pages/LanguageSelection';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Services from './pages/Services';
import Emergency from './pages/Emergency';
import Profile from './pages/Profile';
import Menu2 from './pages/Menu2';
import LatestNews from './pages/LatestNews';
import LiveMap from './pages/LiveMap';
import './styles/global.css';
import DisasterSafetyTips  from './pages/DisasterSafetyTips'

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<LanguageSelection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/menu" element={<Layout><Menu /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/emergency" element={<Layout><Emergency /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/menu2" element={<Layout><Menu /></Layout>} />
            <Route path="/news" element={<Layout><LatestNews /></Layout>} />
            <Route path="/map" element={<Layout><LiveMap /></Layout>} />
            <Route path="/safety " element={<Layout><DisasterSafetyTips /></Layout>} />


          </Routes>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;