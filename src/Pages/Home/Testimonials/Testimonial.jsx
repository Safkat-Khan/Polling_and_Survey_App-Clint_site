/* eslint-disable react/no-unescaped-entities */
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ImQuotesLeft,ImQuotesRight } from "react-icons/im";
const Testimonial = () => {
    return (
        <div className=" bg-pink-50">
        <div className="pt-10">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-semibold w-full text-center text-2xl md:text-3xl lg:text-5xl">Client <span className="text-[#db332a]">Testimonials</span></h2>
                    <p className="text-[8px] md:text-sm flex mt-3 text-center">Discover What Our Clients Say: Real Stories, Real Experiences</p>
                </div>
                </div>
        <div className="  ">
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper lg:w-[500px] h-[500px] bg-pink-100"
      >
        <SwiperSlide>
     
     <div className="hero min-h-[600px] rounded-lg" >
  
  <div className="hero-content text-center text-neutral-content">
   
    <div className="max-w-md">
    
    <h3 className="mb-5 w-[300px] text-black text-xs lg:text-xl lg:w-[400px]"><ImQuotesLeft className='text-slate-300' />Survey SWift is a godsend! Surveys are easy to make. It's seamless for respondents, and reports are easy to generate. Thank you Survey Swift! <ImQuotesRight className='ml-48  text-slate-300 lg:ml-64' />
</h3>

    <img className="ml-28 w-[75px] md:w-[100px] h-[75px] mb-2 md:h-[100px] object-cover rounded-btn lg:ml-36" src="https://i.ibb.co/NmQpMC3/wepik-export-20231109102749h-Uhr.png" alt="" />
      <h2 className="mb-2 text-base font-bold text-blue-300"> Gregory Brock
</h2>
      <h3  className="mb-5 text-xs font-bold text-black">EMERITUS LECTURER, UNIVERSITY OF KENTUCKY</h3>
      
     
    </div>
  </div>
</div>
        
     </SwiperSlide>
      <SwiperSlide>
      <div className="hero min-h-[600px]" >
  
  <div className="hero-content text-center text-neutral-content">
   
    <div className="max-w-md">
    <p className="mb-5 w-[300px] text-black text-xs lg:text-xl lg:w-[400px]"><ImQuotesLeft className='text-slate-300' />Survey Swift had great functions that made it easy to organize my information and conduct statistical analysis smoothly and efficiently. <ImQuotesRight className='ml-48  text-slate-300 lg:ml-60' /></p>
    <img className="ml-28 w-[75px] md:w-[100px] h-[75px] mb-2 md:h-[100px] object-cover rounded-btn lg:ml-36" src="https://i.ibb.co/0n6HfWq/wepik-export-20231109102824kuu-C.png" alt="" />
      <h2 className="mb-2 text-base font-bold text-blue-300">David Johnson</h2>
      <h3  className="mb-5 text-xs font-bold text-black">FORMER UNDERGRADUATE - NYU
</h3>
      
     
    </div>
  </div>
</div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="hero min-h-[600px]" >
  
  <div className="hero-content text-center text-neutral-content">

    <div className="max-w-md">
    <p className="mb-5 w-[300px] text-black text-xs lg:text-xl lg:w-[400px]"><ImQuotesLeft className='text-slate-300' />We are very pleased with the Survey product from Survey Swift. Simple to use with excellent support.<ImQuotesRight className='ml-48  text-slate-300 lg:ml-72' /></p>
    <img className="ml-28 w-[75px] md:w-[100px] h-[75px] mb-2 md:h-[100px] object-cover rounded-btn lg:ml-36" src="https://i.ibb.co/sF3x7dX/wepik-export-20231109102936x-Mh8.jpg" alt="" />
      <h2 className="mb-2 text-base font-bold text-blue-300">Jane Smith</h2>
      <h3  className="mb-5 text-xs font-bold text-black">CO-FOUNDER - MARKET DOJO
</h3>
      
    
    </div>
  </div>
</div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="hero min-h-[600px]" >
  
  <div className="hero-content text-center text-neutral-content">
    
    <div className="max-w-md">
    <p className="mb-5 w-[300px] text-black text-xs lg:text-xl lg:w-[400px]"><ImQuotesLeft className='text-slate-300' />I'm impressed with the quality of survey and their attention to detail. Highly recommended! 10/10 <ImQuotesRight className='ml-48  text-slate-300 lg:ml-80 ' /></p>
    <img className="ml-28 w-[75px] md:w-[100px] h-[75px] mb-2 md:h-[100px] object-cover rounded-btn lg:ml-36" src="https://i.ibb.co/j3x4d3R/wepik-export-20231109103145-I7-Pj.png" alt="" />
      <h2 className="mb-2 text-base font-bold text-blue-300">Jarin Smith</h2>
      <h3  className="mb-5 text-xs font-bold text-black">Marketing Manager</h3>
      
     
    </div>
  </div>
</div>
      </SwiperSlide>
      </Swiper>
        </div>
        </div>
    );
};

export default Testimonial;