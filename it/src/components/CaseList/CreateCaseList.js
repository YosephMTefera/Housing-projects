import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";

function CreateCaseList() {
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
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(()=>{
    dispatch(fetchAllDivision())
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  const filterActiveDivision = divisonState?.divisions?.filter((div)=>div?.status ==="active");
  const filerNotSpecial = filterActiveDivision?.filter((div)=>div?.special ==="no");

  const handleCreateCaseList = async () => {
    try {
      if (parseInt(timelimit) < 0) return toast.error("Invalid timelimit.");

      setLoading(true);
      await apiRequest
        .post("/case_list_api/create_case_list", {
          case_name_en: nameEn,
          case_name_am: nameAm,
          case_name_or: nameOr,
          case_name_sm: nameSm,
          case_name_tg: nameTg,
          case_name_af: nameAf,
          division,
          answer_by:answerBy,
          timelimit,
        },{headers:{
          get_creaselist_api: process.env.REACT_APP_GET_CREASELIST_API,
          Authorization: `Bearer ${token}`,
        }})
        .then((res) => {
          setLoading(false);
          translationState?.lan === "En"
            ? toast.success(res?.data?.Message_en)
            : toast.success(res?.data?.Message_am);
          setTimeout(() => {
            setLoading(false);
            window.location.href = "/caselist";
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
      <ToastContainer theme="light" />
      <div className="w-[90%] my-[30px] mx-auto">
        <div className="flex items-center justify-start gap-[10px] text-[#FBB042]">
          <BiChevronLeft
            onClick={() => navigate(-1)}
            className="text-[40px] cursor-pointer"
          />
          <span className="text-[20px] font-bold max-lg2:text-[16px]">
            Create new case request
          </span>
        </div>
        <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-lg2:mt-5">
          <div>
            <span className="font-bold text-[#0C73B8]">1. Name in</span>
          </div>
          <div className="w-[90%] mx-auto flex flex-col gap-[20px]">
            <div className="col-span-3">
              <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                English <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setNameEn(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                />
              </div>
            </div>
            <div className="col-span-3">
              <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                Amharic <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setNameAm(e.target.value)}
                  type="text"
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                />
              </div>
            </div>
            <div className="col-span-3">
              <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                Oromo <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setNameOr(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                />
              </div>
            </div>
            <div className="col-span-3">
              <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                Somali <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setNameSm(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                />
              </div>
            </div>
            <div className="col-span-3">
              <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                Tigrygna <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setNameTg(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                />
              </div>
            </div>
           
            <div className="col-span-3">
              <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                Afar <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  onChange={(e) => setNameAf(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                />
              </div>
            </div>
           
          </div>
        </div>
        <div className="w-[90%] mx-auto my-[30px]">
          <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
            2. Division: <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <select
              onChange={(e) => setDivison(e.target.value)}
              className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
            >
          <option value={""}>Select division</option>
          {filerNotSpecial?.map((division,index)=>{
            return <option key={index} value={division?._id}>{division?.name_am}</option>
          })}
            </select>
          </div>
        </div>
        <div className="w-[90%] mx-auto my-[30px]">
          <label
           
            className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
          >
            3. Answered by: <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <select  onChange={(e) => setAnswerBy(e.target.value)} className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2">
            <option value=""></option>
              <option value="MainExecutive">Main Executive</option>
              <option value={"DivisionManagers"}>Division Manager</option>
              <option value={"Directors"}>Director</option>
              <option value={"Teamleader"}>Teamleader</option>
              <option value={"Professionals"}>Professionals</option>
            </select>
          </div>
        </div>
        <div className="w-[90%] mx-auto col-span-3">
          <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
            4. Day limit: <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <input
              type="number"
              min={0}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
            />
          </div>
        </div>

{loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/>:  <div className="w-[90%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateCaseList}
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

export default CreateCaseList;
