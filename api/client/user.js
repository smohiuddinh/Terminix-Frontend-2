import API_ROUTE from "../endpoints";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../axios/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userSlice";

export function useCheck() {
  const { data, error, isSuccess, isPending, isError } = useQuery({
    queryKey: [API_ROUTE.user.checkapi],
    queryFn: () => api.get(API_ROUTE.user.checkapi),
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
    mutationFn: (data) => api.post(API_ROUTE.user.login, data, { withCredentials: true }),
    onSuccess: async (response) => {
      const userData = response?.data?.data;

      // Save user data in Redux
      dispatch(setUserDetails(userData));

      // Optional: Save token in localStorage if using header auth
      localStorage.setItem("token", userData.token);

      // ✅ Redirect based on role
      if (userData.role === "cashier") {
        navigate("/cashier/dashboard");
      } else if (userData.role === "admin") {
        navigate("/superadmin/contacts");
      }  else if (userData.role === "gm") {
        navigate("/gm/dashboard");
      } else {
        navigate("/unauthorized"); // fallback if role is unknown
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
      const res = await api.get("/auth/verify", {
        withCredentials: true,
      });
      return res.data.user;  // backend reads cookie
    },
    retry: false,
    refetchOnWindowFocus: false
  });
}

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.post("/auth/logout", {}, { withCredentials: true }),
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
    mutationFn: (formData) => api.post(API_ROUTE.user.signUp, formData),
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
    mutationFn: (data) => api.post(API_ROUTE.user.sendOtp, data),
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
    mutationFn: (data) => api.post(API_ROUTE.user.submitOtp, data),
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
    mutationFn: (data) => api.put(API_ROUTE.user.changePasword, data),
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
