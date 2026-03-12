import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  addContactRequest,
  addUserRequest,
  getAllContactsRequest,
  getAllIntOrgRequest,
  getAllUserRequest,
} from "../services/adminService";

export function useAddContact() {
  const navigate = useNavigate();
  const {
    mutate: addContact,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => addContactRequest(data),
    onError: () => {
      toast.error("Error while submitting form.");
    },
  });
  return { addContact, isSuccess, isPending, isError, error };
}

export function useAddUser() {
  const navigate = useNavigate();
  const {
    mutate: addUser,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => addUserRequest(data),
    onSuccess: () => {
      toast.success("User added Successfully.");
    },
    onError: () => {
      toast.error("Error while submitting form.");
    },
  });
  return { addUser, isSuccess, isPending, isError, error };
}

export function useGetAllContacts(params = {}) {
  const queryKey = ["admin:getAllContacts", params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getAllContactsRequest(params),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    error,
    isLoading,
    isError,
  };
}

export function useGetAllIntOrg(params = {}) {
  const queryKey = ["admin:getAllIntOrg", params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getAllIntOrgRequest(params),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    error,
    isLoading,
    isError,
  };
}

export function useGetAllUser(params = {}) {
  const queryKey = ["admin:getAllUser", params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getAllUserRequest(params),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    error,
    isLoading,
    isError,
  };
}
