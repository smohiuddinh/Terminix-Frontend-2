import API_ROUTE from "../endPoints";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useAddGigs() {
  // const pathname = usePathname();
  const queryClient = useQueryClient();
  // const { dispatch } = useGlobalState();

  const {
    mutate: addGigs,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.gigs.addGigs}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.gigs.getGigsByUserId],
      });
      toast.success("Gigs added successfully!");
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      toast.error("error in adding gigs!");
    },
  });
  return { addGigs, isSuccess, isPending, isError, error };
}

export function useGetGigs(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.gigs.getGigs, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.gigs.getGigs}?${constructQueryString(params)}`),
  });
  return { gigs: data?.data?.data, totalPages: data?.data?.totalPages, error, isLoading, isError };
}

export function useGetSingleGigs(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getSingleGigs, id],
    queryFn: async () => await api.get(`${API_ROUTE.gigs.getSingleGigs}/${id}`),
    enabled: id !== undefined && id !== null,
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

export function useGetGigsPackages(id) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: [API_ROUTE.gigs.getGigsPackages, id],
    queryFn: () => api.get(`${API_ROUTE.gigs.getGigsPackages}/${id}`),
    enabled: Boolean(id),
  });
  return { gigsPackages: data?.data?.data, error, isLoading, isError };
}

export function useGetGigsOverview(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getGigsOverview, id],
    queryFn: async () =>
      await api.get(`${API_ROUTE.gigs.getGigsOverview}/${id}`),
    enabled: id !== undefined && id !== null,
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

export function useGetGigsByUser(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const freelancerDetails = useSelector(
    (state) => state.userProfile.userProfile
  );
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getGigsByUserId, params],
    queryFn: async () =>
      await api.get(
        `${API_ROUTE.gigs.getGigsByUserId}/${freelancerDetails.id}?${constructQueryString(params)}`
      ),
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

export function useGetGigsFiles(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getGigsFiles, id],
    queryFn: async () => await api.get(`${API_ROUTE.gigs.getGigsFiles}/${id}`),
    enabled: id !== undefined && id !== null,
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

export function useEditGigs(id, formType = "json") {
  // const pathname = usePathname();
  const queryClient = useQueryClient();
  // const { dispatch } = useGlobalState();

  const {
    mutate: editGigs,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.gigs.editGigs}/${id}`, data, {
        headers: {
          "Content-Type":
            formType === "json" ? "application/json" : "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.gigs.editGigs],
      });

      // toast.success("Gigs edit successfully!");
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      toast.error("Erorr in editting Gigs!");
    },
  });
  return { editGigs, isSuccess, isPending, isError, error };
}

export function useEditGigsFiles(id) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: editGigsFiles,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.gigs.editGigsFiles}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.gigs.editGigs],
      });
      navigate("/freelancer/manage-gigs");
      toast.success("Gigs Files edit successfully!");
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      toast.error("error in editing Gigs Files !");
    },
  });
  return { editGigsFiles, isSuccess, isPending, isError, error };
}
