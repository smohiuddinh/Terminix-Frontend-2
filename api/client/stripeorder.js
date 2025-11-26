import API_ROUTE from "../endPoints";
import api from "../axios/index";
import { useQuery } from "@tanstack/react-query";

export function useGetAllOrders(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.stripeorder.getOrderAllOrder, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.stripeorder.getOrderAllOrder}${constructQueryString(params)}`),
  });

  return {
    data: data?.data?.orders,
    error,
    isLoading,
    isError,
  };
}


// export function useSingleOrderByFreelancer(id) {
//   const { data, isSuccess, isPending, isError, isLoading } = useQuery({
//     queryKey: ['singleOrderByFreelancer', id],
//     queryFn: async () => {
//       const res = await api.get(`${API_ROUTE.stripe.getSingleOrderByFreelancer}/${id}`);
//       return res.data;  // assuming your API response has { data: ... }
//     },
//     enabled: id !== undefined && id !== null,
//   });

//   return {
//     data: data?.data, // adjust depending on your API response shape
//     isSuccess,
//     isPending,
//     isError,
//     isLoading,
//   };
// }

export function useSingleOrderByFreelancer(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.stripe.getSingleOrderByFreelancer],
    queryFn: async () => await api.get(`${API_ROUTE.stripeorder.getSingleOrderByFreelancer}/${id}`),
    enabled: id !== undefined && id !== null
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}
