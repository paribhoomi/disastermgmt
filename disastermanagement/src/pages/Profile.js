import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    bloodGroup: '',
    location: '',
    email: ''
  });

  const [loading, setLoading] = useState(true);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'John Smith', relation: 'Father', phone: '+1234567890' },
    { name: 'Mary Smith', relation: 'Mother', phone: '+1234567891' },
    { name: 'Dr. Johnson', relation: 'Family Doctor', phone: '+1234567892' }
  ]);

  // ✅ Fetch user profile from backend with proper error handling
  useEffect(() => {
    const fetchUser = async () => {
      // ✅ Wait for user.email to be available
      if (!user?.email) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${user.email}`);
        console.log("User data fetched:", res.data);
        
        // ✅ Set fetched data
        setFormData({
          firstName: res.data.firstName || '',
          lastName: res.data.lastName || '',
          mobileNumber: res.data.mobileNumber || '',
          bloodGroup: res.data.bloodGroup || '',
          location: res.data.location || '',
          email: res.data.email || user.email
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        
        // ✅ On error, initialize with empty values and user's email
        setFormData({
          firstName: '',
          lastName: '',
          mobileNumber: '',
          bloodGroup: '',
          location: '',
          email: user.email
        });
        
        alert('⚠️ Could not load profile data. You can still edit your information.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.email]); // ✅ Only depend on user.email

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Save updates to backend
  const handleSave = async () => {
    if (!formData.email) {
      alert('❌ Email is required to update profile');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/users/${formData.email}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        bloodGroup: formData.bloodGroup,
        location: formData.location
      });
      
      alert('✅ Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert('❌ Failed to update profile: ' + (err.response?.data || 'Server error'));
    }
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
      setEmergencyContacts([...emergencyContacts, { name, relation, phone }]);
    }
  };

  const handleRemoveEmergencyContact = (index) => {
    if (window.confirm('Are you sure you want to remove this contact?')) {
      const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
      setEmergencyContacts(updatedContacts);
    }
  };

  // ✅ Show loading state
  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Loading profile...</div>
      </div>
    );
  }

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
          {(formData.firstName?.[0] || '?')}{(formData.lastName?.[0] || '?')}
        </div>
        <div className="profile-info" style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', marginBottom: '4px', color: 'var(--text-dark)' }}>
            {formData.firstName || 'Not set'} {formData.lastName || ''}
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '8px' }}>
            {formData.email}
          </p>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
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
                  value={formData[field.key] || ''}
                  onChange={handleChange}
                  className="input-field"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  disabled={field.key === 'email'}
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
                    cursor: 'pointer'
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
                    cursor: 'pointer'
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

      {/* Logout */}
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
          cursor: 'pointer'
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Profile;