import API_ROUTE from "../endPoints";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { setToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userSlice";
import { setUserType } from "../../redux/slices/userType";

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

  const {
    mutate: userLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.user.login, data),
    onSuccess: (response) => {
      if (response?.data?.data?.email === 'admin@gmail.com') {
        navigate("/superadmin/dashboard");
        setToken(response?.data?.token);
      } else {
        setToken(response?.data?.token);
        dispatch(setUserDetails(response?.data?.data));
        dispatch(setUserType({ id: response?.data?.data.id, type: 'client' }))
        navigate("/client");
        // if (localStorage.get("verify-otp") || localStorage.get("change_pass")) {
        //   localStorage.removeItem("verify-otp");
        //   localStorage.removeItem("change_pass");
        // }
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
