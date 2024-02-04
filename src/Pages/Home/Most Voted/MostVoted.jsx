import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { BiLike,BiDislike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";


const MostVoted = () => {
    const axiosPublic = useAxiosPublic();
  const { data: survey = [] } = useQuery({
    queryKey: ["survey"],
    queryFn: async () => {
      const res = await axiosPublic.get("/survey/mostVote");
      return res.data;
    },
    
  });

//   console.log(survey[1].comments.length);
    return (
        <div>
             <h2 className="text-center font-bold text-5xl my-20 font-serif text-orange-800">
        Most Voted Surveys
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  mt-12">
        {survey.map((item) => (
          <div
            key={item._id}
            className=" rounded-tr-[80px] rounded-bl-[80px] rounded-tl-none rounded-br-none bg-lime-200 w-[340px] md:min-h-[700px] md:w-[360px] lg:w-[450px] xl:w-[400px]  shadow-xl ml-6 my-6 md:ml-4 lg:ml-8"
          >
             <figure >
    <img className="rounded-tr-[80px] rounded-tl-none w-[340px] h-36 md:w-[360px] md:h-40 lg:w-[450px] lg:h-48 xl:w-[400px]" src={item.image} alt=""  />
  </figure>
            <div className="card-body mx-auto ">
            <div className="flex gap-3">
              <h2 className="card-title text-2xl font-bold  text-purple-700 font-serif ">
                {item.title}
               
              </h2>
              
                <p className="font-semibold badge text-center w-20 h-10 lg:h-6 bg-pink-700 text-white">
                 {item.category}
                </p>
              </div>


              <p className="text-blue-600 font-bold mt-2 mx-auto"> Description: <span className="text-black font-medium">{item.description}</span></p>
        


              <div className="flex gap-6 lg:gap-20 mt-2">
              <h3 className="flex items-center font-bold text-teal-600 gap-2 badge text-lg px-2 py-2 h-8 lg:text-2xl">
                {/* <GiVote className="text-3xl" /> */}
                Vote:
                <span className="  rounded-full text-blue-700 font-bold">
                  {item.totalVote}
                </span>
              </h3>
              <div className=" flex gap-6 lg:gap-4  mt-1" >
        <button className="flex gap-2"><BiLike className="text-2xl "></BiLike> <span className="text-green-800 font-bold">{item.liked}</span></button>
        <button className="flex gap-2"><BiDislike className="text-2xl "></BiDislike> <span className="text-red-600 font-bold ">{item.disliked}</span></button>
        <button className="flex gap-2 mt-1"><FaRegCommentAlt className="text-xl"></FaRegCommentAlt><span className="text-blue-700 font-bold -mt-1">{item.comments? item.comments.length : 0}</span></button>
    </div>
              </div>
              <div className="card-actions">
                <Link
                  to={`/details/${item._id}`}
                  className=" py-3 rounded-lg text-center  font-medium w-full bg-gradient-to-r from-blue-300 to-purple-700 text-lg text-white mt-4 mx-12 lg:mx-20 lg:mt-16"
                >
                  Survey Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div> 
        </div>
    );
};

export default MostVoted;