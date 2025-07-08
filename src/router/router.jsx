import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/page/Home/Home";
import Login from "../pages/page/JoinUs/Login";
import JoinUs from "../pages/page/JoinUs/JoinUs";
import Register from "../pages/page/JoinUs/Register";
import PrivateRoute from "../context/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import RequestedMeals from "../pages/Dashboard/User/RequestedMeals";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import AdminDashboard from "../layout/AdminDashboard";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AddMeal from "../pages/Dashboard/Admin/AddMeal";
import AllMeals from "../pages/Dashboard/Admin/AllMeals";
import AllReviews from "../pages/Dashboard/Admin/AllReviews";
import ServeMeals from "../pages/Dashboard/Admin/ServeMeals";
import UpcomingMeal from "../pages/Dashboard/Admin/UpcomingMeal";
import AddUpcomingMeal from "../pages/Dashboard/Admin/AddUpcomingMeal";
import AdminInformation from "../pages/Dashboard/Admin/AdminInformation";
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
    children: [
      { path: "profile", element: <MyProfile /> },
      { path: "requestedMeals", element: <RequestedMeals /> },
      { path: "myReviews", element: <MyReviews /> },
      { path: "paymentHistory", element: <PaymentHistory /> },
    ],
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
    children: [
      { path: "", element: <AdminInformation /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "add-meal", element: <AddMeal /> },
      { path: "all-meals", element: <AllMeals /> },
      { path: "all-reviews", element: <AllReviews /> },
      { path: "serve-meals", element: <ServeMeals /> },
      { path: "upcoming-meals", element: <UpcomingMeal /> },
      { path: "add-upcoming-meal", element: <AddUpcomingMeal /> },
    ],
  },
]);
