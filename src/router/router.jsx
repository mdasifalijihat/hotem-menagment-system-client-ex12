import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/page/Home/Home";
import Login from "../pages/page/JoinUs/Login";
import JoinUs from "../pages/page/JoinUs/JoinUs";
import Register from "../pages/page/JoinUs/Register";
import PrivateRoute from "../context/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "/join-us", Component: JoinUs },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>{" "}
      </PrivateRoute>
    ),
    children:[

    ]
  },
]);
