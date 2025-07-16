import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/Error/ErrorPage";
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
import Meals from "../pages/page/Meals/Meals";
import MembershipSection from "../pages/page/MembershipSection/MembershipSection";
import Payment from "../pages/page/Checkout/Payment";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AllMeals from "../pages/Dashboard/Admin/allmeals/AllMeals";
import AddMeal from "../pages/Dashboard/Admin/addmeal/AddMeal";
import MealDetails from "../pages/Dashboard/Admin/allmeals/MealDetails";
import UpdateMeal from "../pages/Dashboard/Admin/allmeals/UpdateMeal";
import AllReviews from "../pages/Dashboard/Admin/AllReviews/AllReviews";
import ServeMeals from "../pages/Dashboard/Admin/ServeMeals/ServeMeals";
import UpcomingMeal from "../pages/Dashboard/Admin/UpcomingMeal/UpcomingMeal";
import AddUpcomingMeal from "../pages/Dashboard/Admin/AddUpcomingMeal/AddUpcomingMeal";
import AdminInformation from "../pages/Dashboard/Admin/AdminInformation/AdminInformation";
import UserMealDetails from "../pages/page/Meals/UserMealDetails";
import UpcomingMeals from "../pages/page/UpcomingMeals/UpcomingMeals";
import AdminAuthRoute from "./AdminAuthRoute ";
import AdminLogin from "../context/Adminlogin/AdminLogin";
import AdminSettings from "../context/Adminlogin/AdminSettings";
import Home from "../pages/page/Home/home/Home";
import DashboardUser from "../pages/Dashboard/User/DashboardUser";

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
      { path: "/meals", Component: Meals },
      { path: "/meals/:id", element: <UserMealDetails /> },
      { path: "/upcoming-meals", element: <UpcomingMeals /> },
      { path: "/membershipSection", element: <MembershipSection /> },

      {
        path: "/checkout/:packageName",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  // user dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>{" "}
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <DashboardUser /> },
      { path: "profile", element: <MyProfile /> },
      { path: "requestedMeals", element: <RequestedMeals /> },
      { path: "myReviews", element: <MyReviews /> },
      { path: "paymentHistory", element: <PaymentHistory /> },
    ],
  },
  //  admin login route
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },

  // admin dashboard
  {
    path: "/adminDashboard",
    element: (
      <AdminAuthRoute>
        {" "}
        <AdminDashboard />{" "}
      </AdminAuthRoute>
    ),
    children: [
      { path: "", element: <AdminInformation /> },
      { path: "manage-users", element: <ManageUsers /> },

      // Meals
      { path: "add-meal", element: <AddMeal /> },
      { path: "all-meals", element: <AllMeals /> },
      { path: "meal/:id", element: <MealDetails /> },
      { path: "updateMeal/:id", element: <UpdateMeal /> },

      // Reviews
      { path: "all-reviews", element: <AllReviews /> },

      // Upcoming Meals
      { path: "serve-meals", element: <ServeMeals /> },
      { path: "upcoming-meals", element: <UpcomingMeal /> },
      { path: "add-upcoming-meal", element: <AddUpcomingMeal /> },
      { path: "admin-seting", element: <AdminSettings /> },
    ],
  },
]);
