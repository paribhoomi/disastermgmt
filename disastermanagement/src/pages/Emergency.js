import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Emergency = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let interval;
    if (isEmergencyActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [isEmergencyActive, countdown]);

  const handleEmergencyAlert = () => {
    setIsEmergencyActive(true);
    setCountdown(5); // 5 minutes countdown
    
    // Simulate emergency notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Emergency Alert Sent', {
        body: 'Your emergency alert has been sent to rescue teams.',
        icon: '/emergency-icon.png'
      });
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="emergency-container" style={{ padding: '20px', paddingBottom: '100px' }}>
      {!isEmergencyActive ? (
        // Emergency Button Screen
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            color: 'white',
            padding: '40px 20px',
            borderRadius: '20px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(238, 90, 82, 0.3)'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
              animation: 'pulse 2s infinite'
            }}>
              🚨
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Emergency
            </h2>
            <p style={{
              fontSize: '16px',
              opacity: '0.9',
              lineHeight: '1.4'
            }}>
              Press the button below if you are in immediate danger and need emergency assistance
            </p>
          </div>

          <button
            onClick={handleEmergencyAlert}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: 'none',
              background: 'linear-gradient(135deg, #dc3545, #c82333)',
              color: 'white',
              fontSize: '24px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              cursor: 'pointer',
              boxShadow: '0 15px 35px rgba(220, 53, 69, 0.4)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
              animation: 'emergencyPulse 3s infinite'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 53, 69, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(220, 53, 69, 0.4)';
            }}
          >
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>SOS</div>
            <div style={{ fontSize: '12px', fontWeight: '500' }}>PRESS FOR HELP</div>
          </button>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--text-dark)'
            }}>
              How it works:
            </h3>
            <ul style={{
              textAlign: 'left',
              color: 'var(--text-light)',
              fontSize: '14px',
              lineHeight: '1.6',
              paddingLeft: '20px'
            }}>
              <li>Press the SOS button to send emergency alert</li>
              <li>Your location will be shared with rescue teams</li>
              <li>Emergency contacts will be notified</li>
              <li>Help will be dispatched to your location</li>
            </ul>
          </div>
        </div>
      ) : (
        // Emergency Active Screen
        <div style={{ textAlign: 'center' }}>
          <div className="emergency-alert" style={{
            background: 'linear-gradient(135deg, #dc3545, #c82333)',
            animation: 'alertBlink 1s infinite alternate'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🚨</div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              {t('yourAlertNotified')}
            </h2>
            <p style={{ fontSize: '16px', opacity: '0.95' }}>
              {t('ambulanceResponse')}
            </p>
            <div style={{
              marginTop: '16px',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              {t('hangInTight')} {user?.firstName}, {t('just')} {countdown} {t('mins')}
            </div>
          </div>

          <div className="emergency-map" style={{
            background: 'var(--background-gray)',
            borderRadius: '12px',
            height: '200px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Mock map with location pin */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: `
                radial-gradient(circle at 60% 40%, rgba(220, 53, 69, 0.3) 0%, transparent 50%),
                linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)
              `
            }}>
              <div style={{
                position: 'absolute',
                top: '35%',
                left: '55%',
                transform: 'translate(-50%, -50%)',
                color: '#dc3545',
                fontSize: '24px',
                animation: 'bounce 2s infinite'
              }}>
                📍
              </div>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(255,255,255,0.9)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                color: 'var(--text-dark)'
              }}>
                Your Location
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px',
              color: 'var(--text-dark)'
            }}>
              Emergency Services Notified:
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px'
            }}>
              {[
                { service: 'Ambulance', status: 'Dispatched', icon: '🚑' },
                { service: 'Fire Brigade', status: 'On Standby', icon: '🚒' },
                { service: 'Police', status: 'Alerted', icon: '🚓' },
                { service: 'Rescue Team', status: 'En Route', icon: '🦺' }
              ].map((item, index) => (
                <div key={index} style={{
                  background: 'var(--background-gray)',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                    {item.icon}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '600' }}>
                    {item.service}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-light)' }}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsEmergencyActive(false)}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancel Emergency
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes emergencyPulse {
          0% { box-shadow: 0 15px 35px rgba(220, 53, 69, 0.4); }
          50% { box-shadow: 0 15px 35px rgba(220, 53, 69, 0.6), 0 0 0 20px rgba(220, 53, 69, 0.1); }
          100% { box-shadow: 0 15px 35px rgba(220, 53, 69, 0.4); }
        }
        
        @keyframes alertBlink {
          0% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) translate(-50%, -50%); }
          40% { transform: translateY(-10px) translate(-50%, -50%); }
          60% { transform: translateY(-5px) translate(-50%, -50%); }
        }
      `}</style>
    </div>
  );
};

export default Emergency;