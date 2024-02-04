import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
// import { useLoaderData } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import { useEffect, useState } from "react";




const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
    // const data = useLoaderData();
    // const{user}=useAuth();
    // const userEmail = user.email;
    
    // const[check, setCheck]= useState([]);

    // useEffect(() => {
        
    //         const findSurvey = data.filter((item) => item.email == userEmail);
    //       console.log(findSurvey);
    //       setCheck(findSurvey);
    //     },[userEmail,data]);

    // console.log(user);
    return (
        <div>
            <div>
                {/* {check.map((item)=> */}
            <Elements  stripe={stripePromise} >
                <h3 className="text-5xl text-lime-600 text-center underline font-bold pt-8">Payment</h3>
              
             
                <CheckoutForm  ></CheckoutForm> 
              
              
              {/* <CheckoutForm></CheckoutForm> */}
             </Elements>  
            {/* //  )} */}

            </div>
        </div>
    );
};

export default Payment;