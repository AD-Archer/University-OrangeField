'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from '@/app/styles/components/profile.module.css';
import toast from 'react-hot-toast';

interface PersonalDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

interface EditProfileFormProps {
  initialDetails: PersonalDetails;
  onClose: () => void;
  onUpdate: (details: PersonalDetails) => void;
}

export default function EditProfileForm({ initialDetails, onClose, onUpdate }: EditProfileFormProps) {
  const [details, setDetails] = useState<PersonalDetails>(initialDetails);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...details
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      onUpdate(details);
      toast.success('Profile updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Personal Details</h2>
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={details.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={details.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={details.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={details.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </div>

          <div className={styles.modalButtons}>
            <button
              type="submit"
              className={styles.confirmButton}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 