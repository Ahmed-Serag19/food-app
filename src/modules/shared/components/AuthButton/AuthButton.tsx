import React from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  loading?: boolean;
}

const AuthButton: React.FC<ButtonProps> = ({ type, text, loading = false }) => {
  return (
    <button
      type={type}
      className={`auth-btn primary-green-bg w-100 ${loading ? "disabled" : ""}`}
      disabled={loading}
    >
      {loading ? <FaSpinner className="spinner" /> : text}
    </button>
  );
};

export default AuthButton;
