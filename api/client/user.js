import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userSlice";
import {
  checkApiRequest,
  loginRequest,
  verifyUserRequest,
  logoutRequest,
  signUpRequest,
  sendOtpRequest,
  submitOtpRequest,
  changePasswordRequest,
} from "../services/authService";

export function useCheck() {
  const { data, error, isSuccess, isPending, isError } = useQuery({
    queryKey: ["auth:check"],
    queryFn: () => checkApiRequest(),
  });
  return {
    data: data?.data,
    error,
    isSuccess,
    isPending,
    isError,
  };
}


export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    mutate: userLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (payload) => loginRequest(payload),
    onSuccess: async (response) => {
      const userData = response?.data?.data;

      // Save user data in Redux
      dispatch(setUserDetails(userData));

      // Save token in localStorage for axios interceptor
      if (userData?.token) {
        localStorage.setItem("token", userData.token);
      }

       // Keep React Query auth cache in sync immediately
       queryClient.setQueryData(["authUser"], userData);

      // Redirect based on role
      if (userData?.role === "cashier") {
        navigate("/cashier/dashboard");
      } else if (userData?.role === "admin") {
        navigate("/superadmin/contacts");
      } else if (userData?.role === "gm") {
        navigate("/gm/dashboard");
      } else {
        navigate("/unauthorized");
      }
    },
  });

  return {
    userLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}


export function useUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await verifyUserRequest();
      return res.data.user; // backend reads cookie
    },
    retry: false,
    refetchOnWindowFocus: false
  });
}

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logoutRequest(),
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
      navigate('/login')
    }
  });
}

export function useSignUp(options = {}) {
  const {
    mutate: userSignUp,
    isSuccess,
    isLoading, // React Query standard name instead of isPending
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (formData) => signUpRequest(formData),
    ...options,
  });

  return {
    userSignUp,
    isSuccess,
    isPending: isLoading, // keep your naming if needed
    isError,
    reset,
    error: error?.response?.data?.message || error?.message,
    data,
  };
}

export function useSendOtp(options = {}) {
  const navigate = useNavigate();

  const {
    mutate: handleEmail,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => sendOtpRequest(data),
    ...options,
  });

  return {
    handleEmail,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}

export function useSubmitOtp(options = {}) {
  const navigate = useNavigate();

  const {
    mutate: handleOtp,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => submitOtpRequest(data),
    ...options,
  });

  return {
    handleOtp,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}

export function useChangePassword(options = {}) {
  const navigate = useNavigate();

  const {
    mutate: change_pass,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => changePasswordRequest(data),
    ...options,
  });

  return {
    change_pass,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}
