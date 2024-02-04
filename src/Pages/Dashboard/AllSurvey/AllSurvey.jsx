import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSurveyList from "../../../hooks/useSurveyList";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link} from "react-router-dom";


const AllSurvey = () => {
     const{user}=useAuth();
     const userEmail = user?.email;
    
     const axiosSecure = useAxiosSecure();
    const [survey, , refetch] = useSurveyList();
    const[surveys,setSurveys] = useState([]);
    
    useEffect(() => {
        
        const findSurvey = survey.filter((item) => item.loggedUser == userEmail);
      console.log(findSurvey);
      
      setSurveys(findSurvey);
        
   },[userEmail,survey]);

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async(result)=>{
            if(result.isConfirmed){
                const res = await axiosSecure.delete(`/survey/${item._id}`);
                console.log(res.data);
                if ((res.data.deletedCount > 0)) {
                    
                    Swal.fire({
                      
                        title: "Deleted!",
                        text: `${item.title} has been deleted.`,
                        icon: "success"
                      
                    })
                    refetch();
                    
                   
                }

            }
        })
    }



    return (
        <div>
          <h2 className="text-center text-violet-600 font-serif text-4xl font-semibold">All Survey</h2>
            <div className="mt-4">
                {
                   surveys.map((item, index) => <div key={item._id}>
                        <div>
                        <div className="mt-6">
                        <h3 className="font-semibold text-lg">{item.timestamp}</h3>
                        </div>
                    <div>
                    <td className="font-bold text-lg text-purple-700">
                         {index + 1}
                     </td>
                     <td>

                     <div className="card w-[200px] md:w-[400px] lg:w-[600px] bg-orange-100 text-black font-serif mt-6 mx-8">
  <div className="card-body items-center text-center">
    <h2 className="card-title text-green-700">{item.title}</h2>
    <h3>{item.description}</h3>
    <h3 className="text-base text-pink-500 font-semibold mt-2">Questions:</h3>
    <div className="gap-2">
    <h3 className="mt-2 font-medium text-base">1.  {item.question1}</h3>
    <h3 className="mt-2 font-medium text-base">2. {item.question2}</h3>
    <h3 className="mt-2 font-medium text-base">3. {item.question3}</h3>
    </div>
    <div className="card-actions justify-end pt-4">
      <button className={`btn  capitalize text-white ${item.status=='published'?'bg-emerald-600':'bg-red-600'} `}>{item.status}</button>
      <Link to={`/dashboard/updateSurvey/${item._id}`}>
      <button className="btn btn-ghost"><FaEdit className="text-lg"></FaEdit></button></Link>
      <button onClick={()=>handleDeleteItem(item)} className="btn btn-ghost"><FaTrashAlt className="text-red-600 text-lg"></FaTrashAlt></button>
    </div>
  </div>
</div>
                     </td>

                    </div>
                    </div>
                     </div>)
                }
            </div>
        </div>
    );
};

export default AllSurvey;