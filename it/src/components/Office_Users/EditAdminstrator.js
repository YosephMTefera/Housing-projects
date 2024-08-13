import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../ServerError";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronLeft } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";
import { fetchAllDirectorate } from "../../REDUX/slices/allDirectorateSlice";

import Loading from "../Loading";

function EditAdminstrator() {
  const { id } = useParams();
  const token = sessionStorage?.getItem("tID");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state?.translation);
  const divisionState = useSelector((state) => state?.allDivisions);
  const officeUsersState = useSelector((state) => state?.allOfficers);
  const directorateState = useSelector((state) => state?.allDirectorates);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [division, setDivision] = useState("");
  const [directorate, setDirectorate] = useState("");
  const [position, setPosition] = useState("");
  const [letterForward, setLetterForward] = useState("");
  const [gender, setGender] = useState("");
  const [titer, setTiter] = useState(null);
  const [newTiter, setNewTiter] = useState(null);
  const [signature, setSigniture] = useState(null);
  const [newSignature, setNewSigniture] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [currentProfile,setCurrentProfile] = useState(null)
  const [status, setStatus] = useState("");
  const [newParaph, setNewParaph] = useState([]);
  const [paraph, setParaph] = useState([]);
  const [loading, setLoading] = useState(false);
  const [titerLoading,setTiterLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    dispatch(fetchAllDivision());
    dispatch(fetchAllDirectorate());
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOfficeuser = async () => {
    await apiRequest
      .get(`/office_user_api/get_office_user/${id}`, {
        headers: {
          get_user_api: process.env.REACT_APP_GET_USER_API,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
        
          setServerError(false);
          setFirstname(res?.data?.firstname);
          setMiddlename(res?.data?.middlename);
          setLastname(res?.data?.lastname);
          setUsername(res?.data?.username);
          setPhone(res?.data?.phone);
          setEmail(res?.data?.email);
          setGender(res?.data?.gender);
          setLevel(res?.data?.level);
          setDivision(res?.data?.division?._id);
          setPosition(res?.data?.position);
          setLetterForward(res?.data?.letter_forward);
          setTiter(res?.data?.titer);
          setSigniture(res?.data?.signature);
          setParaph(res?.data?.paraph);
          setCurrentProfile(res?.data?.picture);
          setStatus(res?.data?.status);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setServerError(true);
        }
        translationState?.lan === "En"
          ? toast.error(error?.response?.data?.Message_en)
          : toast.error(error?.response?.data?.Message_am);
      });
  };

  useEffect(() => {
    getOfficeuser();
   
    // eslint-disable-next-line
  }, []);


  const findAdministrator = officeUsersState?.officeUsers?.find(
    (admin) => admin?._id === id
  );

  const filterMainExecutive = officeUsersState?.officeUsers?.filter((ou)=>ou?.level ==="MainExecutive");
  const activeMainExecutive = filterMainExecutive?.filter((ou)=>ou?.status ==="active");

  const filterDirectorate = directorateState?.directorates?.filter(
    (directorate) => directorate?.division?._id === division
  );

  const upadateAdministrator = async () => {
    try {
      const administratorData = new FormData();
      administratorData.append("firstname", firstname);
      administratorData.append("middlename", middlename);
      administratorData.append("lastname", lastname);
      administratorData.append("username", username);
      administratorData.append("email", email);
      administratorData.append("phone", phone);
      administratorData.append("gender", gender);
      administratorData.append("position", position);
      administratorData.append("letter_forward", letterForward);
      administratorData.append("level", level);
      
      (level !=="MainExecutive" || findAdministrator?.level !== "MainExecutive") &&   administratorData.append("division", division);
      (level !=="MainExecutive" || findAdministrator?.level !== "MainExecutive") &&    administratorData.append("directorate", directorate);
    
   
      administratorData.append("picture", profileImg);
      administratorData.append("titer", newTiter);
      administratorData.append("signature", newSignature);
      administratorData.append("paraph", JSON.stringify(newParaph));
      administratorData.append("status", status);

      setLoading(true);

      await apiRequest
        .put(`/office_user_api/update_office_user/${id}`, administratorData, {
          headers: {
            "Content-Type": "multipart/form-data",
            get_user_update_api: process.env.REACT_APP_GET_USER_UPDATE_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.status === 200) {
            toast.success(res?.data?.Message_en);
            setTimeout(() => {
              setLoading(false);
              window.location.href = "/adminstrators";
            }, 6000);
          }
        })
        .catch((error) => {
          setLoading(false);

          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  const handleParaphRemove = async (itemId) => {
    try {
      setLoading(true);
      await apiRequest
        .put(
          `/office_user_api/remove_office_user_paraph/${id}/${itemId}`,
          {},
          {
            headers: {
              get_user_removepar_api:
                process.env.REACT_APP_GET_USER_REMOVEPAR_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setLoading(false);
            getOfficeuser();
       
          }
        })
        .catch((error) => {
          setLoading(false);

          if (error?.response?.status === 500) {
            setServerError(true);
          }
          toast.error(error?.response?.data?.Message_en);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  const handleDettachTitter = async ()=>{
    try {
      setTiterLoading(true)
      await apiRequest
      .put(
        `/office_user_api/detach_titer_office_user/${id}`,
        {
          detachTiterFile:"detachUserTiter"
        },
        {
          headers: {
            get_user_update_api:
              process.env.REACT_APP_GET_USER_UPDATE_API,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          setTiterLoading(false);
       
          getOfficeuser();
          
        }
      })
      .catch((error) => {
        setTiterLoading(false);

        if (error?.response?.status === 500) {
          setServerError(true);
        }
        toast.error(error?.response?.data?.Message_en);
      });
      
    } catch (error) {
      setTiterLoading(false);
      setServerError(true)
    }
  }

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] bg-white">
      <ToastContainer theme="light" />
      <div className="w-[90%] mt-[30px] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-start gap-[10px] text-[#FBB042]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
                Edit {findAdministrator?.firstname}{" "}
                {findAdministrator?.middlename} {findAdministrator?.lastname}
              </span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  First Name <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3 max-[670px]:sm:col-span-6">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Middle Name <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={middlename}
                    onChange={(e) => setMiddlename(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3 ">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Last Name <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3 ">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Username <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Phone Number <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e?.target?.value)}
                    className="block w-full rounded-md  p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Email <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Level <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    value={level}
                    onChange={(e) => setLevel(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  >
                    <option value={""}>Select Level</option>
                   {activeMainExecutive?.length ===0 && <option value={"MainExecutive"}>Main Director</option>} 
                    <option value={"DivisionManagers"}>Division Manager</option>
                    <option value={"Directors"}>Directors</option>
                    <option value={"TeamLeaders"}>Team Leaders</option>
                    <option value={"Professionals"}>Professionals</option>
                  </select>
                </div>
              </div>

              {level !=="MainExecutive" &&   <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Division <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    value={division}
                    onChange={(e) => setDivision(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  >
                    <option value={""}>Select Division</option>
                    {divisionState?.divisions?.map((division, index) => {
                      return (
                        <option key={index} value={division?._id}>
                          {division?.name_am}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>}

              {level !=="MainExecutive" &&    <div className="col-span-3">
                <label
                
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setDirectorate(e?.target?.value)}
                    value={directorate}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Select Directorate</option>
                    {filterDirectorate?.map((directorate1, index) => {
                      return (
                        <option key={index} value={directorate1?._id}>
                          {directorate1?.name_am}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>}
            

           

              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Status <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  >
                    <option value={""}>Select user status</option>
                    <option value={"active"}>active</option>
                    <option value={"inactive"}>inactive</option>
                  </select>
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Type of Position <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e?.target?.value)}
                    className="block w-full rounded-md p-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]">
                  Gender <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6  max-lg2:text-[12px]  max-lg2:py-2"
                  >
                    <option value={""}>Select Gender</option>
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
                      onChange={(e) => setProfileImg(e?.target?.files?.[0])}
                    />
                    <span className="max-lg2:text-[12px]">Browse</span>
                  </label>
                </div>
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
                      src={`${process.env.REACT_APP_BACKEND_URL2}/OfficeUserImages/${currentProfile}`}
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


            <div className="w-[90%] my-[20px] mx-auto flex flex-col col-span-3 justify-between">
              <div className="text-[14px] mb-2">
                <span className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Titer
                </span>{" "}
                <span className="text-red-700">*</span>
               {titerLoading ? <Loading addtionalStyle={"flex items-center"}/>:titer && typeof titer === "string" &&<button onClick={handleDettachTitter} className="bg-[#0C73B8] py-1 px-4 mx-[20px] rounded-[20px] text-[14px] text-white font-bold">dettach</button>} 
              </div>
              <div className="flex items-center">
                <div className="min-w-[70%] border border-gray-300 cursor-pointer rounded-l-[5px]  text-[14px] p-4 max-lg2:text-[12px] max-lg2:p-2">
                  <span>{titer ? titer : "Upload Titer"}</span>
                </div>
                <label className="bg-[#FBB042] p-4 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-white max-lg2:p-2">
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setNewTiter(e?.target?.files?.[0])}
                  />
                  <span className="max-lg2:text-[12px]">Browse</span>
                </label>
              </div>
            </div>
            <div className="w-[90%] mx-auto my-[20px] max-sm1:w-[100%]">
              {titer && typeof titer === "string" && (
                <>
                  <span className="w-[95%] mx-auto font-bold text-[#0C73B8]">Current Titer</span>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserTiters/${titer}`}
                        className="object-contain w-[50%] my-[20px]"
                    alt=""
                  />
                </>
              )}
            </div>
            <div className="w-[90%]  mx-auto  max-sm1:w-[100%]">
              {newTiter && (
                <>
                  <span className="w-[95%] mx-auto font-bold text-[#0C73B8]">
                    New Titer
                  </span>
                  <img
                    src={URL.createObjectURL(newTiter)}
                    // type="application/pdf"
                    className="object-contain w-[50%] my-[20px]"
                    alt=""
                  />
                </>
              )}
            </div>
            <div className="w-[90%] my-[20px] mx-auto flex flex-col col-span-3 justify-between">
              <div className="text-[14px] mb-2">
                <span className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Signiture
                </span>{" "}
                <span className="text-red-700">*</span>
              </div>
              <div className="flex items-center">
                <div className="min-w-[70%] border border-gray-300 cursor-pointer rounded-l-[5px]  text-[14px] p-4 max-lg2:text-[12px] max-lg2:p-2">
                  <span>{signature ? signature : "Upload Signiture"}</span>
                </div>
                <label className="bg-[#FBB042] p-4 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-white max-lg2:p-2">
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setNewSigniture(e?.target?.files?.[0])}
                  />
                  <span className="max-lg2:text-[12px]">Browse</span>
                </label>
              </div>
            </div>
            <div className="w-[90%] mx-auto max-sm1:w-[100%]">
              {signature && typeof signature === "string" && (
                <>
                  <span className="w-[95%] mx-auto font-bold text-[#0C73B8]">
                    Current Signature
                  </span>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserSignatures/${signature}`}
                    className="object-contain w-[30%] my-[20px]"
                 
                    alt=""
                  />
                </>
              )}
            </div>
            <div className="w-[100%] mx-auto max-sm1:w-[100%]">
              {newSignature && (
                <>
                  <span className="w-[95%] mx-auto font-bold text-[#0C73B8]">
                    New Signature
                  </span>
                  <img
                    src={URL.createObjectURL(newSignature)}
                    className="object-contain w-[30%] my-[20px]"
                   
                    alt=""
                  />
                </>
              )}
            </div>
          </div>
        </div>
       

        <div className="w-[90%] mx-auto flex my-[30px] flex-col gap-[20px]">
          <span className="font-bold text-[#0C73B8] max-lg2:text-[16px]">
            Paraph
          </span>

          <div className="col-span-3">
            <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
              Add new paraph <span className="text-red-700">*</span>{" "}
             
            </label>
            <div className="mt-2">
              <input
                type="text"
                onChange={(e) => setNewParaph([e?.target?.value])}
                className="block w-full rounded-md p-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
              />
            </div>
          </div>

          {paraph?.length > 0 && (
            <div className="grid grid-cols-1 gap-[30px]">
              <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                Paraphs <span className="text-red-700">*</span>
              </label>
              {paraph?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[50%] flex items-center gap-4 p-4 bg-[#f6f6f6] rounded-md justify-between"
                  >
                    <span className="max-lg2:text-[12px]">{item?.title}</span>
                    <FaTrash
                      className="text-[#0C73B8] bg-transparent text-2xl cursor-pointer max-lg2:text-[14px]"
                      onClick={() => handleParaphRemove(item?._id)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {loading ? (
          <Loading addtionalStyle={"flex justify-end items-center"} />
        ) : (
          <div className="w-[90%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
            <button
              onClick={() => navigate(-1)}
              className="leading-6 text-gray-900 max-lg2:text-[12px]"
            >
              Cancel
            </button>
            <button
              onClick={upadateAdministrator}
              disabled={loading}
              className={
                loading
                  ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
                  : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
              }
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditAdminstrator;
