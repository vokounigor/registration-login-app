export const baseURL: string = process.env.REACT_APP_API_BASE_URL || "";

interface ApiRoutes {
  login: string;
  register: string;
  dashboard: string;
  logout: string;
}

export const apiRoutes: ApiRoutes = {
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  logout: "/logout",
};
