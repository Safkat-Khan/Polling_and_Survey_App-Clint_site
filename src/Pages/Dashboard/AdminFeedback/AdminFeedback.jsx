import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSurveyList from "../../../hooks/useSurveyList";


const AdminFeedback = () => {
    const{user}=useAuth();
    const userEmail = user?.email;
   
    // const axiosSecure = useAxiosSecure();
   const [survey] = useSurveyList();
   const[surveys,setSurveys] = useState([]);
    
    useEffect(() => {
        
        const findSurvey = survey.filter((item) => item.loggedUser == userEmail && item.status=='unpublished');
    //   console.log(findSurvey);
      
      setSurveys(findSurvey);
        
   },[userEmail,survey]);
    return (
        <div>
             <h2 className="text-center text-lime-600 font-serif text-4xl font-semibold underline"> Surveys Feedback</h2>
            <div className="mt-4">
                {
                     surveys.map((item, index) => <div key={item._id}>
                        <div>
                        <div className="mt-6">
                        <h3 className="font-semibold text-lg">{item.timestamp}</h3>
                        </div>
                    <div>
                    <td className="font-bold text-lg text-green-700">
                         {index + 1}
                     </td>
                     <td>

                     <div className="card w-[300px] md:w-[400px] lg:w-[600px] bg-orange-100 text-black font-serif mt-6 ml-2">
  <div className="card-body items-center text-center">
    <h2 className="card-title text-green-700">{item.title}</h2>
    <h3>{item.description}</h3>
    <h3 className="text-base text-pink-600 font-semibold mt-2">Questions:</h3>
    <div className="gap-2">
    <h3 className="mt-2 font-medium text-base">1.  {item.question1}</h3>
    <h3 className="mt-2 font-medium text-base">2. {item.question2}</h3>
    <h3 className="mt-2 font-medium text-base">3. {item.question3}</h3>
    </div>
    <div className="card-actions justify-between gap-12 pt-4">
      <button className='btn  capitalize text-white bg-red-600' >{item.status}</button>
     
<button className="btn bg-violet-600 text-white text-base" onClick={()=>document.getElementById('my_modal_5').showModal()}>Admin Feedback</button>
<dialog id="my_modal_5" className="modal min-h-[400px]">
  <div className="modal-box">
    <h3 className="font-bold text-lg ">Feedback Message</h3>
    <p className="py-4 text-base text-rose-600 font-semibold">{item.adminFeedback}</p>
    <div className="modal-action">
      <form method="dialog">
        
        <button className="btn bg-green-400">Close</button>
      </form>
    </div>
  </div>
</dialog>
     
      {/* <button onClick={()=>handleDeleteItem(item)} className="btn btn-ghost"><FaTrashAlt className="text-red-600 text-lg"></FaTrashAlt></button> */}
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

export default AdminFeedback;