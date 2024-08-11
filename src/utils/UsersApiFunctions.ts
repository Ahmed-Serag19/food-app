import { AxiosError } from 'axios';
import api from './api';
import { toast } from 'react-toastify';

interface User {
  id: number;
  userName: string; // Adjusted to match the user structure
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  group: {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  };
  creationDate: string;
  modificationDate: string;
}

interface GetUsersResponse {
  pageNumber: number;
  pageSize: number;
  data: User[]; // Adjusted to match the user structure
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

interface DeleteUserResponse {
  message: string;
}

//////////////////// Get Users Function

export const getUsers = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  filter: string = ''
): Promise<GetUsersResponse> => {
  try {
    const response = await api.get<GetUsersResponse>(
      '/api/v1/Users/',
      {
        headers: {
          Accept: 'application/json',
        },
        params: {
          pageNumber,
          pageSize,
          filter,
        },
      }
    );

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch users.');
    throw error;
  }
};

//////////////////// Delete User Function

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete<DeleteUserResponse>(`/api/v1/Users/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    // Show success toast notification
    toast.success('User deleted successfully!', {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  } catch (error) {
    handleApiError(error, 'Failed to delete user.');
    throw error;
  }
};

//////////////////// Helper Function to Handle Errors

const handleApiError = (error: unknown, defaultMessage: string) => {
  let errorMessage = defaultMessage;

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
};
