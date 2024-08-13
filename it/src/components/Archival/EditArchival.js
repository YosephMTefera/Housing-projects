import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServerError from "../ServerError";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronLeft } from "react-icons/bi";
import {useSelector} from 'react-redux'

function EditArchival() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state)=>state.translation)
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [updatedProfileImg,setUpdatedProfileImg] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    apiRequest
      .get(`/archival_user_api/get_archival_user/${id}`, {
        headers: {
          get_archuser_api: process.env.REACT_APP_GET_ARCHUSER_API,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setServerError(false);
          setFirstname(res?.data?.firstname);
          setMiddlename(res?.data?.middlename);
          setLastName(res?.data?.lastname);
          setUsername(res?.data?.username);
          setPhoneNumber(res?.data?.phone);
          setEmail(res?.data?.email);
          setGender(res?.data?.gender);
          setStatus(res?.data?.status);
          setProfileImg(res?.data?.picture);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setServerError(true);
        } else {
        
          translationState?.lan ==="En" ?  toast.error(error?.response?.data?.Message_en):   toast.error(error?.response?.data?.Message_am);
        }
      });

    // eslint-disable-next-line
  }, [id]);

  const editArchivalUser = async () => {
    try {
      const archivalData = new FormData();
      archivalData.append("firstname", firstname);
      archivalData.append("middlename", middlename);
      archivalData.append("lastname", lastname);
      archivalData.append("username", username);
      archivalData.append("phone", phoneNumber);
      archivalData.append("email", email);
      archivalData.append("gender", gender);
      archivalData.append("status", status);
      archivalData.append("picture", updatedProfileImg);

      setLoading(true);
      await apiRequest
        .put(`/archival_user_api/update_archival_user/${id}`, archivalData, {
          headers: {
            get_updarch_api: process.env.REACT_APP_GET_UPDARCH_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.status === 200) {
            translationState?.lan === "En" ? toast.success(res?.data?.Message_en):toast.success(res?.data?.Message_am);
            setTimeout(() => {
              setLoading(false);
              window.location.href = "/archivalusers";
            }, 6000);
          }
        })
        .catch((error) => {
          setLoading(false);

          if (error?.response?.status === 500) {
            setServerError(true);
          } 
          translationState?.lan ==="En" ? toast.error(error?.response?.data?.Message_en):   toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%]    bg-white">
      <ToastContainer theme="light" />
      <div className="w-[90%] mt-[50px] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-start text-[#FBB042]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
                Edit {firstname} {middlename} {lastname}
              </span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-lg2:w-[100%]">
              <div className="col-span-3">
                <label
               
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:py-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
              
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Middle Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={middlename}
                    onChange={(e) => setMiddlename(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:py-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastName(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:py-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
              <div className="col-span-3 max-[670px]:sm:col-span-6">
                <label
                
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:py-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e?.target?.value)}
                    className="block w-full rounded-md  p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:py-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                 
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:py-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:py-2 max-lg2:text-[12px]"
                  >
                    <option value={""}>Select Gender</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                </div>
              </div>

              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Status
                </label>
                <div className="mt-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:py-2 max-lg2:text-[12px]"
                  >
                    <option value={""}>Select user status</option>
                    <option value={"active"}>active</option>
                    <option value={"inactive"}>inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col col-span-3  justify-between">
                <div className=" text-[#0C73B8] text-[15px] font-semibold my-[10px] max-lg2:text-[12px]">
                  <span>Profile Picture</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-[80%] border border-gray-300 cursor-pointer rounded-l-[5px] rounded-br-[5px] text-[14px] p-4 max-lg2:text-[12px] max-lg2:py-2">
                    {profileImg && typeof profileImg === "object"
                      ? profileImg?.name
                      : "Update Profile Picture"}
                  </div>
                  <label className="bg-[#FBB042] p-4 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-white max-lg2:py-2 max-lg2:text-[12px]">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setUpdatedProfileImg(e?.target?.files?.[0])}
                    />
                    <span>Browse</span>
                  </label>
                </div>
              </div>
            </div>
           <div className="w-[40%] flex items-center gap-[20px]">
           {profileImg && typeof profileImg === "string" && (
              <div className="mx-auto my-[30px] flex flex-col gap-4">
                <span className="text-[#FBB042] capitalize text-[18px] font-bold max-lg2:text-[14px]">
                  Current Picture
                </span>
                <div className="w-[100px] h-[100px]">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/ArchivalUserImages/${profileImg}`}
                    alt="Current Pic"
                    className="w-[100%] h-[100%] rounded-full object-cover pointer-events-none"
                  />
                </div>
              </div>
            )}
             {updatedProfileImg && (
              <div className="mx-auto my-[30px] flex flex-col gap-4">
                <span className="text-[#FBB042] capitalize text-[18px] font-bold max-lg2:text-[14px]">
                  New Picture
                </span>
                <div className="w-[100px] h-[100px]">
                  <img
                    src={URL.createObjectURL(updatedProfileImg)}
                    alt="Current Pic"
                    className="w-[100%] h-[100%] rounded-full object-cover pointer-events-none"
                  />
                </div>
              </div>
            )}
           </div>
            
          </div>
        </div>

        <div className="my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-[14px] leading-6 text-gray-900 max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={editArchivalUser}
            className={
              loading
                ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
                : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
            }
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditArchival;
