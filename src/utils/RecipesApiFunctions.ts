import { AxiosError } from "axios";
import api from "./api";
import { toast } from "react-toastify";

export interface Tag {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}
export interface Category {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface GetCategoriesResponse {
  pageNumber: number;
  pageSize: number;
  data: Category[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
//////////////////// Get Tags Function

export const getTags = async (): Promise<Tag[]> => {
  try {
    const response = await api.get<Tag[]>("/api/v1/tag/", {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch tags.");
    throw error;
  }
};

//////////////////// Get Categories Function

export const getCategories = async (
  pageSize: number,
  pageNumber: number
): Promise<GetCategoriesResponse> => {
  try {
    const response = await api.get<GetCategoriesResponse>(
      `/api/v1/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    // Check if the data array is empty and handle it
    if (!response.data.data.length) {
      toast.info("No categories found.", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch categories.");
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
