import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCaseRequests } from "../../REDUX/slices/getAllCaseRequestSlice";
import ServerError from "../ServerError";
import apiRequest from "../../utils/request";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateQuestion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('tID');
  const translationState = useSelector((state)=>state.translation);
  const caseListState = useSelector((state)=>state?.allCaseLists)
  const [nameEn, setNameEn] = useState("");
  const [nameAm, setNameAm] = useState("");
  const [nameOr, setNameOr] = useState("");
  const [nameSm, setNameSm] = useState("");
  const [nameTg, setNameTg] = useState("");
  const [nameAf, setNameAf] = useState("");
  const [caseList,setCaseList] = useState("");
  const [dataType,setDataType] = useState("");
  const [inputType,setInputType] = useState("");
  const [isRequired,setIsRequired] = useState("yes");
  const [isMultipleValue, setIsMultipleValue] = useState("no");
  const [noOfSelectables, setNOofSelectables] = useState(0);
  const [selectablesValues, setSelectablesValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);


  useEffect(()=>{
    dispatch(fetchAllCaseRequests());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleNumberOfSelectablesChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setNOofSelectables(count);
    setSelectablesValues(
      Array.from({ length: count }, () => ({
        value_en: "",
        value_am: "",
        value_or: "",
        value_sm: "",
        value_tg: "",
        value_af: "",
      }))
    );
  };

  const handleInputChange = (index, language, value) => {
    setSelectablesValues((prevValues) =>
      prevValues.map((item, i) =>
        i === index ? { ...item, [language]: value } : item
      )
    );
  };

  const handleCreateQuestion = async ()=>{
    try {
      setLoading(true);

      await apiRequest.post('/questions_api/create_question',{
        name_en:nameEn,
        name_am:nameAm,
        name_or:nameOr,
        name_sm:nameSm,
        name_tg:nameTg,
        name_af:nameAf,
        caselist:caseList,
        dataType,
        hasEnum:isMultipleValue,
        isRequired,
        inputType,
        enumValues:JSON.stringify(selectablesValues)

      },{
        headers:{
          get_createquestion_api: process.env.REACT_APP_GET_CREATEQUESTION_API,
          Authorization: `Bearer ${token}`,
        }
      }).then((res)=>{
        setLoading(false);
        translationState?.lan === "En"
          ? toast.success(res?.data?.Message_en)
          : toast.success(res?.data?.Message_am);
          setTimeout(() => {
            setLoading(false);
            window.location.href = "/questions";
          }, 6000);
      }).catch((error)=>{
        setLoading(false);
        if (error?.response?.status === 500) {
          setServerError(true);
        }
        translationState?.lan === "En"
          ? toast.error(error?.response?.data?.Message_en)
          : toast.error(error?.response?.data?.Message_am);
      })
      
    } catch (error) {
      setServerError(true)
      
    }
  }


  if(serverError) return <ServerError />


  return (
    <div className="w-[100%] bg-white">
      <ToastContainer theme="light"/>
      <div className="w-[90%] mt-[30px] mx-auto">
        <div className="flex items-center justify-start gap-[10px] text-[#FBB042]">
          <BiChevronLeft
            onClick={() => navigate(-1)}
            className="text-[40px] cursor-pointer"
          />
          <span className="text-[20px] font-bold max-lg2:text-[16px]">
            Create a question
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
                  onChange={(e)=>setNameEn(e.target.value)}
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
                  type="text"
                  onChange={(e)=>setNameAm(e.target.value)}
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
                  onChange={(e)=>setNameOr(e.target.value)}
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
                  onChange={(e)=>setNameTg(e.target.value)}
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
                  onChange={(e)=>setNameAf(e.target.value)}
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
                  onChange={(e)=>setNameSm(e.target.value)}
                  className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto my-[30px]">
          <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
            2. Case Request <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <select onChange={(e)=>setCaseList(e.target.value)} className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2">
              <option value={""}>select case request</option>
              {caseListState?.caseRequests?.map((caselist,index)=>{
                return <option key={index} value={caselist?._id}>{caselist?.case_name_am}</option>
              })}
             
            </select>
          </div>
        </div>
        <div className="w-[90%] mx-auto my-[30px]">
          <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
            3. Type of data ? <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
      
            <select onChange={(e)=>setDataType(e.target.value)} className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2">
            <option value={""}>select data Type</option>
              <option value={"string"}>Text</option>
              <option value={"number"}>Number</option>
            </select>
          </div>
        </div>
        <div className="w-[90%] mx-auto my-[30px]">
          <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
            4. Is this question required ?{" "}
            <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <select onChange={(e)=>setIsRequired(e.target.value)} className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2">
              <option value={"yes"}>Yes</option>
              <option value={"no"}>No</option>
            </select>
          </div>
        </div>

        <div className="w-[90%] mx-auto my-[30px]">
          <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
            5. Type of input? <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <select onChange={(e)=>setInputType(e.target.value)} className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2">
            <option value={""}></option>
             {dataType ==="number" ? <option value={"normal_input"}>Input</option>:<>
             <option value={"normal_input"}>Input</option>
              <option value={"text_area"}>Description area</option>
              <option value={"select"}>multiple choice</option></>} 
            </select>
          </div>
        </div>

        {inputType ==="select" &&  <div className="w-[90%] mx-auto my-[30px]">
          <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
            6. Does this question have selectable values?{" "}
          </label>
          <div className="mt-2">
            <select
              onChange={(e) => setIsMultipleValue(e.target.value)}
              className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
            >
              <option value={"no"}>No</option>
              <option value={"yes"}>Yes</option>
            </select>
          </div>
        </div>}
       

        {isMultipleValue === "yes"  && (
          <div className="w-[90%] mx-auto col-span-3">
            <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
              7. How many selectables ? <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                type="number"
                min={0}
                onChange={handleNumberOfSelectablesChange}
                className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
              />
            </div>
          </div>
        )}

        {Array.from({ length: noOfSelectables }).map((_, index) => (
          <div
            key={index}
            className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-lg2:mt-5"
          >
            <div>
              <span className="font-bold text-[#0C73B8]">
                Expected value {index + 1}
              </span>
            </div>
            <div className="w-[90%] mx-auto flex flex-col gap-[20px]">
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  English <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "value_en", e.target.value)
                    }
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              {/* Amharic */}
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Amharic <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "value_am", e.target.value)
                    }
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
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
                    onChange={(e) =>
                      handleInputChange(index, "value_tg", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleInputChange(index, "value_or", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleInputChange(index, "value_af", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleInputChange(index, "value_sm", e.target.value)
                    }
                    className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

       {loading ? <Loading addtionalStyle={"flex justify-end items-center"}/>: <div className="w-[90%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateQuestion}
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

export default CreateQuestion;
