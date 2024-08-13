import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import apiRequest from "../../utils/request";
import Loading from "../SubComponents/Loading";
import ServerError from "../ServerError";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";

function MakeAccusation() {
  const navigate = useNavigate();
  const translationState = useSelector((state) => state.translation);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [accusedDepartment, setAccusedDepartment] = useState("");
  const [attachment, setAttachement] = useState(null);
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleAccusation = async () => {
    try {
      const accusationData = new FormData();
      accusationData.append("name", name);
      accusationData.append("subject", subject);
      accusationData.append("phone", phone);
      accusationData.append("description", description);
      accusationData.append("accused_organizational_part", accusedDepartment);
      accusationData.append("attachment", attachment);

      setLoading(true);
      await apiRequest
        .post("/accusation_acceptor_api/create_accusation", accusationData, {
          headers: {
            get_craccusation_api: process.env.REACT_APP_GET_CRACCUSATION_API,
          },
        })
        .then((res) => {
          setLoading(false);

          toast.success(res.data.Message_en);
          setName("");
          setSubject("");
          setPhone("");
          setDescription("");
          setAccusedDepartment("");
          setAttachement(null);
        })
        .catch((error) => {
          setLoading(false);
          setName("");
          setSubject("");
          setPhone("");
          setDescription("");
          setAccusedDepartment("");
          setAttachement(null);

          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if (error?.response?.status === 429) {
            setRateLimitTimer(180);
          }

          translationState?.lan === "En" &&
            toast.error(error?.response?.data?.Message_en);

          translationState?.lan === "Am" &&
            toast.error(error?.response?.data?.Message_am);

          translationState?.lan === "Or" &&
            toast.error(error?.response?.data?.Message_or);

          translationState?.lan === "Tg" &&
            toast.error(error?.response?.data?.Message_tg);

          translationState?.lan === "Sm" &&
            toast.error(error?.response?.data?.Message_sm);

          translationState?.lan === "Af" &&
            toast.error(error?.response?.data?.Message_af);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };
  useEffect(() => {
    if (rateLimitTimer) {
      const timer = setInterval(() => {
        setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rateLimitTimer]);

  if (rateLimitTimer)
    return (
      <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
        {translationState?.lan === "En" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            Please wait 3 minutes before retrying.
          </p>
        )}
        {translationState?.lan === "Am" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            እንደገና ከመሞከሮዎ በፊት 3 ደቂቃ ይጠብቁ።
          </p>
        )}
        {translationState?.lan === "Or" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            Maaloo irra deebi'anii yaaluun dura daqiiqaa 3 eegaa
          </p>
        )}
        {translationState?.lan === "Tg" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            በጃኹም ቅድሚ ዳግማይ ምፍታንኩም 3 ደቓይቕ ተጸበዩ።
          </p>
        )}
        {translationState?.lan === "Sm" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            Fadlan sug 3 daqiiqo ka hor inta aanad isku dayin
          </p>
        )}
        {translationState?.lan === "Af" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            Please wait 3 minutes before retrying.
          </p>
        )}
      </div>
    );

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] min-h-[100vh]">
      <Navbar />
      <ToastContainer theme="light" />
      <div className="w-[90%] mx-auto mt-[150px]  text-[#0C73B8] cursor-pointer flex items-center gap-[10px]">
        <MdOutlineArrowBackIosNew
          onClick={() => navigate(-1)}
          className="text-[20px]"
        />
        {translationState?.lan === "En" &&   <span onClick={() => navigate(-1)} className="font-bold">
          Back
        </span>}
        {translationState?.lan === "Am" &&   <span onClick={() => navigate(-1)} className="font-bold">
          ተመለስ
        </span>}
        {translationState?.lan === "Or" &&   <span onClick={() => navigate(-1)} className="font-bold">
        Dugda
        </span>}
        {translationState?.lan === "Tg" &&   <span onClick={() => navigate(-1)} className="font-bold">
        ዝባን
        </span>}
        {translationState?.lan === "Sm" &&   <span onClick={() => navigate(-1)} className="font-bold">
        Dib u noqo
        </span>}
        {translationState?.lan === "Sm" &&   <span onClick={() => navigate(-1)} className="font-bold">
        Back
        </span>}
      
      </div>
      <div className="w-[80%] my-[30px] mx-auto max-md1:w-[90%]">
        <div>
          {translationState?.lan ==="En" &&  <span className="text-[30px] font-bold text-[#0C73B8] max-lg2:text-[24px]">
          {language?.makeAccusation[0]}
          </span>}
          {translationState?.lan ==="Am" &&  <span className="text-[30px] font-bold text-[#0C73B8] max-lg2:text-[24px]">
            {language?.makeAccusation[1]}
          </span>}
          {translationState?.lan ==="Or" &&  <span className="text-[30px] font-bold text-[#0C73B8] max-lg2:text-[24px]">
            {language?.makeAccusation[2]}
          </span>}
          {translationState?.lan ==="Tg" &&  <span className="text-[30px] font-bold text-[#0C73B8] max-lg2:text-[24px]">
            {language?.makeAccusation[3]}
          </span>}
          {translationState?.lan ==="Sm" &&  <span className="text-[30px] font-bold text-[#0C73B8] max-lg2:text-[24px]">
            {language?.makeAccusation[4]}
          </span>}
          {translationState?.lan ==="Af" &&  <span className="text-[30px] font-bold text-[#0C73B8] max-lg2:text-[24px]">
            {language?.makeAccusation[5]}
          </span>}
         
        </div>
        <div className="my-[20px] flex flex-col gap-[20px]">
          <div className="w-[100%]">
            {translationState?.lan==="En" &&  <label
           
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.name[0]}
            </label>}
            {translationState?.lan==="Am" &&  <label
       
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.name[1]}
            </label>}
            {translationState?.lan==="Or" &&  <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.name[2]}
              
            </label>}
            {translationState?.lan==="Tg" &&  <label
           
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.name[3]}
            </label>}
            {translationState?.lan==="Sm" &&  <label
             
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.name[4]}
            </label>}
            {translationState?.lan==="Af" &&  <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.name[5]}
            </label>}
           
            <div className="mt-2">
              <input
                required
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-[100%]">
            {translationState?.lan==="En" &&    <label
           
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.phone[0]}
            </label>}
            {translationState?.lan==="Am" &&    <label
           
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.phone[1]}
            </label>}
            {translationState?.lan==="Or" &&    <label
           
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
         >
           {language?.phone[2]}
         </label>}
         {translationState?.lan==="Tg" &&    <label
           
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
         >
           {language?.phone[3]}
         </label>}
         {translationState?.lan==="Sm" &&    <label
           
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
         >
           {language?.phone[4]}
         </label>}
         {translationState?.lan==="Af" &&    <label
           
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
         >
           {language?.phone[5]}
         </label>}
            <div className="mt-2">
              <input
                required
                value={phone}
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="w-[100%]">
            {translationState?.lan==="En" &&  <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.subject[0]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan==="Am" &&  <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.subject[1]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan==="Or" &&  <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.subject[2]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan==="Tg" &&  <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.subject[3]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan==="Sm" &&  <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.subject[4]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan==="Af" &&  <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.subject[5]} <span className="text-red-700">*</span>
            </label>}
           
            <div className="mt-2">
              <input
                required
                value={subject}
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-[100%]">
            {translationState?.lan ==="En" &&    <label
       
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.accusedDeprtment[0]}
            </label>}
            {translationState?.lan ==="Am" &&    <label
       
       className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
     >
       {language?.accusedDeprtment[1]}
     </label>}
     {translationState?.lan ==="Or" &&    <label
       
       className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
     >
       {language?.accusedDeprtment[2]}
     </label>}
     {translationState?.lan ==="Tg" &&    <label
       
       className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
     >
       {language?.accusedDeprtment[3]}
     </label>}
     {translationState?.lan ==="Sm" &&    <label
       
       className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
     >
       {language?.accusedDeprtment[4]}
     </label>}
     {translationState?.lan ==="Af" &&    <label
       
       className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
     >
       {language?.accusedDeprtment[5]}
     </label>}
         
            <div className="mt-2">
              <input
                required
                type="text"
                value={accusedDepartment}
                onChange={(e) => setAccusedDepartment(e.target.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-[100%] mt-[20px]">
            {translationState?.lan ==="En" &&   <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.description[0]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan ==="Am" &&   <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.description[1]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan ==="Or" &&   <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.description[2]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan ==="Tg" &&   <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.description[3]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan ==="Sm" &&   <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.description[4]} <span className="text-red-700">*</span>
            </label>}
            {translationState?.lan ==="Af" &&   <label
              
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {language?.description[5]} <span className="text-red-700">*</span>
            </label>}
            <div className="mt-2">
              <textarea
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="w-[100%] mt-[30px] flex flex-col gap-[10px]">
            {translationState?.lan ==="En" &&    <span className="text-[14px] text-[#0C73B8] font-bold w-[80%] ">
              {language?.attachement[0]}
            </span>}
            {translationState?.lan ==="Am" &&    <span className="text-[14px] text-[#0C73B8] font-bold w-[80%] ">
              {language?.attachement[1]}
            </span>}
            {translationState?.lan ==="Or" &&    <span className="text-[14px] text-[#0C73B8] font-bold w-[80%] ">
              {language?.attachement[2]}
            </span>}
            {translationState?.lan ==="Tg" &&    <span className="text-[14px] text-[#0C73B8] font-bold w-[80%] ">
              {language?.attachement[3]}
            </span>}
            {translationState?.lan ==="Sm" &&    <span className="text-[14px] text-[#0C73B8] font-bold w-[80%] ">
              {language?.attachement[4]}
            </span>}
            {translationState?.lan ==="Af" &&    <span className="text-[14px] text-[#0C73B8] font-bold w-[80%] ">
              {language?.attachement[5]}

             
            </span>}
         
         
         
            <label>
              <input
                type="file"
                onChange={(e) => setAttachement(e.target.files[0])}
                hidden
              />
              <div className="[w-[70%] h-[200px] text-[#0C73B8] flex justify-center gap-[10px]  items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center">
                <BsFillCloudUploadFill />
                {translationState?.lan==="En" &&       <span className="text-[14px] font-bold">{language?.uploadAttachment[0]}</span>}
                {translationState?.lan==="Am" &&       <span className="text-[14px] font-bold">{language?.uploadAttachment[1]}</span>}
                {translationState?.lan==="Or" &&       <span className="text-[14px] font-bold">{language?.uploadAttachment[2]}</span>}
                {translationState?.lan==="Tg" &&       <span className="text-[14px] font-bold">{language?.uploadAttachment[3]}</span>}
                {translationState?.lan==="Sm" &&       <span className="text-[14px] font-bold">{language?.uploadAttachment[4]}</span>}
                {translationState?.lan==="Af" &&       <span className="text-[14px] font-bold">{language?.uploadAttachment[5]}</span>}
                <span className="font-bold text-[14px]">
                  
                ({translationState?.lan === "En" && language?.fileSize[0]}
                    {translationState?.lan === "Am" && language?.fileSize[1]}
                    {translationState?.lan === "Or" && language?.fileSize[2]}
                    {translationState?.lan === "Tg" && language?.fileSize[3]}
                    {translationState?.lan === "Sm" && language?.fileSize[4]}
                    {translationState?.lan === "Af" && language?.fileSize[5]})
                </span>
          
              </div>
            </label>
          </div>
          <div className="w-[100%] my-4 overflow-y-scroll">
            {attachment && (
              <embed
                src={URL.createObjectURL(attachment)}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            )}
          </div>

          {loading ? (
            <Loading addtionalStyle={"flex justify-end items-center"} />
          ) : (
            <div className="w-[100%] my-[30px] py-3 flex justify-end items-center gap-[20px]">
              <button onClick={() => navigate(-1)}>
                {translationState?.lan ==="En" && language?.cancel[0]}
                {translationState?.lan ==="Am" && language?.cancel[1]}
                {translationState?.lan ==="Or" && language?.cancel[2]}
                {translationState?.lan ==="Tg" && language?.cancel[3]}
                {translationState?.lan ==="Sm" && language?.cancel[4]}
                {translationState?.lan ==="Af" && language?.cancel[5]}
                </button>
              <button
                onClick={handleAccusation}
                disabled={loading}
                className="rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                  {translationState?.lan ==="En" && language?.submit[0]}
                {translationState?.lan ==="Am" && language?.submit[1]}
                {translationState?.lan ==="Or" && language?.submit[2]}
                {translationState?.lan ==="Tg" && language?.submit[3]}
                {translationState?.lan ==="Sm" && language?.submit[4]}
                {translationState?.lan ==="Af" && language?.submit[5]}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MakeAccusation;
