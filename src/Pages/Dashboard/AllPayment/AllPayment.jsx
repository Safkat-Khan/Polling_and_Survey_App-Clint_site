import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllPayment = () => {
     
    const axiosSecure = useAxiosSecure();
    const { data: allPay = []} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment' );
            return res.data;
        }
    })


    return (
        <div>
            <div className=" my-4">
                <h2 className="text-4xl text-center text-pink-800 font-serif font-bold">All Payments </h2>
                <h2 className="text-lg   text-lime-600 font-serif font-bold pt-4">Total User Payment: {allPay.length}</h2>
            </div>
            <div className="overflow-x-auto mt-4">
  <table className="table-xs lg:table">
   
    <thead>
      <tr>
        <th className="text-sm">#</th>
        <th className="text-sm">Name</th>
        <th className="text-sm">Email</th>
        <th className="text-sm">Transaction Id</th>
        <th className="text-sm">Price</th>
        <th className="text-sm">Date</th>
      </tr>
    </thead>
    <tbody>
     {  allPay.map((pay,index)=> <tr key ={pay._id}>
     
        <th className="text-base text-pink-700 mr-2">{index + 1}</th>
        <td className="text-base font-medium">{pay.name}</td>
        <td className="text-base font-medium">{pay.email}</td>
        <td  className="text-base text-pink-500 font-medium">{pay.transactionId}</td>
        <td  className="text-base text-pink-500 font-medium">${pay.price}</td>
        <td className="text-base font-medium">{pay.date}</td>
      </tr>
   ) }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllPayment;