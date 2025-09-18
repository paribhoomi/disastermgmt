import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { availableLanguages, changeLanguage, currentLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(currentLanguage);

  const handleLanguageSelect = (langCode) => {
    setSelectedLang(langCode);
  };

  const handleContinue = () => {
    changeLanguage(selectedLang);
    navigate('/login');
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #000000ff 0%, #000000ff 100%)', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px 20px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: 'var(--primary-red)',
          fontSize: '24px',
          fontWeight: '700'
        }}>
          LANGUAGE
        </h1>
        
        <div className="language-grid">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`language-btn ${selectedLang === lang.code ? 'selected' : ''}`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
        
        <button
          className="btn btn-primary"
          onClick={handleContinue}
          style={{
            width: '100%',
            marginTop: '30px',
            padding: '16px',
            fontSize: '18px',
            fontWeight: '600'
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;