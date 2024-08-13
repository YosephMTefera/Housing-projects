import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import ServerError from "../ServerError";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";
import Loading from "../Loading";

function ForwardedPathDetail() {
  const { id, type, forwardId } = useParams();
  const navigate = useNavigate();
  const translationState = useSelector((state)=>state.translation);
  const [forwardPath, setForwardPath] = useState([]);
  const [loading,setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const token = sessionStorage?.getItem("tID");

  useEffect(() => {
    if (type === "incoming") {
      setLoading(true)
      apiRequest
        .get(`/forward_incoming_ltr_api/get_forward_inc_letter_path/${id}`, {
          headers: {
            Authorization: "bearer " + token,
            get_frwdpath_incltr_api: process.env.REACT_APP_GET_FRWDPATH_INCLTR_API,
          },
        })
        .then((res) => {
          setLoading(false)
          if (res?.status === 200) {
            setServerError(false);
            setForwardPath(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          } 
        });
    } else if (type === "outgoing") {
      setLoading(true)
      apiRequest
        .get(`/frwd_outgoing_ltr_api/get_forward_outg_letter_path/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_frwdoutltrpath_api: process.env.REACT_APP_GET_FRWDOUTLTRPATH_API,
          },
        })
        .then((res) => {
          setLoading(false)
          if (res?.status === 200) {
            setServerError(false);
            setForwardPath(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          } 
        });
    } else if (type === "internal") {
      setLoading(true)
      apiRequest
        .get(`/frwd_internal_api/get_forward_internal_letter_path/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_frwdintltrpath_api: process.env.REACT_APP_GET_FRWDINTLTRPATH_API,
          },
        })
        .then((res) => {
          setLoading(false)
          if (res?.status === 200) {
            setServerError(false);
            setForwardPath(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    }
    else if (type === "presystem") {
      setLoading(true)
      apiRequest
        .get(`/forward_letter_api/get_forward_letter_path/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_letterfrwdpath_api: process.env.REACT_APP_GET_LETTERFRWDPATH_API,
          },
        })
        .then((res) => {
          setLoading(false)
          if (res?.status === 200) {
            setServerError(false);
            setForwardPath(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    }
    
    else {
      toast.error(
        "Please specify the type  incoming, outgoing, or internal  for which you want to check the forwarded path"
      );
    }
    // eslint-disable-next-line
  }, [type, id]);

  if (serverError) return <ServerError />;
  
  return (
    loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/>:
    <div className="w-[95%] my-[20px] mx-auto p-2 bg-white rounded-[10px]">
      <div className="w-[100%] my-[20px] mx-auto max-lg2:my-[10px]">
        <ToastContainer theme="light" />
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
          <div className="flex items-center justify-start gap-[10px] text-[#FDC00D]">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer"
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">
              {type ==="incoming" && <>
                {translationState?.lan ==="En" && language?.forwardPathDetailIncoming[0]}
                {translationState?.lan ==="Am" && language?.forwardPathDetailIncoming[1]}
              </>}
              {type ==="outgoing" && <>
                {translationState?.lan ==="En" && language?.forwardPathDetailOutgoing[0]}
                {translationState?.lan ==="Am" && language?.forwardPathDetailOutgoing[1]}
              </>}
              {type ==="internal" && <>
                {translationState?.lan ==="En" && language?.forwardPathDetailInternal[0]}
                {translationState?.lan ==="Am" && language?.forwardPathDetailInternal[1]}
              </>}
              {type ==="presystem" && <>
                {translationState?.lan ==="En" && language?.forwardPathDetailPresystem[0]}
                {translationState?.lan ==="Am" && language?.forwardPathDetailPresystem[1]}
              </>}
              
            </span>
          </div>
          <button
              onClick={() =>
                navigate(
              `/print/${type}/${forwardPath?.forwardId}/${forwardPath?.forwardDocs[forwardId]?._id}`)
              }
              className="py-2 px-4 bg-[#0C73B8] text-white text-[12px] rounded-[20px] max-lg2:text-[10px]"
            >
              {translationState?.lan === "En" && language?.print[0]}
              {translationState?.lan === "Am" && language?.print[1]}
            </button>
          </div>
         
          <div className="w-[80%] mx-auto max-lg2:w-[95%]">
            <div className="w-[100%] my-[40px] flex flex-col gap-[20px]">
              <div className="w-[100%] flex justify-between items-center gap-[50px]">
                <div className="flex flex-col gap-[20px]">
                  {forwardPath?.forwardDocs?.[forwardId]?.from_achival_user && (
                    <span className="flex items-center gap-[10px]">
                      <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                        {" "}
                        {translationState?.lan ==="En" && language?.archivalUser[0]}
                        {translationState?.lan ==="Am" && language?.archivalUser[1]}:{" "}
                      </span>{" "}
                      <span className="text-gray-500 max-lg2:text-[14px]">
                        {forwardPath?.forwardDocs?.[forwardId]
                          ?.from_achival_user
                          ? forwardPath?.forwardDocs?.[forwardId]
                              ?.from_achival_user?.firstname +
                            " " +
                            forwardPath?.forwardDocs?.[forwardId]
                              ?.from_achival_user?.middlename +
                            " " +
                            forwardPath?.forwardDocs?.[forwardId]
                              ?.from_achival_user?.lastname
                          : "-"}
                      </span>
                    </span>
                  )}

                  {forwardPath?.forwardDocs?.[forwardId]?.from_office_user && (
                    <span className="flex flex-col items-start gap-[10px]">
                      <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                        {" "}
                        {translationState?.lan ==="En" && language?.from[0]}
                        {translationState?.lan ==="Am" && language?.from[1]}:{" "}
                      </span>{" "}
                      <span className="text-gray-500 max-lg2:text-[14px]">
                        {forwardPath?.forwardDocs?.[forwardId]?.from_office_user
                          ? forwardPath?.forwardDocs?.[forwardId]
                              ?.from_office_user?.firstname +
                            " " +
                            forwardPath?.forwardDocs?.[forwardId]
                              ?.from_office_user?.middlename +
                            " " +
                            forwardPath?.forwardDocs?.[forwardId]
                              ?.from_office_user?.lastname +
                            " - " +
                            forwardPath?.forwardDocs?.[forwardId]
                              ?.from_office_user?.position
                          : "-"}
                      </span>
                    </span>
                  )}
                   <span className="text-gray-500 flex  items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">        {translationState?.lan ==="En" && language?.to[0]}
                    {translationState?.lan ==="En" && language?.to[0]}
                    {translationState?.lan ==="Am" && language?.to[1]}: </span>
                    <span className="max-lg2:text-[14px]">
                      {forwardPath?.forwardDocs?.[forwardId]?.to?.firstname +
                        " " +
                        forwardPath?.forwardDocs?.[forwardId]?.to?.middlename +
                        " " +
                        forwardPath?.forwardDocs?.[forwardId]?.to?.lastname +
                        " - " +
                        forwardPath?.forwardDocs?.[forwardId]?.to?.position}
                    </span>
                  </span>
                  <span className="text-gray-500 flex  items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">        {translationState?.lan ==="En" && language?.to[0]}
                    {translationState?.lan ==="En" && language?.cc[0]}
                    {translationState?.lan ==="Am" && language?.cc[1]}: </span>
                    <span className="max-lg2:text-[14px]">
                      {forwardPath?.forwardDocs?.[forwardId]?.cc}
                    </span>
                  </span>

                  
                  
                </div>
                <div className="flex  flex-col gap-[20px]">
                 
                <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    {translationState?.lan ==="En" && language?.forwardedDate[0]}
                    {translationState?.lan ==="Am" && language?.forwardedDate[1]}:{" "}
                    </span>
                    <span className="max-lg2:text-[14px]">
                      {new Date(
                        forwardPath?.forwardDocs?.[forwardId]?.forwarded_date
                      ).toDateString()}
                    </span>
                  </span>
                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    {translationState?.lan ==="En" && language?.forwardedTime[0]}
                    {translationState?.lan ==="Am" && language?.forwardedTime[1]}:{" "}
                    </span>
                    <span className="max-lg2:text-[14px]">
                      {new Date(
                        forwardPath?.forwardDocs?.[forwardId]?.forwarded_date
                      ).toLocaleTimeString()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {forwardPath?.forwardDocs?.[forwardId]?.remark && (
            <div className="w-[95%] mx-auto my-[20px] flex flex-col gap-[5px]">
              <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">        {translationState?.lan ==="En" && language?.remark[0]}
              {translationState?.lan ==="Am" && language?.remark[1]}</span>
              <p className="text-gray-500 leading-[30px] max-lg2:text-[14px]">
                {forwardPath?.forwardDocs?.[forwardId]?.remark
                  ? forwardPath?.forwardDocs?.[forwardId]?.remark
                  : "-"}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ForwardedPathDetail;
