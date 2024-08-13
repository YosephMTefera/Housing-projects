import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { language } from "../../../utils/part-1lan";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import { customStyles } from "../../../utils/data";
import { ToastContainer, toast } from "react-toastify";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { fetchAllOfficeUsers } from "../../../REDUX/slices/getAllOfficeUsersSlice";
import ServerError from "../../ServerError";
import apiRequest from "../../../utils/request";
import Loading from "../../Loading";

function CreateOutgoingLetter() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage?.getItem("tID");
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const officeUserList = useSelector((state) => state.getAllOfficeUsers);
  const [tos, setTos] = useState("");
  const [ccs, setCcs] = useState("");
  const [col, setCol] = useState("1");
  const [colCc,setColcc] = useState("1");
  const [subject, setSubject] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [ccOrgs, setCcOrgs] = useState([]);
  const [internalCc, setInternalCc] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [editorData, setEditorData] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterActiveOfficers = officeUserList?.officeUsers?.filter(
    (ou) => ou?.status === "active"
  );

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

  const handleInputChange = (index, field, value) => {
    const updatedCcOrganizations = [...organizations];

    if (!updatedCcOrganizations[index]) {
      updatedCcOrganizations[index] = {};
    }
    updatedCcOrganizations[index][field] = value;

    setOrganizations(updatedCcOrganizations);
  };

  const handleInputCcChange = (index, field, value) => {
    const updatedOrganizations = [...ccOrgs];

    if (!updatedOrganizations[index]) {
      updatedOrganizations[index] = {};
    }
    updatedOrganizations[index][field] = value;
    setCcOrgs(updatedOrganizations);
  };

  const handleSelectedChange = (selectedOptions) => {
    setInternalCc(
      selectedOptions?.map((option) => ({
        internal_office: option?._id,
      }))
    );
  };

  const handleCreateOutgoingLetter = async () => {
    try {
      const outgoingLetterData = new FormData();
      outgoingLetterData.append("to_whom_col", col);
      outgoingLetterData.append("internal_cc_col",colCc);
      outgoingLetterData.append("to_whom", JSON.stringify(organizations));
      outgoingLetterData.append("subject", subject);
      outgoingLetterData.append("body", editorData);
      outgoingLetterData.append("external_cc", JSON.stringify(ccOrgs));
      outgoingLetterData.append("internal_cc", JSON.stringify(internalCc));
      outgoingLetterData.append("main_letter_attachment", attachment);

      setLoading(true);

      apiRequest
        ?.post("/outgoing_ltr_api/create_output_ltr", outgoingLetterData, {
          headers: {
            get_croutputltr_api: process.env.REACT_APP_GET_CROUTPUTLTR_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          window.location.href = "/letters/outgoing/created-letters";
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
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;

  return (
    <div className="w-[95%]  my-[20px] mx-auto bg-white rounded-[10px]">
      <ToastContainer theme="light" />
      <div className="w-[90%] mx-auto my-[50px] max-lg2:my-[30px]">
        <div className="flex justify-between items-center border-b border-gray-300 py-4">
          <div className="flex items-center gap-[5px] font-bold text-[#0C73B8]">
            <IoChevronBack
              onClick={() => navigate(-1)}
              className="text-[30px] cursor-pointer max-lg2:text-[20px]"
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px] notosans">
              {translationState?.lan === "En" &&
                language?.createOutgoingLetter[0]}
              {translationState?.lan === "Am" &&
                language?.createOutgoingLetter[1]}{" "}
              ለ ደብዳቤ {id}
            </span>
          </div>
        </div>

        <div className="w-[100%] my-[30px]">
          <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan === "En" && language?.toColumn[0]}
            {translationState?.lan === "Am" && language?.toColumn[1]}{" "}
            <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <select
              required
              type="number"
              onChange={(e) => setCol(e.target.value)}
              className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
            >
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
            </select>
          </div>
        </div>

        <div className="w-[100%]">
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
              className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
            />
          </div>
        </div>

        <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
          {Array.from({ length: tos }).map((_, index) => (
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
                        handleInputChange(index, "org_name", e.target.value)
                      }
                      className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 text-[14px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Location"
                      onChange={(e) =>
                        handleInputChange(index, "location", e.target.value)
                      }
                      className="block w-full rounded-md p-2 border-0 py-3 text-[14px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[100%] my-[30px]">
        <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
          {translationState?.lan === "En" && language?.ccColumn[0]}
          {translationState?.lan === "Am" && language?.ccColumn[1]} <span className="text-red-700">*</span>
        </label>
        <div className="mt-2">
          <select
            required
            type="number"
            onChange={(e)=>setColcc(e.target.value)}
            className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
          >
            <option value={"1"}>1</option>
            <option value={"2"}>2</option>
          </select>
        </div>
      </div>

        <div className="w-[100%] my-[20px]">
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
                className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>

          <div className="mt-2">
            {Array.from({ length: ccs }).map((_, index) => (
              <div
                key={index}
                className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-lg2:mt-5"
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
                          handleInputCcChange(index, "org_name", e.target.value)
                        }
                        className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 text-[14px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Location"
                        onChange={(e) =>
                          handleInputCcChange(index, "location", e.target.value)
                        }
                        className="block w-full rounded-md p-2 border-0 py-3 text-[14px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[100%] my-[20px]">
          <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan === "En" && language?.internalCc[0]}
            {translationState?.lan === "Am" && language?.internalCc[1]}
          </label>
          <div className="mt-2">
            <Select
              options={filterActiveOfficers}
              isMulti
              placeholder="Select user"
              getOptionLabel={(e) => e?.position}
              getOptionValue={(e) => e?._id}
              styles={customStyles}
              onChange={handleSelectedChange}
            />
          </div>
        </div>

        <div className="w-[100%] my-[20px] col-span-1">
          <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan === "En" && language?.subject[0]}
            {translationState?.lan === "Am" && language?.subject[1]}{" "}
            <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <input
              required
              onChange={(e) => setSubject(e.target.value)}
              className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
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
          <div className="w-[100%] mt-[50px] flex flex-col gap-[10px]">
            <span className="text-[14px] font-bold w-[80%] text-[#0C73B8]">
              {translationState?.lan === "En" && language?.attachement[0]}
              {translationState?.lan === "Am" && language?.attachement[1]}{" "}
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
                    language?.uploadAttachment[1]}{" "}
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
        </div>

        <div className="flex justify-end items-center gap-[10px]">
          {loading ? (
            <Loading
              addtionalStyle={"flex justify-end items-center my-[20px]"}
            />
          ) : (
            <div className="flex items-center gap-[10px]">
              <button
                onClick={() => navigate(-1)}
                className="py-2 px-4 text-[12px] text-black rounded-[20px]  max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.cancel[0]}
                {translationState?.lan === "Am" && language?.cancel[1]}
              </button>

              <button
                onClick={handleCreateOutgoingLetter}
                className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.create[0]}
                {translationState?.lan === "Am" && language?.create[1]}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateOutgoingLetter;
