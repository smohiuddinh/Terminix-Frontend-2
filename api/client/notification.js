import API_ROUTE from "../endPoints";
import api from "../axios/index";
import { useQuery } from "@tanstack/react-query";

export function useGetNotification( params = {}) {
    const constructQueryString = (params) => {
        const query = new URLSearchParams(params).toString();
        return query ? `&${query}` : "";
    };
    const queryKey = [API_ROUTE.notifications.getNofication, params];
    const { data, error, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () =>
            api.get(`${API_ROUTE.notifications.getNofication}?${constructQueryString(params)}`),
    });
    return { data: data?.data?.data, error, isLoading, isError };
}

export function useGetUnReadCountNot(params = {}) {
    const constructQueryString = (params) => {
        const query = new URLSearchParams(params).toString();
        return query ? `&${query}` : "";
    };
    const queryKey = [API_ROUTE.notifications.unread_count, params];
    const { data, error, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () =>
            api.get(`${API_ROUTE.notifications.unread_count}?${constructQueryString(params)}`),
    });
    return { data: data?.data?.data, error, isLoading, isError };
}

export function useUpdateReadNot(params = {}) {
    const constructQueryString = (params) => {
        const query = new URLSearchParams(params).toString();
        return query ? `&${query}` : "";
    };
    const queryKey = [API_ROUTE.notifications.mark_read, params];
    const { data, error, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () =>
            api.put(`${API_ROUTE.notifications.mark_read}?${constructQueryString(params)}`),
    });
    return { data: data?.data?.data, error, isLoading, isError };
}

