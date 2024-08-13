import React, { useEffect, useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from '../ServerError';
import apiRequest from '../../utils/request';
import Loading from '../Loading';
import { fetchAllDivision } from '../../REDUX/slices/allDivisionsSlice';
import { fetchAllQuestions } from '../../REDUX/slices/getAlllQuestionsSlice';
function EditCaseList() {
  const {id} = useParams()
  const navigate = useNavigate();
  const token = sessionStorage.getItem('tID')
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state?.translation);
  const divisonState = useSelector((state)=>state?.allDivisions);
  const [nameEn, setNameEn] = useState("");
  const [nameAm, setNameAm] = useState("");
  const [nameOr, setNameOr] = useState("");
  const [nameSm, setNameSm] = useState("");
  const [nameTg, setNameTg] = useState("");
  const [nameAf, setNameAf] = useState("");
  const [division, setDivison] = useState("");
  const [timelimit, setTimeLimit] = useState(0);
  const [answerBy, setAnswerBy] = useState("");
  const [status,setStatus] =useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);


  
  useEffect(() => {
    try {
      apiRequest
      .get(`/case_list_api/get_case_list/${id}`, {
        headers: {
          get_casegetlist_api: process.env.REACT_APP_GET_CASEGETLIST_API,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setServerError(false);
          setNameEn(res?.data?.case_name_en);
          setNameAm(res?.data?.case_name_am);
          setNameOr(res?.data?.case_name_or);
          setNameSm(res?.data?.case_name_sm);
          setNameTg(res?.data?.case_name_tg);
          setNameAf(res?.data?.case_name_af);
          setDivison(res?.data?.division);
          setAnswerBy(res?.data?.answer_by);
          setTimeLimit(res?.data?.timelimit);
          setStatus(res?.data?.status);

    
        }
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
       
          setServerError(true);
        } else {
          translationState.lan==="En" ?  toast.error(error?.response?.data?.Message_en) : toast.error(error?.response?.data?.Message_am)
         
        }
      });
      
    } catch (error) {
      
      setServerError(true)
      
    }

    // eslint-disable-next-line
  }, [id]);
  useEffect(()=>{
    dispatch(fetchAllDivision())
    dispatch(fetchAllQuestions());
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const filterActiveDivision = divisonState?.divisions?.filter((div)=>div?.status ==="active");
  const filerNotSpecial = filterActiveDivision?.filter((div)=>div?.special ==="no");




  const handleEditCaseList = async () => {
    try {
      if (parseInt(timelimit) < 0) return toast.error("Invalid timelimit.");

      setLoading(true);
      await apiRequest
        .put(`/case_list_api/update_case_list/${id}`, {
          case_name_en: nameEn,
          case_name_am: nameAm,
          case_name_or: nameOr,
          case_name_sm: nameSm,
          case_name_tg: nameTg,
          case_name_af: nameAf,
          division,
          answer_by:answerBy,
          status,
          timelimit,
        },{headers:{
          get_updcaselist_api: process.env.REACT_APP_GET_UPDCASELIST_API,
          Authorization: `Bearer ${token}`,
        }})
        .then((res) => {
          setLoading(false);
          translationState?.lan === "En"
            ? toast.success(res?.data?.Message_en)
            : toast.success(res?.data?.Message_am);
          setTimeout(() => {
            setLoading(false);
            window.location.href = `/caselist/${id}`;
          }, 6000);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
    
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] bg-white">
    <ToastContainer theme='light'/>
    <div className="w-[90%] my-[30px] mx-auto">
      <div className="flex items-center justify-start gap-[10px] text-[#FBB042]">
        <BiChevronLeft
          onClick={() => navigate(-1)}
          className="text-[40px] cursor-pointer"
        />
        <span className="text-[20px] font-bold max-lg2:text-[16px]">
          Edit {nameEn ? nameEn :"-"}
        </span>
      </div>
      <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-lg2:mt-5">
        <div>
          <span className="font-bold text-[#0C73B8]">1. Name in</span>
        </div>
        <div className="w-[90%] mx-auto flex flex-col gap-[20px]">
          <div className="col-span-3">
            <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
              English 
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={nameEn}
                onChange={(e)=>setNameEn(e.target.value)}
                className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
              />
            </div>
          </div>
          <div className="col-span-3">
            <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
              Amharic 
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={nameAm}
                onChange={(e)=>setNameAm(e.target.value)}
                className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
              />
            </div>
          </div>
          <div className="col-span-3">
            <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
              Tigrygna 
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={nameTg}
                onChange={(e)=>setNameTg(e.target.value)}
                className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
              />
            </div>
          </div>
          <div className="col-span-3">
            <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
              Oromo 
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={nameOr}
                onChange={(e)=>setNameOr(e.target.value)}
                className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
              />
            </div>
          </div>
          <div className="col-span-3">
            <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
              Afar 
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={nameAf}
                onChange={(e)=>setNameAf(e.target.value)}
                className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
              />
            </div>
          </div>
          <div className="col-span-3">
            <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
              Somali 
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={nameSm}
                onChange={(e)=>setNameSm(e.target.value)}
                className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto my-[30px]">
        <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
          2. Division: 
        </label>
        <div className="mt-2">
          <select value={division} onChange={(e)=>setDivison(e.target.value)} className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2">
            <option value={""}>Select division</option>
            {filerNotSpecial?.map((division,index)=>{
            return <option key={index} value={division?._id}>{division?.name_am}</option>
          })}
          </select>
        </div>
      </div>
      <div className="w-[90%] mx-auto my-[30px]">
        <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
          3. Answered by: 
        </label>
        <div  className="mt-2">
          <select value={answerBy} onChange={(e)=>setAnswerBy(e.target.value)} className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2">
            <option value={"MainExecutive"}>Main Executive</option>
            <option value={"DivisionManagers"}>Division Manager</option>
            <option value={"Directors"}>Director</option>
            <option value={"Teamleader"}>Teamleader</option>
            <option value={"Professionals"}>Professionals</option>
          </select>
        </div>
      </div>
      <div className="w-[90%] mx-auto col-span-3">
            <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
            4. Day limit: 
            </label>
            <div className="mt-2">
              <input
                type="number"
                min={0}
                value={timelimit}
                onChange={(e)=>setTimeLimit(e.target.value)}
                className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
              />
            </div>
          </div>

          
          <div className="w-[90%] mt-[30px] mx-auto col-span-3">
                <label className="block text-[#0C73B8] font-bold max-lg2:text-[12px]">5. Status</label>
                <div className="mt-2">
                  <select
                    required
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                    className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Status</option>
                    <option value={"active"}>Active</option>
                    <option value={"inactive"}>Inactive</option>
                  </select>
                </div>
              </div>



           {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/> :    <div className="w-[90%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
        >
          Cancel
        </button>
        <button
        onClick={handleEditCaseList}
          className={
            loading
              ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
              : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
          }
        >
          Edit
        </button>
      </div>}   

      
    </div>
  </div>
  )
}

export default EditCaseList