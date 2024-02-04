import axios from "axios";

const axiosPublic = axios.create({

    baseURL: 'https://polling-and-surveys-application-server-mhkkykghg.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;