import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCheckWrapper: React.FC<{ authToken: string | null }> = ({
  authToken,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  return null;
};

export default AuthCheckWrapper;
