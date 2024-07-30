import React from 'react';
interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
}

const AuthButton: React.FC<ButtonProps> = ({ type, text }) => {
  return (
    <button type={type} className="auth-btn primary-green-bg  w-100">
      {text}
    </button>
  );
};

export default AuthButton;
