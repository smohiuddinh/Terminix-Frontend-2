import { useDispatch } from "react-redux";
import { removeUserDetails } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { resetUserProfile } from "../redux/slices/userProfileSlice";
import { resetUserType } from "../redux/slices/userType";
import { resetGigDetails } from "../redux/slices/gigsDetailSlice";
const useLogout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        dispatch(resetUserType())
        dispatch(resetGigDetails())
        dispatch(resetUserProfile())
        dispatch(removeUserDetails());
        navigate('/login')
    };

    return logout;
};

export default useLogout;
