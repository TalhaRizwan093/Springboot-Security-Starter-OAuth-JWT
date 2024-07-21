import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/login/Login.tsx";
import Home from "./pages/home/Home.tsx";
import ProtectedRoute from "./layouts/ProtectedRoutes";
import UserDetails from "./pages/userDetails/UserDetails.tsx";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: <ProtectedRoute element={Login} />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "userDetails",
        element: <UserDetails />,
      },
    ],
  },
]);

export default Router;
