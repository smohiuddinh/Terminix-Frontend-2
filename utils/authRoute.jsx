// src/routes/AuthRoute.tsx
import { Navigate } from "react-router-dom";
import { useUser } from "../api/client/user";
import DataLoader from "../src/component/DataLoader";
const AuthRoute = ({ children }) => {

  const { data: user, isLoading } = useUser();

  if (isLoading) return <DataLoader />;
  if (!user) return <Navigate to="/login" />;

  return children;
};


export default AuthRoute;
