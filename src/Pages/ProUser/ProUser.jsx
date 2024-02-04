import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import usePro from "../../hooks/usePro";
import useSurveyor from "../../hooks/useSurveyor";


const ProUser = () => {
  const[isAdmin] = useAdmin();
  const[isSurveyor] = useSurveyor();
  const[isPro] = usePro();
  const isDisabled = isAdmin || isSurveyor || isPro;
  // const bgColor = isDisabled ? 'bg-gray-400' : 'bg-purple-800';
  console.log(isPro);
    return (
        <div>
         
            <h3 className="text-4xl text-center font-serif text-green-500 font-bold mt-4">Become a  pro-user</h3>
            <div className="grid grid-cols-1 mt-14 md:grid-cols-2 gap-8 my-6 lg:ml-8">
            <div className="card  ml-6 w-[320px] min-h-[400px] md:w-[360px] lg:w-[420px] bg-gradient-to-r from-pink-300 to-blue-600 shadow-xl">
  <div className="card-body items-center text-center">
    <h2 className="card-title text-lime-300 text-xl">Pro user member</h2>
    <h2 className="card-title text-4xl mt-2">1 month</h2>
    <h3 className="text-4xl text-white font-bold mt-4">$100</h3>
    <h3 className="mt-2">Pro User for 1 month limited</h3>
    <div className="card-actions justify-end">
    {
        isDisabled ? (
          <div className=" btn-disabled cursor-not-allowed text-center  text-xl rounded-lg bg-slate-400 w-44 h-10 text-white mt-4  ">
           <Link to='/payment'>
      <button disabled className="mt-1">Payment Now</button>
      </Link>
            {/* <h3 className="text-base text-red-500 mt-6">job’s deadline is crossed </h3> */}
          </div>
        ) : (
          <Link to='/payment'>
          <div className="btn text-center  text-xl rounded-lg bg-purple-800 w-44 h-10 text-white mt-4">
            <button className="">Payment Now</button>
          </div>
          </Link>
        )
      }
    </div>
  </div>
</div>

<div className="card  ml-6 w-[320px] min-h-[400px] md:w-[360px] lg:w-[420px] bg-gradient-to-r from-pink-300 to-blue-600 shadow-xl">
  <div className="card-body items-center text-center">
    <h2 className="card-title text-lime-300 text-xl">Pro user member</h2>
    <h2 className="card-title text-4xl mt-2">6 month</h2>
    <h3 className="text-4xl text-white font-bold mt-4">$100</h3>
    <h3 className="mt-2">Pro User for 6 month limited</h3>
    <div className="card-actions justify-end">
      {
        isDisabled ? (
          <div className=" btn-disabled cursor-not-allowed text-center  text-xl rounded-lg bg-slate-400 w-44 h-10 text-white mt-4  ">
           <Link to='/payment'>
      <button disabled className="mt-1">Payment Now</button>
      </Link>
            {/* <h3 className="text-base text-red-500 mt-6">job’s deadline is crossed </h3> */}
          </div>
        ) : (
          <Link to='/payment'>
          <div className="btn text-center  text-xl rounded-lg bg-purple-800 w-44 h-10 text-white mt-4">
            <button className="">Payment Now</button>
          </div>
          </Link>
        )
      }
        {/* <Link to='/payment'>
      <button className={`btn text-white text-lg mt-8 ${bgColor}`}
        disabled={isDisabled} style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }} >Payment Now</button></Link> */}
    </div>
  </div>
</div>

            </div>
        </div>
    );
};

export default ProUser;