import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import Login from './modules/auth/components/Login/Login';
import Register from './modules/auth/components/Register/Register';
import ForgotPassword from './modules/auth/components/ForgotPassword/ForgotPassword';
import ResetPassword from './modules/auth/components/ResetPassword/ResetPassword';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import Home from './modules/home/components/Home/Home';
import RecipesList from './modules/recipes/components/RecipesList/RecipesList';
import CategoriesList from './modules/categories/components/CategoriesList/CategoriesList';
import UsersList from './modules/users/components/UsersList/UsersList';
import NotFound from './modules/shared/components/NotFound/NotFound';
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute';
import { useEffect, useState } from 'react';

function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
    setIsLoading(false); // Token is checked, stop loading
  }, []);

  const handleLoginSuccess = (token: string) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  if (isLoading) {
    // Render a loading spinner or nothing while the token is being loaded
    return <div>Loading...</div>;
  }

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login onLoginSuccess={handleLoginSuccess} />,
        },
        {
          path: 'login',
          element: <Login onLoginSuccess={handleLoginSuccess} />,
        },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute authToken={authToken}>
          <MasterLayout setAuthToken={setAuthToken} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'recipes-list', element: <RecipesList /> },
        { path: 'categories-list', element: <CategoriesList /> },
        { path: 'users-list', element: <UsersList /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
