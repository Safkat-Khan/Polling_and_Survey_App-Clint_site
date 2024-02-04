/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import moment from 'moment';
import useAdmin from "../../hooks/useAdmin";
import usePro from "../../hooks/usePro";
import useSurveyor from "../../hooks/useSurveyor";
// import useUsers from "../../hooks/useUsers";



const CheckoutForm = () => {
  // const{_id,email}= item ||{};
  const[isAdmin] = useAdmin();
  const[isSurveyor] = useSurveyor();
  const[isPro] = usePro();
  const isDisabled = isAdmin|| isSurveyor || isPro;
  // console.log(email);
    const[error,setError] = useState('');
    const[clientSecret,setClientSecret] = useState('');
    const[transactionId,setTransactionId] = useState('');
    const{user} = useAuth();
    // const find = email=== user.email;
    // console.log(find);
    // const[users,refetch] = useUsers();
    const userEmail = user.email;
    // console.log(userEmail);
    const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const totalPrice = 100;


  useEffect(()=>{
    axiosSecure.post('/create-payment-intent',{price: totalPrice})
    .then(res=>{
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
    })
  })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
           
            return;
          }
          const card = elements.getElement(CardElement);

          if (card == null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          if (error) {
            console.log('Payment error', error);
            setError(error.message);
          } else {
            console.log('[Payment method', paymentMethod);
            setError('');
          }
          const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email:user?.email||'anonymous',
                  name: user?.displayName||'anonymous',
                },
              },
            },
          );

          if(confirmError){
            console.log('confirm error');
          }
          else{
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
              console.log('transaction id', paymentIntent.id);
              setTransactionId(paymentIntent.id);

              const payment = {
                email:user.email,
                name:user.displayName,
                price:totalPrice,
                transactionId:paymentIntent.id,
                date:moment().format('MMMM Do YYYY, h:mm:ss a'),

              }
              const res = await axiosSecure.post('/payment',payment);
              console.log('payment saved',res.data);
              if (res.data.insertedId) {
                // console.log(res.data?.paymentResult?.insertedId);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment done.",
                    showConfirmButton: false,
                    timer: 1600
                });
                // navigate('/dashboard/paymentHistory')
              }
               else  {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Opps!',
                    text: 'Already Exist in the Cart.',
                })
            }

            }
          }
    };


    const handleMakePro = userEmail =>{
      // const findUser = email.filter((item)=> console.log(item));
      // console.log(findUser);
      axiosSecure.patch(`/user/pro/${userEmail}`)
      .then(res =>{
          console.log(res.data)
          if(res.data.modifiedCount > 0){
              // refetch();
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Now you are a pro member!",
                  showConfirmButton: false,
                  timer: 1500
                });
          }
      })
  }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <CardElement className="mx-6 mt-12"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />

     {
        isDisabled ? (
          <div className=" btn-disabled cursor-not-allowed text-center  text-xl rounded-lg bg-slate-400 w-44 h-10 text-white ml-8 mt-14  ">
           
      <button disabled className="mt-1">Pay</button>
     
            {/* <h3 className="text-base text-red-500 mt-6">job’s deadline is crossed </h3> */}
          </div>
        ) : (
         
          <button onClick={()=>handleMakePro(userEmail)} className="btn bg-blue-500 text-white ml-8 mt-14 w-44 h-10 text-xl" disabled={!stripe||!clientSecret} type="submit" >
        Pay
      </button>
      
         
        )
      }
      {/* <button onClick={()=>handleMakePro(userEmail)} className="btn bg-blue-500 text-white ml-8 mt-14" disabled={!stripe||!clientSecret} type="submit" >
        Pay
      </button> */}
      <p className="text-red-600 ml-8 my-4">{error}</p>
      {transactionId && <p className="text-green-600 mx-6 mb-4">Your transaction id: {transactionId}</p> }
            </form>
        </div>
    );
};

export default CheckoutForm;