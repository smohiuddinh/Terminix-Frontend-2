import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../utils/auth";
import { setUserDetails } from "../../redux/slices/userSlice";
import { setUserType } from "../../redux/slices/userType";

export function useGoogleLoginCallback(data) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.token) {
      setToken(data.token); // save JWT
      dispatch(setUserDetails(data.user));
      dispatch(setUserType({ id: data.user.id, type: 'client' }));
      navigate("/client"); // redirect
    }
  }, [data]);
}
