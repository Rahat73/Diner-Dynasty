import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const { user } = useContext(AuthContext);
  // const token = localStorage.getItem("access-token");
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: user != null,
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user?.email}`);
      // const res = await fetch(
      //   `https://diner-dynasty-server.vercel.app/carts?email=${user?.email}`,
      //   {
      //     headers: {
      //       authorization: `bearer ${token}`,
      //     },
      //   }
      return res.data;
    },
  });

  return [cart, refetch];
};

export default useCart;
