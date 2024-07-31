import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./modules/shared/components/AuthLayout/AuthLayout";
import Login from "./modules/auth/components/Login/Login";
import Register from "./modules/auth/components/Register/Register";
import ChangePassword from "./modules/auth/components/ChangePassword/ChangePassword";
import ForgotPassword from "./modules/auth/components/ForgotPassword/ForgotPassword";
import ResetPassword from "./modules/auth/components/ResetPassword/ResetPassword";
import MasterLayout from "./modules/shared/components/MasterLayout/MasterLayout";
import Home from "./modules/home/components/Home/Home";
import RecipesList from "./modules/recipes/components/RecipesList/RecipesList";
import CategoriesList from "./modules/categories/components/CategoriesList/CategoriesList";
import UsersList from "./modules/users/components/UsersList/UsersList";
import NotFound from "./modules/shared/components/NotFound/NotFound";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "register", element: <Register /> },
        { path: "recipes-list", element: <RecipesList /> },
        { path: "categories-list", element: <CategoriesList /> },
        { path: "users-list", element: <UsersList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
