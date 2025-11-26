import { useDispatch } from "react-redux";
import api from "../axios";
import API_ROUTE from "../endPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { setFreelancerID } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserProfile } from "../../redux/slices/userProfileSlice";
import Success from '../../src/component/freelancer_dashboard/success';
import { toast } from "react-toastify";

export function useGetFreelDashboardData() {
   const freelancerDetails = useSelector(state=> state.userProfile.userProfile)
   const { id } = freelancerDetails
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.freelancer.getFreelancerDashboardData],
    queryFn: async () => await api.get(`${API_ROUTE.freelancer.getFreelancerDashboardData}?freelancerId=${id}`),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetFreelancerProfile() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.freelancer.getFreelancerProfile],
    queryFn: async () =>
      await api.get(`${API_ROUTE.freelancer.getFreelancerProfile}`),
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useAddProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    mutate: addProfile,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.freelancer.addProfile}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data, res) => {
      toast.success("Profile added successfully!");
      dispatch(setUserProfile({id: data?.data?.freelancerId}))
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.freelancer.getFreelancerProfile],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.freelancer.checkIsFreelancer],
      });
      navigate('/client')
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
            toast.error("Profile Not Added Error!");

    },
  });
  return { addProfile, isSuccess, isPending, isError, error };
}

export function useEditProfile(freelancerId) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch()
  const {
    mutate: editProfile,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.freelancer.editProfile}/${freelancerId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data, res) => {
      toast.success("Profile edit successfully!");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.freelancer.getFreelancerProfile],
      });
    },
    onError: (error) => {

      toast.error("failed")
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
    },
  });
  return { editProfile, isSuccess, isPending, isError, error };
}
