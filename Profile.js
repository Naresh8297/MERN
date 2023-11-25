import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        
        const response = await fetch('YOUR_BACKEND_PROFILE_ENDPOINT');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUserProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
         
        </div>
      )}
    </div>
  );
};

export default Profile;
