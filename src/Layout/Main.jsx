import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    // console.log(location);
    const noHeaderFooter = location.pathname.includes('login')|| location.pathname.includes('register');
   
    return (
        <div>
            <div className='sticky top-0 z-10'>
            { noHeaderFooter|| <Navbar></Navbar>}
            </div>
           
            <Outlet></Outlet>
            { noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;