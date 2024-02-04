import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const usePro = () => {
    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isPro, isPending: isProLoading} = useQuery({
        queryKey:[user?.email,'isPro'],
        enabled:!loading && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/pro/${user.email}`);
            console.log(res.data);
            return res.data?.proUser;
        }
    })
    return [isPro,isProLoading]
};

export default usePro;