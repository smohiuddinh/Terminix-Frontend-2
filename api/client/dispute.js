import API_ROUTE from "../endPoints";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useAddDispute() {
  const queryClient = useQueryClient();
  const { mutate: addDispute, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.dispute.addDispute}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Dispute Added successfully!")
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.order.getAllOrderByClient],
      });
    },
    onError: (error) => {
      toast.error("Error In Addding Dispute!")
    },
  });
  return { addDispute, isSuccess, isPending, isError, error };
}

export function useAddDisputeResponse() {
  const queryClient = useQueryClient();
  const { mutate: addDisputeResponse, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.dispute.addResponseDispute}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Responeded successfully!")
      // queryClient.invalidateQueries({
      //   queryKey: [API_ROUTE.order.getAllOrderByClient],
      // });
    },
    onError: (error) => {
      toast.error("Failed to respond Dispute!")
    },
  });
  return { addDisputeResponse, isSuccess, isPending, isError, error };
}

export function useGetAllDisputeByClient(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const client = useSelector((state) => state.user.userDetails);
  const { id } = client
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.dispute.getAllDisputeByClient, params],
    queryFn: async () => await api.get(`${API_ROUTE.dispute.getAllDisputeByClient}/${id}?${constructQueryString(params)}`),
    // enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetAllDisputeByFreelancer(params = {}) {
  const freelancer = useSelector(state => state.userProfile.userProfile)
  const { id } = freelancer
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.dispute.getAllDisputeByFreelancer, params],
    queryFn: async () => await api.get(`${API_ROUTE.dispute.getAllDisputeByFreelancer}/${id}?${constructQueryString(params)}`),
    // enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetDisputeById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.dispute.getDisputeById, id],
    queryFn: async () => await api.get(`${API_ROUTE.dispute.getDisputeById}/${id}`),
    // enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    userResponseData: data?.data?.responseData,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetAllDisputeByAdmin(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.dispute.getAllDisputeByAdmin, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.dispute.getAllDisputeByAdmin}?${constructQueryString(params)}`),
  });
  return { data: data?.data?.data, error, isLoading, isError };
}

export function useGetDisputeAdminById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.dispute.getDisputeAdminById, id],
    queryFn: async () => await api.get(`${API_ROUTE.dispute.getDisputeAdminById}/${id}`),
    // enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    responseData: data?.data?.responseData,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}



