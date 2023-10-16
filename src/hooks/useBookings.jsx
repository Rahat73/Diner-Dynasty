import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useBookings = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: user != null,
    queryFn: async () => {
      const res = await axiosSecure(`/bookings/${user?.email}`);
      return res.data;
    },
  });
  return [bookings, refetch];
};

export default useBookings;
