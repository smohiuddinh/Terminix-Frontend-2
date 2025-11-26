import API_ROUTE from "../endPoints";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { setToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userSlice";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


export function useGetClientDashboardData() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.client.getClientDashboardData],
    queryFn: async () => await api.get(`${API_ROUTE.client.getClientDashboardData}`),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useEditClientProfile() {
  const dispatch = useDispatch()
  const {
    mutate: editClientProfile,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.client.clientEditProfile}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data, res) => {
      toast.success("Profile edit successfully!");
      // console.log(data?.data?.data)
      dispatch(setUserDetails(data?.data?.data))
    },
    onError: (error) => {

      // alert("failed")
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
            toast.error("error int editing profile !");

    },
  });
  return { editClientProfile, isSuccess, isPending, isError, error };
}
