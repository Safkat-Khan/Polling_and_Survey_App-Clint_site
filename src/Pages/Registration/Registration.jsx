import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Registration = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {googleSignIn} = useContext(AuthContext);
    const {createUser} = useContext(AuthContext);
    // const {userProfile} = useContext(AuthContext);
   
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
        .catch(error => {
            console.log(error);
        })
        
        
    };
    const[errormessage, setErrorMessage] =useState("");
    const handleRegisterForm = e => {
        e.preventDefault ();
        // console.log(e.currentTarget);
        // const Email = e.target.email.value;
        // console.log(Email);
        const form = new FormData(e.currentTarget);
        // console.log(form.get("photo"));
        // console.log(form.get("name"));
        const displayName = form.get("name");
        const photoURL = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");
        if(password.length <5 )
        {
            
            setErrorMessage("Password must contains at least 5 character")
            
            return;
        }
        
        else if(!/[A-Z]/.test(password)){
            setErrorMessage("Password must contains at least 1 uppercase letter.")
            return;
    
        }
        else if(!/[#?!@$%^&*-]/.test(password))
        {
            setErrorMessage("Password must contains at least 1 special character.")
            return;
        }
        else{
            setErrorMessage("");
            if(email)
            {
                createUser(displayName,photoURL,email,password)
                .then ((result) => {
                    console.log(result.user.displayName);
                    
                        const userInfo = {
                            name:result.user.displayName,
                            email:result.user.email
                        }
                        // console.log(userInfo);
                        axiosPublic.post('/user', userInfo)
                         
                                .then(res => {
                                    if (res.data.insertedId) {
                                        console.log('user added to the database')
                                        swal({
                    
                                            text: "Registration done successfully",
                                            icon: "success",
                                          })
                                          navigate("/login");
                                    }
                                })
                   
                   
                    
                })
               
                .catch(error => {
                    console.log(error);
                  
                })
            }
        }
       
        
    };
    return (
        <div>
            <div className=" bg-gradient-to-r from-violet-50 to-orange-200 max-w-screen-md mx-auto pt-14 shadow-2xl lg:my-8 xl:max-w-screen-lg">
  <div className="hero-content flex-col lg:flex-row ">
  <div className="hidden lg:flex lg:w-1/4 xl:w-2/5">
      
      <img src="https://i.ibb.co/0G6QjbV/Forms-amico.png" alt="" />
     </div>
    
    <div className="card flex-shrink-0  w-full max-w-sm   ">
    <div className="text-center mt-8">
      <h1 className="text-3xl font-bold text-teal-600">Registration Form</h1>
     <p className="mt-4">Enter your details to registration</p>
    </div>
      <form onSubmit={handleRegisterForm} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">User Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered" required name="name"/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Photo URL</span>
          </label>
          <input type="url" placeholder="Photo URL" className="input input-bordered" required name="photo" />
        </div>
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
          <input type="password" placeholder="password" className="input input-bordered" required name="password"/>
         
        </div>
        { errormessage && <p className="text-red-700 text-base text-center ">{errormessage}</p>}
       
        <div className="form-control mt-6">
          <button  className="btn bg-purple-400 capitalize text-lg text-white">Registration</button>
        </div>
        <h3 className="text-center mt-4 font-semibold">Already have an account? <Link to="/login" className="text-blue-700 font-extrabold"> Login</Link></h3>
       
      </form>
      <button onClick={handleGoogleAccount}  className="  flex gap-2 bg-blue-200 rounded-full w-56 mx-10 mb-8 outline hover:outline-4  outline-slate-100">
            <img className="rounded-full w-14 " src="https://i.ibb.co/41Gt5P3/178-1780776-googles-new-dataset-search-aims-to-assist-researchers.jpg" alt="" />
            <h3 className="mt-3 text-base  text-blue-600 font-semibold">Sign in with Google </h3>
        </button>
    
    </div>
  </div>
</div>
        </div>
    );
};

export default Registration;