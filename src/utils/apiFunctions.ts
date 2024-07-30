import api from './api';

interface LoginResponse {
  token: string;
  expiresIn: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const response = await api.post<LoginResponse>(
      '/api/v1/Users/Login',
      { email, password },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { token, expiresIn } = response.data;
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('tokenExpiration', expiresIn);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
