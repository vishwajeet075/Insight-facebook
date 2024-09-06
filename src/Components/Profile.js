import React from 'react';

const Profile = ({ image, name }) => {
  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="row g-0">
          <div className="col-md-4 d-flex justify-content-center align-items-center p-4">
            <div className="position-relative" style={{ width: '200px', height: '200px' }}>
              <img
                src={image || '/api/placeholder/400/400'}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '4px solid #007bff',
                }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column h-100 p-4">
              <h2 className="card-title text-primary mb-2">User Profile</h2>
              <h3 className="card-subtitle mb-4 fs-2 fw-bold">{name || 'Vishwajeet Shinde'}</h3>
              <ul className="list-group list-group-flush flex-grow-1">
                <li className="list-group-item py-3 d-flex align-items-center">
                  <i className="bi bi-envelope me-3 fs-4 text-primary"></i>
                {/*  <div>
                    <small className="text-muted">Email</small>
                    <div className="fw-semibold">shindevishwajeet434@gmail.com</div>
                  </div>*/}
                </li>
                <li className="list-group-item py-3 d-flex align-items-center">
                  <i className="bi bi-telephone me-3 fs-4 text-primary"></i>
                  {/*
                  <div>
                   
                    <small className="text-muted">Phone</small>
                    <div className="fw-semibold">(123) 456-7890</div>
                  </div>*/}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;