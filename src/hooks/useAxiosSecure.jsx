import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import  { AuthContext } from "../Providers/AuthProvider";

export const axiosSecure = axios.create({
    baseURL: 'https://polling-and-surveys-application-server-mhkkykghg.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const{logOut} = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
    //    console.log('request stopped by interceptors',token)
       config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, (error) =>{
        const status = error.response.status;
        console.log('status error in the interceptor', status);
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async (error) =>{
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;