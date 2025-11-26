import API_ROUTE from "../endPoints";
import api from "../axios/index";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export function useGetOrderByFreelancer(params = {}) {
  const freelancer = useSelector(state => state.userProfile.userProfile)
  const { id } = freelancer
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.order.getAllOrderByFreelancer, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.order.getAllOrderByFreelancer}/${id}?${constructQueryString(params)}`),
  });
  return { data: data?.data?.data, totalPages: data?.data?.totalPages, error, isLoading, isError };
}

export function useSingleOrderByFreelancer(id) {
  return useQuery({
    queryKey: [API_ROUTE.order.getSingleOrderByFreelancer, id],
    queryFn: async () => {
      const response = await api.get(`${API_ROUTE.order.getSingleOrderByFreelancer}/${id}`);
      return response.data.data;
    },
    enabled: Boolean(id),
  });
}

export function useSingleOrderByClient(id) {
  return useQuery({
    queryKey: [API_ROUTE.order.getSingleOrderByClient, id],
    queryFn: async () => {
      const response = await api.get(`${API_ROUTE.order.getSingleOrderByClient}/${id}`);
      return response.data.data;
    },
    enabled: Boolean(id),
  });
}



export function useGetOrderByClient(params = {}) {
  const clientDetails = useSelector(state => state.user.userDetails)
  const { id } = clientDetails
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.order.getAllOrderByClient, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.order.getAllOrderByClient}/${id}?${constructQueryString(params)}`),
  });
  return { data: data?.data?.data, totalPages: data?.data?.totalPages, error, isLoading, isError };
}

// Admin orders
export function useGetAllOrderByAdmin(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.order.getAllOrderByAdmin, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.order.getAllOrderByAdmin}${constructQueryString(params)}`),
  });

  return {
    data: data?.data?.orders,
    error,
    isLoading,
    isError,
  };
}
