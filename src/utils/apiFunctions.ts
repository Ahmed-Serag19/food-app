import { AxiosError } from 'axios';
import api from './api';
import { toast } from 'react-toastify';

interface LoginResponse {
  token: string;
  expiresIn: string;
}

/////////////// HandleLogin Function

export const handleLogin = async (
  email: string,
  password: string
): Promise<string> => {
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
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiration', expiresIn);

    return token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/////////////// HandleOtp function

interface SendOtpResponse {
  success: boolean;
}

export const handleForgotPassword = async (
  email: string
): Promise<void> => {
  try {
    const response = await api.post<SendOtpResponse>(
      '/api/v1/Users/Reset/Request',
      { email },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.data.success) {
      throw new Error('Failed to send OTP');
    }

    console.log('OTP sent successfully');
  } catch (error) {
    let errorMessage = 'An unexpected error occurred.';

    if (error instanceof AxiosError && error.response) {
      const responseData = error.response.data;

      if (
        responseData &&
        typeof responseData === 'object' &&
        'message' in responseData
      ) {
        errorMessage = (responseData as { message: string }).message;
      } else if (typeof error.message === 'string') {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    throw new Error(errorMessage);
  }
};

//////////////////// HandleResetPassword

interface ResetPasswordResponse {
  success: boolean;
}

export const handleResetPassword = async (
  email: string,
  seed: string,
  password: string,
  confirmPassword: string
): Promise<void> => {
  try {
    const response = await api.post<ResetPasswordResponse>(
      '/api/v1/Users/Reset',
      { email, seed, password, confirmPassword },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.data.success) {
      throw new Error('Failed to reset password');
    }

    console.log('Password reset successfully');
  } catch (error) {
    let errorMessage = 'An unexpected error occurred.';

    if (error instanceof AxiosError && error.response) {
      const responseData = error.response.data;

      if (
        responseData &&
        typeof responseData === 'object' &&
        'message' in responseData
      ) {
        errorMessage = (responseData as { message: string }).message;
      } else if (typeof error.message === 'string') {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    throw new Error(errorMessage);
  }
};
