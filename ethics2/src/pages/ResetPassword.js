import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { translationAction } from "../components/REDUX/slices/translationSlice";
import apiRequest from "../utils/request";
import Loading from "../components/Loading";
import ServerError from "../components/ServerError";

function ResetPassword() {
  const { id, token } = useParams();
  // const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error("Password and confirm password don't match");
      }

      setLoading(true);

      await apiRequest
        .put(
          `/accusation_acceptor_user_api/reset_accusation_acceptor/${id}/${token}`,
          { password },
          {
            headers: {
              get_resaccus_api: process.env.REACT_APP_GET_RESACCUS_API,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          translationState?.lan === "En"
            ? toast.success(res.data.Message_en)
            : toast.success(res.data.Message_am);
          setTimeout(() => {
            window.location.href = "/login";
          }, 5000);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 500) {
            serverError(true);
          }
      
          if(error?.response?.status === 429){

            setRateLimitTimer(180);
            // toast.error("Too many attempts. Please try again later.")
          }
          translationState?.lan === "En"
            ? toast.error(error.response.data.Message_en)
            : toast.error(error.response.data.Message_am);
        });
    } catch (error) {
      setServerError(true);
    }
  };

  useEffect(() => {
    if (rateLimitTimer) {
      const timer = setInterval(() => {
        setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rateLimitTimer]);
  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] flex flex-col justify-center items-center h-[100vh] bg-gray-100">
      <ToastContainer theme="light" />
      {/* <div className="w-[100%] h-[60px] flex items-center z-[100] bg-white border">
        <div className="w-[80%] mx-auto flex justify-end items-center">
          <select
            onChange={(e) =>
              dispatch(translationAction?.setLan(e?.target?.value))
            }
            className="py-1 px-4 border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] outline-none max-lg2:text-[10px]"
          >
            <option value={"En"}>En</option>
            <option value={"Am"}>አማ</option>
          </select>
        </div>
      </div> */}
      {/* <div className=" w-[100%] h-[100%] flex between absolute top-0 left 0">
        <img
          className="w-[100%] h-[100%] absolute left-0 top-0 right-0"
          src={require("../CAS/hero-bg 2.png")}
          alt=""
        />
        <img
          src={require("../CAS/hero-bg 1.png")}
          alt=""
          className="w-[50%] h-[100%] absolute right-0 top-0"
        />
      </div> */}
      <div className="w-[30%] shadow-md rounded-[10px] bg-white z-[10] p-4 flex flex-col items-center gap-[30px] max-lg2:w-[50%] max-lg1:w-[70%] max-sm1:w-[90%]">
        <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
          <div className="w-[70px] h-[70px] flex items-center justify-center   bg-[#ffefbf] rounded-full">
            <FaKey className=" text-[34px] text-[#FBB042] " />
          </div>

          <span className="text-[20px] text-[#0C73B8]">Reset password?</span>
        </div>

        <div className="w-[80%] mx-auto flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e?.target?.value)}
              className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <input
              type="password"
              placeholder="Re-type password"
              onChange={(e) => setConfirmPassword(e?.target?.value)}
              className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
            />
          </div>
        </div>

        {loading ? (
          <Loading
            addtionalStyle={"flex justify-center items-center my-[20px]"}
          />
        ) : (
          rateLimitTimer ?     <p className="text-[12px] my-[10px] text-gray-500 text-center">Please wait 3 minutes before retrying.</p>:
          <div className="w-[80%] mx-auto">
            <button
              onClick={handleResetPassword}
              className="w-[100%] bg-[#FBB042] py-2 px-4 text-white rounded-[5px]"
            >
              Reset Password
            </button>
          </div>
        )}

        <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px]">
          <AiOutlineArrowLeft />
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
