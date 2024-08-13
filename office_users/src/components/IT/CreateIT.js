import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {BiChevronLeft} from 'react-icons/bi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from '../../utils/request';
import Loading from '../Loading';
import ServerError from '../ServerError';
import { useSelector } from 'react-redux';
import { language } from '../../utils/part-1lan';

function CreateIT() {
  const token = sessionStorage.getItem('tID')
  const navigate = useNavigate();
  const translationState = useSelector((state)=>state.translation);
  const [firstname,setFirstname] = useState("");
  const [middlename,setMiddlename] = useState("");
  const [lastname,setLastName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [phoneNumber,setPhoneNumber]  = useState("");
  const [password,setPassword] = useState("");
  const [gender,setGender] =useState("");
  const [profileImg,setProfileImg] = useState(null);
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false)

  const createIT = async ()=>{
    try {
      const itData= new FormData();
      itData.append('firstname',firstname);
      itData.append('middlename',middlename);
      itData.append('lastname',lastname);
      itData.append('username',username);
      itData.append('phone',phoneNumber);
      itData.append('email',email);
      itData.append('password',password);
      itData.append('gender',gender);
      itData.append('picture',profileImg);

      setLoading(true);

      await apiRequest.post('/it_user_api/create_it_user',itData,{
        headers:{
    
          get_createit_user_api: process.env.REACT_APP_GET_CREATEIT_USER_API,
          Authorization: `Bearer ${token}`,
        }
      }).then(()=>{
          setLoading(false);
          window.location.href="/it"
      }).catch((error)=>{
        setLoading(false);
       
        translationState.lan ==="En" ? toast.error(error?.response?.data?.Message_en):toast.error(error?.response?.data?.Message_am)
      })

      
    } catch (error) {
      setLoading(false)
      setServerError(true)
      
    }
  }

  if(serverError) return <ServerError />

  return (
    <div className="w-[90%] mx-auto my-[30px] rounded-[20px] bg-white">
    
    <ToastContainer theme='light'/>
    <div className="w-[90%] mt-[50px] mx-auto">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
        <div className="flex items-center justify-start text-[#0C73B8]">
          <BiChevronLeft className="text-[40px] cursor-pointer" onClick={()=>navigate(-1)} />
          <span className="text-[20px] font-bold">     {translationState?.lan ==="En" && language?.createIT[0]}
          {translationState?.lan ==="Am" && language?.createIT[1]}</span>
        </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-3 max-[670px]:sm:col-span-6">
              <label
             
                className="text-[#0C73B8] text-[15px] font-semibold"
              >
                  {translationState?.lan ==="En" && language?.firstname[0]}
                  {translationState?.lan ==="Am" && language?.firstname[1]} <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e)=>setFirstname(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-3 max-[670px]:sm:col-span-6">
              <label
            
                className="text-[#0C73B8] text-[15px] font-semibold"
              >
                     {translationState?.lan ==="En" && language?.middlename[0]}
                     {translationState?.lan ==="Am" && language?.middlename[1]} <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e)=>setMiddlename(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-3 max-[670px]:sm:col-span-6">
              <label
              
                className="text-[#0C73B8] text-[15px] font-semibold"
              >
                   {translationState?.lan ==="En" && language?.lastname[0]}
                   {translationState?.lan ==="Am" && language?.lastname[1]} <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e)=>setLastName(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-3 max-[670px]:sm:col-span-6">
              <label
         
                className="text-[#0C73B8] text-[15px] font-semibold"
              >
                     {translationState?.lan ==="En" && language?.username[0]}
                     {translationState?.lan ==="Am" && language?.username[1]} <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e)=>setUsername(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-3 max-[670px]:sm:col-span-6">
              <label
          
                className="text-[#0C73B8] text-[15px] font-semibold"
              >
                  {translationState?.lan ==="En" && language?.phoneNumber[0]}
                  {translationState?.lan ==="Am" && language?.phoneNumber[1]}  <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                  className="block w-full rounded-md  p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-3 max-[670px]:sm:col-span-6">
              <label
           
                className="text-[#0C73B8] text-[15px] font-semibold"
              >
                 {translationState?.lan ==="En" && language?.email[0]}
                 {translationState?.lan ==="Am" && language?.email[1]} <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-3 max-[670px]:sm:col-span-6">
              <label
             
                className="text-[#0C73B8] text-[15px] font-semibold"
              >
                   {translationState?.lan ==="En" && language?.password[0]}
                   {translationState?.lan ==="Am" && language?.password[1]}<span className="text-red-700">*</span>
                  
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            
           
            
           
          

            <div className="col-span-3 max-[670px]:sm:col-span-6">
              <label className="text-[#0C73B8] text-[15px] font-semibold">
              {translationState?.lan ==="En" && language?.gender[0]}
              {translationState?.lan ==="Am" && language?.gender[1]} <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <select
                  onChange={(e)=>setGender(e.target.value)}
                  className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                >
                  <option value={""}>
                  {translationState?.lan ==="En" && language?.selectGender[0]}
                  {translationState?.lan ==="Am" && language?.selectGender[1]}
                  </option>
                  <option value={"Male"}>
                  {translationState?.lan ==="En" && language?.male[0]}
                  {translationState?.lan ==="Am" && language?.male[1]}
                  </option>
                  <option value={"Female"}>
                  {translationState?.lan ==="En" && language?.female[0]}
                  {translationState?.lan ==="Am" && language?.female[1]}
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col  col-span-3 justify-between max-[670px]:sm:col-span-6">
              <div className=" text-[14px] text-[#0C73B8] font-bold">
                <span>
                {translationState?.lan ==="En" && language?.picture[0]}
                {translationState?.lan ==="Am" && language?.picture[1]}</span>{" "}
                <span className="text-red-700">*</span>
              </div>
              <div className="flex items-center">
                <div className="min-w-[70%] border border-gray-300 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-[14px] py-2 px-4">
              
                  <span>
                {profileImg ? profileImg.name : translationState?.lan ==="En" && language?.profilePicture[0]}
                      {translationState?.lan ==="Am" && language?.profilePicture[1]}
              </span>
                </div>
                <label className="bg-[#0C73B8] py-2 px-4 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-white">
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setProfileImg(e.target.files[0])}
                  />
                  <span>
                  {translationState?.lan ==="En" && language?.browse[0]}
                  {translationState?.lan ==="Am" && language?.browse[1]}
                  </span>
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

      {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/>:   <div className="my-6 py-5 flex items-center justify-end gap-x-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
        {translationState?.lan ==="En" && language?.cancel[0]}
        {translationState?.lan ==="Am" && language?.cancel[1]}
        </button>
        <button onClick={createIT} className="rounded-md bg-[#0C73B8] px-3 py-2 text-[14px] font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
        {translationState?.lan ==="En" && language?.createIT[0]}
        {translationState?.lan ==="Am" && language?.createIT[1]}
        </button>
      </div>}

    
    </div>
  </div>
  )
}

export default CreateIT