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
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const AdminSurveyResult = () => {
  const axiosSecure = useAxiosSecure();
  const [survey, setSurvey] = useState([]);
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/survey`).then((res) => {
      setSurvey(res.data);
    });
  }, [axiosSecure]);

  console.log(survey);
  useEffect(() => {
    const find = survey.filter((item)=>item.status=='published');
    setSurveys(find);

}, [survey]);
  return (
    <div>
      <h2 className="text-4xl font-bold text-center my-10 text-green-800 font-serif">
        All Survey Responses
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

              <th>No Vote</th>
              <th>Yes Vote</th>
              <th>Total Vote</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {surveys.map((item, index) => (
              <tr key={item._id}>
                <th className="text-pink-700">{index + 1}</th>
                <td>
                  <p className="font-bold">{item.title}</p>
                </td>
                <td>
                  <p className="font-bold">{item.loggedUser}</p>
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
        className="-ml-16  px-20  my-8 md:px-0 md:ml-20 md:mt-10"
        width={400}
        height={300}
        data={survey}
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
  );
};

export default AdminSurveyResult;
