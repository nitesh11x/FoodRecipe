import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Profile = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" aria-label="Loading spinner">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body text-center">
          <h1 className="card-title mb-3">Welcome, {user.name}</h1>
          <p className="card-text text-muted">{user.email}</p>
          {/* You can add more user info here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
