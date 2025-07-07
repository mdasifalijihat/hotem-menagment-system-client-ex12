import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/page/Home/Home";
import Login from "../pages/page/JoinUs/Login";
import JoinUs from "../pages/page/JoinUs/JoinUs";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "/join-us", Component: JoinUs },
      { path: "/login", Component: Login },
    ],
  },
]);
