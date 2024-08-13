import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ServerError from "../ServerError";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";
import EtDatePicker, { EthiopianDateUtil } from "mui-ethiopian-datepicker";


function CreateLetter() {
  const navigate = useNavigate();
  const token = sessionStorage?.getItem("tID");
  const translationState = useSelector((state) => state.translation);
  const [noOfAttachment, setNoOfAttachment] = useState(0);
  const [letterAttachment, setLetterAttachment] = useState(null);
  const [letterNumber, setLetterNumber] = useState("");
  const [letterSentDate, setLetterSentDate] = useState("");
  const [letterReceivedDate, setLetterReceivedDate] = useState("");
  const [letterSentFrom, setLetterSentFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);


  const handleLetterCreate = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      await apiRequest
        .post(
          `/incoming_ltr/create_incoming_ltr`,
          {
            attention_from: letterSentFrom,
            subject: subject,
            sent_date: letterSentDate,
            received_date: letterReceivedDate,
            no_attachment: noOfAttachment,
            main_letter: letterAttachment,
            nimera: letterNumber,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Token " + token,
              get_crincletter_api: process.env.REACT_APP_GET_CRINCLETTER_API,
            },
          }
        )
        .then((res) => {
          if (res?.status === 201) {
            translationState?.lan === "En"
              ? toast.success(res?.data?.Message_en)
              : toast.success(res?.data?.Message_am);
            setTimeout(() => {
              setLoading(false);
              window.location.href = "/incoming";
            }, 6000);
          }
        })
        .catch((error) => {
          setLoading(false);

          if (error?.response?.status === 500) {
            setServerError(true);
          }
          translationState.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

 

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] p-2 mx-auto  bg-white">
      <div className="w-[90%] mx-auto my-[30px] flex flex-col gap-[20px] max-lg2:my-0">
        <ToastContainer theme="light" />
        <div>
          <div className="flex items-center justify-between gap-[10px]  text-[#FBB042]">
            <div className="flex items-center justify-start">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold max-lg2:text-[16px]">
                {translationState?.lan === "En" && language?.createLetter[0]}
                {translationState?.lan === "Am" && language?.createLetter[1]}
              </span>
            </div>
          </div>
        </div>

      

        <div className="w-[90%] mx-auto grid grid-cols-3 items-center gap-5">
          <div>
            <label className="block text-[14px]  font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan === "En" && language?.letterNumber[0]}
              {translationState?.lan === "Am" && language?.letterNumber[1]}{" "}
              <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                type="text"
                onChange={(e) => setLetterNumber(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[10px] max-lg2:p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-[14px]  font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan === "En" && language?.letterSent[0]}
              {translationState?.lan === "Am" && language?.letterSent[1]}{" "}
              <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
            <EtDatePicker
          // label="Document Date"
          onChange={(date) =>setLetterSentDate(`${EthiopianDateUtil?.toEth(new Date(date)).Day}/${EthiopianDateUtil?.toEth(new Date(date)).Month}/${EthiopianDateUtil?.toEth(new Date(date)).Year}`)}
                          className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[10px] max-lg2:p-2"
          
        />
              
            </div>
          </div>
          <div>
            <label className="block text-[14px]  font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan === "En" && language?.letterReceived[0]}
              {translationState?.lan === "Am" &&
                language?.letterReceived[1]}{" "}
              <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
            <EtDatePicker
          // label="Document Date"
          onChange={(date) =>setLetterReceivedDate(`${EthiopianDateUtil?.toEth(new Date(date)).Day}/${EthiopianDateUtil?.toEth(new Date(date)).Month}/${EthiopianDateUtil?.toEth(new Date(date)).Year}`)}
                          className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[10px] max-lg2:p-2"
          
        />
             
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto">
          <label
            className={`block text-[14px] font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]`}
          >
            {translationState?.lan === "En" && language?.from[0]}
            {translationState?.lan === "Am" && language?.from[1]}{" "}
            <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <input
              required
              type="text"
              onChange={(e) => setLetterSentFrom(e?.target?.value)}
              className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[10px] max-lg2:p-2"
            />
          </div>
        </div>

        <div className="w-[90%] mx-auto">
          <label
            htmlFor="last-name"
            className="block text-[14px] font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
          >
            {translationState?.lan === "En" && language?.subject[0]}
            {translationState?.lan === "Am" && language?.subject[1]}{" "}
            <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <input
              required
              type="text"
              onChange={(e) => setSubject(e?.target?.value)}
              className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[10px] max-lg2:p-2"
            />
          </div>
        </div>
        <div className="w-[90%] mx-auto">
          <label
            htmlFor="last-name"
            className="block text-[14px] font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
          >
            {translationState?.lan === "En" && language?.noOfAttachment[0]}
            {translationState?.lan === "Am" && language?.noOfAttachment[1]}
          </label>
          <div className="mt-2">
            <input
              required
              type="number"
              onChange={(e) => setNoOfAttachment(e?.target?.value)}
              className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:leading-6 max-lg2:text-[10px] max-lg2:p-2"
            />
          </div>
        </div>
        <div>
          <div className="w-[90%] mx-auto mt-[30px] flex flex-col gap-[10px] max-lg2:mt-[10px]">
            <span className="font-bold text-[14px] text-[#0C73B8] w-[80%] max-lg2:text-[12px]">
              {translationState?.lan === "En" && language?.letter[0]}
              {translationState?.lan === "Am" && language?.letter[1]}
              <span className="text-red-700">*</span>
            </span>
            <label>
              <input
                type="file"
                onChange={(e) => setLetterAttachment(e?.target?.files?.[0])}
                hidden
              />
              <div className="[w-[70%] h-[200px] flex justify-center gap-[10px] text-[#0C73B8]  items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center">
                <BsFillCloudUploadFill />
                <span className="text-[14px] font-bold max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.uploadLetter[0]}
                  {translationState?.lan === "Am" && language?.uploadLetter[1]}
                </span>
              </div>
            </label>
          </div>
          <div className="w-[90%] mx-auto my-4 overflow-y-scroll">
            {letterAttachment && (
              <embed
                src={URL.createObjectURL(letterAttachment)}
                type="application/pdf"
                width="100%"
                height="650px"
              />
            )}
          </div>
        </div>

        <div className="w-[90%] mx-auto mt-[30px] py-3 flex justify-end items-center gap-[20px]">
          <button onClick={() => navigate(-1)} className="max-lg2:text-[12px]">
            {translationState?.lan === "En" && language?.cancel[0]}
            {translationState?.lan === "Am" && language?.cancel[1]}
          </button>
          <button
            onClick={handleLetterCreate}
            disabled={loading}
            className={
              loading
                ? "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
                : "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
            }
          >
            {translationState?.lan === "En" && language?.createLetter[0]}
            {translationState?.lan === "Am" && language?.createLetter[1]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateLetter;
