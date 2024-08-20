import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServerError from "../ServerError";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import { BiChevronLeft } from "react-icons/bi";
import {useSelector} from 'react-redux'

function AddArchival() {
  const navigate = useNavigate();
  const token = sessionStorage?.getItem("tID");
  const translationState = useSelector((state)=>state.translation);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const createArchival = async () => {
    try {
      const archivalData = new FormData();
      archivalData.append("firstname", firstname);
      archivalData.append("middlename", middlename);
      archivalData.append("lastname", lastname);
      archivalData.append("username", username);
      archivalData.append("phone", phoneNumber);
      archivalData.append("email", email);
      archivalData.append("password", password);
      archivalData.append("gender", gender);
      archivalData.append("picture", profileImg);

      setLoading(true);

      await apiRequest
        .post("/archival_user_api/create_archival_user", archivalData, {
          headers: {
            get_crearch_user_api: process.env.REACT_APP_GET_CREARCH_USER_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.status === 201) {
            translationState?.lan ==="En" ?   toast.success(res?.data?.Message_en):  toast.success(res?.data?.Message_am)
          ;
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
          translationState?.lan ==="En" ?    toast.error(error?.response?.data?.Message_en):   toast.error(error?.response?.data?.Message_am);
       
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] bg-white">
      <ToastContainer theme="light" />
      <div className="w-[90%] mt-[30px] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-start  text-[#FBB042]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
                Create new archival users
              </span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  First Name <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setFirstname(e?.target?.value)}
                    className="block w-full rounded-md px-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Middle Name <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setMiddlename(e?.target?.value)}
                    className="block w-full rounded-md px-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Last Name <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setLastName(e?.target?.value)}
                    className="block w-full rounded-md px-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Username <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setUsername(e?.target?.value)}
                    className="block w-full rounded-md px-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Phone Number <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setPhoneNumber(e?.target?.value)}
                    className="block w-full rounded-md  px-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Email <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    onChange={(e) => setEmail(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Password <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Gender <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setGender(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Select Gender</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col col-span-3 justify-between">
                <div className=" text-[14px] mb-2">
                  <span className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                    Profile Picture
                  </span>{" "}
                  <span className="text-red-700">*</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-[70%] border border-gray-300 cursor-pointer rounded-l-[5px] rounded-br-[5px] text-[14px] p-4 max-lg2:p-2 max-lg2:text-[12px]">
                    <span>
                      {profileImg ? profileImg?.name : "Profile Picture"}
                    </span>
                  </div>
                  <label className="bg-[#FBB042] p-4 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-white max-lg2:py-2 max-lg2:text-[12px]">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setProfileImg(e?.target?.files?.[0])}
                    />
                    <span>Browse</span>
                  </label>
                </div>
                {profileImg &&   <div className="w-[100px] h-[100px] my-[20px]">
                  <img
                    src={URL.createObjectURL(profileImg)}
                    alt="Current Pic"
                    className="w-[100%] h-[100%] rounded-full object-cover pointer-events-none"
                  />
                </div>}
              </div>
            </div>
         
          </div>
        </div>

        {loading ? (
          <Loading addtionalStyle={"my-[20px] flex justify-end items-center"} />
        ) : (
          <div className="my-6 py-5 flex items-center justify-end gap-x-6">
            <button
              onClick={() => navigate(-1)}
              className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={createArchival}
              className={
                loading
                  ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
                  : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
              }
            >
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddArchival;
