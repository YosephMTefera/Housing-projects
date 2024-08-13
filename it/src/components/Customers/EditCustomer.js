import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServerError from "../ServerError";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronLeft } from "react-icons/bi";
import Loading from "../Loading";

function EditCustomer() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = sessionStorage.getItem("tID");
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [subcity, setSubcity] = useState("");
    const [woreda, setWoreda] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [housePhoneNumber, setHousePhoneNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [currentProfile,setCurrentProfile] = useState(null);
    const [profileImg, setprofileImg] = useState(null);
    const [status, setStatus] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);
    useEffect(() => {
      try {
        setLoading(true);
        apiRequest
  
          .get(`/customer_user_api/get_customer_user/${id}`, {
            headers: {
              get_cuserlist_api: process.env.REACT_APP_GET_CUSERLIST_API,
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setLoading(false);
            toast.success(res?.data?.Message_en)
            setUser(res.data);
            setFirstname(res?.data?.firstname);
            setMiddlename(res?.data?.middlename);
            setLastname(res?.data?.lastname);
            setEmail(res?.data?.email);
            setSubcity(res?.data?.subcity);
            setWoreda(res?.data?.woreda);
            setHouseNumber(res?.data?.house_number);
            setPhone(res?.data?.phone);
            setHousePhoneNumber(res?.data?.house_phone_number);
            setGender(res?.data?.gender);
            setCurrentProfile(res?.data?.picture);
            setStatus(res?.data?.status)

          })
          .catch((error) => {
            setLoading(false);
            if (error?.response?.status === 500) {
              setServerError(true);
            }
     toast.error(error?.response?.data?.Message_en)
          });
      } catch (error) {
        setLoading(false);
        setServerError(true);
      }
    }, [id, token]);
  
    
  
  
    const editCustomer = async () => {
        try {
      
      
            const updateUserData = new FormData();
      
            updateUserData.append("firstname", firstname);
            updateUserData.append("middlename", middlename);
            updateUserData.append("lastname", lastname);
            updateUserData.append("email", email);
            updateUserData.append("subcity", subcity);
            updateUserData.append("woreda", woreda);
            updateUserData.append("house_number", houseNumber);
            updateUserData.append("phone", phone);
            updateUserData.append("house_phone_number", housePhoneNumber);
            updateUserData.append("gender", gender);
            updateUserData?.append("status",status);
            updateUserData.append("picture", profileImg);
      
            setLoading(true);
            await apiRequest
              .put(`/customer_user_api/update_customer_user/${id}`, updateUserData, {
                headers: {
                    get_updcususer_api: process.env.REACT_APP_GET_UPDCUSUSER_API,
                    Authorization:`Bearer ${token}`
                },
              })
              .then(() => {
                setLoading(false);
                window.location.href = "/customers";
              })
              .catch((error) => {
                setLoading(false);
              
                if (error?.response?.status === 500) {
                  setServerError(true);
                }
                

                  toast.error(error?.response?.data?.Message_en);

              });
          } catch (error) {
            setServerError(true);
          }
    };
  
    if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] mx-auto mt-[30px] h-[82%] relative bg-white">
      <ToastContainer theme="light" />
      <div className="w-[90%] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-start gap-[10px] text-[#FBB042]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold max-lg2:text-[16px] capitalize">
                {user?.firstname} {user?.middlename}{" "}
                {user?.lastname}
              </span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                  value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  
                    
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Middle Name
                </label>
                <div className="mt-2">
                  <input
                  value={middlename}
                    onChange={(e) => setMiddlename(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  
                    
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                  value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  
                    
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                 Email
                </label>
                <div className="mt-2">
                  <input
                  value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  
                    
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                 Sub-city
                </label>
                <div className="mt-2">
                  <input
                  value={subcity}
                    onChange={(e) => setSubcity(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  
                    
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                 Woreda
                </label>
                <div className="mt-2">
                  <input
                  value={woreda}
                    onChange={(e) => setWoreda(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  
                    
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                 House Number
                </label>
                <div className="mt-2">
                  <input
                   value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  
                    
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
               House phone number
                </label>
                <div className="mt-2">
                  <input
                  value={housePhoneNumber}
                    onChange={(e) => setHousePhoneNumber(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  
                    
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
               Phone
                </label>
                <div className="mt-2">
                  <input
                  value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  
                    
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
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}></option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col col-span-3 justify-between">
                <div className="text-[14px] mb-2">
                  <span className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                    Profile Picture
                  </span>{" "}
                  <span className="text-red-700">*</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-[70%] border border-gray-300 cursor-pointer rounded-l-[5px]  text-[14px] p-4 max-lg2:text-[12px] max-lg2:p-2">
                    <span>
                      {profileImg ? profileImg?.name : "Upload Profile Picture"}
                    </span>
                  </div>
                  <label className="bg-[#FBB042] p-4 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-white max-lg2:p-2">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setprofileImg(e?.target?.files?.[0])}
                    />
                    <span className="max-lg2:text-[12px]">Browse</span>
                  </label>
                </div>
              </div>
             
            <div className="w-[50%] col-span-1  flex justify-start items-center gap-[10px]">
              {currentProfile && typeof currentProfile === "string" && (
                <div className="mx-auto  my-[30px] flex flex-col gap-4">
                  <span className="text-[#FBB042] capitalize text-[18px] font-bold max-lg2:text-[14px]">
                    Current Picture
                  </span>
                  <div className="w-[200px] h-[200px]">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL2}/CustomerImages/${currentProfile}`}
                      alt="Current Pic"
                      className="w-[200px] h-[200px] rounded-full object-cover pointer-events-none"
                    />
                  </div>
                </div>
              )}
               <div className="max-sm1:w-[100%] flex flex-col items-center gap-[20px]">
                {profileImg &&       <span className="text-[#FBB042] capitalize text-[18px] font-bold max-lg2:text-[14px]">
                    New Picture
                  </span>}
         
            {profileImg && (
              <img
                                    className="w-[200px] h-[200px] rounded-full object-cover pointer-events-none"
                src={URL.createObjectURL(profileImg)}
                type="application/pdf"
              alt=""
              />
            )}
          </div>
            </div>
           
              
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Status
                </label>
                <div className="mt-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}></option>
                    <option value={"active"}>active</option>
                    <option value={"inactive"}>inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

            {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"} />: <div className="w-[90%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={editCustomer}
            className={
              loading
                ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
                : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
            }
          >
            Update
          </button>
        </div>}
       
      </div>
    </div>
  )
}

export default EditCustomer