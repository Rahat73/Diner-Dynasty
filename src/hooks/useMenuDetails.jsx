import { useQuery } from "@tanstack/react-query";

const useMenuDetails = ({ id }) => {
  const {
    data: menu,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu-details", id],
    queryFn: async () => {
      const res = await fetch(
        "https://diner-dynasty-server.vercel.app/menus" + `/${id}`
      );
      return await res.json();
    },
  });

  return [menu, refetch, loading];
};

export default useMenuDetails;
