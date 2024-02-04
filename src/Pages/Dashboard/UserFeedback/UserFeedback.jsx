

import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";


const UserFeedback = () => {
    const axiosSecure = useAxiosSecure();
    const{user} = useAuth();
    const userEmail = user.email;
    // console.log(user);
    const [surveys, setSurveys] = useState([]);
    const [survey, setSurvey] = useState([]);
    useEffect(() => {
        axiosSecure
          .get(`/survey`)
          .then((res) => {
            setSurvey(res.data);
          });
      }, [ axiosSecure]);
     
      useEffect(() => {
            
        const findSurvey = survey.filter((item) => item.loggedUser == userEmail && item.status==="published");
      console.log(findSurvey);
      
      setSurveys(findSurvey);
        
    },[userEmail,survey]);
    // console.log(surveys);
    return (
      <div>
        <h2 className="text-4xl font-bold text-center my-10 font-serif text-orange-700">
         User FeedBack
        </h2>
        <div className="overflow-x-auto mt-10 max-w-7xl mx-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-project-400">
                <th>#</th>
                <th>Title</th>
                <th>Email</th>
                <th>status</th>
                <th>Like/Dislike</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {surveys.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <p>{item.title}</p>
                  </td>
                  <td>
                  <p>{item.voted?item.voted.map((items, index) =>
                  
                   <p  key={items._id}  >{index + 1}.{"  "}{items.email}</p>):"No Voted"}</p>
                </td>
                  <td className={`${item.status=='published'? 'text-green-600':"text-red-600"} font-bold`}>{item.status}</td>
                  <td>
                 Like: {item.liked}  Dislike:{item.disliked}
                  </td>
                  <th className="space-x-1">
                    {item.reports ? (
                      <>
                        <button
                          onClick={() =>
                            document
                              .getElementById(`my_modal_${index + 1}`)
                              .showModal()
                          }
                          className="btn bg-project-400 btn-xs"
                        >
                          User Feedbacks
                        </button>
                        <dialog id={`my_modal_${index + 1}`} className="modal">
                          <div className="modal-box bg-project-400">
                            <div>
                              <h2 className="text-lg text-orange-900">FeedBacks</h2>
                              <div className="w-full bg-project-300 mt-6 rounded-lg h-52">
                                {item?.reports?.map((bubble, index) => (
                                  <div className="p-4 flex gap-4" key={index + 1}>
                                    <h3 className="mt-1 text-base">{index + 1}</h3>
                                    <h3 className="text-sm py-2 px-3 rounded-full mb-4 bg-orange-600 inline-block text-white font-medium ">
                                      {bubble}
                                    </h3>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </>
                    ) :  " No Feedback" }
                   
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default UserFeedback;