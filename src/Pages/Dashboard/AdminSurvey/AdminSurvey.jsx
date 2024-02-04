import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSurveyList from "../../../hooks/useSurveyList";
import { useState } from "react";


const AdminSurvey = () => {
    const [survey,refetch]=useSurveyList();
    const axiosSecure = useAxiosSecure();
    const [unpublishedMessage, setUnpublishedMessage] = useState('');

    const handlePublish = item =>{
        console.log(item);
        const status ={ status:'published'};
        if(item.status=='unpublished')
        {
        axiosSecure.patch(`/survey/${item._id}`,status)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
               
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'survey is published now.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch();
            }
         
            
        })}else {
            Swal.fire({
                icon: 'error',
                title: 'Opps!',
                text: 'Already Exist.',
            })
        }
    };

    const handleUnpublished = item =>{
        const survey ={ status:'unpublished', adminFeedback: unpublishedMessage,};
        if(item.status =='published')
        {
        axiosSecure.patch(`/survey/${item._id}`,survey)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'survey is unpublished now.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch();
            }
        })} else {
            Swal.fire({
                icon: 'error',
                title: 'Opps!',
                text: 'Already Exist.',
            })
        }
    };
    return (
        <div>
            <h2 className="text-center text-lime-600 font-serif text-4xl font-semibold mt-6">All Survey</h2>
            <div className="mt-4">
                {
                    survey.map((item) => <div key={item._id}>
                   
                    <div className="mt-6">
                    <h3 className="font-semibold text-lg text-blue-600 mt-2">{item.timestamp}</h3>
                    </div>
                    <div className="card w-[340px] md:w-[400px] lg:w-[600px] bg-base-100 shadow-xl mt-6">
  <figure ><img className="w-[340px] h-[130px] md:w-[400px] md:h-[150px] lg:w-[600px] lg:h-[210px] " src={item.image} alt="" /></figure>
  <div className="card-body">
    <h2 className="card-title text-xl font-bold">
      {item.title}
      <div className="badge badge-secondary text-xs w-[180px] lg:ml-4">{item.loggedUser}</div>
    </h2>
    <h3 className={`refetch() ${item.status =='published'?'text-green-600 font-semibold':'text-red-500 font-semibold'}`}>Survey {item.status}</h3>
    <h3 className="mt-4">{item.description}</h3>
    <h3 className="text-base text-pink-500 font-semibold mt-2">Questions:</h3>
    <div className="gap-2">
    <h3 className="mt-2 font-medium text-base">1.  {item.question1}</h3>
    <h3 className="mt-2 font-medium text-base">2. {item.question2}</h3>
    <h3 className="mt-2 font-medium text-base">3. {item.question3}</h3>
    </div>
    <div className="card-actions justify-between">
      <div className="badge badge-outline mt-2">{item.deadline}</div> 
      <div className="flex gap-4">
      <button onClick={() => handlePublish(item)} className="btn bg-green-500 text-white">Published</button>
      <button className="btn bg-red-600 text-white" onClick={()=>document.getElementById('my_modal_1').showModal()}>Unpublished</button>
<dialog id="my_modal_1" className="modal min-h-[500px]">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Unpublished Feedback message</h3>
    <textarea placeholder="Message" value={unpublishedMessage}
        onChange={(e) => setUnpublishedMessage(e.target.value)} className="textarea textarea-bordered textarea-lg w-full max-w-xs  mt-4 lg:ml-6" ></textarea>
    <div className="modal-action ">
    <form method="dialog" >
        <button className="btn mr-4">Close</button>
        <button  onClick={() => handleUnpublished(item)} type="submit" className="btn bg-green-500 text-white ">Submit Feedback</button>
        </form>
    </div>
  </div>
</dialog>
      

      </div>
    </div>
  </div>
</div>


                    </div>)
                }
           
</div>
        </div>
    );
};

export default AdminSurvey;