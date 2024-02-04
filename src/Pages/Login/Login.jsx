
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Login = () => {
    const location = useLocation();
  const navigate = useNavigate();

  const {signIn} = useContext(AuthContext);
  const {googleSignIn} = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
 
  const handleGoogleAccount = () => {
      googleSignIn().then ((result) => {
          console.log(result.user);
          const userInfo = {
            name:result.user.displayName,
            email:result.user.email
        }
        // console.log(userInfo);
        axiosPublic.post('/user', userInfo)
         
                .then(res => {
                    console.log(res.data);
                })
           navigate(location?.state?location.state :'/' )
      })
      
  };
  const[errormessage, setErrorMessage] =useState("");
  const handleLogin = e =>{
    e.preventDefault ();
    const form = new FormData(e.currentTarget);
   
    const email = form.get("email");
    console.log(form);
    const password = form.get("password");
    setErrorMessage("");

if((email,password))
{
signIn(email,password)
.then ((result) => {
    console.log(result.user);
    swal({
        
        text: "Login successfully",
        icon: "success",
        
      })
      navigate(location?.state?location.state :'/' )
})
.catch((err) => {
    console.log(err);
    setErrorMessage("Email and Password does not match!");
    
 
    swal({
        
        text: "Invalied Login",
        icon: "warning",
        
      })
      
});

}
}
    
    return (
        
        <div className="">
           <div className="max-w-screen-md mx-auto pt-14 bg-violet-300 shadow-2xl lg:my-8 xl:max-w-screen-lg">
  <div className="hero-content flex-col lg:flex-row">
    <div className="hidden lg:flex lg:w-2/5 xl:w-2/5">
      
     <img src="https://i.ibb.co/8BKdZXc/Security-On-amico.png" alt="" />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm  bg-violet-300">
      <form onSubmit={handleLogin} className="card-body">
      <h1 className="text-3xl text-center font-bold">Login now!</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required name="email" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required name="password" />
          <p className="text-red-700 text-base">{errormessage}</p> 
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-gradient-to-r from-green-300 to-blue-700  text-lg text-white">Login</button>
        </div>
        <h3 className="text-center font-bold mt-4">Do not have an account? <Link to="/register" className="text-lime-600 font-extrabold">Registration</Link></h3>
       
      </form>
      <button onClick={handleGoogleAccount}  className="  flex gap-2 bg-blue-200 rounded-full w-56 mx-10 mb-6  outline hover:outline-4  outline-slate-100">
            <img className="rounded-full w-14 " src="https://i.ibb.co/41Gt5P3/178-1780776-googles-new-dataset-search-aims-to-assist-researchers.jpg" alt="" />
            <h3 className="mt-3 text-base text-blue-600 font-semibold">Sign in with Google </h3>
        </button>
    </div>
  </div>
</div>  
        </div>
       
    );
};

export default Login;