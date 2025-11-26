import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAddContact() {
  const navigate = useNavigate();
  const { mutate: addContact, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.contact.addContacts}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onError: (error) => {
      toast.error("Error while submitting form.");
    },
  });
  return { addContact, isSuccess, isPending, isError, error };
}

export function useGetAllContacts(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.contact.getAllContacts, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.contact.getAllContacts}?${constructQueryString(params)}`),
  });
  return { data: data?.data?.data, totalPages: data?.data?.totalPages, error, isLoading, isError };
}
