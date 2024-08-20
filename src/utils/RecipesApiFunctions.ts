import { AxiosError } from 'axios';
import api from './api';
import { toast } from 'react-toastify';

export interface GetCategoriesResponse {
  data: Category[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
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
export interface Recipe {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: Category[];
  tag: Tag;
}

export interface CreateRecipeResponse {
  id: number;
  name: string;
}
export interface RecipeFormData {
  name: string;
  description: string;
  price: string;
  tagId: string;
  categoriesIds: string[];
  recipeImage: File | null;
}
//////////////////// Get Tags Function

export const getTags = async (): Promise<Tag[]> => {
  try {
    const response = await api.get<Tag[]>('/api/v1/tag/', {
      headers: {
        Accept: 'application/json',
      },
    });

    return response.data; // Now it returns Tag[] directly
  } catch (error) {
    handleApiError(error, 'Failed to fetch tags.');
    throw error;
  }
};

//////////////////// Get Categories Function

export const getCategories =
  async (): Promise<GetCategoriesResponse> => {
    try {
      const response = await api.get<GetCategoriesResponse>(
        `/api/v1/Category/`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      // Check if the data array is empty and handle it
      if (!response.data.data.length) {
        toast.info('No categories found.', {
          position: 'top-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }

      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch categories.');
      throw error;
    }
  };

//////////////////// Create Recipe Function

export const createRecipe = async (
  formData: RecipeFormData
): Promise<CreateRecipeResponse> => {
  try {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('tagId', formData.tagId);
    if (formData.recipeImage) {
      data.append('recipeImage', formData.recipeImage);
    }

    formData.categoriesIds.forEach((categoryId: string) => {
      data.append('categoriesIds', categoryId);
    });

    const response = await api.post<CreateRecipeResponse>(
      '/api/v1/Recipe/',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    toast.success('Recipe created successfully!', {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to create recipe.');
    throw error;
  }
};

//////////////////// Get , Delete and UpdateRecipe Functions

export const getRecipes = async () => {
  try {
    const response = await api.get('/api/v1/Recipe/', {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    toast.error('Failed to load recipes');
    throw error;
  }
};

export const deleteRecipe = async (id: number) => {
  try {
    await api.delete(`/api/v1/Recipe/${id}`);
    toast.success('Recipe deleted successfully');
  } catch (error) {
    toast.error('Failed to delete recipe');
    throw error;
  }
};

export const updateRecipe = async (
  id: number,
  formData: RecipeFormData
): Promise<CreateRecipeResponse> => {
  try {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('tagId', formData.tagId);
    if (formData.recipeImage) {
      data.append('recipeImage', formData.recipeImage);
    }

    formData.categoriesIds.forEach((categoryId: string) => {
      data.append('categoriesIds', categoryId);
    });

    const response = await api.put<CreateRecipeResponse>(
      `/api/v1/Recipe/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    toast.success('Recipe updated successfully!', {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to update recipe.');
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
