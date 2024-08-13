import React from "react";

function Banner() {
  // const scrollY = window.scrollY;
  return (
    <div className="w-[100%] h-[90vh] flex flex-col items-center">
      <div className="w-[50%] h-[100%] absolute top-[80px] left-0 right-0 z-[-1] flex items-center max-[1360px]:w-[100%]">
        <div className="w-[100%] h-[100%]">
          <img
            className="absolute w-[100vw] h-[95%] object-cover"
            src={require("../../CAS/hero-bg 2.png")}
            alt=""
          />
        </div>
        <div className="w-[100%] h-[95%]">
          <img
            className="h-[90%] object-cover"
            src={require("../../CAS/hero-bg 1.png")}
            alt=""
          />
        </div>
      </div>

      <div className={"w-[80%]   mx-auto flex flex-col items-center gap-[20px] max-[1360px]:w-[100%]  max-[1000px]:mt-[100px] max-[750px]:mt-[100px]"}>
        <span className="w-[100%] text-center text-[#0C73B8] text-[24px] font-bold uppercase ">
          Welcome to addis ababa housing development and adminstration bureau
        </span>
        
      </div>
     
    </div>
  );
}

export default Banner;
