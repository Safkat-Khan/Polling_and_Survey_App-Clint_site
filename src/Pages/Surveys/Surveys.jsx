import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useSurveyList from "../../hooks/useSurveyList";
import { BiLike,BiDislike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


const Surveys = () => {
    const axiosPublic = useAxiosPublic();
    const[survey] = useSurveyList();
    const [surveys, setSurveys] = useState([]);
    const [filteredSurveys, setFilteredSurveys] = useState([]);
    const [searchText, setSearchText] = useState('');
//   const [searchTitle, setSearchTitle] = useState('');
//   const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
         const find = survey.filter((item)=>item.status=='published');
         setSurveys(find);

  }, [survey]);

//   const fetchSurveys = async () => {
//     try {
//       const response = await axiosPublic.get('/survey');
//       console.log(response.data);
//       setSurveys(response.data);
//     } catch (error) {
//       console.error('Error fetching surveys:', error);
//     }
//   };

   
useEffect(() => {
    const filtered = surveys.filter(survey =>
      survey.title.toLowerCase().includes(searchText.toLowerCase()) ||
      survey.category.toLowerCase().includes(searchText.toLowerCase()) ||
      survey.totalVote.toString().includes(searchText)
    );
    setFilteredSurveys(filtered);
  }, [searchText, surveys]);
 

//   const handleSearch = async () => {
//     if (searchTitle) {
//       try {
//         const response = await axiosPublic.get(`/survey/title/${searchTitle}`);
//        console.log(response.data);
//         // setSurveys(data);
//       } catch (error) {
//         console.error('Error fetching surveys by title:', error);
//       }
//     } else if (searchCategory) {
//       try {
//         const response = await axiosPublic.get(`/survey/category/${searchCategory}`);
//         console.log(response.data);
//         // setSurveys(data);
//       } catch (error) {
//         console.error('Error fetching surveys by category:', error);
//       }
//     }
//   };

  const handleSortByTotalVote = async () => {
    try {
      const response = await axiosPublic.get('/survey/sortByTotalVote');
      console.log(response.data);
      setFilteredSurveys(response.data);
    } catch (error) {
      console.error('Error sorting surveys by totalVote:', error);
    }
  };
//   useEffect(() => {
//     axios.get('http://localhost:3000/surveys', { params: filter })
//       .then(response => {
//         setSurveys(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching surveys:', error);
//       });
//   }, [filter]);.length
// console.log(surveys);
// console.log(filteredSurveys[2].comments.length);
    return (
        <div>
             <h1 className="text-center font-semibold font-serif text-5xl text-emerald-700 p-8">All Surveys</h1>
      <div className="text-center">
      <input className="w-80 h-10 text-center border-2 border-gray-200 bg-slate-100"
        type="text"
        placeholder="Search by title, category"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
        {/* <input onClick={handleSearch}
          type="text"
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button> */}
        <button onClick={handleSortByTotalVote} className="ml-6 mt-4 btn text-lg text-white bg-green-600">Sort by  Vote</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  mt-12">
        {filteredSurveys.map((survey) => (
          <div key={survey._id} >
            <div className=" rounded-tl-[80px] rounded-br-[80px] rounded-tr-none rounded-bl-none bg-sky-100 w-[330px] md:min-h-[600px] md:w-[350px] lg:w-[450px] xl:w-[400px]  shadow-xl ml-6 my-6 md:ml-4 lg:ml-8">
  <figure >
    <img className="rounded-tl-[80px] rounded-tr-none w-[330px] h-36 md:w-[350px] md:h-40 lg:w-[450px] lg:h-48 xl:w-[400px]" src={survey.image} alt=""  />
  </figure>
  <div className="card-body  rounded-bl-none rounded-br-3xl items-center text-center">
    <h2 className="card-title text-emerald-800 font-bold ">Title: {survey.title}</h2>
    <h3 className="mt-2">Description: {survey.description}</h3>
    <div className="flex gap-6 mt-2">
        <h3 className="text-pink-700 font-semibold">Category: {survey.category}</h3>
        <h3 className="text-red-700 font-bold">Total Vote: {survey.totalVote}</h3>
    </div>
    <div className=" flex gap-14 lg:gap-16 mt-4" >
        <button className="flex gap-2"><BiLike className="text-2xl "></BiLike> <span className="text-green-800 font-bold">{survey.liked}</span></button>
        <button className="flex gap-2 "><BiDislike className="text-2xl "></BiDislike> <span className="text-red-600 font-bold -mt-1">{survey.disliked}</span></button>
        <button className="flex gap-2 mt-0"><FaRegCommentAlt className="text-xl"></FaRegCommentAlt><span className="text-blue-700 font-bold -mt-1 ">{survey.comments? survey.comments.length: 0}</span></button>
    </div>
    <div className="card-actions">
    <Link to={`/details/${survey._id}`}>
      <button className="btn bg-violet-700 text-white text-lg mt-8 ">Survey Details</button>
      </Link>
    </div>
  </div>
</div>
          </div>
        ))}
      </div>
        </div>
    );
};

export default Surveys;