import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoChevronBack } from "react-icons/io5";
import { language } from "../../../utils/part-1lan";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import { customStyles } from "../../../utils/data";
import apiRequest from "../../../utils/request";
import ServerError from "../../ServerError";
import Loading from "../../Loading";
import { ToastContainer, toast } from "react-toastify";
import { fetchAllOfficeUsers } from "../../../REDUX/slices/getAllOfficeUsersSlice";


function InternalMemoDetail() {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const token = sessionStorage.getItem("tID");
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const officeUserList = useSelector((state) => state.getAllOfficeUsers);
  const [internalTo, setInternalTo] = useState([]);
  const [col, setCol] = useState("1");
  const [colCc,setColcc] = useState("1");
  const [subject, setSubject] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [editorData, setEditorData] = useState("");
  const [internalmemo, setInternalMemo] = useState({});
  const [approvedBy, setApprovedBy] = useState("");
  const [internalCc, setInternalCc] = useState([]);
  const [noInternalMemo,setNoInternalMemo] = useState(false)
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const getinternalMemoData = async () => {
    try {
      setLoading(true);
      apiRequest
        .get(`/internal_memo_api/get_internal_memos/${id}`, {
          headers: {
            get_intmemo_api: process.env.REACT_APP_GET_INTMEMO_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setInternalMemo(res.data);
          setCol(res?.data?.to_whom_col);
          setColcc(res?.data?.internal_cc_col);
          setSubject(res?.data?.subject);
          setApprovedBy(res?.data?.verified_by);
          setEditorData(res?.data?.body);
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if(error?.response?.status ===406){
            setNoInternalMemo(true)
          }
        });
    } catch (error) {
      setLoading(false)
      setServerError(true);
    }
  };

  useEffect(() => {
    getinternalMemoData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterActiveOfficers = officeUserList?.officeUsers?.filter(
    (ou) => ou?.status === "active"
  );

 

  const getFilteredOfficers = (filterActiveOfficers, internalmemo) => {
    const outgoingIds = new Set(
      internalmemo?.to_whom?.map(
        (officer) => officer?.internal_office?._id
      )
    );
    return filterActiveOfficers?.filter(
      (officer) => !outgoingIds?.has(officer?._id)
    );
  };

  const filteredOfficers = getFilteredOfficers(
    filterActiveOfficers,
    internalmemo
  );






  const getFilteredInternalCcOfficers = (filterActiveOfficers, internalmemo) => {
    const outgoingIds = new Set(
      internalmemo?.internal_cc?.map(
        (officer) => officer?.internal_office?._id
      )
    );
    return filterActiveOfficers?.filter(
      (officer) => !outgoingIds?.has(officer?._id)
    );
  };

  const filteredInternalccOfficers = getFilteredInternalCcOfficers(
    filterActiveOfficers,
    internalmemo
  );
  



  const handleEditorChange = (editor) => {
    const data = editor.getData();

    setEditorData(data);
  };

  const handleSelectedChange = (selectedOptions) => {
    setInternalCc(
      selectedOptions?.map((option) => ({
        action: "add",
        value: {
          internal_office: option?._id,
          position: option?.position,
        },
      }))
    );
  };


  
  const handleDetach = async () => {
    try {
      const detachData = new FormData();
      detachData.append("detach_file", "detachAttachment");

      await apiRequest
        .put(`/internal_memo_api/update_internal_memo/${id}`, detachData, {
          headers: {
            get_updintmemo_api: process.env.REACT_APP_GET_UPDINTMEMO_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          translationState?.lan === "En"
            ? toast.success(res?.data?.Message_en)
            : toast.success(res?.data?.Message_am);
            getinternalMemoData();

          setAttachment(null);
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
  };

  const handleSelectedInternalChange = (selectedOptions) => {
    const filteredOptions = selectedOptions.filter(
      (option) => !internalCc.some((ccOption) => ccOption?._id === option?._id)
    );

    setInternalTo(
      filteredOptions?.map((option) => ({
        action: "add",
        value: {
          internal_office: option?._id,
          
        },
      }))
    );
   
  };

  const handleEditinternalmemo = async () => {
    try {
      
      const internalmemoData = new FormData();
      internalmemoData.append("to_whom_col", col);
      internalmemoData.append("internal_cc_col",colCc);
      internalmemoData.append("to_whom", JSON.stringify(internalTo));
      internalmemoData.append("internal_cc", JSON.stringify(internalCc));
      internalmemoData.append("subject", subject);
      internalmemoData.append("body", editorData);
      internalmemoData.append("output_by", approvedBy);
      internalmemoData.append("main_letter_attachment", attachment);

      setLoading(true);

      apiRequest?.put(`/internal_memo_api/update_internal_memo/${id}`, internalmemoData, {
          headers: {
            get_updintmemo_api: process.env.REACT_APP_GET_UPDINTMEMO_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
       
          setLoading(false);
        window.location.href=`/letters/memo/${type}/${id}`
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
      setLoading(false)
      setServerError(true);
    }
  };

  const handleRemove = async (index, type) => {
    try {
      let removeInternalToItem,removeInternalCcItem;

     

      removeInternalToItem = {
        action: "remove",
        value: { _id: internalmemo?.to_whom[index]?._id },
      };
      removeInternalCcItem = {
        action: "remove",
        value: { _id: internalmemo?.internal_cc[index]?._id },
      };

      const updatedToWhomData = new FormData();
    
     
      type === "internalTo" &&
      updatedToWhomData.append("to_whom",JSON.stringify([removeInternalToItem])
        );
        type === "internalCc" &&
        updatedToWhomData.append("internal_cc",JSON.stringify([removeInternalCcItem])
        );

      await apiRequest
        .put(`/internal_memo_api/update_internal_memo/${id}`, updatedToWhomData, {
          headers: {
            get_updintmemo_api: process.env.REACT_APP_GET_UPDINTMEMO_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          translationState?.lan === "En"
            ? toast.success(res?.data?.Message_en)
            : toast.success(res?.data?.Message_am);
            getinternalMemoData();

         
        
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
  };

  if(noInternalMemo) return <div className="w-[80%] mx-auto rounded-[20px] min-h-[200px] py-2 bg-white flex flex-col justify-center items-center  gap-[10px] my-[20px]">
  <span className="font-bold text-[#0C73B8]">
  {translationState?.lan === "En" && language?.noInternalMemo[0]}
  {translationState?.lan === "Am" && language?.noInternalMemo[1]}
  </span>
  <button
              onClick={() => navigate(`/`)}
              className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[10px] font-bold max-lg2:text-[10px]"
            >
              {translationState?.lan === "En" && language?.back[0]}
              {translationState?.lan === "Am" && language?.back[1]}
            </button>
</div>


  if (serverError) return <ServerError />;

  return  loading ? (
      <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />
    ) : (
      <div className="w-[100%] min-h-[100vh] bg-white">
        <ToastContainer theme="light" />
  
        <div className="w-[90%] my-[50px] mx-auto max-lg2:my-[30px]">
          <div className="flex justify-between items-center  gap-[5px]">
            <div className="flex items-center gap-[5px] font-bold text-[#0C73B8]">
              <IoChevronBack
                onClick={() => navigate(-1)}
                className="text-[30px] cursor-pointer"
              />
              <span>
                {" "}
                {translationState?.lan === "En" && language?.letterInformation[0]}
                {translationState?.lan === "Am" &&
                  language?.letterInformation[1]}{" "}
                - {id} ({internalmemo?.status ==="pending" && <span>
                {translationState?.lan === "En" && language?.pending[0]}
                {translationState?.lan === "Am" && language?.pending[1]}
                </span>}
                
             
                {internalmemo?.status ==="verified" && <span>
                {translationState?.lan === "En" && language?.verfied[0]}
                {translationState?.lan === "Am" && language?.verfied[1]}
                </span>})
              </span>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="flex gap-[10px]">
                {type !== "cc" && (
                  <button
                    onClick={() => navigate(`/letters/forward/memo/${id}`)}
                    className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                  >
                    {translationState?.lan === "En" && language?.forward[0]}
                    {translationState?.lan === "Am" && language?.forward[1]}
                  </button>
                )}
  
                {type !== "cc" && (
                  <button
                    onClick={() => navigate(`/letters/reply/memo/${id}`)}
                    className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                  >
                    {translationState?.lan === "En" && language?.reply[0]}
                    {translationState?.lan === "Am" && language?.reply[1]}
                  </button>
                )}
  
                <button
                  onClick={() => navigate(`/letters/forward/path/memo/${id}`)}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.forwardPath[0]}
                  {translationState?.lan === "Am" && language?.forwardPath[1]}
                </button>
                <button
                  onClick={() => navigate(`/letters/reply/path/memo/${id}`)}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.replyPath[0]}
                  {translationState?.lan === "Am" && language?.replyPath[1]}
                </button>
                <button
                  onClick={() =>
                    navigate(`/letters/updatedby/memo/${type}/${id}`)
                  }
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.updatedBy[0]}
                  {translationState?.lan === "Am" && language?.updatedBy[1]}
                </button>
  
                {type !== "cc" && internalmemo?.status === "pending" && (
                  <button
                    onClick={() =>
                      navigate(`/letters/preview/memo/${type}/${id}`)
                    }
                    className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                  >
                    {translationState?.lan === "En" && language?.preview[0]}
                    {translationState?.lan === "Am" && language?.preview[1]}
                  </button>
                )}
  
                {type !== "cc" && internalmemo?.status === "pending" && (
                  <button
                    onClick={handleEditinternalmemo}
                    className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                  >
                    {translationState?.lan === "En" && language?.save[0]}
                    {translationState?.lan === "Am" && language?.save[1]}
                  </button>
                )}
               
                
              </div>
            </div>
          </div>

          
        {type !=="cc"&& internalmemo?.status === "pending" &&   <div className="w-[100%] my-[30px]">
          <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan === "En" && language?.toColumn[0]}
            {translationState?.lan === "Am" && language?.toColumn[1]}{" "}
            <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <select
              required
              type="number"
              value={col}
              onChange={(e) => setCol(e.target.value)}
              className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
            >
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
            </select>
          </div>
        </div> }
  
          {internalmemo?.status === "pending" && (
            <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
              <div className="col-span-2 w-[100%] my-[20px]">
                <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.to[0]}
                  {translationState?.lan === "Am" && language?.to[1]}
                  <span className="text-red-700">*</span>
                </label>
                {type !=="cc" &&    <div className="mt-2">
                  <Select
                    options={filteredOfficers}
                    isMulti
                    placeholder="Select user"
                    getOptionLabel={(e) => e?.position}
                    getOptionValue={(e) => e?._id}
                    styles={customStyles}
                    onChange={handleSelectedInternalChange}
                  />
                </div>}
             
              </div>
            </div>
          )}
  
          <div className="my-[30px] grid grid-cols-2 gap-[10px]">
            <div className="w-[100%] col-span-1 mx-auto flex flex-col gap-[20px]">
              {internalmemo?.status === "pending" &&
                internalmemo?.to_whom && (
                  <div className="flex flex-col">
                    {internalmemo?.to_whom?.map((ou, index) => {
                    
                      return (
                        <div
                          key={index}
                          className="my-[5px] flex items-center gap-[10px]"
                        >
                          <span>
                            {index + 1}. {ou?.internal_office?.position}
                          </span>
  
                          {internalmemo?.status === "pending" && (
                            <button
                             onClick={()=>handleRemove(index,"internalTo")}
                              className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                            >
                              {translationState?.lan === "En" &&
                                language?.remove[0]}
                              {translationState?.lan === "Am" &&
                                language?.remove[1]}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>
          </div>
  
          <div className="flex flex-col">
          {type !=="cc"&& internalmemo?.status === "pending" && <div className="w-[100%] my-[30px]">
        <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
          {translationState?.lan === "En" && language?.ccColumn[0]}
          {translationState?.lan === "Am" && language?.ccColumn[1]} <span className="text-red-700">*</span>
        </label>
        <div className="mt-2">
          <select
            required
            type="number"
            value={colCc}
            onChange={(e)=>setColcc(e.target.value)}
            className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
          >
            <option value={"1"}>1</option>
            <option value={"2"}>2</option>
          </select>
        </div>
      </div>}
            {internalmemo?.status === "pending" && (
              <div className="w-[100%] my-[20px]">
                <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.internalCc[0]}
                  {translationState?.lan === "Am" && language?.internalCc[1]}
                </label>

                {type !=="cc" &&  <div className="mt-2">
                  <Select
                    options={filteredInternalccOfficers}
                    isMulti
                    placeholder="Select user"
                    getOptionLabel={(e) => e?.position}
                    getOptionValue={(e) => e?._id}
                    styles={customStyles}
                    onChange={handleSelectedChange}
                  />
                </div>}
  
               
              </div>
            )}
            {internalmemo?.status === "pending" &&
              internalmemo?.internal_cc && (
                <div className="my-[20px] flex flex-col">
                  {internalmemo?.internal_cc?.map((ou, index) => {
                    const findPosition = filterActiveOfficers?.find(
                      (user) => user?._id === ou?.internal_office?._id
                    )?.position;
                    return (
                      <div
                        key={index}
                        className="my-[5px] flex items-center gap-[10px]"
                      >
                        <span>
                          {index + 1}. {findPosition}
                        </span>
  
                        {internalmemo?.status === "pending" && (
                          <button
                          onClick={()=>handleRemove(index,"internalCc")}
                            className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                          >
                            {translationState?.lan === "En" &&
                              language?.remove[0]}
                            {translationState?.lan === "Am" &&
                              language?.remove[1]}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
          {internalmemo?.status === "pending" && (
            <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
          )}
  
          {internalmemo?.status === "pending" && (
            <div className="w-[100%] my-[20px] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.subject[0]}
                {translationState?.lan === "Am" && language?.subject[1]}{" "}
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <input
                  required
                  value={subject}
                  disabled={type ==="cc"}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
          )}
  
          {internalmemo?.status === "pending" && (
            <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
          )}
  
          <div className="flex flex-col gap-[20px]">
            {internalmemo?.status === "pending" && (
              <div className="w-[100%] mt-[20px]">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
                >
                  {translationState?.lan === "En" && language?.body[0]}
                  {translationState?.lan === "Am" && language?.body[1]}{" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <div className="w-[100%]">
                    <CKEditor
                      data={editorData}
                      disabled ={type ==="cc"}
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          "bold",
                          "italic",
                          "insertTable",
                          "bulletedList",
                          "numberedList",
                        ],
                      }}
                      onChange={(e, editor) => handleEditorChange(editor)}
                      className="custom-editor"
                    />
                  </div>
                </div>
              </div>
            )}
            {internalmemo?.status === "pending" && (
              <div className="w-[100%] my-[20px] col-span-1">
                <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.approvedBy[0]}
                  {translationState?.lan === "Am" && language?.approvedBy[1]}{" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    required
                    disabled={type ==="cc"}
                    value={approvedBy?._id}
                    onChange={(e) => setApprovedBy(e.target.value)}
                    className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  >
                    <option value={""}></option>
                    {filterActiveOfficers?.map((ou, index) => {
                      return (
                        <option key={index} value={ou?._id}>
                          {ou?.position}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}
  
            {type!=="cc" && internalmemo?.status === "pending" &&
              !internalmemo?.main_letter_attachment && (
                <>
                  <div className="w-[100%] mt-[50px] flex flex-col gap-[10px]">
                    <span className="text-[14px] font-bold w-[80%] text-[#0C73B8]">
                      {translationState?.lan === "En" && language?.attachement[0]}
                      {translationState?.lan === "Am" && language?.attachement[1]}
                    </span>
                    <label>
                      <input
                        type="file"
                        onChange={(e) => setAttachment(e.target.files[0])}
                        hidden
                      />
                      <div className="[w-[70%] h-[200px] flex justify-center gap-[10px] text-[#0C73B8]  items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center">
                        <BsFillCloudUploadFill />
                        <span className="text-[14px] font-bold">
                          {translationState?.lan === "En" &&
                            language?.uploadAttachment[0]}
                          {translationState?.lan === "Am" &&
                            language?.uploadAttachment[1]}
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="w-[100%] my-4 overflow-y-scroll">
                    {attachment && attachment !== "" && (
                      <embed
                        src={URL.createObjectURL(attachment)}
                        type="application/pdf"
                        width="100%"
                        height="800px"
                      />
                    )}
                  </div>
                </>
              )}
          </div>
  
          {internalmemo?.status === "pending" && (
            <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
          )}
  
          {internalmemo?.status === "pending" &&
            internalmemo?.main_letter_attachment && (
              <div className="w-[100%] flex flex-col my-[20px]">
                <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                  {translationState?.lan === "En" &&
                    language?.letterAttachment[0]}
                  {translationState?.lan === "Am" &&
                    language?.letterAttachment[1]}{" "}
                  {type !== "cc" && (
                    <button
                      onClick={handleDetach}
                      className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                    >
                      {translationState?.lan === "En" && language?.detach[0]}
                      {translationState?.lan === "Am" && language?.detach[1]}
                    </button>
                  )}
                </span>
                <div className="w-[100%] my-4 overflow-y-scroll">
                  {internalmemo?.main_letter_attachment && (
                    <embed
                      src={`${process.env.REACT_APP_BACKEND_IMAGES}/internalmemoAttachmentFiles/${internalmemo?.main_letter_attachment}`}
                      type="application/pdf"
                      width="100%"
                      height="800px"
                    />
                  )}
                </div>
              </div>
            )}
          {(internalmemo?.status === "verified") && (
            <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
              {internalmemo?.createdBy && (
                <div className="w-[100%] col-span-1">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                    {translationState?.lan === "En" && language?.createdBy[0]}
                    {translationState?.lan === "Am" && language?.createdBy[1]}
                  </label>
                  <div className="mt-2 flex gap-[10px]">
                    <input
                      required
                      value={
                        internalmemo?.createdBy?.firstname +
                        " " +
                        internalmemo?.createdBy?.middlename +
                        " " +
                        internalmemo?.createdBy?.lastname
                      }
                      disabled
                      className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    />
                  </div>
                </div>
              )}
              {internalmemo?.createdBy && (
                <div className="w-[100%] col-span-1">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                    {translationState?.lan === "En" && language?.createdDate[0]}
                    {translationState?.lan === "Am" && language?.createdDate[1]}
                  </label>
                  <div className="mt-2 flex gap-[10px]">
                    <input
                      required
                      value={new Date(internalmemo?.createdAt)?.toDateString()}
                      disabled
                      className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    />
                  </div>
                </div>
              )}
  
              {internalmemo?.verified_by && (
                <div className="w-[100%] col-span-1">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                    {translationState?.lan === "En" && language?.approvedBy[0]}
                    {translationState?.lan === "Am" && language?.approvedBy[1]}
                  </label>
                  <div className="mt-2 flex gap-[10px]">
                    <input
                      required
                      value={
                        internalmemo?.verified_by?.firstname +
                        " " +
                        internalmemo?.verified_by?.middlename +
                        " " +
                        internalmemo?.verified_by?.lastname
                      }
                      disabled
                      className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    />
                  </div>
                </div>
              )}
  
              {internalmemo?.verified_by && (
                <div className="w-[100%] col-span-1">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                    {translationState?.lan === "En" && language?.approvedDate[0]}
                    {translationState?.lan === "Am" && language?.approvedDate[1]}
                  </label>
                  <div className="mt-2 flex gap-[10px]">
                    <input
                      required
                      value={new Date(
                        internalmemo?.verified_date
                      )?.toDateString()}
                      disabled
                      className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    />
                  </div>
                </div>
              )}
  
              {internalmemo?.verified_by && (
                <div className="w-[100%] col-span-1">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                    {translationState?.lan === "En" && language?.verfiedBy[0]}
                    {translationState?.lan === "Am" && language?.verfiedBy[1]}
                  </label>
                  <div className="mt-2 flex gap-[10px]">
                    <input
                      required
                      value={
                        internalmemo?.verified_by?.firstname +
                        " " +
                        internalmemo?.verified_by?.middlename +
                        " " +
                        internalmemo?.verified_by?.lastname
                      }
                      disabled
                      className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    />
                  </div>
                </div>
              )}
  
              {internalmemo?.verfied_by && (
                <div className="w-[100%] col-span-1">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                    {translationState?.lan === "En" && language?.verifiedDate[0]}
                    {translationState?.lan === "Am" && language?.verifiedDate[1]}
                  </label>
                  <div className="mt-2 flex gap-[10px]">
                    <input
                      required
                      value={new Date(
                        internalmemo?.verified_date
                      )?.toDateString()}
                      disabled
                      className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
  

  
          {(internalmemo?.status === "verified") &&
            internalmemo?.main_letter && (
              <div className="w-[100%] flex flex-col my-[20px]">
                <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.mainLetter[0]}
                  {translationState?.lan === "Am" && language?.mainLetter[1]}{" "}
                </span>
                <div className="w-[100%] my-4 overflow-y-scroll">
                  {internalmemo?.main_letter && (
                    <embed
                      src={`${process.env.REACT_APP_BACKEND_IMAGES}/${internalmemo?.main_letter}`}
                      type="application/pdf"
                      width="100%"
                      height="1000px"
                    />
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
  )
}

export default InternalMemoDetail