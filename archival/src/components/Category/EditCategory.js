import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServerError from "../ServerError";
import { ToastContainer, toast } from "react-toastify";
import { BiChevronLeft } from "react-icons/bi";
import apiRequest from "../../utils/request";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";
import Loading from "../Loading";

function EditCategory() {
  const navigate = useNavigate()
  const {id} = useParams();
  const token = sessionStorage?.getItem("tID");
  const translationState = useSelector((state)=>state?.translation);
  const [name, setName] = useState("");
  const [nameAm,setNameAm] = useState("");
  const [status,setStatus] = useState("")
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    apiRequest
      .get(`/archival_category_api/get_archival_category/${id}`, {
        headers: {
          Authorization: "Token " + token,
          get_archcat_api: process.env.REACT_APP_GET_ARCHCAT_API,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setServerError(false);
          setName(res?.data?.name_en);
          setNameAm(res?.data?.name_am)
          setStatus(res?.data?.status);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setServerError(true);
        } 
      });
    // eslint-disable-next-line
  }, [id]);

  const handleEditCategory = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      await apiRequest
        .put(
          `/archival_category_api/update_archival_category/${id}`,
          {
            name_en: name,
            name_am:nameAm
          },
          {
            headers: {
              Authorization: "Token " + token,
              get_updarchcat_api: process.env.REACT_APP_GET_UPDARCHCAT_API,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          translationState?.lan==="En" && toast?.success(res?.data?.Message_en);
          translationState?.lan==="Am" && toast?.success(res?.data?.Message_am);
          setTimeout(() => {
           
            window.location.href = `/letters/archive/${id}`;
          }, 6000);
         
        })
        .catch((error) => {
          setLoading(false);
    
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          translationState?.lan==="En" && toast?.success(error?.response?.data?.Message_en);
          translationState?.lan==="Am" && toast?.success(error?.response?.data?.Message_am);

        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] py-4 min-h-[500px]    bg-white">
    <div className="w-[90%] mx-auto">
      <ToastContainer theme="light" />
      <div>
        <div className="flex items-center justify-between gap-[10px] my-8 text-[#FBB042] max-lg2:my-2">
          <div className="flex items-center justify-start">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer max-lg2:text-[30px]"
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">
            {translationState?.lan ==="En" &&  <span>{language?.editCategory[0]}</span>}
            {translationState?.lan ==="Am" &&  <span>{language?.editCategory[1]}</span>}
            </span>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto flex flex-col gap-[20px]">
        <div className="w-[50%]">
          <label
          
            className="block text-[14px] font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
          >
            {translationState?.lan ==="En" &&  <span>{language?.createCategoryEnglish[0]}</span>}
            {translationState?.lan ==="Am" &&  <span>{language?.createCategoryEnglish[1]}</span>} 
          </label>
          <div className="mt-2">
            <input
              required
              value={name}
              onChange={(e) => setName(e?.target?.value)}
              className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:text-[10px] max-lg2:p-2"
            />
          </div>
        </div>
        <div className="w-[100%] mx-auto flex flex-col gap-[20px]">
        <div className="w-[50%]">
          <label
      
            className="block text-[14px] font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
          >
            {translationState?.lan ==="En" &&  <span>{language?.createCategoryAmharic[0]}</span>}
            {translationState?.lan ==="Am" &&  <span>{language?.createCategoryAmharic[1]}</span>} 
          </label>
          <div className="mt-2">
            <input
              required
              value={nameAm}
              onChange={(e) => setNameAm(e?.target?.value)}
              className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:text-[10px] max-lg2:p-2"
            />
          </div>
        </div>
      </div>
      
<div className="w-[50%]">
            <label
              htmlFor="street-address"
              className="block text-sm font-bold p-2 leading-6 text-gray-900"
            >
                          {translationState?.lan ==="En" &&  <span>{language?.status[0]}</span>}
                          {translationState?.lan ==="Am" &&  <span>{language?.status[1]}</span>} 
            </label>
            <div className="mt-2">
              <select
                required
                value={status}
                onChange={(e) => setStatus(e?.target?.value)}
                className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              >
                <option value={""}></option>
                <option value={"active"}>
                    {translationState?.lan ==="En" &&  <span>{language?.active[0]}</span>}
                          {translationState?.lan ==="Am" &&  <span>{language?.active[1]}</span>} 
                </option>
                <option value={"inactive"}>
                {translationState?.lan ==="En" &&  <span>{language?.inactive[0]}</span>}
                {translationState?.lan ==="Am" &&  <span>{language?.inactive[1]}</span>} 
                </option>
              </select>
            </div>
          </div>
      </div>


    {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"} /> :
      <div className="w-[100%] mt-[30px] py-3 flex justify-end items-center gap-[20px]">
        <button onClick={() => navigate(-1)} className="max-lg2:text-[12px]">
        {translationState?.lan ==="En" &&  <span>{language?.cancel[0]}</span>}
        {translationState?.lan ==="Am" &&  <span>{language?.cancel[1]}</span>}
        </button>
        <button
          onClick={handleEditCategory}
          disabled={loading}
          className={
            loading
              ? "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px] max-lg2:py-1"
              : "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px] max-lg2:py-1"
          }
        >
          {translationState?.lan ==="En" &&  <span>{language?.editCategory[0]}</span>}
          {translationState?.lan ==="Am" &&  <span>{language?.editCategory[1]}</span>}
        </button>
      </div>}

    </div>
  </div>
  );
}

export default EditCategory;


