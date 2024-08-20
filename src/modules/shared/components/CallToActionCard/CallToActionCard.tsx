import React from 'react';
import { Link } from 'react-router-dom';

interface CallToActionCardProps {
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
}

const CallToActionCard: React.FC<CallToActionCardProps> = ({
  title,
  description,
  linkTo,
  buttonText,
}) => {
  return (
    <div style={styles.card}>
      <div className="cto-text-container">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <Link to={linkTo}>
        <button
          style={styles.button}
          className="call-to-action-button"
        >
          {buttonText} →
        </button>
      </Link>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f0fff0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '20px auto',
  },
  button: {
    display: 'inline-block',
    padding: '10px 45px',
    backgroundColor: '#009447',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default CallToActionCard;
