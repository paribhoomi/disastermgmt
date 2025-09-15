import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Language Selection
    selectLanguage: 'Select Language',
    
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
    sos: 'SOS',
    
    // News
    floodWarning: 'Flash flood warning issued for the Kavitha district. Heavy rainfall is expected in the next 24 hours. Stay home for further directions.',
    roadClosed: 'Landslide reported in the Garhmore district due toll highway. Road is closed until further notice. Seek alternative routes.',
    trainServices: 'Train services disrupted in the Backhi district due to a landslide. Expect delays and plan accordingly.'
  },
  hi: {
    // Language Selection
    selectLanguage: 'भाषा चुनें',
    
    // Authentication
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    mobileNumber: 'मोबाइल नंबर',
    login: 'लॉगिन',
    loginWithGoogle: 'गूगल के साथ लॉगिन',
    forgotPassword: 'पासवर्ड भूल गए?',
    submit: 'जमा करें',
    
    // Navigation
    menu: 'मेन्यू',
    services: 'सेवाएं',
    emergency: 'आपातकाल',
    profile: 'प्रोफाइल',
    latestNews: 'ताजा खबर',
    
    // Emergency
    emergencySOS: 'आपातकाल | SOS',
    yourAlertNotified: 'आपकी चेतावनी की सूचना दी गई है',
    ambulanceResponse: 'एम्बुलेंस और रेस्पॉन्स टीम रास्ते में है!',
    hangInTight: 'धैर्य रखें! हम आपके लिए आ रहे हैं,',
    just: 'बस',
    mins: 'मिनट',
    emergencyNumber: 'आपातकालीन नंबर'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('resq_language');
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('resq_language', languageCode);
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
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
      { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};