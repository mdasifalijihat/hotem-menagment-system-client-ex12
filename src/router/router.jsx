import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/page/Home/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children:[
      {index:true, Component:Home}, 
    ]
  },
]);
