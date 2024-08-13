import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import ServerError from "../ServerError";
import { language } from "../../utils/part-1lan";
import Navbar from "../Navbar";

function ResetPassword() {
  const translationState = useSelector((state) => state.translation);
  const [password, setPassword] = useState("");
  const [reTypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();
  const [serverError, setServerError] = useState(false);

  const handleReset = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      if (password !== reTypePassword) {
        toast.error("Password and Re-Type Password did not match");
      }
      await apiRequest
        .put(
          `/customer_user_api/reset_customer_user/${id}/${token}`,
          {
            password: password,
          },
          {
            headers: {
              get_resetcustuser_api:
                process.env.REACT_APP_GET_RESETCUSTUSER_API,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            translationState?.lan === "En" &&
              toast.success(res?.data?.Message_en);
            translationState?.lan === "Am" &&
              toast.success(res?.data?.Message_am);

            setTimeout(() => {
              setLoading(false);
              window.location.href = `/login`;
            }, 6000);
          }
        })
        .catch((error) => {
          setLoading(false);

          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if (error?.response?.status === 429) {
            toast.error("Too many attempts. Please try again later.");
          }
          translationState.lan === "En" &&
            toast.error(error?.response?.data?.Message_en);
          translationState.lan === "Am" &&
            toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] flex justify-center items-center h-[100vh]">
      <Navbar />
      <div className=" w-[100%] h-[100%] flex between absolute top-0 left 0">
        <img
          className="w-[100%] h-[100%] absolute left-0 top-0 right-0"
          src={require("../../CAS/hero-bg 2.png")}
          alt=""
        />
        <img
          src={require("../../CAS/hero-bg 1.png")}
          alt=""
          className="w-[50%] h-[100%] absolute right-0 top-0"
        />
      </div>
      <div className="w-[30%] shadow-md rounded-[10px] bg-white z-[10] p-4 flex flex-col items-center gap-[30px]">
        <ToastContainer theme="light" />
        <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
          <div className="w-[70px] h-[70px] flex items-center justify-center   bg-[#ffefbf] rounded-full">
            <FaKey className=" text-[34px] text-[#FBB042] " />
          </div>

          <span className="text-[20px] text-[#0C73B8] font-bold">
            {translationState?.lan === "En" && language?.resetPassword[0]}
            {translationState?.lan === "Am" && language?.resetPassword[1]}
            {translationState?.lan === "Or" && language?.resetPassword[2]}
            {translationState?.lan === "Tg" && language?.resetPassword[3]}
            {translationState?.lan === "Sm" && language?.resetPassword[4]}
            {translationState?.lan === "Af" && language?.resetPassword[5]}?
          </span>
        </div>

        <div className="w-[80%] mx-auto flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            {translationState?.lan === "En" && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}

            {translationState?.lan === "Am" && (
              <input
                type="password"
                placeholder={language?.password[1]}
                onChange={(e) => setPassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}

            {translationState?.lan === "Or" && (
              <input
                type="password"
                placeholder={language?.password[2]}
                onChange={(e) => setPassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}
            {translationState?.lan === "Tg" && (
              <input
                type="password"
                placeholder={language?.password[3]}
                onChange={(e) => setPassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}

            {translationState?.lan === "Sm" && (
              <input
                type="password"
                placeholder={language?.password[4]}
                onChange={(e) => setPassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}

            {translationState?.lan === "Af" && (
              <input
                type="password"
                placeholder={language?.password[5]}
                onChange={(e) => setPassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <span className="text-[14px] font-bold text-[#0C73B8]">
              {translationState?.lan === "En" && language?.retypePassword[0]}
              {translationState?.lan === "Am" && language?.retypePassword[1]}
              {translationState?.lan === "Or" && language?.retypePassword[2]}
              {translationState?.lan === "Tg" && language?.retypePassword[3]}
              {translationState?.lan === "Sm" && language?.retypePassword[4]}
              {translationState?.lan === "Af" && language?.retypePassword[5]}
            </span>
            {translationState?.lan === "En" && (
              <input
                type="password"
                placeholder={language?.retypePassword[0]}
                onChange={(e) => setRetypePassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}

            {translationState?.lan === "Am" && (
              <input
                type="password"
                placeholder={language?.retypePassword[1]}
                onChange={(e) => setRetypePassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}

            {translationState?.lan === "Or" && (
              <input
                type="password"
                placeholder={language?.retypePassword[2]}
                onChange={(e) => setRetypePassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}
            {translationState?.lan === "Tg" && (
              <input
                type="password"
                placeholder={language?.retypePassword[3]}
                onChange={(e) => setRetypePassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}

            {translationState?.lan === "Sm" && (
              <input
                type="password"
                placeholder={language?.retypePassword[4]}
                onChange={(e) => setRetypePassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}

            {translationState?.lan === "Af" && (
              <input
                type="password"
                placeholder={language?.retypePassword[5]}
                onChange={(e) => setRetypePassword(e?.target?.value)}
                className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
              />
            )}
          </div>
        </div>
        <div className="w-[80%] mx-auto">
          <button
            disabled={loading}
            onClick={handleReset}
            className={
              loading
                ? "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500"
                : "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded hover:bg-transparent hover:text-[#FBB042] transition duration-500"
            }
          >
            {translationState?.lan === "En" && language?.resetPassword[0]}
            {translationState?.lan === "Am" && language?.resetPassword[1]}
            {translationState?.lan === "Or" && language?.resetPassword[2]}
            {translationState?.lan === "Tg" && language?.resetPassword[3]}
            {translationState?.lan === "Sm" && language?.resetPassword[4]}
            {translationState?.lan === "Af" && language?.resetPassword[5]}
          </button>
        </div>
        <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px]">
          <AiOutlineArrowLeft />
          <a href="/login">
            {translationState?.lan === "En" && language?.backToLogin[0]}
            {translationState?.lan === "Am" && language?.backToLogin[1]}
            {translationState?.lan === "Or" && language?.backToLogin[2]}
            {translationState?.lan === "Tg" && language?.backToLogin[3]}
            {translationState?.lan === "Sm" && language?.backToLogin[4]}
            {translationState?.lan === "Af" && language?.backToLogin[5]}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
