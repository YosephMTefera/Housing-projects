import React from 'react'
import {useNavigate} from 'react-router-dom'
import {AiOutlineMail} from 'react-icons/ai'
function Login() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100vh] bg-gray-100 flex justify-center items-center">
      <div className="w-[50%] min-h-[70%] bg-white rounded-[45px] shadow-xl flex gap-[10px]">
        <div className="w-[50%]  bg-[#0C73B8] rounded-tl-[45px] rounded-bl-[45px] ">
          <div className="w-[90%] h-[65%] mx-auto  flex flex-col items-center justify-around">
          <div className="relative  bg-white rounded-full mt-[20px]">
            <img
              src={require("../CAS/HousingDevelopmentLogo.png")}
              alt=""
              className="w-[150px] h-[150px] rounded-full object-cover"
            />
          </div>

            <div className="text-center text-white w-[80%]">
              <span className="text-[30px] font-bold">IT</span>
              <p className="text-[12px] my-[10px]">
                To stay connected login back to your account with your
                credentials.
              </p>
            </div>
           
          </div>
        </div>
        <div className="w-[70%] h-[100%] flex flex-col gap-[10px] justify-center items-center">
          
          <div className="relative  bg-white rounded-full mt-[80px]">
              <img
                src={require("../CAS/HousingAdmin.png")}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover"
              />
            </div>
      

          <div className="w-[80%] mt-[50px]  flex flex-col items-center gap-[10px]">
            <div className="w-[90%]  flex items-center justify-between gap-[10px]  bg-[#f0f0f0] p-[15px]  rounded-[5px] border border-[#FBB042]">
              <input
                type="email"
                placeholder="Username"
                className="bg-transparent text-[14px] text-gray-400 flex-auto outline-none"
                // onChange={(e) => setUsername(e.target.value)}
                required
              />
              <AiOutlineMail className="text-gray-600" />
            </div>
            <div className="w-[90%]  flex items-center justify-between gap-[10px]  bg-[#f0f0f0] p-[15px]  rounded-[5px]  border border-[#FBB042]">
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent text-[14px] text-gray-400 flex-auto outline-none"
                // onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* {!password ? (
                <AiOutlineLock className={"block text-gray-600"} />
              ) : null} */}
            </div>
          </div>
          <div className="w-[70%] flex justify-end">
            <span
              onClick={() => navigate("/forgotpassword")}
              className="text-[14px] cursor-pointer text-gray-500 hover:underline"
            >
              forgot your password?
            </span>
          </div>
          <div className="w-[70%]">
            <button
              type="submit"
              onClick={()=>navigate('/')}
              className="w-[100%] bg-[#FBB042] border border-[#FBB042] text-white p-[0.7rem] rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login