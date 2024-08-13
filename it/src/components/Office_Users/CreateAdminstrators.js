import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../ServerError";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronLeft } from "react-icons/bi";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import { fetchAllDirectorate } from "../../REDUX/slices/allDirectorateSlice";
import { fetchAllTeams } from "../../REDUX/slices/allTeamSlice";
import Loading from "../Loading";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";

function CreateAdminstrators() {
  const token = sessionStorage?.getItem("tID");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state?.translation);
  const divisionState = useSelector((state) => state?.allDivisions);
  const directorateState = useSelector((state)=>state?.allDirectorates)
  const teamState = useSelector((state)=>state?.allTeams);
  const officeUsersState = useSelector((state) => state?.allOfficers);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [division, setDivision] = useState("");
  const [directorate,setDirectorate] = useState("");
  const [team,setTeam] = useState("")
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [titer,setTiter] = useState(null);
  const [signiture,setSignture]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");


  useEffect(() => {
    dispatch(fetchAllOfficeUsers())
    dispatch(fetchAllDivision());
    dispatch(fetchAllDirectorate());
    dispatch(fetchAllTeams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterMainExecutive = officeUsersState?.officeUsers?.filter((ou)=>ou?.level ==="MainExecutive");
  const activeMainExecutive = filterMainExecutive?.filter((ou)=>ou?.status ==="active");
  const filterDirectorate = directorateState?.directorates?.filter((directorate1)=>directorate1?.division?._id===division);
  const filterTeam = teamState?.teams?.filter((team)=>team?.directorate?._id ===directorate);

  const createAdministrator = async () => {
    try {
      const administratorData = new FormData();
      administratorData.append("firstname", firstname);
      administratorData.append("middlename", middlename);
      administratorData.append("lastname", lastname);
      administratorData.append("username", username);
      administratorData.append("email", email);
      administratorData.append("password", password);
      administratorData.append("phone", phone);
      administratorData.append("gender", gender);
      administratorData.append("position", position);
      administratorData.append("level", level);
     level !== "MainExecutive" && administratorData.append("division", division) 
      administratorData.append("division", division);
      administratorData.append("directorate",directorate);
      administratorData.append('teamleader',team)
      administratorData.append("picture", profileImg);
      administratorData.append("titer",titer);
      administratorData.append("signature",signiture);

      setLoading(true);
      await apiRequest
        .post("/office_user_api/create_office_user", administratorData, {
          headers: {
            "Content-Type": "multipart/form-data",
            get_createof_user_api: process.env.REACT_APP_GET_CREATEOF_USER_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
        
            translationState?.lan==="En" ? toast.success(res?.data?.Message_en): toast.success(res?.data?.Message_am);
            setTimeout(() => {
              setLoading(false);
              window.location.href = "/adminstrators";
            }, 6000);
          
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
  };



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
                className="text-[40px] cursor-pointer"
              />
              <span className="text-[20px] font-bold max-lg2:text-[16px]">
                Create New Adminstrator
              </span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-lg2:mt-5">
              <div className="col-span-3">
                <label
                
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  First Name <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setFirstname(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
              
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Middle Name <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setMiddlename(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
               
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Last Name <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setLastname(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                
                  className="text-[#0C73B8] text-[15px] font-semibold  max-lg2:text-[12px]"
                >
                  Username <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setUsername(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Phone Number <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setPhone(e?.target?.value)}
                    className="block w-full rounded-md  p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Email <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    onChange={(e) => setEmail(e?.target?.value)}
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
               
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
                <label
              
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Level <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setLevel(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Select Level</option>
                  {activeMainExecutive?.length ===0 &&  <option value={"MainExecutive"}>Main Director</option>} 
                    <option value={"DivisionManagers"}>Division Manager</option>
                    <option value={"Directors"}>Directors</option>
                    <option value={"TeamLeaders"}>Team Leaders</option>
                    <option value={"Professionals"}>Professionals</option>
                  </select>
                </div>
              </div>
              {level !=="MainExecutive" &&   <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setDivision(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
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
            

              {(level ==="TeamLeaders" || level ==="Professionals") && <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setDirectorate(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Select Directorate</option>
                    {filterDirectorate?.map((directorate, index) => {
                      return (
                        <option key={index} value={directorate?._id}>
                          {directorate?.name_am}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>}

              

              {(level ==="Professionals") &&   <div className="col-span-3">
                <label
                  htmlFor="street-address"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setTeam(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Select Team</option>
                    {filterTeam?.map((team, index) => {
                      return (
                        <option key={index} value={team?._id}>
                          {team?.name_am}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>}
            
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Type of Position <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setPosition(e?.target?.value)}
                    className="block w-full rounded-md p-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
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
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
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
              <div className="w-[50%] max-sm1:w-[100%]">
            {profileImg && (
              <img
                src={URL.createObjectURL(profileImg)}
                type="application/pdf"
              alt=""
              />
            )}
          </div>
              {/* titter */}

              <div className="flex flex-col col-span-3 justify-between">
                <div className="text-[14px] mb-2">
                  <span className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Titer
                  </span>{" "}
                 
                </div>
                <div className="flex items-center">
                  <div className="min-w-[70%] border border-gray-300 cursor-pointer rounded-l-[5px]  text-[14px] p-4 max-lg2:text-[12px] max-lg2:p-2">
                    <span>
                      {titer ? titer?.name : "Upload Titer"}
                    </span>
                  </div>
                  <label className="bg-[#FBB042] p-4 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-white max-lg2:p-2">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setTiter(e?.target?.files?.[0])}
                    />
                    <span className="max-lg2:text-[12px]">Browse</span>
                  </label>
                </div>
              </div>
              <div className="w-[50%] max-sm1:w-[100%]">
            {titer && (
              <img
                src={URL.createObjectURL(titer)}
                type="application/pdf"
              alt=""
              />
            )}
          </div>
              <div className="flex flex-col col-span-3 justify-between">
                <div className="text-[14px] mb-2">
                  <span className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Signature
                  </span>{" "}
                  <span className="text-red-700">*</span>
                </div>
                <div className="flex items-center">
                  <div className="min-w-[70%] border border-gray-300 cursor-pointer rounded-l-[5px]  text-[14px] p-4 max-lg2:text-[12px] max-lg2:p-2">
                    <span>
                      {signiture ? signiture?.name : "Upload Signiture"}
                    </span>
                  </div>
                  <label className="bg-[#FBB042] p-4 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-white max-lg2:p-2">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setSignture(e?.target?.files?.[0])}
                    />
                    <span className="max-lg2:text-[12px]">Browse</span>
                  </label>
                </div>
              </div>
              <div className="w-[50%] max-sm1:w-[100%]">
            {signiture && (
              <img
                src={URL.createObjectURL(signiture)}
                type="application/pdf"
              alt=""
              />
            )}
          </div>
            </div>
          </div>
        </div>

     

{loading? <Loading addtionalStyle={"flex  justify-end items-center my-[20px]"} />: <div className="w-[90%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={createAdministrator}
            className={
              loading
                ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
                : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
            }
          >
            Create
          </button>
        </div>}
       
      </div>
    </div>
  );
}

export default CreateAdminstrators;
