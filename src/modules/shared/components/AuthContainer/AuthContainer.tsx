import React from 'react';

const AuthContainer: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <div className="auth-container">
      {/* <div className="bg-overlay position-absolute"></div> */}
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 d-flex align-items-center justify-content-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
