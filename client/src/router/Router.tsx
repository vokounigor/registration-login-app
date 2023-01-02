import { FC } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../views/Dashboard";
// import LandingPage from "../views/LandingPage";
import Registration from "../views/Registration";

interface IProtectedRoute {
  page: JSX.Element;
  isProtected: () => boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ page, isProtected }) => {
  return isProtected() ? <Navigate to="/" /> : page;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "protected",
    element: (
      <ProtectedRoute
        isProtected={() => true}
        page={<div>Hello protected!</div>}
      />
    ),
  },
]);
