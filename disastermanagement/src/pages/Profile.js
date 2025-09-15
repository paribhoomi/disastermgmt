import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    mobileNumber: user?.mobileNumber || '',
    bloodGroup: user?.bloodGroup || '',
    location: user?.location || '',
    email: user?.email || ''
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'John Smith', relation: 'Father', phone: '+1234567890' },
    { name: 'Mary Smith', relation: 'Mother', phone: '+1234567891' },
    { name: 'Dr. Johnson', relation: 'Family Doctor', phone: '+1234567892' }
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleCallEmergencyContact = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleAddEmergencyContact = () => {
    const name = prompt('Enter contact name:');
    const relation = prompt('Enter relation:');
    const phone = prompt('Enter phone number:');
    
    if (name && relation && phone) {
      setEmergencyContacts([
        ...emergencyContacts,
        { name, relation, phone }
      ]);
    }
  };

  const handleRemoveEmergencyContact = (index) => {
    if (window.confirm('Are you sure you want to remove this contact?')) {
      const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
      setEmergencyContacts(updatedContacts);
    }
  };

  return (
    <div className="profile-container" style={{ padding: '20px', paddingBottom: '100px' }}>
      {/* Profile Header */}
      <div className="profile-header" style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        background: 'white',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div className="profile-avatar" style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, var(--primary-red), var(--light-red))',
          borderRadius: '50%',
          marginRight: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
        </div>
        <div className="profile-info" style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', marginBottom: '4px', color: 'var(--text-dark)' }}>
            {user?.firstName} {user?.lastName}
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '8px' }}>
            {user?.email}
          </p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              background: isEditing ? '#28a745' : 'var(--primary-red)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'var(--text-dark)'
        }}>
          Personal Information
        </h3>

        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { key: 'firstName', label: t('firstName') || 'First Name', icon: '👤' },
            { key: 'lastName', label: t('lastName') || 'Last Name', icon: '👤' },
            { key: 'mobileNumber', label: t('phoneNumber') || 'Phone Number', icon: '📱' },
            { key: 'bloodGroup', label: t('bloodGroup') || 'Blood Group', icon: '🩸' },
            { key: 'location', label: t('location') || 'Location', icon: '📍' },
            { key: 'email', label: 'Email', icon: '📧' }
          ].map((field) => (
            <div key={field.key} className="profile-field">
              <label style={{
                display: 'block',
                fontWeight: '500',
                marginBottom: '4px',
                color: 'var(--text-dark)',
                fontSize: '14px'
              }}>
                {field.icon} {field.label}
              </label>
              {isEditing ? (
                <input
                  type={field.key === 'email' ? 'email' : 'text'}
                  name={field.key}
                  value={formData[field.key]}
                  onChange={handleChange}
                  className="input-field"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '0',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                />
              ) : (
                <div style={{
                  padding: '12px 16px',
                  background: 'var(--background-gray)',
                  borderRadius: '6px',
                  color: 'var(--text-dark)',
                  fontSize: '14px'
                }}>
                  {formData[field.key] || 'Not specified'}
                </div>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSave}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'var(--text-dark)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {t('familyEmergencyContacts') || 'Emergency Contacts'}
        </h3>

        <div style={{ display: 'grid', gap: '12px' }}>
          {emergencyContacts.map((contact, index) => (
            <div key={index} style={{
              background: 'var(--background-gray)',
              padding: '16px',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>
                  {contact.name}
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '12px', marginBottom: '4px' }}>
                  {contact.relation}
                </div>
                <div style={{ color: 'var(--primary-red)', fontSize: '13px', fontWeight: '500' }}>
                  {contact.phone}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => handleCallEmergencyContact(contact.phone)}
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
                <button 
                  onClick={() => handleRemoveEmergencyContact(index)}
                  style={{
                    background: '#dc3545',
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
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleAddEmergencyContact}
          style={{
            width: '100%',
            background: 'transparent',
            border: '2px dashed var(--border-color)',
            borderRadius: '12px',
            padding: '16px',
            marginTop: '12px',
            cursor: 'pointer',
            color: 'var(--text-light)',
            fontSize: '14px'
          }}
        >
          + Add Emergency Contact
        </button>
      </div>

      {/* Settings & Actions */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'var(--text-dark)'
        }}>
          Settings
        </h3>

        <div style={{ display: 'grid', gap: '8px' }}>
          {[
            { label: 'Change Language', icon: '🌐', action: () => console.log('Change language') },
            { label: 'Privacy Settings', icon: '🔒', action: () => console.log('Privacy settings') },
            { label: 'Notification Settings', icon: '🔔', action: () => console.log('Notification settings') },
            { label: 'Help & Support', icon: '❓', action: () => console.log('Help & support') },
            { label: 'About RESQ', icon: 'ℹ️', action: () => console.log('About RESQ') }
          ].map((setting, index) => (
            <button
              key={index}
              onClick={setting.action}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--text-dark)',
                textAlign: 'left',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--background-gray)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '18px' }}>{setting.icon}</span>
              {setting.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          width: '100%',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '18px' }}>🚪</span>
        Logout
      </button>
    </div>
  );
};

export default Profile;