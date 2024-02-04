

const Footer = () => {
    return (
        <div>
           <footer className="footer footer-center p-10 bg-blue-50 ">
  <aside>
  <img className="  w-24 md:w-28 lg:w-32 lg:ml-8 " src="https://i.ibb.co/qMNMJSM/survey-swift-high-resolution-logo-transparent.png" alt="" />
    <p className="font-bold ml-10">
      ACME Industries Ltd. <br/>Providing reliable tech since 1992
    </p> 
    <p className="ml-8">Copyright © 2023 - All right reserved</p>
  </aside> 
  <nav>
    <div className="grid grid-flow-col w-[150px] gap-4 ml-6">
    <a href="https://www.facebook.com/"><img src="https://i.ibb.co/n0vvR5N/download.png" alt="" /></a> 
      <a href="https://www.instagram.com/"><img src="https://i.ibb.co/L81GxxG/download-2.png" alt="" /></a> 
      <a href="https://www.twitter.com/"><img src="https://i.ibb.co/gW9hZS6/download-1.png" alt="" /></a>
    </div>
  </nav>
</footer>
        </div>
    );
};

export default Footer;