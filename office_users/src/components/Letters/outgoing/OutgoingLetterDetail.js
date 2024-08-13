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

function OutgoingLetterDetail() {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const token = sessionStorage.getItem("tID");
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const officeUserList = useSelector((state) => state.getAllOfficeUsers);
  const [archivalCategory, setArchivalCategory] = useState([]);
  const [tos, setTos] = useState("");
  const [ccs, setCcs] = useState("");
  const [col, setCol] = useState("1");
  const [colCc,setColcc] = useState("1");
  const [subject, setSubject] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [editorData, setEditorData] = useState("");
  const [outgoingletter, setOutgoingLetter] = useState({});
  const [organizations, setOrganizations] = useState([]);
  const [outsideOrg, setOutsideOrg] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [externalEditIndex, setExternalEditIndex] = useState(null);
  const [letterData, setLetterData] = useState([]);
  const [externalCcData, setExternalCcData] = useState([]);
  const [internalCc, setInternalCc] = useState([]);
  const [noOutgoingLetter,setNoOutgoingLetter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);


  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/archival_category_api/get_arch_bydocId/${id}/outgoingLtr`, {
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



  const getOutgoingLetterData = async () => {
    try {
      setLoading(true);
      apiRequest
        .get(`/outgoing_ltr_api/get_output_ltrs/${id}`, {
          headers: {
            get_outputltr_api: process.env.REACT_APP_GET_OUTPUTLTR_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setOutgoingLetter(res.data);
          setSubject(res?.data?.subject);
          setExternalCcData(res?.data?.external_cc);
          setLetterData(res?.data?.to_whom);
          setCol(res?.data?.to_whom_col);
          setColcc(res?.data?.internal_cc_col);
          setEditorData(res?.data?.body);
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if(error?.response?.status ===406){
            setNoOutgoingLetter(true);
          }
        });
    } catch (error) {
      setLoading(false)
      setServerError(true);
    }
  };

  useEffect(() => {
    getOutgoingLetterData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  useEffect(()=>{
    if(outgoingletter?.status ==="output" || outgoingletter?.status ==="verified"){
      dispatch(previewAction.setPreviewRoute(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[outgoingletter?.status])

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterActiveOfficers = officeUserList?.officeUsers?.filter((ou)=>ou?.status==="active");
  
  const getFilteredOfficers = (filterActiveOfficers, outgoingletter) => {
    const outgoingIds = new Set(
      outgoingletter?.internal_cc?.map(
        (officer) => officer?.internal_office?._id
      )
    );
    return filterActiveOfficers?.filter(
      (officer) => !outgoingIds?.has(officer?._id)
    );
  };

  const filteredOfficers = getFilteredOfficers(
    filterActiveOfficers,
    outgoingletter
  );

  const handleAddInputChange = (index, field, value) => {
    const updatedOrganizations = [...organizations];

    if (!updatedOrganizations[index]) {
      updatedOrganizations[index] = {
        action: "add",
        value: { org_name: "", location: "" },
      };
    }

    updatedOrganizations[index].value[field] = value;

    setOrganizations(updatedOrganizations);
  };

  const handleInputChange = (index, field, value) => {
    const updatedLetters = [...letterData];
    updatedLetters[index] = {
      ...updatedLetters[index],
      [field]: value,
    };
    setLetterData(updatedLetters);
  };

  const handleExternalAddInputChange = (index, field, value) => {
    const updatedOutsideOrganizations = [...outsideOrg];

    if (!updatedOutsideOrganizations[index]) {
      updatedOutsideOrganizations[index] = {
        action: "add",
        value: { org_name: "", location: "" },
      };
    }

    updatedOutsideOrganizations[index].value[field] = value;

    setOutsideOrg(updatedOutsideOrganizations);
  };

  const handleExternalInputChange = (index, field, value) => {
    const updatedLetters = [...externalCcData];
    updatedLetters[index] = {
      ...updatedLetters[index],
      [field]: value,
    };
    setExternalCcData(updatedLetters);
  };

  const toggleEdit = (index) => {
    setEditIndex(index === editIndex ? null : index);
  };
  const toggleExternalCcEdit = (index) => {
    setExternalEditIndex(index === externalEditIndex ? null : index);
  };
  const handleEditorChange = (editor) => {
    const data = editor.getData();

    setEditorData(data);
  };
  const handleNumberOfSelectablesChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setTos(count);
  };
  const handleNumberOfCcSelectablesChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setCcs(count);
  };

  const handleSelectedChange = (selectedOptions) => {
    setInternalCc(
      selectedOptions?.map((option) => ({
        action: "add",
        value: {
          internal_office: option._id,
          position: option.position,
        },
      }))
    );
  };

  const handleDetach = async () => {
    try {
      const detachData = new FormData();
      detachData.append("detach_file", "detachAttachment");

      await apiRequest
        .put(`/outgoing_ltr_api/update_output_ltr/${id}`, detachData, {
          headers: {
            get_updoutputltr_api: process.env.REACT_APP_GET_UPDOUTPUTLTR_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Res: ",res?.data)
          translationState?.lan === "En"
            ? toast.success(res?.data?.Message_en)
            : toast.success(res?.data?.Message_am);
          getOutgoingLetterData();
          setAttachment(null)
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }

          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });

      setEditIndex(null);
      setExternalEditIndex(null);
    } catch (error) {
      setServerError(true);
    }
  };

  const handleSave = async () => {
    try {
      const outgoingData = new FormData();
      outgoingData.append("to_whom_col", col);
      outgoingData.append("internal_cc_col",colCc);
      outgoingData.append("subject", subject);
      outgoingData.append("body", editorData);
      outgoingData.append("internal_cc", JSON.stringify(internalCc));
      outgoingData.append("main_letter_attachment", attachment);

      setLoading(true)

      await apiRequest
        .put(`/outgoing_ltr_api/update_output_ltr/${id}`, outgoingData, {
          headers: {
            get_updoutputltr_api: process.env.REACT_APP_GET_UPDOUTPUTLTR_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then(() => {
          setLoading(false)
         
             window.location.href=`/letters/outgoing/${type}/${id}`
        })
        .catch((error) => {
          setLoading(false)
       

          if (error?.response?.status === 500) {
            setServerError(true);
          }

          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });

      setEditIndex(null);
      setExternalEditIndex(null);
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  const handleUpdate = async (index, action, type,data) => {
    try {
      let updatedItem,
        removeItem,
        updatedExternalItem,
        removedExternalItem,
        removeInternalItem;

      updatedItem = {
        action: action,
        value: letterData[index],
      };
      removeItem = {
        action: "remove",
        value:{_id:letterData[index]?._id},
      };

      updatedExternalItem = {
        action: "update",
        value: externalCcData[index],
      };
      removedExternalItem = {
        action: "remove",
        value: externalCcData[index],
      };

      removeInternalItem = {
        action: "remove",
        value: { _id: outgoingletter?.internal_cc[index]?._id },
      };

      const updatedToWhomData = new FormData();
      action === "add" &&
        updatedToWhomData.append("to_whom", JSON.stringify(organizations));
      action === "update" &&
        updatedToWhomData.append("to_whom", JSON.stringify([updatedItem]));
      action === "remove" &&
        updatedToWhomData.append("to_whom", JSON.stringify([removeItem]));

      action === "add" &&
        updatedToWhomData.append("external_cc", JSON.stringify(outsideOrg));
      action === "update" &&
        updatedToWhomData.append(
          "external_cc",
          JSON.stringify([updatedExternalItem])
        );
      action === "remove" &&
        updatedToWhomData.append(
          "external_cc",
          JSON.stringify([removedExternalItem])
        );

      type === "internal" &&
        action === "removeInternal" &&
        updatedToWhomData.append(
          "internal_cc",
          JSON.stringify([removeInternalItem])
        );

      await apiRequest
        .put(`/outgoing_ltr_api/update_output_ltr/${id}`, updatedToWhomData, {
          headers: {
            get_updoutputltr_api: process.env.REACT_APP_GET_UPDOUTPUTLTR_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          
          getOutgoingLetterData();

          if (type === "towhom") {
            if (action === "add") {
              setTos(0);
              setOrganizations([]);
            }
            setEditIndex(null);
          }

          if (type === "external") {
            if (action === "add") {
              setCcs(0);
              setOutsideOrg([]);
            }
            setExternalEditIndex(null);
          }
        })
        .catch((error) => {
     

          if (error?.response?.status === 500) {
            setServerError(true);
          }

          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });

      setEditIndex(null);
      setExternalEditIndex(null);
    } catch (error) {
      setServerError(true);
    }
  };

  const handleTORemove = async (index)=>{
    try {
      let removeItem;
       

      removeItem = {
        action: "remove",
        value:{_id:letterData[index]?._id},
      };

  
    
      const updatedToWhomData = new FormData();
        updatedToWhomData.append("to_whom", JSON.stringify([removeItem]));

     

     

      await apiRequest
        .put(`/outgoing_ltr_api/update_output_ltr/${id}`, updatedToWhomData, {
          headers: {
            get_updoutputltr_api: process.env.REACT_APP_GET_UPDOUTPUTLTR_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          translationState?.lan === "En"
            ? toast.success(res?.data?.Message_en)
            : toast.success(res?.data?.Message_am);
          getOutgoingLetterData();

          if (type === "towhom") {
            
            setEditIndex(null);
          }

         
        })
        .catch((error) => {
        

          if (error?.response?.status === 500) {
            setServerError(true);
          }

          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });

      setEditIndex(null);
      setExternalEditIndex(null);
    } catch (error) {
      setServerError(true);
    }

  }

  const handleReverseOuput =async ()=>{
    try {
 
        await apiRequest.put(`/outgoing_ltr_api/reverse_output_ltr/${id}`,{},{headers:{
            get_outputltrsign_api:process.env.REACT_APP_GET_OUTPUTLTRSIGN_API,
          Authorization:`Bearer ${token}`
  
        }}).then((res)=>{
       
          translationState?.lan ==="En" &&  toast.success(res.data.Message_en)
          translationState?.lan ==="Am" &&  toast.success(res.data.Message_am)
  
          getOutgoingLetterData();
        
          
      
        }).catch((error)=>{
          setLoading(false)
          if(error?.response?.status === 500){
            setServerError(true)
          }
  
          translationState?.lan ==="En" &&  toast.error(error?.response?.data?.Message_en)
        })
  
        
      } catch (error) {
        setLoading(false);
        setServerError(true)
        
      }
  }
  if(noOutgoingLetter) return <div className="w-[80%] mx-auto rounded-[20px] min-h-[200px] py-2 bg-white flex flex-col justify-center items-center  gap-[10px] my-[20px]">
    <span className="font-bold text-[#0C73B8]">
    {translationState?.lan === "En" && language?.noOutgoingLetter[0]}
    {translationState?.lan === "Am" && language?.noOutgoingLetter[1]}
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
              - {id}
              {" "}

              ({outgoingletter?.status ==="pending" && <span>
                {translationState?.lan === "En" && language?.pending[0]}
                {translationState?.lan === "Am" && language?.pending[1]}
                </span>}
                
             {outgoingletter?.status ==="output" && <span>
                {translationState?.lan === "En" && language?.approved[0]}
                {translationState?.lan === "Am" && language?.approved[1]}
                </span>}
                {outgoingletter?.status ==="verified" && <span>
                {translationState?.lan === "En" && language?.verfied[0]}
                {translationState?.lan === "Am" && language?.verfied[1]}
                </span>})
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            

            <div className="flex gap-[10px]">
              {type !== "cc" && (
                <button
                  onClick={() => navigate(`/letters/forward/outgoing/${id}`)}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.forward[0]}
                  {translationState?.lan === "Am" && language?.forward[1]}
                </button>
              )}

              {type !== "cc" && (
                <button
                  onClick={() => navigate(`/letters/reply/outgoing/${id}`)}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.reply[0]}
                  {translationState?.lan === "Am" && language?.reply[1]}
                </button>
              )}

              <button
                onClick={() => navigate(`/letters/forward/path/outgoing/${id}`)}
                className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.forwardPath[0]}
                {translationState?.lan === "Am" && language?.forwardPath[1]}
              </button>
              <button
                onClick={() => navigate(`/letters/reply/path/outgoing/${id}`)}
                className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.replyPath[0]}
                {translationState?.lan === "Am" && language?.replyPath[1]}
              </button>
              <button
                onClick={() => navigate(`/letters/updatedby/outgoing/${type}/${id}`)}
                className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.updatedBy[0]}
                {translationState?.lan === "Am" && language?.updatedBy[1]}
              </button>

              {type !== "cc" && outgoingletter?.status ==="pending"  && (
                <button
                  onClick={() => navigate(`/letters/preview/outgoing/${type}/${id}`)}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.preview[0]}
                  {translationState?.lan === "Am" && language?.preview[1]}
                </button>
              )}

              {type !== "cc" && outgoingletter?.status === "pending" && (
                <button
                  onClick={handleSave}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.save[0]}
                  {translationState?.lan === "Am" && language?.save[1]}
                </button>
              )}
            {type !== "cc" && outgoingletter?.status ==="output" &&  <button onClick={handleReverseOuput}  className="py-2 px-4 bg-[#0C73B8] font-bold rounded-[20px] text-white text-[12px] max-lg2:text-[10px]">
            {translationState?.lan==="En" && language?.modifyLetter[0]} 
            {translationState?.lan==="Am" && language?.modifyLetter[1]}
              </button>}
          
            </div>
          </div>
        </div>

        {type !=="cc"&& outgoingletter?.status === "pending" &&   <div className="w-[100%] my-[30px]">
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
      

        {type !=="cc"&& outgoingletter?.status === "pending" && (
          <div className="w-[100%] my-[30px]">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan === "En" && language?.noOftos[0]}
              {translationState?.lan === "Am" && language?.noOftos[1]}{" "}
              <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                type="number"
              
                onChange={handleNumberOfSelectablesChange}
                min={0}
                className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>
        )}

        {type!=="cc" && outgoingletter?.status === "pending" && (
          <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
            {Array?.from({ length: tos }).map((_, index) => (
              <div
                key={index}
                className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-lg2:mt-5"
              >
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8]">
                    {translationState?.lan === "En" && language?.to[0]}
                    {translationState?.lan === "Am" && language?.to[1]}{" "}
                    {index + 1} <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="w-[90%] mx-auto flex flex-col gap-[20px]">
                  <div className="col-span-3 flex flex-col gap-[10px]">
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Organization name"
                        onChange={(e) =>
                          handleAddInputChange(
                            index,
                            "org_name",
                            e.target.value
                          )
                        }
                        className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 text-[14px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Location"
                        onChange={(e) =>
                          handleAddInputChange(
                            index,
                            "location",
                            e.target.value
                          )
                        }
                        className="block w-full rounded-md p-2 border-0 py-3 text-[14px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {type!=="cc" && outgoingletter?.status === "pending" &&
              organizations?.length > 0 && parseInt(tos) > 0 && (
                <button
                  onClick={() => handleUpdate(0, "add")}
                  className="w-[50%] mx-auto py-3  px-4 col-span-2 my-[20px] text-[12px] text-white bg-[#0C73B8] rounded-[5px] font-bold max-lg2:w-[60%] max-lg1:w-[70%] max-lg1:-w-[90%] max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.add[0]}
                  {translationState?.lan === "Am" && language?.add[1]}
                </button>
              )}
          </div>
        )}

        <div className="my-[30px] grid grid-cols-2 gap-[10px]">
          {outgoingletter?.status === "pending" &&
            letterData &&
            letterData?.map((towhom, index) => (
              <div
                key={index}
                className="w-[100%] col-span-1 mx-auto flex flex-col gap-[20px]"
              >
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8]">
                    {translationState?.lan === "En" && language?.to[0]}
                    {translationState?.lan === "Am" && language?.to[1]}{" "}
                    {index + 1} <span className="text-red-700">*</span>
                  </span>
                </div>
                <div className="col-span-3 flex flex-col gap-[10px] border border-[#0C73B8] border-dashed p-3 rounded-[10px]">
                  <div className="mt-2 flex flex-col gap-[10px]">
                    <div className="flex items-center gap-[10px]">
                      <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                        {translationState?.lan === "En" &&
                          language?.organizationname[0]}
                        {translationState?.lan === "Am" &&
                          language?.organizationname[1]}
                      </span>

                      {type!=="cc" && outgoingletter?.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleTORemove(index)
                            }
                            className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                          >
                            {translationState?.lan === "En" &&
                              language?.remove[0]}
                            {translationState?.lan === "Am" &&
                              language?.remove[1]}
                          </button>
                          {editIndex !== index && (
                            <button
                              onClick={() => toggleEdit(index)}
                              className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                            >
                              {translationState?.lan === "En" &&
                                language?.edit[0]}
                              {translationState?.lan === "Am" &&
                                language?.edit[1]}
                            </button>
                          )}
                        </>
                      )}

                      {type!=="cc"&& outgoingletter?.status === "pending" &&
                        editIndex === index && (
                          <button
                            onClick={() =>
                              handleUpdate(index, "update", "towhom")
                            }
                            className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                          >
                            {translationState?.lan === "En" &&
                              language?.update[0]}
                            {translationState?.lan === "Am" &&
                              language?.update[1]}
                          </button>
                        )}
                    </div>

                    <input
                      type="text"
                      value={towhom?.org_name}
                      onChange={(e) =>
                        handleInputChange(index, "org_name", e.target.value)
                      }
                      disabled={editIndex !== index}
                      className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 text-[14px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                    />
                  </div>
                  <div className="mt-2">
                    <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                      {translationState?.lan === "En" && language?.location[0]}
                      {translationState?.lan === "Am" && language?.location[1]}
                    </span>
                    <input
                      type="text"
                      value={towhom?.location}
                      onChange={(e) =>
                        handleInputChange(index, "location", e.target.value)
                      }
                      disabled={editIndex !== index}
                      className="block w-full rounded-md p-2 border-0 py-3 text-[14px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        {outgoingletter?.status === "pending" && (
          <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
        )}

{type !=="cc"&& outgoingletter?.status === "pending" && <div className="w-[100%] my-[30px]">
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
        


        <div className="w-[100%] my-[20px]">
          {type !=="cc"&& outgoingletter?.status === "pending" && (
            <div className="w-[100%]">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.noOfExternalCC[0]}
                {translationState?.lan === "Am" && language?.noOfExternalCC[1]}
              </label>

              <div className="mt-2">
                <input
                  required
                  type="number"
                  onChange={handleNumberOfCcSelectablesChange}
                  min={0}
                  className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
          )}

          {type!=="cc" && outgoingletter?.status === "pending" && (
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
              {Array.from({ length: ccs }).map((_, index) => (
                <div
                  key={index}
                  className="w-[90%] col-span-1 mx-auto mt-10  max-lg2:mt-5"
                >
                  <div className="flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8]">
                      {translationState?.lan === "En" && language?.cc[0]}
                      {translationState?.lan === "Am" && language?.cc[1]}{" "}
                      {index + 1} <span className="text-red-700">*</span>
                    </span>
                  </div>
                  <div className="w-[90%] mx-auto flex flex-col gap-[20px]">
                    <div className="col-span-3 flex flex-col gap-[10px]">
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Organization name"
                          onChange={(e) =>
                            handleExternalAddInputChange(
                              index,
                              "org_name",
                              e.target.value
                            )
                          }
                          className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 text-[14px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Location"
                          onChange={(e) =>
                            handleExternalAddInputChange(
                              index,
                              "location",
                              e.target.value
                            )
                          }
                          className="block w-full rounded-md p-2 border-0 py-3 text-[14px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex col-span-2 justify-center items-center">
                {type!=="cc" && outsideOrg?.length > 0 && (
                  <button
                    onClick={() => handleUpdate(0, "add", "external")}
                    className="w-[50%] mx-auto py-3  px-4 col-span-2 my-[20px] text-[12px] text-white bg-[#0C73B8] rounded-[5px] font-bold max-lg2:w-[60%] max-lg1:w-[70%] max-lg1:-w-[90%] max-lg2:text-[10px]"
                  >
                    {translationState?.lan === "En" && language?.add[0]}
                    {translationState?.lan === "Am" && language?.add[1]}
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-[10px]">
            {outgoingletter?.status === "pending" &&
              externalCcData &&
              externalCcData?.map((excc, index) => (
                <div
                  key={index}
                  className="w-[100%] col-span-1 mx-auto flex flex-col gap-[20px]"
                >
                  <div className="flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8]">
                      {translationState?.lan === "En" && language?.cc[0]}
                      {translationState?.lan === "Am" && language?.cc[1]}{" "}
                      {index + 1} <span className="text-red-700">*</span>
                    </span>
                  </div>
                  <div className="col-span-3 flex flex-col gap-[10px] border border-gray-400 border-dashed p-3 rounded-[10px]">
                    <div className="mt-2 flex flex-col gap-[10px]">
                      <div className="flex items-center gap-[10px]">
                        <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                          {translationState?.lan === "En" &&
                            language?.organizationname[0]}
                          {translationState?.lan === "Am" &&
                            language?.organizationname[1]}
                        </span>
                        {type!=="cc" && outgoingletter?.status === "pending" && (
                          <button
                            onClick={() =>
                              handleUpdate(index, "remove", "external")
                            }
                            className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                          >
                            {translationState?.lan === "En" &&
                              language?.remove[0]}
                            {translationState?.lan === "Am" &&
                              language?.remove[1]}
                          </button>
                        )}

                        {outgoingletter?.status === "pending" &&
                          externalEditIndex !== index && (
                            <button
                              onClick={() => toggleExternalCcEdit(index)}
                              className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                            >
                              {translationState?.lan === "En" &&
                                language?.edit[0]}
                              {translationState?.lan === "Am" &&
                                language?.edit[1]}
                            </button>
                          )}
                        {outgoingletter?.status === "pending" &&
                          externalEditIndex === index && (
                            <button
                              onClick={() =>
                                handleUpdate(index, "update", "external")
                              }
                              className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                            >
                              {translationState?.lan === "En" &&
                                language?.update[0]}
                              {translationState?.lan === "Am" &&
                                language?.update[1]}
                            </button>
                          )}
                      </div>

                      <input
                        type="text"
                        value={excc?.org_name}
                        onChange={(e) =>
                          handleExternalInputChange(
                            index,
                            "org_name",
                            e.target.value
                          )
                        }
                        disabled={externalEditIndex !== index}
                        className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 text-[14px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                      />
                    </div>
                    <div className="mt-2">
                      <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                        {translationState?.lan === "En" &&
                          language?.location[0]}
                        {translationState?.lan === "Am" &&
                          language?.location[1]}
                      </span>
                      <input
                        type="text"
                        value={excc?.location}
                        onChange={(e) =>
                          handleExternalInputChange(
                            index,
                            "location",
                            e.target.value
                          )
                        }
                        disabled={externalEditIndex !== index}
                        className="block w-full rounded-md p-2 border-0 py-3 text-[14px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {outgoingletter?.status === "pending" && (
          <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
        )}

        <div className="flex flex-col">
          {outgoingletter?.status === "pending" && (
            <div className="w-[100%] my-[20px]">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.internalCc[0]}
                {translationState?.lan === "Am" && language?.internalCc[1]}
              </label>
              {type !=="cc" &&  <div className="mt-2">
                <Select
                  options={filteredOfficers}
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
          {outgoingletter?.status === "pending" &&
            outgoingletter?.internal_cc && (
              <div className="my-[20px] flex flex-col">
                {outgoingletter?.internal_cc?.map((ou, index) => {
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

                      {type!=="cc"&& outgoingletter?.status === "pending" && (
                        <button
                          onClick={() =>
                            handleUpdate(index, "removeInternal", "internal")
                          }
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
        {outgoingletter?.status === "pending" && (
          <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
        )}

        {outgoingletter?.status === "pending" && (
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

        {outgoingletter?.status === "pending" && (
          <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
        )}

        <div className="flex flex-col gap-[20px]">
          {outgoingletter?.status === "pending" && (
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
                    editor={ClassicEditor}
                    disabled={type ==="cc"}
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

          {type!=="cc" && outgoingletter?.status === "pending" &&
            !outgoingletter?.main_letter_attachment && (
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

        {outgoingletter?.status === "pending" && (
          <div className="w-[100%] h-[1px] my-[30px] border border-gray-300 border-dashed" />
        )}

        { outgoingletter?.status === "pending" &&
          outgoingletter?.main_letter_attachment && (
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
                {outgoingletter?.main_letter_attachment && (
                  <embed
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/OutgoingLetterAttachmentFiles/${outgoingletter?.main_letter_attachment}`}
                    type="application/pdf"
                    width="100%"
                    height="800px"
                  />
                )}
              </div>
            </div>
          )}
{(outgoingletter?.status ==="output" || outgoingletter?.status ==="verified") && 
        <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
          {outgoingletter?.createdBy && (
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
                    outgoingletter?.createdBy?.firstname +
                    " " +
                    outgoingletter?.createdBy?.middlename +
                    " " +
                    outgoingletter?.createdBy?.lastname
                  }
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
          )}
          {outgoingletter?.createdBy && (
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
                  value={new Date(outgoingletter?.createdAt)?.toDateString()}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
          )}

          {outgoingletter?.output_by && (
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
                    outgoingletter?.output_by?.firstname +
                    " " +
                    outgoingletter?.output_by?.middlename +
                    " " +
                    outgoingletter?.output_by?.lastname
                  }
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
          )}

          {outgoingletter?.output_by && (
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
                  value={new Date(outgoingletter?.output_date)?.toDateString()}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
          )}

          {outgoingletter?.verified_by && (
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
                    outgoingletter?.verified_by?.firstname +
                    " " +
                    outgoingletter?.verified_by?.middlename +
                    " " +
                    outgoingletter?.verified_by?.lastname
                  }
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
          )}

          {outgoingletter?.verfied_by && (
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
                    outgoingletter?.verified_date
                  )?.toDateString()}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
          )}
        </div>}
        {archivalCategory?.length > 0 && (
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan === "En" && language?.archivalCategory[0]}
              {translationState?.lan === "Am" && language?.archivalCategory[1]}
            </label>
            <div className="mt-2 flex gap-[10px]">
              <div className="block flex-1 rounded-md p-4 border-0  bg-gray-100  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]">
                {archivalCategory?.map((archive, index) => {
                  return (
                    <div key={index}>
                      <span
                       
                      >
                        <span>{index + 1}. </span>{" "}
                        {translationState?.lan === "En" && archive?.name_en}
                        {translationState?.lan === "Am" &&
                          archive?.name_am}{" "}
                      
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {(outgoingletter?.status ==="output" || outgoingletter?.status ==="verified") && outgoingletter?.main_letter && (
          <div className="w-[100%] flex flex-col my-[20px]">
            <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan === "En" && language?.mainLetter[0]}
              {translationState?.lan === "Am" && language?.mainLetter[1]}{" "}
            </span>
            <div className="w-[100%] my-4 overflow-y-scroll">
              {outgoingletter?.main_letter && (
                <embed
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/${outgoingletter?.main_letter}`}
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

export default OutgoingLetterDetail;
