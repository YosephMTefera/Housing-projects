import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../ServerError";
import Loading from "../Loading";
import {useSelector} from 'react-redux'
import { language } from "../../utils/part-1lan";

function ReplyPath() {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state)=>state.translation);
  const [replyPath, setReplyPath] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);



  const getReplyPath = async () => {
    try {
      setLoading(true);
      //case
      if (type === "case") {
        await apiRequest
        .get(`/reply_case_api/get_reply_path/${id}`, {
          headers: {
            get_rplypath_api: process.env.REACT_APP_GET_RPLYPATH_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setReplyPath(res.data);
        })
        .catch((error) => {
          setLoading(false);
          if (
            error.response.status === 500) {
           setServerError(true)
          }
         
        });
      }
  
      // letter
      else if(type ==="letter"){
        await apiRequest
        .get(`/reply_letter_api/get_reply_letter_path/${id}`, {
          headers: {
            get_rplypath_api: process.env.REACT_APP_GET_RPLYPATH_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setReplyPath(res.data);
        })
        .catch((error) => {
          setLoading(false);
          if (
            error.response.status === 500
          ) {
            setServerError(true)
          }
        
        });

      }
      else{
        toast.error(
          "Please specify the type of case, or letter for which you want to check the reply path"
        );
      }

     
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  useEffect(() => {
    getReplyPath();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (serverError) return <ServerError />;
  return (
    <div className="w-[95%] my-[30px] mx-auto bg-white rounded-[20px]">
      <ToastContainer theme="light" />
      <div className="w-[90%] my-[30px] mx-auto">
        <div className="w-[100%] flex items-center justify-start   text-[#0C73B8] mt-[50px] mx-auto font-bold">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px]">{translationState?.lan==="En" && language?.replyPathFor[0]}
          {translationState?.lan==="Am" && language?.replyPathFor[1]} {type} ({id})</span>
        </div>
 
        
        {loading ? (
          <Loading addtionalStyle={"flex justify-center items-center my-[30px]"} />
        ) : (!replyPath['repliedDocs'] || replyPath?.repliedDocs?.length === 0) ? (
          <div className="w-[100%] my-[40px] flex justify-center items-center">
            {type ==="case" &&  <span className="text-[14px] font-bold text-[#0C73B8]">
              {translationState?.lan==="En" && language?.noReplyPathCase[0]}
              {translationState?.lan==="Am" && language?.noReplyPathCase[1]}
            </span>}
           
          </div>
        ) : (  
         
          <div className="max-h-[700px] overflow-y-auto hide-scroll-bar my-[30px] flex flex-col  relative">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#0C73B8]  whitespace-nowrap">
                      <tr className="text-[14px] max-lg2:text-[12px]">
                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white  tracking-wider"
                        >
                          #
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                     {translationState?.lan==="En" && language?.from[0]}
                     {translationState?.lan==="Am" && language?.from[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                     {translationState?.lan==="En" && language?.to[0]}
                     {translationState?.lan==="Am" && language?.to[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                        {translationState?.lan==="En" && language?.repliedDate[0]}
                        {translationState?.lan==="Am" && language?.repliedDate[1]}
                        </th>

                       
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {replyPath?.repliedDocs?.map((fc, index) => {
                       
                        return (
                          <tr
                            key={index}
                            className="text-center text-[12px] cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/reply_path_information/${fc?._id}/${type}`,
                                {
                                  state: {
                                    document_id: id,
                                    replyPath: fc,
                                    reply_Id:replyPath?.replyId
                                  },
                                }
                              )
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap  text-sm text-gray-500">
                                    {index + 1}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex  justify-center items-center">
                                <div className="ml-4">
                                  {fc?.from_office_user && (
                                    <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {fc?.from_office_user?.firstname} {fc?.from_office_user?.middlename}{" "}
                                      {fc?.from_office_user?.lastname} ({fc?.from_office_user?.position})
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                              {fc?.to?.firstname} {fc?.to?.middlename} {fc?.to?.lastname} (
                              {fc?.to?.position})
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                              {fc?.replied_date?.split("T")[0]}
                            </td>

                           
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReplyPath;
