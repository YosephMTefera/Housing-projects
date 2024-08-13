import React, { useEffect, useMemo, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { customStyles } from "../../utils/data";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOfficeUsers } from "../../REDUX/slices/getAllOfficeUsersSlice";
import Loading from "../Loading";
import { language } from "../../utils/part-1lan";
import { BsFillCloudUploadFill } from "react-icons/bs";

function ReplyLetter() {
    const token = sessionStorage.getItem("tID");
    const decodedToken = jwtDecode(token);
    const userID = decodedToken?.user?.id;
    const { id, type } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const translationState = useSelector((state) => state.translation);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [replyData, setReplyData] = useState([]);
    const officeUserList = useSelector((state) => state.getAllOfficeUsers);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);


    useEffect(() => {
        dispatch(fetchAllOfficeUsers());
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    useEffect(() => {
        setLoading(true);
        try {
          apiRequest
            .get(`/office_user_api/get_office_user/${userID}`, {
              headers: {
                get_user_api: process.env.REACT_APP_GET_USER_API,
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setLoading(false);
              setUser(res.data);
            })
            .catch((error) => {
              setLoading(false);
              if (error?.response?.status === 500) {
                setServerError(true);
              }
            });
        } catch (error) {
          setLoading(false);
          setServerError(true);
        }
      }, [userID, token]);

      useEffect(() => {
        dispatch(fetchAllOfficeUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    


      const filterOfficeUsers = officeUserList?.officeUsers?.filter((ou)=>ou?._id !==userID);
      const activeOfficeUsers = useMemo(() => {
        return filterOfficeUsers?.filter(au => au?.status === "active");
      }, [filterOfficeUsers]);
      
 
      const handleSelectedChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        setReplyData(
          selectedOptions.map((option) => ({
            to: option?._id,
            cc: "no",
            attachment: null,
            remark: "",
          }))
        );
      };
    
      const handleRemarkChange = (index, value) => {
        const updatedReplyData = [...replyData];
        updatedReplyData[index]["remark"] = value;
        setReplyData(updatedReplyData);
      };
    
    
      const handleCcChange = (index, key, value) => {
        const updatedReplyData = [...replyData];
        updatedReplyData[index][key] = value;
        setReplyData(updatedReplyData);
      };
    
      const handleFileInputChange = (index, file) => {
        const updatedReplyData = [...replyData];
        updatedReplyData[index]["attachment"] = file;
        setReplyData(updatedReplyData);
      };

      function removeElementAt(array, index) {
        if (index > -1 && index < array.length) {
            array.splice(index, 1); 
        }
        return array;
    }
    

      const handleReply = async (index) => {
        try {
          const replyDatas = new FormData();
    
          replyDatas.append("to", replyData?.[index]?.to);
          replyDatas.append("cc", replyData?.[index]?.cc);
          replyDatas.append("attachment", replyData?.[index]?.attachment);
          replyDatas.append("remark", replyData?.[index]?.remark);
    
          setLoading(true);
    
          if (type === "incoming") {
            await apiRequest
              .put(`/reply_incoming_ltr_api/officer_reply_inc_letter/${id}`, replyDatas, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  get_crrplyincltr_api: process.env.REACT_APP_GET_CRRPLYINCLTR_API,
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setLoading(false);
                removeElementAt(selectedOptions,index)
                removeElementAt(replyData,index)
                
                translationState?.lan === "En"
                ? toast.success(res?.data?.Message_en)
                : toast.success(res?.data?.Message_am);
                setTimeout(() => {
              
                  window.location.href = `/letters/reply/path/${type}/${id}`;
                }, 6000);
              
              })
              .catch((error) => {
                setLoading(false);
                
                if (error.response.status === 500) {
                  setServerError(true);
                }
                translationState?.lan === "En"
                ? toast.error(error?.response?.data?.Message_en)
                  : toast.error(error?.response?.data?.Message_am);
              });
          }
          else if (type === "outgoing") {
            await apiRequest
              .put(`/rply_outgoing_ltr_api/officer_reply_outg_letter/${id}`, replyDatas, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  get_crrplyouptltr_api: process.env.REACT_APP_GET_CRRPLYOUPTLTR_API,
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setLoading(false);
                removeElementAt(selectedOptions,index)
                removeElementAt(replyData,index)
                
                translationState?.lan === "En"
                ? toast.success(res?.data?.Message_en)
                : toast.success(res?.data?.Message_am);
                setTimeout(() => {
              
                  window.location.href = `/letters/reply/path/${type}/${id}`;
                }, 6000);
              
              })
              .catch((error) => {
                setLoading(false);
                
                if (error.response.status === 500) {
                  setServerError(true);
                }
                translationState?.lan === "En"
                ? toast.error(error?.response?.data?.Message_en)
                  : toast.error(error?.response?.data?.Message_am);
              });
          }
          else if (type === "internal") {
            await apiRequest
              .put(`/rply_internal_ltr_api/officer_reply_intl_letter/${id}`, replyDatas, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  get_crrplyinttltr_api: process.env.REACT_APP_GET_CRRPLYINTTLTR_API,
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setLoading(false);
                removeElementAt(selectedOptions,index)
                removeElementAt(replyData,index)
                
                translationState?.lan === "En"
                ? toast.success(res?.data?.Message_en)
                : toast.success(res?.data?.Message_am);
              })
              .catch((error) => {
                setLoading(false);
                
                if (error.response.status === 500) {
                  setServerError(true);
                }
                translationState?.lan === "En"
                ? toast.error(error?.response?.data?.Message_en)
                  : toast.error(error?.response?.data?.Message_am);
              });
          }
          else if (type === "presystem") {
            await apiRequest
              .put(`/reply_letter_api/officer_reply_letter/${id}`, replyDatas, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  get_rplyltrs_api: process.env.REACT_APP_GET_RPLYLTRS_API,
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setLoading(false);
                removeElementAt(selectedOptions,index)
                removeElementAt(replyData,index)

                setTimeout(() => {
              
                  window.location.href = `/letters/reply/path/${type}/${id}`;
                }, 6000);
              
                
                translationState?.lan === "En"
                ? toast.success(res?.data?.Message_en)
                : toast.success(res?.data?.Message_am);
              })
              .catch((error) => {
                setLoading(false);
                
                if (error.response.status === 500) {
                  setServerError(true);
                }
                translationState?.lan === "En"
                ? toast.error(error?.response?.data?.Message_en)
                  : toast.error(error?.response?.data?.Message_am);
              });
          }
          else if (type === "memo") {
            await apiRequest
              .put(`/rply_internal_memo_api/officer_reply_memo_letter/${id}`, replyDatas, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  get_crrplyintmem_api: process.env.REACT_APP_GET_CRRPLYINTMEM_API,
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setLoading(false);
                removeElementAt(selectedOptions,index)
                removeElementAt(replyData,index)
                
                translationState?.lan === "En"
                ? toast.success(res?.data?.Message_en)
                : toast.success(res?.data?.Message_am);

                setTimeout(() => {
              
                  window.location.href = `/letters/reply/path/${type}/${id}`;
                }, 6000);
              
              })
              .catch((error) => {
                setLoading(false);
                
                if (error.response.status === 500) {
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
          setLoading(false);
          setServerError(true);
        }
      };


    

    if (serverError) return <ServerError />;
    
  return (
    <div className="w-[90%] mx-auto my-[50px] py-4 min-h-[500px] bg-white rounded-[10px]">
    <div className="w-[90%] mx-auto">
      <ToastContainer theme="light" />
      <div className="flex justify-between items-center gap-5">
        <div className="flex items-center justify-start gap-[10px] text-[#FDC00D]">
          <BiChevronLeft
            onClick={() => navigate(-1)}
            className="text-[40px] cursor-pointer"
          />
            <span className="text-[20px] font-bold">
                {translationState?.lan === "En" && language?.reply[0]}
                {translationState?.lan === "Am" && language?.reply[1]}

                {type === "incoming" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.incomingLetter[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.incomingLetter[1]} - ${id}`}
                  </span>
                )}

                {type === "outgoing" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.outgoingLetter[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.outgoingLetter[1]} - ${id}`}
                  </span>
                )}

                {type === "internal" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.internaLetter[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.internaLetter[1]} - ${id}`}
                  </span>
                )}
                   {type === "presystem" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.presystemLetter[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.presystemLetter[1]} - ${id}`}
                  </span>
                )}
                   {type === "memo" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.internalMemo[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.internalMemo[1]} - ${id}`}
                  </span>
                )}
              </span>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        {user && (
          <div className="w-[50%] col-span-2">
            <label
              htmlFor="from"
              className="block text-sm font-medium p-2 leading-6 text-gray-900"
            >
            {translationState?.lan === "En" && language?.from[0]}
            {translationState?.lan === "Am" && language?.from[1]}
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="from"
                value={
                  (user?.firstname ? user?.firstname : "-") +
                  " " +
                  (user?.middlename ? user?.middlename : "-") +
                  " " +
                  (user?.lastname ? user?.lastname : "-")
                }
                disabled
                // onChange={(e) => handleFromChange(e.target.value)}
                className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        )}

        <div className="w-[50%]">
          <label
            htmlFor="street-address"
            className="block text-sm font-medium p-2 leading-6 text-gray-900"
          >
              {translationState?.lan === "En" && language?.to[0]}
              {translationState?.lan === "Am" && language?.to[1]} <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <Select
              options={activeOfficeUsers}
              isMulti
              placeholder="Select user"
              styles={customStyles}
              onChange={handleSelectedChange}
              getOptionLabel={(e) =>
                e?.firstname +
                " " +
                e?.middlename +
                " " +
                e?.lastname +
                `${" "} (${e?.position})`
              }
              getOptionValue={(e) => e?._id}
            />
          </div>
        </div>
       
        {selectedOptions?.map((selected, index) => (
          <div key={index} className="flex flex-col">
            <div>
              <label
                htmlFor={`cc-${index}`}
                className="text-[14px] font-bold my-[5px]"
              >
                 {translationState?.lan === "En" && language?.cc[0]}
                 {translationState?.lan === "Am" && language?.cc[1]} (
                {selected?.firstname +
                  " " +
                  selected?.middlename +
                  " " +
                  selected?.lastname}
                )
              </label>

              <select
                id={`cc-${index}`}
                value={replyData[index]?.cc || "no"}
                className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                onChange={(e) => handleCcChange(index, "cc", e.target.value)}
              >
                <option value={""}></option>
                <option value={"no"}>
                {translationState?.lan === "En" && language?.no[0]}
                {translationState?.lan === "Am" && language?.no[1]}
                </option>
                <option value={"yes"}>
                {translationState?.lan === "En" && language?.yes[0]}
                {translationState?.lan === "Am" && language?.yes[1]}
                </option>
              </select>
            </div>
            {replyData[index]?.cc === "no" && (
              <div className="w-[100%] mt-[30px] flex flex-col gap-[10px]">
                <span className="text-[14px] font-bold w-[80%] ">
                {translationState?.lan === "En" && language?.attachement[0]}
                {translationState?.lan === "Am" && language?.attachement[1]} (
                  {selected?.firstname +
                    " " +
                    selected?.middlename +
                    " " +
                    selected?.lastname}
                  ) 
                </span>
                <label>
                  <input
                    type="file"
                    id={`attachment-${index}`}
                    onChange={(e) =>
                      handleFileInputChange(index, e?.target?.files?.[0])
                    }
                    hidden
                  />
                  <div className="[w-[70%] h-[200px] flex justify-center gap-[10px]  items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center">
                    <BsFillCloudUploadFill />
                    <span className="text-[14px] font-bold">
                    {translationState?.lan === "En" && language?.uploadAttachment[0]}
                    {translationState?.lan === "Am" && language?.uploadAttachment[1]}
                    </span>
                  </div>
                </label>
              </div>
            )}

            {replyData[index]?.cc === "no" && (
              <div className="w-[100%] my-4 overflow-y-scroll">
                {replyData[index]?.attachment && (
                  <embed
                    src={URL.createObjectURL(replyData[index]?.attachment)}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                )}
              </div>
            )}

            <div className="w-[100%] mt-[20px]">
              <label
                htmlFor="last-name"
                className="block text-sm font-bold p-2 leading-6 text-gray-900"
              >
                {translationState?.lan === "En" && language?.description[0]}
                {translationState?.lan === "Am" && language?.description[1]} (
                {selected?.firstname +
                  " " +
                  selected?.middlename +
                  " " +
                  selected?.lastname}
                )
              </label>
              <div className="mt-2">
               
                <textarea
                  rows={15}
                  id={`remark-${index}`}
                  value={replyData[index]?.remark || ""}
                  onChange={(e) => handleRemarkChange(index, e.target.value)}
                  className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="w-[100%] mt-[30px] py-3 flex justify-end items-center gap-[20px]">
              {loading ? (
                <Loading
                  addtionalStyle={"flex justify-center items-center"}
                />
              ) : (
                <button
                  disabled={loading}
                  className={
                    "w-[50%] mx-auto bg-[#FBB042] my-[20px] border border-[#FBB042] text-white py-3 px-4 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500"
                  }
                  onClick={() => handleReply(index)}
                >
                {translationState?.lan === "En" && language?.reply[0]}
                {translationState?.lan === "Am" && language?.reply[1]}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default ReplyLetter