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
import { previewAction } from "../../../REDUX/slices/previewSlice";

function InternalLetterDetail() {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const token = sessionStorage.getItem("tID");
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const officeUserList = useSelector((state) => state.getAllOfficeUsers);
  const [archivalCategory, setArchivalCategory] = useState([]);
  const [internalTo, setInternalTo] = useState([]);
  const [col, setCol] = useState("1");
  const [colCc,setColcc] = useState("1");
  const [subject, setSubject] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [editorData, setEditorData] = useState("");
  const [internalletter, setInternalLetter] = useState({});
  const [approvedBy, setApprovedBy] = useState("");
  const [internalCc, setInternalCc] = useState([]);
  const [noInternalLetter,setNoInternalLetter] = useState(false)
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/archival_category_api/get_arch_bydocId/${id}/internalLtr`, {
          headers: {
            Authorization: "Token " + token,
            get_docarchcat_api: process.env.REACT_APP_GET_DOCARCHCAT_API,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setServerError(false);
            setArchivalCategory(res?.data);
          }
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
    // eslint-disable-next-line
  }, [id]);

  const getinternalletterData = async () => {
    try {
      setLoading(true);
      apiRequest
        .get(`/internal_ltr_api/get_internal_ltrs/${id}`, {
          headers: {
            get_intltr_api: process.env.REACT_APP_GET_INTLTR_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setInternalLetter(res.data);
          setCol(res?.data?.to_whom_col);
          setColcc(res?.data?.internal_cc_col);
          setSubject(res?.data?.subject);
          setApprovedBy(res?.data?.output_by);
          setEditorData(res?.data?.body);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if(error?.response?.status ===406){
            setNoInternalLetter(true)
          }
        
        });
    } catch (error) {
     setLoading(false);
      setServerError(true);
    }
  };
  useEffect(()=>{
    if(internalletter?.status ==="output" || internalletter?.status ==="verified"){
      dispatch(previewAction.setPreviewRoute(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[internalletter?.status])

  useEffect(() => {
    getinternalletterData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const filterActiveOfficers = officeUserList?.officeUsers?.filter(
    (ou) => ou?.status === "active"
  );

  const getFilteredOfficers = (filterActiveOfficers, internalletter) => {
    const outgoingIds = new Set(
      internalletter?.to_whom?.map(
        (officer) => officer?.internal_office?._id
      )
    );
    return filterActiveOfficers?.filter(
      (officer) => !outgoingIds?.has(officer?._id)
    );
  };

  const filteredOfficers = getFilteredOfficers(
    filterActiveOfficers,
    internalletter
  );


  const getFilteredInternalCcOfficers = (filterActiveOfficers, internalletter) => {
    const outgoingIds = new Set(
      internalletter?.internal_cc?.map(
        (officer) => officer?.internal_office?._id
      )
    );
    return filterActiveOfficers?.filter(
      (officer) => !outgoingIds?.has(officer?._id)
    );
  };

  const filteredInternalccOfficers = getFilteredInternalCcOfficers(
    filterActiveOfficers,
    internalletter
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
        .put(`/internal_ltr_api/update_internal_ltr/${id}`, detachData, {
          headers: {
            get_intltrupd_api: process.env.REACT_APP_GET_INTLTRUPD_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          translationState?.lan === "En"
            ? toast.success(res?.data?.Message_en)
            : toast.success(res?.data?.Message_am);
          getinternalletterData();

          setAttachment(null);
        })
        .catch((error) => {
          setAttachment(null)
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
      (option) => !internalCc.some((ccOption) => ccOption._id === option._id)
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



  const handleEditInternalLetter = async () => {
    try {
      
      const internalLetterData = new FormData();
      internalLetterData.append("to_whom_col", col);
      internalLetterData.append("internal_cc_col",colCc);
      internalLetterData.append("to_whom", JSON.stringify(internalTo));
      internalLetterData.append("internal_cc", JSON.stringify(internalCc));
      internalLetterData.append("subject", subject);
      internalLetterData.append("body", editorData);
      internalLetterData.append("output_by", approvedBy);
      internalLetterData.append("main_letter_attachment", attachment);

      setLoading(true);

      apiRequest
        ?.put(`/internal_ltr_api/update_internal_ltr/${id}`, internalLetterData, {
          headers: {
            get_intltrupd_api: process.env.REACT_APP_GET_INTLTRUPD_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
       
          setLoading(false);
       
         window.location.href=`/letters/internal/${type}/${id}`
        })
        .catch((error) => {
          setAttachment(null)
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


  const handleReverseOuput = async () => {
    try {
    
     
        await apiRequest
        .put(
          `/internal_ltr_api/reverse_internal_ltr/${id}`,
          {},
          {
            headers: {
              get_rvrseintltrupd_api:
                process.env.REACT_APP_GET_RVRSEINTLTRUPD_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          translationState?.lan === "En" && toast.success(res.data.Message_en);
          translationState?.lan === "Am" && toast.success(res.data.Message_am);

          getinternalletterData();
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }

          translationState?.lan === "En" &&
            toast.error(error?.response?.data?.Message_en);
        });

      
    
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  const handleRemove = async (index, type) => {
    try {
      let removeInternalToItem,removeInternalCcItem;

     

      removeInternalToItem = {
        action: "remove",
        value: { _id: internalletter?.to_whom[index]?._id },
      };
      removeInternalCcItem = {
        action: "remove",
        value: { _id: internalletter?.internal_cc[index]?._id },
      };

      const updatedToWhomData = new FormData();
    
     
      type === "internalTo" &&
      updatedToWhomData.append("to_whom",JSON.stringify([removeInternalToItem])
        );
        type === "internalCc" &&
        updatedToWhomData.append("internal_cc",JSON.stringify([removeInternalCcItem])
        );

      await apiRequest
        .put(`/internal_ltr_api/update_internal_ltr/${id}`, updatedToWhomData, {
          headers: {
            get_intltrupd_api: process.env.REACT_APP_GET_INTLTRUPD_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          translationState?.lan === "En"
            ? toast.success(res?.data?.Message_en)
            : toast.success(res?.data?.Message_am);
            getinternalletterData();

         
        
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

  if(noInternalLetter) return <div className="w-[80%] mx-auto rounded-[20px] min-h-[200px] py-2 bg-white flex flex-col justify-center items-center  gap-[10px] my-[20px]">
  <span className="font-bold text-[#0C73B8]">
  {translationState?.lan === "En" && language?.noInternalLetter[0]}
  {translationState?.lan === "Am" && language?.noInternalLetter[1]}
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

  return loading ? (
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
              - {id}   ({internalletter?.status ==="pending" && <span>
                {translationState?.lan === "En" && language?.pending[0]}
                {translationState?.lan === "Am" && language?.pending[1]}
                </span>}
                
             {internalletter?.status ==="output" && <span>
                {translationState?.lan === "En" && language?.approved[0]}
                {translationState?.lan === "Am" && language?.approved[1]}
                </span>}
                {internalletter?.status ==="verified" && <span>
                {translationState?.lan === "En" && language?.verfied[0]}
                {translationState?.lan === "Am" && language?.verfied[1]}
                </span>})
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="flex gap-[10px]">
              {type !== "cc" && (
                <button
                  onClick={() => navigate(`/letters/forward/internal/${id}`)}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.forward[0]}
                  {translationState?.lan === "Am" && language?.forward[1]}
                </button>
              )}

              {type !== "cc" && (
                <button
                  onClick={() => navigate(`/letters/reply/internal/${id}`)}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.reply[0]}
                  {translationState?.lan === "Am" && language?.reply[1]}
                </button>
              )}

              <button
                onClick={() => navigate(`/letters/forward/path/internal/${id}`)}
                className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.forwardPath[0]}
                {translationState?.lan === "Am" && language?.forwardPath[1]}
              </button>
              <button
                onClick={() => navigate(`/letters/reply/path/internal/${id}`)}
                className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.replyPath[0]}
                {translationState?.lan === "Am" && language?.replyPath[1]}
              </button>
              <button
                onClick={() =>
                  navigate(`/letters/updatedby/internal/${type}/${id}`)
                }
                className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.updatedBy[0]}
                {translationState?.lan === "Am" && language?.updatedBy[1]}
              </button>

              {type !== "cc" && internalletter?.status === "pending" && (
                <button
                  onClick={() =>
                    navigate(`/letters/preview/internal/${type}/${id}`)
                  }
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.preview[0]}
                  {translationState?.lan === "Am" && language?.preview[1]}
                </button>
              )}

              {type !== "cc" && internalletter?.status === "pending" && (
                <button
                  onClick={handleEditInternalLetter}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.save[0]}
                  {translationState?.lan === "Am" && language?.save[1]}
                </button>
              )}
              {type!=="cc" && internalletter?.status === "output" && (
                <button
                  onClick={handleReverseOuput}
                  className="py-2 px-4 bg-[#0C73B8] font-bold rounded-[20px] text-white text-[12px] max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.modifyLetter[0]}
                  {translationState?.lan === "Am" && language?.modifyLetter[1]}
                </button>
              )}
              
            </div>
          </div>
        </div>

        {type !=="cc"&& internalletter?.status === "pending" &&   <div className="w-[100%] my-[30px]">
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

        {internalletter?.status === "pending" && (
          <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
            <div className="col-span-2 w-[100%] my-[20px]">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.to[0]}
                {translationState?.lan === "Am" && language?.to[1]}
                <span className="text-red-700">*</span>
              </label>
              {type !=="cc" &&  <div className="mt-2">
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
            {internalletter?.status === "pending" &&
              internalletter?.to_whom && (
                <div className="flex flex-col">
                  {internalletter?.to_whom?.map((ou, index) => {
                   
                    return (
                      <div
                        key={index}
                        className="my-[5px] flex items-center gap-[10px]"
                      >
                        <span>
                          {index + 1}. {ou?.internal_office?.position}
                        </span>

                        {type !=="cc" && internalletter?.status === "pending" && (
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

        <div className="w-[100%] flex flex-col">
          
{type !=="cc"&& internalletter?.status === "pending" && <div className="w-[100%] my-[30px]">
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
          {internalletter?.status === "pending" && (
            <div className="w-[100%] my-[20px]">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.internalCc[0]}
                {translationState?.lan === "Am" && language?.internalCc[1]}
              </label>

              {type !=="cc" && <div className="mt-2">
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
          {internalletter?.status === "pending" &&
            internalletter?.internal_cc && (
              <div className="my-[20px] flex flex-col">
                {internalletter?.internal_cc?.map((ou, index) => {
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

                      {type !=="cc" && internalletter?.status === "pending" && (
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
        {internalletter?.status === "pending" && (
          <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
        )}

        {internalletter?.status === "pending" && (
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

        {internalletter?.status === "pending" && (
          <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
        )}

        <div className="flex flex-col gap-[20px]">
          {internalletter?.status === "pending" && (
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
                    disabled={type ==="cc"}
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
          {internalletter?.status === "pending" && (
            <div className="w-[100%] my-[20px] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.approvedBy[0]}
                {translationState?.lan === "Am" && language?.approvedBy[1]}{" "}
                <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <select
                  required
                  value={approvedBy?._id}
                  disabled={type ==="cc"}
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

          {type !=="cc" &&internalletter?.status === "pending" &&
            !internalletter?.main_letter_attachment && (
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

        {internalletter?.status === "pending" && (
          <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
        )}

        {internalletter?.status === "pending" &&
          internalletter?.main_letter_attachment && (
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
                {internalletter?.main_letter_attachment && (
                  <embed
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/InternalLetterAttachmentFiles/${internalletter?.main_letter_attachment}`}
                    type="application/pdf"
                    width="100%"
                    height="800px"
                  />
                )}
              </div>
            </div>
          )}
        {(internalletter?.status === "output" ||
          internalletter?.status === "verified") && (
          <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
            {internalletter?.createdBy && (
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
                      internalletter?.createdBy?.firstname +
                      " " +
                      internalletter?.createdBy?.middlename +
                      " " +
                      internalletter?.createdBy?.lastname
                    }
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}
            {internalletter?.createdBy && (
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
                    value={new Date(internalletter?.createdAt)?.toDateString()}
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {internalletter?.output_by && (
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
                      internalletter?.output_by?.firstname +
                      " " +
                      internalletter?.output_by?.middlename +
                      " " +
                      internalletter?.output_by?.lastname
                    }
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {internalletter?.output_by && (
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
                      internalletter?.output_date
                    )?.toDateString()}
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {internalletter?.verified_by && (
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
                      internalletter?.verified_by?.firstname +
                      " " +
                      internalletter?.verified_by?.middlename +
                      " " +
                      internalletter?.verified_by?.lastname
                    }
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {internalletter?.verfied_by && (
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
                      internalletter?.verified_date
                    )?.toDateString()}
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}
          </div>
        )}

{archivalCategory?.length > 0 &&  <div className="w-[100%] col-span-1">
         <label
      
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.archivalCategory[0]}
        {translationState?.lan==="Am" && language?.archivalCategory[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
    
             <div  className="block flex-1 rounded-md p-4 border-0  bg-gray-100  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]">
            {archivalCategory?.map((archive,index)=>{
              return <div key={index}>
            
       
              
              <span>
              <span>{index + 1}. {" "}</span>{" "}
              {translationState?.lan==="En" && archive?.name_en}
              {translationState?.lan==="Am" && archive?.name_am}
              {" "}

              </span>
              </div>
             
                 })}
            </div>
       
        
         </div>
       </div>}

        {(internalletter?.status === "output" ||
          internalletter?.status === "verified") &&
          internalletter?.main_letter && (
            <div className="w-[100%] flex flex-col my-[20px]">
              <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.mainLetter[0]}
                {translationState?.lan === "Am" && language?.mainLetter[1]}{" "}
              </span>
              <div className="w-[100%] my-4 overflow-y-scroll">
                {internalletter?.main_letter && (
                  <embed
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/${internalletter?.main_letter}`}
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
  );
}

export default InternalLetterDetail;
