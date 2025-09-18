import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


const Map = () => {
  const { t } = useLanguage();
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapType, setMapType] = useState('terrain');
  const [zoom, setZoom] = useState(15);
  const [emergencyServices, setEmergencyServices] = useState([]);
  const [showServices, setShowServices] = useState(true);
  const [trackingLocation, setTrackingLocation] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);

  // Mock emergency services data (in real app, fetch from API)
  const mockEmergencyServices = [
    { id: 1, name: 'City Hospital', type: 'hospital', lat: 12.9716, lng: 77.5946, phone: '+91-80-12345678' },
    { id: 2, name: 'Fire Station', type: 'fire', lat: 12.9726, lng: 77.5936, phone: '+91-80-87654321' },
    { id: 3, name: 'Police Station', type: 'police', lat: 12.9706, lng: 77.5956, phone: '+91-80-11223344' },
    { id: 4, name: 'Emergency Center', type: 'emergency', lat: 12.9696, lng: 77.5966, phone: '108' }
  ];

  // Get user's current location
  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        };
        setUserLocation(location);
        setLocationHistory(prev => [...prev.slice(-9), location]); // Keep last 10 locations
        setEmergencyServices(mockEmergencyServices);
        setLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
            break;
        }
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, []);

  // Start live tracking
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) return;

    setTrackingLocation(true);
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        };
        setUserLocation(location);
        setLocationHistory(prev => [...prev.slice(-9), location]);
      },
      (error) => console.error('Tracking error:', error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      setTrackingLocation(false);
    };
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const getServiceIcon = (type) => {
    switch (type) {
      case 'hospital': return '🏥';
      case 'fire': return '🚒';
      case 'police': return '🚔';
      case 'emergency': return '🚨';
      default: return '📍';
    }
  };

  const getMapUrl = () => {
    if (!userLocation) return '';
    
    const { lat, lng } = userLocation;
    const markers = [
      `color:red|label:You|${lat},${lng}`, // User location marker
      ...emergencyServices
        .filter(() => showServices)
        .map(service => `color:blue|label:${getServiceIcon(service.type)}|${service.lat},${service.lng}`)
    ].join('&markers=');

    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=400x300&maptype=${mapType}&markers=${markers}&key=YOUR_GOOGLE_MAPS_API_KEY`;
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const handleEmergencyCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const openInMapsApp = () => {
    if (!userLocation) return;
    const { lat, lng } = userLocation;
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  if (loading) {
    return (
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid var(--primary-red)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}></div>
        <p style={{ color: 'var(--text-light)' }}>Getting your location...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Location Error</h3>
          <p style={{ margin: '0' }}>{error}</p>
        </div>
        <button
          onClick={getCurrentLocation}
          style={{
            width: '100%',
            background: 'var(--primary-red)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: '0', color: 'var(--text-dark)' }}>
          📍 {t('liveLocation') || 'Live Location'}
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={getCurrentLocation}
            style={{
              background: 'var(--primary-red)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            🔄
          </button>
          <button
            onClick={trackingLocation ? () => setTrackingLocation(false) : startTracking}
            style={{
              background: trackingLocation ? '#28a745' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {trackingLocation ? '⏹️' : '▶️'}
          </button>
        </div>
      </div>

      {/* Location Info */}
      {userLocation && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '4px' }}>
                Latitude
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)' }}>
                {userLocation.lat.toFixed(6)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '4px' }}>
                Longitude
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)' }}>
                {userLocation.lng.toFixed(6)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '4px' }}>
                Accuracy
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)' }}>
                ±{Math.round(userLocation.accuracy)}m
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '4px' }}>
                Status
              </div>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: trackingLocation ? '#28a745' : '#6c757d' 
              }}>
                {trackingLocation ? '🔴 Live' : '📍 Static'}
              </div>
            </div>
          </div>
          
          <button
            onClick={openInMapsApp}
            style={{
              width: '100%',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            🗺️ Open in Maps App
          </button>
        </div>
      )}

      {/* Map Controls */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Map Controls</h3>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '14px', color: 'var(--text-dark)', marginBottom: '4px', display: 'block' }}>
              Map Type
            </label>
            <select
              value={mapType}
              onChange={(e) => setMapType(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid var(--border-color)',
                borderRadius: '6px'
              }}
            >
              <option value="roadmap">🗺️ Roadmap</option>
              <option value="satellite">🛰️ Satellite</option>
              <option value="terrain">🏔️ Terrain</option>
              <option value="hybrid">🌍 Hybrid</option>
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: '14px', color: 'var(--text-dark)', marginBottom: '4px', display: 'block' }}>
              Zoom Level: {zoom}
            </label>
            <input
              type="range"
              min="10"
              max="20"
              value={zoom}
              onChange={(e) => setZoom(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="showServices"
              checked={showServices}
              onChange={(e) => setShowServices(e.target.checked)}
            />
            <label htmlFor="showServices" style={{ fontSize: '14px', color: 'var(--text-dark)' }}>
              Show Emergency Services
            </label>
          </div>
        </div>
      </div>

      {/* Emergency Services */}
      {showServices && emergencyServices.length > 0 && userLocation && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: 'var(--text-dark)' }}>
            🚨 Nearby Emergency Services
          </h3>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {emergencyServices
              .map(service => ({
                ...service,
                distance: calculateDistance(
                  userLocation.lat, userLocation.lng,
                  service.lat, service.lng
                )
              }))
              .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
              .map((service) => (
                <div key={service.id} style={{
                  background: 'var(--background-gray)',
                  padding: '12px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ fontSize: '18px' }}>{getServiceIcon(service.type)}</span>
                      {service.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                      📏 {service.distance} km away
                    </div>
                  </div>
                  <button
                    onClick={() => handleEmergencyCall(service.phone)}
                    style={{
                      background: 'var(--primary-red)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    📞
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Location History */}
      {locationHistory.length > 1 && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: 'var(--text-dark)' }}>
            📈 Location History
          </h3>
          <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
            Showing last {locationHistory.length} locations
          </div>
          <button
            onClick={() => setLocationHistory([])}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Clear History
          </button>
        </div>
      )}

      {/* Mock Map Display */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>📍 Map View</h3>
        <div style={{
          width: '100%',
          height: '300px',
          background: 'linear-gradient(135deg, #e8f5e8, #f0f8ff)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ccc',
          position: 'relative'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🗺️</div>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
            Interactive Map
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)', textAlign: 'center' }}>
            {userLocation ? 
              `Your location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` :
              'Location not available'
            }
          </div>
          {trackingLocation && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#28a745',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              🔴 LIVE
            </div>
          )}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '8px' }}>
          * Replace with actual Google Maps or MapBox integration
        </div>
      </div>
    </div>
  );
};

export default Map;