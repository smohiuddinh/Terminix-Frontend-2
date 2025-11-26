// src/routes/AuthRoute.tsx
import SomethingWentWrong from "../src/pages/SomeThingWent";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const location = useLocation()
  const { pathname } = location

  const verify_otp = localStorage.getItem("verify-otp")
  const change_pass = localStorage.getItem("change_pass")

  if (pathname === '/verify-otp' && !verify_otp) {
    return <SomethingWentWrong/>
  }

  if (pathname === '/change-password' && !change_pass) {
    return <SomethingWentWrong/>
  }

  return <>{children}</>;
};

export default ProtectedRoute;
