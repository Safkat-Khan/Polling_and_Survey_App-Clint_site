import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div>
           <div className="hero min-h-[500px]" style={{backgroundImage: 'url(https://i.ibb.co/98C6Z4V/wepik-export-20231125040820ifpq.png)'}}>
  <div className="hero-overlay bg-opacity-70"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md lg:min-w-[700px] ">
      <h1 className="mb-5 text-6xl font-bold text-center text-purple-400">Welcome to our Survey Swift</h1>
      <p className="mb-5 text-orange-300"> Our platform provides an interactive way to create and conduct surveys, gather valuable insights,
        and engage with your audience.</p>
        <Link to="/about">
      <button className="btn bg-cyan-400 font-bold">Explore</button>
      </Link>
    </div>
  </div>
</div> 
        </div>
    );
};

export default Banner;