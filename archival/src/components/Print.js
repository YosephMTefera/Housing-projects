import React, { useEffect, useState } from "react";
import apiRequest from "../utils/request";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "./ServerError";
import { IoChevronBack } from "react-icons/io5";
import { language } from "../utils/part-1lan";

function Print() {
  const { id, forward_id, type } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state) => state?.translation);
  const [printablePath, setPrintablePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);



      
  useEffect(() => {
    try {
    
        if (type === "incoming") {
          setLoading(true);
          apiRequest
            .get(
              `/forward_incoming_ltr_api/print_frwd_inc_letter_path/${id}/${forward_id}`,
              {
                headers: {
                  get_prtincfrwd_api: process.env.REACT_APP_GET_PRTINCFRWD_API,
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setLoading(false);
              setPrintablePath(res.data);
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
        }
        else if (type === "outgoing") {
          setLoading(true);
          apiRequest
            .get(
              `/frwd_outgoing_ltr_api/print_frwd_outg_letter_path/${id}/${forward_id}`,
              {
                headers: {
                  get_frwdoutputltrprt_api: process.env.REACT_APP_GET_FRWDOUTPUTLTRPRT_API,
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setLoading(false);
              setPrintablePath(res.data);
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
        }
        else if (type === "internal") {
          setLoading(true);
          apiRequest
            .get(
              `/frwd_internal_api/print_frwd_internal_letter_path/${id}/${forward_id}`,
              {
                headers: {
                  get_frwdintltrprt_api: process.env.REACT_APP_GET_FRWDINTLTRPRT_API,
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setLoading(false);
              setPrintablePath(res.data);
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
        }
        else if (type === "presystem") {
          setLoading(true);
          apiRequest
            .get(
              `/forward_letter_api/print_frwd_letter_path/${id}/${forward_id}`,
              {
                headers: {
                  get_letterpathprt_api: process.env.REACT_APP_GET_LETTERPATHPRT_API,
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setLoading(false);
              setPrintablePath(res.data);
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
        }
        else{
          translationState?.lan==="En" &&  toast.error(language?.letterTypeOption[0]);
          translationState?.lan==="Am" &&  toast.error(language?.letterTypeOption[1]);
        }
    } catch (error) {
        setLoading(false)
      setServerError(true);
    }
  }, [id, forward_id, type, token, translationState?.lan]);

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
        <div className="flex my-[20px] items-center gap-[5px] font-bold text-[#0C73B8]">
          <IoChevronBack
            onClick={() => navigate(-1)}
            className="text-[30px] cursor-pointer"
          />

          {type === "incoming" && (
            <span>
              {" "}
              {translationState?.lan === "En" &&
                `${language?.forwardPath[0]} ${language?.print[0]}`}
              {translationState?.lan === "Am" &&
                ` ${language?.forwardPath[1]} ${language?.print[1]}`}
            </span>
          )}

          {type === "outgoing" && (
            <span>
              {translationState?.lan === "En" &&
                `${language?.replyPath[0]}  ${language?.print[0]}`}
              {translationState?.lan === "Am" &&
                `${language?.replyPath[1]} ${language?.print[1]} `}
            </span>
          )}
            {type === "internal" && (
            <span>
              {translationState?.lan === "En" &&
                `${language?.replyPath[0]}  ${language?.print[0]}`}
              {translationState?.lan === "Am" &&
                `${language?.replyPath[1]} ${language?.print[1]} `}
            </span>
          )}
               {type === "presystem" && (
            <span>
              {translationState?.lan === "En" &&
                `${language?.replyPath[0]}  ${language?.print[0]}`}
              {translationState?.lan === "Am" &&
                `${language?.replyPath[1]} ${language?.print[1]} `}
            </span>
          )}
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
  )
}

export default Print