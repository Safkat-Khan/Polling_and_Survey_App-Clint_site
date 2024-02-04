import { useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import {  useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useSurveyor from "../../hooks/useSurveyor";
import usePro from "../../hooks/usePro";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
// import useSurveyList from "../../hooks/useSurveyList";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";


const SurveyDetails = () => {
    // const{_id,title,description,category,image,question1,question2,question3,deadline,options,yesVoted,noVoted,liked,disliked,status,loggedUser,loggedUserName,timestamp,adminFeedback,totalVote,comments,voted} = useLoaderData();
    const { id } = useParams();
    const{user}= useAuth();
    const[isAdmin]=useAdmin();
    const[isSurveyor]=useSurveyor();
    const[isPro]=usePro();
    // console.log(!isSurveyor);
    const axiosPublic = useAxiosPublic();
    // const{refetch} = useSurveyList();

    const [yesNoQuestion1, setYesNoQuestion1] = useState('');
const [yesNoQuestion2, setYesNoQuestion2] = useState('');
const [yesNoQuestion3, setYesNoQuestion3] = useState('');
const [uplike, setUpLike] = useState(0);
const [updislike, setUpDislike] = useState(0);
const [isUserVoted, setIsUserVoted] = useState(false);


const { data: survey = {}, refetch } = useQuery({
    queryKey: ["survey", id, user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/survey/${id}?email=${user?.email}`);
    //   const today = moment().format("YYYY-MM-DD");
    //   console.log(today, res.data.result.expiryDate);
    //   setDateExpire(moment(res.data.result.expiryDate).isBefore(today));
      setIsUserVoted(res.data.isUserVoted);
    console.log(isUserVoted);
      return res.data.result;
    },
  });
  console.log(survey);
  const voteTime =moment().format('MMMM Do YYYY, h:mm:ss a');
  const { _id,title,description,category,question1,question2,question3,deadline,options,timestamp,comments,liked,disliked} = survey;

  const dateExpire = new Date(deadline) < Date.now();

const handleLike = () => {
    if ((!isSurveyor&& !isAdmin)&&(user||isPro)) {
      setUpDislike(0);
      setUpLike(1);
    }
  };
//   console.log(Uplike);
  const handleDislike = () => {
    if ((!isSurveyor&& !isAdmin)&&(user||isPro)) {
      setUpDislike(1);
      setUpLike(0);
    }
  };

// For handling changes in question 1's radio buttons
const handleOptionChangeQuestion1 = e => {
  setYesNoQuestion1(e.target.value);
};

// For handling changes in question 2's radio buttons
const handleOptionChangeQuestion2 = e => {
  setYesNoQuestion2(e.target.value);
};
const handleOptionChangeQuestion3 = e => {
  setYesNoQuestion3(e.target.value);
};
      // voted
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(yesNoQuestion1);
        let yes = 0;
        let no = 0;
        if (yesNoQuestion1 === "yes") {
          yes =  yes + 1;
        
        }
        if (yesNoQuestion2 === "yes") {
          yes =  yes + 1;
          
        }
        if (yesNoQuestion3 === "yes") {
          yes =  yes + 1;
         
        }
        if (yesNoQuestion1 === "no") {
         
          no =no+1;
        }
        if (yesNoQuestion2 === "no") {
          
          no =no +1;
        }
        if (yesNoQuestion3 === "no") {
        
          no =no +1;
        }
        const votedInfo = {
          email: user?.email,
          votedIn: [yesNoQuestion1,yesNoQuestion2,yesNoQuestion3],
          liked: uplike,
          disliked: updislike,
          yesVoted: yes,
          noVoted: no,
          totalVote:yes+no,
          voteTime:voteTime,
        };
        console.log(votedInfo);
        axiosPublic.put(`/updateSurvey/${_id}`, votedInfo).then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Voted Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            
            }
            refetch();
          });
    };

    // report
  const handleReport = (e) => {
    e.preventDefault();
    const report = e.target.report.value;
    console.log(report);
    axiosPublic
      .put(`/surveyReportUpdate/${_id}?report=${report}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Reported successfully",
            showConfirmButton: false,
            timer: 1500,
          });
         
        }
        refetch();
      });
  };


  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    console.log(comment);
    axiosPublic
      .put(`/surveyCommentUpdate/${_id}?comment=${comment}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Comment added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
         
        }
        refetch();
      });
  };
    //{title,description,category,image,question1,question2,question3,deadline,options,yesVoted,noVoted,liked,disliked,status,loggedUser,loggedUserName,timestamp,adminFeedback,totalVote,}
    // console.log(question2);
    return (
        <div>
            <h1 className="text-center font-semibold font-serif text-5xl text-pink-700 p-8">Survey Details</h1>
            <div className=" card-actions justify-center py-8 flex-col">
            <div className="card  w-[350px] min-h-[390px] md:min-h-[600px] md:w-[550px] lg:w-[750px]   bg-pink-200 shadow-xl ml-4 md:ml-32 xl:ml-72">
  {/* <figure><img src={image} alt="" /></figure> */}
  {isUserVoted || dateExpire ? (
     <div className="">
            <BarChart
              className=" -ml-10 py-10 mx-auto md:ml-12 md:mt-14 md:py-0 lg:ml-36 lg:mt-24"
              width={400}
              height={300}
              data={[survey]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
                
                
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="yesVoted"
                fill="#82ca9d"
                activeBar={<Rectangle fill="lime" stroke="blue" />}
              />
              <Bar
                dataKey="noVoted"
                fill="red"
                activeBar={<Rectangle fill="orange" stroke="purple" />}
              />
            </BarChart>
            </div>
          ) : (
  <div className="card-body  text-center">
    <h2 className="  text-center text-3xl text-violet-800 font-bold pt-4">Title: {title}</h2>
    <h3 className="pt-2 font-bold ">Description: <span className="font-normal"> {description}</span></h3>
    <h3 className="badge w-40 bg-blue-500 text-white h-8 font-semibold text-lg ml-14 md:ml-40 lg:ml-64 mt-2">{category}</h3>
    <h3 className="mt-2 text-green-600 font-bold text-lg">Survey Date: <span className="font-normal text-black ">{timestamp}</span></h3>
    <h3 className="mt-2 text-red-600 font-bold text-lg">Deadline: <span className="font-normal text-black ">{deadline}</span></h3>
    <h3 className="mt-2 text-purple-700 font-bold text-xl">Question:</h3>
    
    <form onSubmit={handleSubmit} className="">
    {question1 ? (
    <div>
    <h3 className="mt-4 text-lime-700 font-bold text-xl">{question1}</h3>
    <div className="flex items-center ml-8 lg:ml-16 mt-2">
    <input
            type="radio"
            id="yesQuestion1"
            value="yes"
            name="radioQuestion1"
            checked={yesNoQuestion1 === "yes"}
            onChange={handleOptionChangeQuestion1}
          />
    
    <label className="label" htmlFor="yes1">
    <span className="label-text font-semibold text-lg ml-2 mr-4">{options[0]}</span>
    
  </label>
  <input
            type="radio"
            id="yesQuestion1"
            value="no"
            name="radioQuestion1"
            checked={yesNoQuestion1 === "no"}
            onChange={handleOptionChangeQuestion1}
          />
    
    <label className="label"htmlFor="no1">
    <span className="label-text ml-2 font-semibold text-lg">{options[1]}</span>
    
  </label>
  </div>
  
  </div>) : null}
     
     {question2 ? (
        <div>
    <h3 className="mt-4 text-lime-700 font-bold text-xl">{question2}</h3>
    <div className="flex items-center ml-8 lg:ml-16 mt-2">
    <input
            type="radio"
            id="yesQuestion2"
            value="yes"
            name="radioQuestion2"
            checked={yesNoQuestion2 === "yes"}
            onChange={handleOptionChangeQuestion2}
          />
    
    <label className="label" >
    <span className="label-text font-semibold text-lg ml-2 mr-4">{options[0]}</span>
    
  </label>
  <input
            type="radio"
            id="yesQuestion2"
            value="no"
            name="radioQuestion2"
            checked={yesNoQuestion2 === "no"}
            onChange={handleOptionChangeQuestion2}
          />
    <label className="label" >
    <span className="label-text ml-2 font-semibold text-lg">{options[1]}</span>
    
  </label>
  </div>
  
  </div>) : null}


     {question3 ? (
        <div>
    <h3 className="mt-4 text-lime-700 font-bold text-xl">{question3}</h3>
    <div className="flex items-center ml-8 lg:ml-16 mt-2">
    <input
            type="radio"
            id="yesQuestion3"
            value="yes"
            name="radioQuestion3"
            checked={yesNoQuestion3 === "yes"}
            onChange={handleOptionChangeQuestion3}
          />
    
    <label className="label" >
    <span className="label-text font-semibold text-lg ml-2 mr-4">{options[0]}</span>
    
  </label>
  <input
            type="radio"
            id="yesQuestion3"
            value="no"
            name="radioQuestion3"
            checked={yesNoQuestion3 === "no"}
            onChange={handleOptionChangeQuestion3}
          />
    <label className="label" >
    <span className="label-text ml-2 font-semibold text-lg">{options[1]}</span>
    
  </label>
  </div>
  
  </div>) : null}
  <button
                      type="submit"
                      disabled={(( isAdmin || isSurveyor||!user))}
                      className="bg-green-500 w-28 h-10 text-lg mt-8 font-semibold  disabled:bg-slate-400 text-white rounded-lg"
                    >
                      vote
                    </button>

  </form>
  <div className="">
  <div className="flex md:ml-16 mt-2 md:-mt-10 text-3xl  gap-2">
                <BiLike
                  onClick={handleLike}
                  className={`${
                    uplike === 1 ? "text-blue-500 " : "text-black"
                  } cursor-pointer`}
                /> <span className="ml-0 text-blue-600 text-lg font-bold">{uplike===1? liked+1 : liked}</span>
                <BiDislike
                  onClick={handleDislike}
                  className={`${
                    updislike === 1 ? "text-red-500 ml-8" : "text-black ml-8"
                  } cursor-pointer`}
                ></BiDislike><span  className="ml-0 text-red-600 text-lg font-bold">{updislike===1? disliked+1 : disliked}</span>
              </div>
  </div>

              <form
                onSubmit={handleReport}
                className="flex w-full  gap-3 flex-col mt-6"
              >
                <label className="font-bold"> Report this category if you see any  inappropriate content</label>
                <textarea
                  name="report"
                  className="textarea  textarea-bordered"
                  placeholder="Report"
                ></textarea>
                {/* if there is a button in form, it will close the modal */}
                <button
                  type="submit"
                  disabled={(( isAdmin || isSurveyor||!user))}
                  className="bg-orange-600 w-24 lg:w-44 text-white text-lg font-bold disabled:bg-slate-500 rounded-lg py-3 "
                >
                  Report
                </button>
              </form>
   
  </div>)}
  
</div>



<div className="w-[340px] md:w-[496px] lg:w-[700px] mx-auto my-10 bg-indigo-300 rounded-lg shadow-2xl">

          <div className="card-body">
          {!isPro && <h3 className="text-red-700 font-semibold text-center ">Only pro users can comment</h3>}
            <h2 className="card-title text-3xl text-lime-700 font-bold">
              Comments
            </h2>
            <div className="w-full h-80 bg-purple-200 rounded-lg overflow-y-auto">
              <div className="p-4">
                {comments?.map((item, index) => (
                  <div className=" flex gap-4" key={index}>
                    <h3 className="mt-1 text-lg">{index + 1}.</h3>
                    <h3 className="bg-blue-400 text-white  p-2 rounded-full inline-block">
                      {item}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            {/* comment form */}
            <form
              className={`${ isPro ? "" : "hidden"}`}
              onSubmit={handleComment}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Comment"
                  name="comment"
                  className="input input-bordered w-full"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 px-3 rounded-lg font-semibold text-white"
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
            </div>
        </div>
    );
};

export default SurveyDetails;