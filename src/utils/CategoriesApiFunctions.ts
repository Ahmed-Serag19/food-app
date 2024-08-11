import axios, { AxiosError } from "axios";
import api from "./api";
import { toast } from "react-toastify";

// Define the interfaces for the category data
interface Category {
  id: number;
  name: string;
  price: string;
  description: string;
  quantity: number;
  category: string;
}

interface CreateCategoryResponse {
  id: number;
  name: string;
}
interface GetCategoriesResponse {
  pageNumber: number;
  pageSize: number;
  data: Category[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

interface DeleteCategoryResponse {
  message: string;
}

//////////////////// Create Category Function

export const createCategory = async (
  name: string
): Promise<CreateCategoryResponse> => {
  try {
    const response = await api.post<CreateCategoryResponse>(
      "/api/v1/Category/",
      { name }
    );

    // Show success toast notification
    toast.success("Category created successfully!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    return response.data;
  } catch (error) {
    let errorMessage = "Failed to create category. Please try again.";

    // Narrow the error type
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data.message === "string"
      ) {
        errorMessage = error.response.data.message;
      }
    } else if (error instanceof Error) {
      // General error handling
      errorMessage = error.message;
    } else {
      // Handle unexpected types of errors
      errorMessage = "An unexpected error occurred.";
    }

    // Show error toast notification
    toast.error(errorMessage, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    throw new Error(errorMessage);
  }
};
//////////////////// Get Categories Function

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  try {
    const response = await api.get<GetCategoriesResponse>("/api/v1/Category/", {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch categories.");
    throw error;
  }
};

//////////////////// Delete Category Function

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await api.delete<DeleteCategoryResponse>(`/api/v1/Category/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });

    toast.success("Category deleted successfully!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } catch (error) {
    handleApiError(error, "Failed to delete category.");
    throw error;
  }
};

//////////////////// Helper Function to Handle Errors

const handleApiError = (error: any, defaultMessage: string) => {
  let errorMessage = defaultMessage;

  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data;

    if (
      responseData &&
      typeof responseData === "object" &&
      "message" in responseData
    ) {
      errorMessage = (responseData as { message: string }).message;
    } else if (typeof error.message === "string") {
      errorMessage = error.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error(errorMessage, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
