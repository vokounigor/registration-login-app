import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/Dashboard";
// import LandingPage from "../views/LandingPage";
import Registration from "../views/Registration";
import Login from "../views/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Registration />,
  },
]);
