import API_ROUTE from "../endPoints";
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

export function useCheckIsFreelancer() {
  const { data, error, isSuccess, isPending, isError } = useQuery({
    queryKey: [API_ROUTE.freelancer.checkIsFreelancer],
    queryFn: () => api.get(API_ROUTE.freelancer.checkIsFreelancer),
    // staleTime: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  return {
    data: data?.data?.data,
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
    onSuccess: async(response) => {
      if (response?.data?.data?.email === 'admin@gmail.com') {

        const userData = response?.data?.data;
        dispatch(setUserDetails(userData));
        await queryClient.invalidateQueries({ queryKey: ["authUser"] });
        navigate("/superadmin/contacts");
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
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.user.signUp, data),
    ...options,
  });

  return {
    userSignUp,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
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
