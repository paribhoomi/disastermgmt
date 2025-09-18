import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LatestNews = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsItems = [
    {
      id: 1,
      title: "Flash Flood Warning",
      description: t('floodWarning'),
      image: "\img\download (2).jpeg",
      category: "weather",
      timestamp: "2 hours ago",
      severity: "high",
      location: "Kavitha District"
    },
    {
      id: 2,
      title: "Road Closed",
      description: t('roadClosed'),
      image: "/api/placeholder/400/200",
      category: "infrastructure",
      timestamp: "4 hours ago",
      severity: "medium",
      location: "Garhmore District"
    },
    {
      id: 3,
      title: "Train Services Disrupted",
      description: t('trainServices'),
      image: "/api/placeholder/400/200",
      category: "transport",
      timestamp: "6 hours ago",
      severity: "medium",
      location: "Backhi District"
    },
    {
      id: 4,
      title: "Emergency Shelter Update",
      description: "New emergency shelter opened at Community Center. Capacity for 200 people with medical facilities available.",
      image: "disastermanagement\src\img\images.jpeg",
      category: "shelter",
      timestamp: "8 hours ago",
      severity: "info",
      location: "Mumbai Central"
    },
    {
      id: 5,
      title: "Rescue Operation Success",
      description: "12 people successfully rescued from flooding area. All individuals are safe and receiving medical attention.",
      image: "/api/placeholder/400/200",
      category: "rescue",
      timestamp: "12 hours ago",
      severity: "low",
      location: "Coastal Region"
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '📰' },
    { id: 'weather', name: 'Weather', icon: '🌧️' },
    { id: 'infrastructure', name: 'Roads', icon: '🛣️' },
    { id: 'transport', name: 'Transport', icon: '🚆' },
    { id: 'shelter', name: 'Shelter', icon: '🏠' },
    { id: 'rescue', name: 'Rescue', icon: '🚁' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#dc3545';
      case 'medium': return '#fd7e14';
      case 'low': return '#28a745';
      default: return '#007bff';
    }
  };

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-red), var(--light-red))',
        color: 'white',
        padding: '24px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          {t('latestNews')}
        </h1>
        <p style={{
          fontSize: '14px',
          opacity: '0.9'
        }}>
          Stay updated with real-time disaster information
        </p>
      </div>

      {/* Category Filter */}
      <div style={{
        padding: '16px 20px',
        background: 'white',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                background: selectedCategory === category.id ? 'var(--primary-red)' : 'var(--background-gray)',
                color: selectedCategory === category.id ? 'white' : 'var(--text-dark)',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      <div style={{ padding: '20px' }}>
        {filteredNews.map((item) => (
          <div key={item.id} className="news-item" style={{
            background: 'white',
            borderRadius: '16px',
            marginBottom: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
          }}>
            {/* News Image */}
            <div className="news-image" style={{
              width: '100%',
              height: '150px',
              background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '16px'
            }}>
              {/* Severity Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: getSeverityColor(item.severity),
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {item.severity === 'high' ? 'URGENT' : item.severity === 'medium' ? 'ALERT' : item.severity === 'low' ? 'UPDATE' : 'INFO'}
              </div>

              {/* Location Badge */}
              <div style={{
                background: 'rgba(255,255,255,0.9)',
                color: 'var(--text-dark)',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '10px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                📍 {item.location}
              </div>
            </div>

            {/* News Content */}
            <div className="news-content" style={{ padding: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <h3 className="news-title" style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: '0',
                  color: 'var(--text-dark)'
                }}>
                  {item.title}
                </h3>
                <span style={{
                  fontSize: '10px',
                  color: 'var(--text-light)',
                  whiteSpace: 'nowrap',
                  marginLeft: '8px'
                }}>
                  {item.timestamp}
                </span>
              </div>

              <p className="news-description" style={{
                color: 'var(--text-light)',
                fontSize: '13px',
                lineHeight: '1.4',
                margin: '0'
              }}>
                {item.description}
              </p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '12px'
              }}>
                <button style={{
                  background: 'var(--primary-red)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Read More
                </button>
                <button style={{
                  background: 'var(--background-gray)',
                  color: 'var(--text-dark)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div style={{
        padding: '0 20px 20px',
        textAlign: 'center'
      }}>
        <button style={{
          background: 'var(--primary-red)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          width: '100%'
        }}>
          Load More News
        </button>
      </div>
    </div>
  );
};

export default LatestNews;