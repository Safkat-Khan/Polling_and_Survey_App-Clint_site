import { useEffect, useState } from "react";

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
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { ImHome3 } from "react-icons/im";
// import useSurveyList from "../../../hooks/useSurveyList";

const SurveyorSurveyResult = () => {
  const { user } = useAuth();
//   console.log(user);
  const userEmail = user.email;
  const axiosSecure = useAxiosSecure();
  const [surv, setSurv] = useState([]);
  const [surveys, setSurveys] = useState([]);
//   const[survey] = useSurveyList();
  useEffect(() => {
    axiosSecure
      .get(`/survey/sortByTotalVote`)
      .then((res) => {
        setSurv(res.data);
      });
  }, [user?.email, axiosSecure]);
 
  useEffect(() => {
        
    const findSurvey = surv.filter((item) => item.loggedUser == userEmail && item.status==="published");
  console.log(findSurvey);
  
  setSurveys(findSurvey);
    
},[userEmail,surv]);
//   const finds = surveys.map((item) => (console.log(item.voted)))

  return (
    <div>
      <h2 className="text-4xl font-bold text-center my-10 text-teal-700 font-serif">
         Survey Responses
      </h2>
      <div className="overflow-x-auto mt-10 max-w-7xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-project-400">
              <th>#</th>
              <th>Title</th>
              <th>Email</th>
              <th>Time</th>
              <th>status</th>

              <th>No Vote</th>
              <th>Yes Vote</th>
              <th>Total Vote</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {surveys.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <p >{item.title}</p>
                </td>
                <td>
                  <p>{item.voted?item.voted.map((items, index) =>
                  
                   <p  key={items._id}  >{index + 1}.{"  "}{items.email}</p>):"No Voted"}</p>
                </td>
                <td>
                  <p>{item.voted?item.voted.map((items, index) =>
                  
                   <p  key={items._id}  >{index + 1}.{"  "}{items.voteTime} </p>):"No Voted"}</p>
                </td>

                <td className={`${item.status=='published'? 'text-green-600':"text-red-600"} font-bold`}>{item.status}</td>

                <td className="font-bold">{item.noVoted}</td>
                <td className="font-bold">{item.yesVoted}</td>
                <td className="font-bold">{item.totalVote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <BarChart 
        className="-ml-16  px-20  my-8 md:px-0 md:ml-20 md:mt-10 "
        width={400}
        height={300}
        data={surveys}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" className="" />
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
  );
};

export default SurveyorSurveyResult;
