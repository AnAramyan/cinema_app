import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Auth from "../pages/Auth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import RoomDetails from "../pages/RoomDetails";

export const router = createBrowserRouter([
  { path: "/", element: <Auth /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={["user", "admin"]} />,
    children: [
      { path: "home", element: <Home /> },
      { path: "room/:roomId/schedules", element: <RoomDetails /> },
      { path: "schedule/:scheduleId/booking", element: <Booking /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [{ path: "admin", element: <Admin /> }],
  },
]);
