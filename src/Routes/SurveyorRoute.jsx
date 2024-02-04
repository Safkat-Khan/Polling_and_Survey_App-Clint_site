/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSurveyor from "../hooks/useSurveyor";


const SurveyorRoute = ({children}) => {
    const {user,loading} = useAuth();
    const [isSurveyor, isSurveyorLoading] = useSurveyor();
    const location = useLocation();
    if(loading || isSurveyorLoading){
        return <span className="loading loading-spinner loading-lg"></span> 
    }
    if(user&& isSurveyor)
    {
        return children;
    }
    return (
        <div>
           <Navigate state={location.pathname} to="/"></Navigate> 
        </div>
    );
};


export default SurveyorRoute;