import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// multipart form data
export function useAddproject() {
  const navigate = useNavigate()
  const { mutate: addProject, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.project.addProject}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Project added successfully!")
      // navigate('/client/projects')
    },
    onError: (error) => {
      toast.error("Error in Adding Project added !")

    },
  });
  return { addProject, isSuccess, isPending, isError, error };
}

// get project by user
export function useGetProjectsByClient(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getProjectByClient, params],
    queryFn: async () => await api.get(`${API_ROUTE.project.getProjectByClient}?${constructQueryString(params)}`),
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

// get project by user
export function useGetAllProjects(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getAllProject, params],
    queryFn: async () => await api.get(`${API_ROUTE.project.getAllProject}?${constructQueryString(params)}`),
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

export function useGetProjectsById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getProjectById],
    queryFn: async () => await api.get(`${API_ROUTE.project.getProjectById}/${id}`),
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

export function useApplyProject() {

  const { mutate: submitProposals, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.project.submitProposals}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("CV send successfully!")

    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      toast.error("error in sending cv !")

    },
  });
  return { submitProposals, isSuccess, isPending, isError, error };
}

export function useGetProjectProposalByClient(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getProjectPropsalByClient, id],
    queryFn: async () => await api.get(`${API_ROUTE.project.getProjectPropsalByClient}/${id}`),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useEditProjects(id) {
  const navigate = useNavigate()
  const {
    mutate: editProject,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.project.editProject}/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Project Edit Successfully")
      navigate('/client/projects')

    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      toast.error("error in Editing project ")

    },
  });
  return { editProject, isSuccess, isPending, isError, error };
}


