import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { IoChevronBack } from "react-icons/io5";
import apiRequest from "../../utils/request";
import { language } from "../../utils/part-1lan";

function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state) => state?.translation);
  const [printablePath, setPrintablePath] = useState(null);
  const [candidateLoading,setCandidateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);



  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/cand_resp/prev_cand_resp/${id}`, {
          headers: {
            get_canpres_api: process.env.REACT_APP_GET_CANPRES_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setPrintablePath(res.data);
        })
        .catch((error) => {
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
  }, [id, token, translationState?.lan]);

  const handleFinalResponse = async ()=>{
    try {
      setCandidateLoading(true)
      await apiRequest.put(`/customer_case_api/respond_case/${id}`,{},{headers:{
        get_casrespschedule_api:process.env.REACT_APP_GET_CASRESPSCHEDULE_API,
        Authorization:`Bearer ${token}`

      }}).then((res)=>{
        setCandidateLoading(false)
        translationState?.lan ==="En" &&  toast.success(res.data.Message_en)
        translationState?.lan ==="Am" &&  toast.success(res.data.Message_am)

        setTimeout(()=>{
          window.location.href = `/cases/${id}/forwarded`
        },6000)
      
        
    
      }).catch((error)=>{
        setLoading(false)
        setCandidateLoading(false)
        if(error?.response?.status === 500){
          setServerError(true)
        }

        translationState?.lan ==="En" &&  toast.error(error?.response?.data?.Message_en)
      })

      
    } catch (error) {
      setLoading(false);
      setCandidateLoading(true)
      setServerError(true)
      
    }
  }

  if (serverError) return <ServerError />;
  return (
    <div className="w-[80%] my-[30px] mx-auto rounded-[10px] bg-white">
      <ToastContainer theme="light" />
      {loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center my-[30px]"}
        />
      ) : (
        <div className="w-[90%] mx-auto flex flex-col">
          <div className="flex my-[20px] justify-between items-center  font-bold text-[#0C73B8]">
            <div className="flex items-center gap-[5px]">
              <IoChevronBack
                onClick={() => navigate(-1)}
                className="text-[30px] cursor-pointer"
              />
              <span className="font-bold">
              {translationState?.lan ==="En" && language?.preview[0]}
              {translationState?.lan ==="Am" && language?.preview[1]}
              </span>
            </div>
            {candidateLoading ? <Loading addtionalStyle={"flex justify-end items-center"}/> :   <div>
              <button onClick={handleFinalResponse} className="py-2 px-4 bg-[#0C73B8] font-bold rounded-[20px] text-white text-[12px] max-lg2:text-[10px]">
              {translationState?.lan ==="En" && language?.approveResponse[0]}
              {translationState?.lan ==="Am" && language?.approveResponse[1]}
              </button>
            </div>}
          
          </div>
          <div className="w-[100%] h-[1px]  bg-gray-300" />
          <div className="my-[20px]">
            <div className="w-[100%] my-4 overflow-y-scroll">
              {printablePath && (
                <embed
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/${printablePath}`}
                  type="application/pdf"
                  width="100%"
                  height="800px"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Preview;
