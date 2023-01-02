import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Registration from "../views/Registration";
import Login from "../views/Login";
import Error from "../views/Error";

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
  {
    path: "*",
    element: <Error />,
  },
]);
