import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useSurveyor = () => {
    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isSurveyor, isPending: isSurveyorLoading} = useQuery({
        queryKey:[user?.email,'isSurveyor'],
        enabled:!loading && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/surveyor/${user.email}`);
            console.log(res.data);
            return res.data?.surveyor;
        }
    })
    return [isSurveyor,isSurveyorLoading]
};

export default useSurveyor;