import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useSurveyor from "../hooks/useSurveyor";


const Dashboard = () => {
      const [isAdmin] = useAdmin();
      const [isSurveyor] = useSurveyor();
    //   className={
    //   isAdmin ? "lg:flex-1 p-8 bg-blue-50"  : isSurveyor? "lg:flex-1 p-8 bg-blue-50" :"" 
    // }
    return (
        <div className=" lg:flex ">
            {/* dashboard side bar */}
            <div className={
      isAdmin ? "min-w-32 min-h-44 lg:w-48 lg:min-h-screen bg-purple-200" : isSurveyor ? "min-w-32 min-h-44 lg:w-48 lg:min-h-screen bg-blue-200":"" 
     }>
                <div className=" ">
                {/* <ul className=
        "  menu-horizontal    lg:menu   text-xl text-fuchsia-600 font-semibold p-4" > */}
                    {
                        isAdmin? <>
                        
                        <h2 className="pt-4 text-3xl text-center font-serif font-bold text-sky-600 mb-2">Admin</h2>
                    <h3 className="text-xl text-center font-mono font-semibold text-lime-600 mb-2">Dashboard</h3>
                    <ul className=" menu gap-2  lg:menu lg:gap-4  text-2xl lg:text-lg text-blue-600 font-semibold p-4" >
                    <li>
                        <NavLink to="/">
                           
                             Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/user">
                            
                        All Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/survey">
                            
                        All Survey</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allPayment">
                            
                       All Payments</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allResponse">
                            
                        All Survey Responses</NavLink>
                    </li>
                   </ul>

                        </>
                        : isSurveyor? 
                        <>
                         <h2 className=" pt-4 text-3xl text-center font-serif font-bold text-purple-600 mb-2">Surveyor</h2>
                    <h3 className="text-xl text-center font-mono font-semibold text-lime-600 mb-2">Dashboard</h3>
                    <ul className="menu gap-2  lg:menu lg:gap-4  text-2xl lg:text-base text-fuchsia-600 font-bold font-serif p-4" >
                    <li>
                        <NavLink to="/">
                           
                             Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/surveyor">
                            
                        Create Survey</NavLink>
                    </li>
                    <li >
                        <NavLink to="/dashboard/list">
                            
                         Survey List</NavLink>
                    </li>
                    <li >
                        <NavLink to="/dashboard/feedback">
                            
                         Admin Feedback</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/userFeedback">
                            
                         User Feedback</NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/surveyResponse">
                            
                         Survey responses</NavLink>
                    </li>
                  
                    </ul>
                        </>
                        : ''
                       
                    }
                   
                    
                   
                    
                
                </div>
            </div>
            {/* dashboard content */}
            <div className={
       isAdmin ? "lg:flex-1 p-8 bg-purple-50"  : isSurveyor? "lg:flex-1 p-8 bg-blue-50" :"" 
     } 
    >
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;