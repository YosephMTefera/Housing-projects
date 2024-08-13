import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import ServerError from "../ServerError";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";
import Loading from "../Loading";

function LetterReplyPathDetail() {
  const { id, type, reply_id } = useParams();
  const navigate = useNavigate();
  const translationState = useSelector((state) => state.translation);
  const [replyPath, setreplyPath] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const token = sessionStorage?.getItem("tID");



  useEffect(() => {
    if (type === "incoming") {
      setLoading(true);
      apiRequest
        .get(`/reply_incoming_ltr_api/get_reply_inc_ltr_path/${id}`, {
          headers: {
            Authorization: "bearer " + token,
            get_rplyincltrpath_api:
              process.env.REACT_APP_GET_RPLYINCLTRPATH_API,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setServerError(false);
            setreplyPath(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } else if (type === "outgoing") {
      setLoading(true);
      apiRequest
        .get(`/rply_outgoing_ltr_api/get_reply_outg_ltr_path/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_rpldoutptltrpath_api: process.env.REACT_APP_GET_RPLDOUTPTLTRPATH_API,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setServerError(false);
            setreplyPath(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } else if (type === "internal") {
      setLoading(true);
      apiRequest
        .get(`/rply_internal_ltr_api/get_reply_intl_ltr_path/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_rplyintltrpath_api: process.env.REACT_APP_GET_RPLYINTLTRPATH_API,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setServerError(false);
            setreplyPath(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    }
    else if (type === "presystem") {
      setLoading(true);
      apiRequest
        .get(`/reply_letter_api/get_reply_ltr_path/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_rplypathltr_api: process.env.REACT_APP_GET_RPLYPATHLTR_API,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setServerError(false);
            setreplyPath(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } 
    else if (type === "memo") {
      setLoading(true);
      apiRequest
        .get(`/rply_internal_memo_api/get_reply_memo_ltr_path/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_rplyintmemspath_api: process.env.REACT_APP_GET_RPLYINTMEMSPATH_API,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setServerError(false);
            setreplyPath(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } 
    
    
    else {
      toast.error(
        "Please specify the type of incoming, outgoing, or internal for which you want to check the forwarded path"
      );
    }
    // eslint-disable-next-line
  }, [type, id]);



  if (serverError) return <ServerError />;
  return loading ? (
    <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />
  ) : (
    <>
    <div className="w-[95%] my-[20px] mx-auto p-2 bg-white rounded-[10px]">
      <div className="w-[100%] my-[20px] mx-auto max-lg2:my-[10px]">
        <ToastContainer theme="light" />
        <div className="w-[95%] mx-auto flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-start gap-[10px] text-[#FDC00D]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer"
              />
              <span className="text-[20px] font-bold max-lg2:text-[16px]">
                {type === "incoming" && (
                  <>
                    {translationState?.lan === "En" &&
                      language?.replyPathDetailIncoming[0]}
                    {translationState?.lan === "Am" &&
                      language?.replyPathDetailIncoming[1]}
                  </>
                )}
                {type === "outgoing" && (
                  <>
                    {translationState?.lan === "En" &&
                      language?.replyPathDetailOutgoing[0]}
                    {translationState?.lan === "Am" &&
                      language?.replyPathDetailOutgoing[1]}
                  </>
                )}
                {type === "internal" && (
                  <>
                    {translationState?.lan === "En" &&
                      language?.replyPathDetailInternal[0]}
                    {translationState?.lan === "Am" &&
                      language?.replyPathDetailInternal[1]}
                  </>
                )}
                  {type === "presystem" && (
                  <>
                    {translationState?.lan === "En" &&
                      language?.replyPathDetailPresystem[0]}
                    {translationState?.lan === "Am" &&
                      language?.replyPathDetailPresystem[1]}
                  </>
                )}
                 {type === "memo" && (
                  <>
                    {translationState?.lan === "En" &&
                      language?.replyPathDetailMemo[0]}
                    {translationState?.lan === "Am" &&
                      language?.replyPathDetailMemo[1]}
                  </>
                )}
              </span>
            </div>
            <button
              onClick={() =>
                navigate(
                  `/letters/print/reply/${type}/${replyPath?.replyId}/${replyPath?.repliedDocs[reply_id]?._id}`
                )
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
                  {replyPath?.repliedDocs?.[reply_id]
                    ?.from_achival_user && (
                    <span className="flex items-center gap-[10px]">
                      <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                        {" "}
                        {translationState?.lan === "En" &&
                          language?.archivalUser[0]}
                        {translationState?.lan === "Am" &&
                          language?.archivalUser[1]}
                        :{" "}
                      </span>{" "}
                      <span className="text-gray-500 max-lg2:text-[14px]">
                        {replyPath?.repliedDocs?.[reply_id]
                          ?.from_achival_user
                          ? replyPath?.repliedDocs?.[reply_id]
                              ?.from_achival_user?.firstname +
                            " " +
                            replyPath?.repliedDocs?.[reply_id]
                              ?.from_achival_user?.middlename +
                            " " +
                            replyPath?.repliedDocs?.[reply_id]
                              ?.from_achival_user?.lastname
                          : "-"}
                      </span>
                    </span>
                  )}

                  {replyPath?.repliedDocs?.[reply_id]?.from_office_user && (
                    <span className="flex  items-start gap-[10px]">
                      <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                        {" "}
                        {translationState?.lan === "En" &&
                          language?.from[0]}
                        {translationState?.lan === "Am" &&
                          language?.from[1]}
                        :{" "}
                      </span>{" "}
                      <span className="text-gray-500 max-lg2:text-[14px]">
                        {replyPath?.repliedDocs?.[reply_id]
                          ?.from_office_user
                          ? replyPath?.repliedDocs?.[reply_id]
                              ?.from_office_user?.firstname +
                            " " +
                            replyPath?.repliedDocs?.[reply_id]
                              ?.from_office_user?.middlename +
                            " " +
                            replyPath?.repliedDocs?.[reply_id]
                              ?.from_office_user?.lastname +
                            " - " +
                            replyPath?.repliedDocs?.[reply_id]
                              ?.from_office_user?.position
                          : "-"}
                      </span>
                    </span>
                  )}
                  <span className="text-gray-500 flex  items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                      {" "}
                      {translationState?.lan === "En" && language?.to[0]}
                      {translationState?.lan === "Am" && language?.to[1]}:{" "}
                    </span>
                    <span className="max-lg2:text-[14px]">
                      {replyPath?.repliedDocs?.[reply_id]?.to?.firstname +
                        " " +
                        replyPath?.repliedDocs?.[reply_id]?.to?.middlename +
                        " " +
                        replyPath?.repliedDocs?.[reply_id]?.to?.lastname +
                        " - " +
                        replyPath?.repliedDocs?.[reply_id]?.to?.position}
                    </span>
                  </span>

                  <span className="text-gray-500 flex  items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                      {" "}
                      {translationState?.lan === "En" && language?.cc[0]}
                      {translationState?.lan === "Am" && language?.cc[1]}:{" "}
                    </span>
                    <span className="max-lg2:text-[14px]">
                      {replyPath?.repliedDocs?.[reply_id]?.cc}
                    </span>
                  </span>
                </div>
                <div className="flex  flex-col gap-[20px]">
                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                      {translationState?.lan === "En" &&
                        language?.forwardedDate[0]}
                      {translationState?.lan === "Am" &&
                        language?.forwardedDate[1]}
                      :{" "}
                    </span>
                    <span className="max-lg2:text-[14px]">
                      {new Date(
                        replyPath?.repliedDocs?.[reply_id]?.replied_date
                      ).toDateString()}
                    </span>
                  </span>
                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                      {translationState?.lan === "En" &&
                        language?.forwardedTime[0]}
                      {translationState?.lan === "Am" &&
                        language?.forwardedTime[1]}
                      :{" "}
                    </span>
                    <span className="max-lg2:text-[14px]">
                      {new Date(
                        replyPath?.repliedDocs?.[reply_id]?.replied_date
                      ).toLocaleTimeString()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {replyPath?.repliedDocs?.[reply_id]?.remark && (
            <div className="w-[95%] mx-auto my-[20px] flex flex-col gap-[5px]">
              <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                {" "}
                {translationState?.lan === "En" && language?.remark[0]}
                {translationState?.lan === "Am" && language?.remark[1]}
              </span>
              <p className="text-gray-500 leading-[30px] max-lg2:text-[14px]">
                {replyPath?.repliedDocs?.[reply_id]?.remark
                  ? replyPath?.repliedDocs?.[reply_id]?.remark
                  : "-"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    {replyPath?.repliedDocs?.[reply_id]?.attachment && (
       <div className="w-[95%] mx-auto flex flex-col my-[20px] bg-white rounded-[10px]">
        <div className="w-[90%] mx-auto my-[20px]">
        <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
         {translationState?.lan==="En" && language?.attachement[0]}
         {translationState?.lan==="Am" && language?.attachement[1]}
         </span>
         <div className="w-[100%] my-4 overflow-y-scroll">
           {replyPath?.repliedDocs?.[reply_id]?.attachment && (
             <embed
               src={`${process.env.REACT_APP_BACKEND_IMAGES}/LetterReplyFiles/${replyPath?.repliedDocs?.[reply_id]?.attachment}`}
               type="application/pdf"
               width="100%"
               height="800px"
             />
           )}
         </div>
        </div>
       
       </div>
     )}
    </>
  );
}

export default LetterReplyPathDetail