import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAddFeedback() {
  const navigate = useNavigate();
  const { mutate: addFeedback, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.feedback.addFeedback}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onError: (error) => {
      toast.error("Error while submitting feedback.");
    },
  });
  return { addFeedback, isSuccess, isPending, isError, error };
}

export function useGetAllFeedback(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.feedback.getAllFeedback, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.feedback.getAllFeedback}?${constructQueryString(params)}`),
  });
  return { data: data?.data?.data, totalPages: data?.data?.totalPages, error, isLoading, isError };
}
