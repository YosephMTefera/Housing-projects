import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import ServerError from '../ServerError';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from '../../utils/request';
import Loading from '../Loading';
import { BiChevronLeft } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { language } from '../../utils/part-1lan';


function EditIT() {
  const {id} = useParams()
  const navigate = useNavigate();
  const token = sessionStorage.getItem('tID')
  const translationState = useSelector((state)=>state.translation);
  const [firstname,setFirstname] = useState("");
  const [middlename,setMiddlename] = useState("");
  const [lastname,setLastName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [phoneNumber,setPhoneNumber]  = useState("");
  const [gender,setGender] =useState("");
  const [status,setStatus] = useState("")
  const [profileImg,setProfileImg] = useState(null);
  const [newProfileImg,setNewProfileImg] = useState(null)
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false)

  useEffect(()=>{
    try {
        setLoading(true)
        apiRequest.get(`/it_user_api/get_it_user/${id}`,{headers:{
          get_itusers_det_api:process.env.REACT_APP_GET_ITUSERS_DET_API,
            Authorization:`Bearer ${token}`

        }}).then((res)=>{
            setLoading(false)
            setFirstname(res.data?.firstname);
            setMiddlename(res?.data?.middlename);
            setLastName(res?.data?.lastname);
            setUsername(res?.data?.username);
            setEmail(res?.data?.email);
            setPhoneNumber(res?.data?.phone);
            setGender(res?.data?.gender);
            setStatus(res?.data?.status);
            setProfileImg(res?.data?.picture);
        }).catch((error)=>{
            if(error.response.status ===500){
                setServerError(true);
            }
            translationState.lan ==="En" ? toast.error(error?.response?.data?.Message_en):toast.error(error?.response?.data?.Message_am)

        })
        
    } catch (error) {
        setLoading(false)
        setServerError(true)
        
    }
},[id,token,translationState]);


  const editIT = async ()=>{
    try {
      const itData= new FormData();
      itData.append('firstname',firstname);
      itData.append('middlename',middlename);
      itData.append('lastname',lastname);
      itData.append('username',username);
      itData.append('phone',phoneNumber);
      itData.append('email',email);
      itData.append('gender',gender);
      itData.append('picture',newProfileImg);

      setLoading(true);

      await apiRequest.put(`/it_user_api/update_it_user/${id}`,itData,{
        headers:{
    
          get_itusers_upd_api: process.env.REACT_APP_GET_ITUSERS_UPD_API,
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
    <div className="w-[90%] my-[30px] mx-auto bg-white rounded-[20px]">
    <ToastContainer theme='light'/>
    <div className="w-[90%] mt-[50px] mx-auto">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
        <div className="flex items-center justify-start text-[#0C73B8]">
          <BiChevronLeft className="text-[40px] cursor-pointer" onClick={()=>navigate(-1)} />
          <span className="text-[20px] font-bold">
          {translationState?.lan ==="En" && language?.editIT[0]}
          {translationState?.lan ==="Am" && language?.editIT[1]}
          </span>
        </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-3 max-[670px]:sm:col-span-6">
              <label
                
                className="text-[#0C73B8] text-[15px] font-semibold"
              >
               {translationState?.lan ==="En" && language?.firstname[0]}
               {translationState?.lan ==="Am" && language?.firstname[1]}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={firstname}
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
         {translationState?.lan ==="Am" && language?.middlename[1]}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={middlename}
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
             {translationState?.lan ==="Am" && language?.lastname[1]}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={lastname}
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
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-3">
              <label className="text-[#0C73B8] text-[15px] font-semibold">
              {translationState?.lan ==="En" && language?.phoneNumber[0]}
              {translationState?.lan ==="Am" && language?.phoneNumber[1]}
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  required
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                  className="block w-full rounded-md  p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
           
            <div className="col-span-3">
              <label
                htmlFor="street-address"
                className="text-[#0C73B8] text-[15px] font-semibold"
              >
                {translationState?.lan ==="En" && language?.email[0]}
                {translationState?.lan ==="Am" && language?.email[1]}
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-3">
              <label className="text-[#0C73B8] text-[15px] font-semibold">
              {translationState?.lan ==="En" && language?.gender[0]}
              {translationState?.lan ==="Am" && language?.gender[1]}
              </label>
              <div className="mt-2">
                <select
                value={gender}
                  onChange={(e)=>setGender(e.target.value)}
                  className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
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
          
           
            <div className="col-span-3">
              <label className="text-[#0C73B8] text-[15px] font-semibold">
              {translationState?.lan ==="En" && language?.status[0]}
              {translationState?.lan ==="Am" && language?.status[1]}
              </label>
              <div className="mt-2">
                <select
                value={status}
                  onChange={(e)=>setStatus(e.target.value)}
                  className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                >
                  <option value={""}>
                  {translationState?.lan ==="En" && language?.status[0]}
                  {translationState?.lan ==="Am" && language?.status[1]}
                  </option>
                  <option value={"active"}>
                  {translationState?.lan ==="En" && language?.active[0]}
                  {translationState?.lan ==="Am" && language?.active[1]}
                  </option>
                  <option value={"inactive"}>
                  {translationState?.lan ==="En" && language?.inactive[0]}
                  {translationState?.lan ==="Am" && language?.inactive[1]}
                  </option>
                </select>
              </div>
            </div>
          
           

            <div className="flex flex-col  col-span-3 justify-between max-[670px]:sm:col-span-6">
              <div className=" text-[#0C73B8] text-[15px] font-semibold">
                <span>
                {translationState?.lan ==="En" && language?.picture[0]}
                {translationState?.lan ==="Am" && language?.picture[1]}
                </span>
              </div>
              <div className="flex items-center">
                <div className="min-w-[80%] border border-gray-300 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-[14px] py-2 px-4">
                {profileImg ? profileImg.name : translationState?.lan ==="En" && language?.profilePicture[0]}
                {translationState?.lan ==="Am" && language?.profilePicture[1]}
                </div>
                <label className="bg-[#0C73B8] py-2 px-4 cursor-pointer rounded-tr-[5px] rounded-br-[5px] text-white">
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setNewProfileImg(e.target.files[0])}
                  />
                  <span className='text-[14px]'>
                  {translationState?.lan ==="En" && language?.browse[0]}
                  {translationState?.lan ==="Am" && language?.browse[1]}
                  </span>
                </label>
              </div>
              <div className='flex items-center my-[30px] gap-[20px]'>
                <div className='flex flex-col items-center gap-[10px]'>
                <span className='text-[#0C73B8] text-[14px] font-bold'>
                  {translationState?.lan ==="En" && language?.currentProfile[0]}
                  {translationState?.lan ==="Am" && language?.currentProfile[1]}
                  </span>

                {profileImg &&   <div className="w-[200px] h-[200px] my-[20px]">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/ITUserImages/${profileImg}`}
                    alt="Current Pic"
                    className="w-[100%] h-[100%] rounded-full object-cover pointer-events-none"
                  />
                </div>}
                </div>
           
           {newProfileImg &&   <div className='flex flex-col items-center gap-[20px]'>
                  <span className='text-[#0C73B8] text-[14px] font-bold'>
                  {translationState?.lan ==="En" && language?.newProfile[0]}
                  {translationState?.lan ==="Am" && language?.newProfile[1]}
                  </span>
                {newProfileImg &&   <div className="w-[200px] h-[200px] my-[20px]">
                  <img
                    src={URL.createObjectURL(newProfileImg)}
                    alt="Current Pic"
                    className="w-[100%] h-[100%] rounded-full object-cover pointer-events-none"
                  />
                </div>}

                </div>}
              
                
                
              </div>
             
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
        <button onClick={editIT} className="rounded-md bg-[#0C73B8] px-3 py-2 text-[14px] font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
        {translationState?.lan ==="En" && language?.editIT[0]}
        {translationState?.lan ==="Am" && language?.editIT[1]}
        </button>
      </div>}
    </div>
  </div>
  )
}

export default EditIT