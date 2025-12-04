// src/routes/AuthRoute.tsx
import { Navigate } from "react-router-dom";
import { useUser } from "../api/client/user";

const AuthRoute = ({ children }) => {

  const { data: user, isLoading } = useUser();
  console.log("user: ", user)

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return children;
};


export default AuthRoute;
