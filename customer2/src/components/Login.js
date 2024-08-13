import React, { useState } from "react";
import Banner from "./SubComponents/Banner";
import SignIn from './Auth/SignIn'


function Login() {

  const [signToggle,setSignToggle] = useState(true)
  return (
    <div className="flex flex-col">
      {/* <Navbar /> */}
      <div className="w-[100%] h-[100%] flex items-center max-[1360px]:flex-col">
        <div className="w-[50%] max-[1360px]:w-[70%] max-[900px]:w-[90%]">
          <Banner />
        </div>
         <SignIn signToggle={signToggle} setSignToggle={setSignToggle} />
      </div>
      <div className="w-[100%] h-[80px] flex justify-center items-center bg-white">
        <span className="text-[14px]">
          &copy; Copyright<b> AAHDAB.</b> All Right Reserved
        </span>
      </div>
    </div>
   
  );
}

export default Login;
