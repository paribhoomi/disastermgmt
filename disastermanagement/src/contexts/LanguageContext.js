import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// ✅ LibreTranslate API Configuration
const TRANSLATE_API = 'https://libretranslate.com/translate';

// ✅ Base English translations (fallback)
const baseTranslations = {
  en: {
    // Authentication
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    mobileNumber: 'Mobile Number',
    login: 'LOGIN',
    loginWithGoogle: 'LOGIN WITH GOOGLE',
    forgotPassword: 'Forgot Password?',
    submit: 'Submit',
    
    // Navigation
    menu: 'MENU',
    services: 'SERVICES',
    emergency: 'EMERGENCY',
    profile: 'PROFILE',
    latestNews: 'LATEST NEWS',
    
    // Emergency
    emergencySOS: 'Emergency | SOS',
    yourAlertNotified: 'YOUR ALERT HAS BEEN NOTIFIED',
    ambulanceResponse: 'Ambulance and response teams on way!',
    hangInTight: 'Hang in tight! We are coming for you,',
    just: 'just',
    mins: 'mins',
    emergencyNumber: 'Emergency Number',
    
    // Services
    contacts: 'Contacts',
    safeRoute: 'Safe Route',
    hospital: 'Hospital',
    news: 'News',
    support: 'Support',
    sheltersEvacuation: 'Shelters / Evacuation',
    safetyTips: 'Safety Tips',
    emergencyKit: 'Emergency Kit',
    firstAid: 'First Aid',
    dmc: 'DMC',
    
    // Profile
    phoneNumber: 'Phone number',
    bloodGroup: 'Blood group',
    location: 'Location',
    languages: 'Languages',
    familyEmergencyContacts: 'FAMILY AND EMERGENCY CONTACTS',
    
    // Menu
    notification: 'Notification',
    home: 'Home',
    maps: 'Maps',
    help: 'Help',
    settings: 'Settings',
    sos: 'SOS'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState(baseTranslations);
  const [loading, setLoading] = useState(false);
  const [translationCache, setTranslationCache] = useState({});

  // ✅ Load language from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('resq_language');
    const storedCache = localStorage.getItem('resq_translation_cache');
    
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
    
    if (storedCache) {
      try {
        setTranslationCache(JSON.parse(storedCache));
      } catch (e) {
        console.error('Error loading translation cache:', e);
      }
    }
  }, []);

  // ✅ Translate single text using LibreTranslate API
  const translateText = async (text, targetLang) => {
    // Return original if target is English
    if (targetLang === 'en') return text;

    // Check cache first
    const cacheKey = `${text}_${targetLang}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    try {
      const response = await axios.post(TRANSLATE_API, {
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text'
      });

      const translated = response.data.translatedText;
      
      // Store in cache
      const newCache = { ...translationCache, [cacheKey]: translated };
      setTranslationCache(newCache);
      localStorage.setItem('resq_translation_cache', JSON.stringify(newCache));
      
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  };

  // ✅ Translate all app texts to target language
  const translateAllTexts = async (targetLang) => {
    if (targetLang === 'en') {
      setTranslations(baseTranslations);
      return;
    }

    setLoading(true);
    
    try {
      const englishTexts = baseTranslations.en;
      const translatedTexts = {};

      // Translate all texts
      for (const [key, value] of Object.entries(englishTexts)) {
        translatedTexts[key] = await translateText(value, targetLang);
      }

      setTranslations({
        ...baseTranslations,
        [targetLang]: translatedTexts
      });
    } catch (error) {
      console.error('Error translating all texts:', error);
      // Fallback to English
      setTranslations(baseTranslations);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Change language and auto-translate
  const changeLanguage = async (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('resq_language', languageCode);
    
    // If translations for this language don't exist, translate them
    if (!translations[languageCode]) {
      await translateAllTexts(languageCode);
    }
  };

  // ✅ Get translation for a key
  const t = (key) => {
    return translations[currentLanguage]?.[key] || 
           translations.en?.[key] || 
           key;
  };

  // ✅ Translate dynamic text (for user-generated content)
  const translateDynamic = async (text) => {
    if (currentLanguage === 'en') return text;
    return await translateText(text, currentLanguage);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translateDynamic,
    loading,
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
      { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
      { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
      { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
      { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
      { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
      { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
      { code: 'ur', name: 'Urdu', nativeName: 'اردو' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};