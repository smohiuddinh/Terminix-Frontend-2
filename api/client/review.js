import API_ROUTE from "../endPoints";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useAddRating() {
  const queryClient = useQueryClient();
  const { mutate: addRating, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.rating.addFreelancerRating}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Rating Added successfully!")
    },
    onError: (error) => {
      toast.error("Error In Addding Rating!")
    },
  });
  return { addRating, isSuccess, isPending, isError, error };
}

// export function useGetFreelancerRatings(freelancerId) {
//   return useQuery({
//     queryKey: ["freelancerRatings", freelancerId],
//     queryFn: async () => {
//       const response = await api.get(`${API_ROUTE.getFreelancerRating.freelancerId}`);
//       return response.data.data;
//     },
//     enabled: !!freelancerId, 
//   });

  

// export function useGetFreelancerRatings(params = {}) {
//   const constructQueryString = (params) => {
//     const query = new URLSearchParams(params).toString();
//     return query ? `?${query}` : "";
//   };

//   const queryKey = [API_ROUTE.rating.getFreelancerRating, params];

//   const { data, error, isLoading, isError } = useQuery({
//     queryKey,
//     queryFn: () =>
//       api.get(`${API_ROUTE.rating.getFreelancerRating}${constructQueryString(params)}`),
//   });

//   return {
//     data: data?.data,
//     error,
//     isLoading,
//     isError,
//   };
// }

export function useFreelancerGigRatings(gig_id) {
  const queryKey = [API_ROUTE.rating.getFreelancerGigRatings, gig_id];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.rating.getFreelancerGigRatings}/${gig_id}`)
         .then(res => res.data),
    enabled: !!gig_id,
  });

  return {
    data,
    error,
    isLoading,
    isError,
  };
}


export function useFreelancerAverageRating(freelancer_id) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["freelancerAverageRating", freelancer_id],
    queryFn: async () => {
      if (!freelancer_id) throw new Error("Freelancer ID is required");
      const response = await api.get(
        `${API_ROUTE.rating.useFreelancerAverageRating}/${freelancer_id}`
      );
      return response.data.data;
    },
    enabled: !!freelancer_id,
    onError: (err) => {
      toast.error("Failed to fetch freelancer rating");
      console.error(err);
    },
  });

  return {
    averageRating: data?.averageRating || 0,
    totalReviews: data?.totalReviews || 0,
    isLoading,
    isError,
    error,
  };
}