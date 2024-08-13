import React,{useState} from 'react'
import apiRequest from '../../utils/request';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { language } from '../../utils/part-1lan';
import ServerError from '../ServerError';
import Loading from '../Loading';

function ConfirmCase({filteredQuestions,findNotSpecialDivisions,findCaseList,setConfirmModal,division,caseRequest,formQuestions,remark,attachment,relatedCaseID}) {
    const token =sessionStorage.getItem('tID');
    const translationState = useSelector((state)=>state?.translation)
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);

    const handleCreateCase = async () => {
        try {
          const caseData = new FormData();
          caseData.append("division", division);
          caseData.append("caselist", caseRequest);
          caseData.append("form", JSON.stringify(formQuestions));
          caseData.append("remark", remark);
          caseData.append("attachment", attachment);
          caseData.append("related_case_id", relatedCaseID);
    
          setLoading(true);
          await apiRequest
            .post("/customer_case_api/create_case", caseData, {
              headers: {
                "Content-Type": "multipart/form-data",
                get_crcasecus_api: process.env.REACT_APP_GET_CRCASECUS_API,
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setLoading(false);
              translationState?.lan === "En" && toast.success(res?.data?.Message_en)
              translationState?.lan === "Am" && toast.success(res?.data?.Message_am)
              translationState?.lan === "Or" && toast.success(res?.data?.Message_or)
              translationState?.lan === "Tg" && toast.success(res?.data?.Message_tg)
              translationState?.lan === "Sm" && toast.success(res?.data?.Message_sm)
              translationState?.lan === "Af" && toast.success(res?.data?.Message_af)
                
               
              setTimeout(() => {
                window.location.href = "/dashboard/casestatus";
              }, 6000);
            })
            .catch((error) => {
              setLoading(false);
              if (error.response?.status === 500) {
                setServerError(true);
              }
              if(error?.response?.status === 429){
                
                translationState?.lan === "En" && toast.error(language?.toManyRequests[0])
                translationState?.lan === "Am" && toast.error(language?.toManyRequests[1])
                translationState?.lan === "Or" && toast.error(language?.toManyRequests[2])
                translationState?.lan === "Tg" && toast.error(language?.toManyRequests[3])
                translationState?.lan === "Sm" && toast.error(language?.toManyRequests[4])
                translationState?.lan === "Af" && toast.error(language?.toManyRequests[5])
    
              }
              translationState?.lan === "En" && toast.error(error?.response?.data?.Message_en)
              translationState?.lan === "Am" && toast.error(error?.response?.data?.Message_am)
              translationState?.lan === "Or" && toast.error(error?.response?.data?.Message_or)
              translationState?.lan === "Tg" && toast.error(error?.response?.data?.Message_tg)
              translationState?.lan === "Sm" && toast.error(error?.response?.data?.Message_sm)
              translationState?.lan === "Af" && toast.error(error?.response?.data?.Message_af)
         
            });
        } catch (error) {
          setLoading(false);
          setServerError(true);
        }
      };
      let uniqueMap = new Map();

      formQuestions.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
          uniqueMap.set(key, value);
        });
      });

      if (serverError) return <ServerError />;
  return (
    <div className='w-[95%] min-h-[80vh] bg-white z-[10] border border-gray-200 shadow-md rounded-[20px] mx-auto my-[20px] absolute top-[100px]  left-[3%]'>
      
    <div className='w-[90%] mx-auto my-[20px] text-[#0C73B8] flex justify-end items-center'>
      
      {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/>: <div className="w-[100%] mx-auto py-2 flex items-center justify-end gap-x-6">
        <button
          onClick={()=>setConfirmModal(false)}
          className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
        >
       {translationState?.lan === "En" && language?.cancel[0]}
       {translationState?.lan === "Am" && language?.cancel[1]}
        </button>
        <button
          onClick={handleCreateCase}
          className={"rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"}
        >
        {translationState?.lan === "En" && language?.apply[0]}
        {translationState?.lan === "Am" && language?.apply[1]}
        </button>
      </div>}
       
    </div>
    <div className='w-[100%] h-[1px] bg-gray-200'/>

    <div className="my-[30px] flex justify-center items-center">
      <span className="text-[#0C73B8] font-bold">
      {translationState?.lan==="En" && language?.caseInformation[0]} 
      {translationState?.lan==="Am" && language?.caseInformation[1]}
      </span>
    </div>

    <div className="w-[90%] mx-auto my-[10px] grid grid-cols-3 gap-[10px] max-lg1:grid-cols-2 max-sm1:grid-cols-1">
      <div className="w-[100%] col-span-1">
        <label
        
          className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
        >
            {translationState?.lan==="En" && language?.division[0]} 
            {translationState?.lan==="Am" && language?.division[1]} 
        </label>
        <div className="mt-2">
          <select
            required
            value={division}
            disabled
            
            className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
          >
            <option value={""}>
            {translationState?.lan === "En" && language?.selectDivision[0]}
            {translationState?.lan === "Am" && language?.selectDivision[1]}
            </option>
            {findNotSpecialDivisions?.map((division1, index) => {
              return (
                <option key={index} value={division1?._id}>
                      {translationState?.lan==="En" && division1?.name_en} 
                      {translationState?.lan==="Am" && division1?.name_am}
               
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {caseRequest && findCaseList?.length > 0 && (
        <div className="w-[100%] col-span-1">
          <label
            htmlFor="street-address"
            className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
          >
                 {translationState?.lan==="En" && language?.caseRequest[0]} 
                 {translationState?.lan==="Am" && language?.caseRequest[1]} <span className="text-red-700">*</span>
          </label>
          <div className="mt-2">
            <select
              required
             disabled
             value={caseRequest}
             
className="block w-full p-4 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
            >
              <option value={""}>
              {translationState?.lan==="En" && language?.selectCaseRequest[0]} 
              {translationState?.lan==="Am" && language?.selectCaseRequest[1]}
              </option>
              {findCaseList?.map((caserequest, index) => {
                return (
                  <option key={index} value={caserequest?._id}>
                        {translationState?.lan==="En" && caserequest?.case_name_en} 
                        {translationState?.lan==="Am" && caserequest?.case_name_am}
            
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}

      <div className="w-[100%] col-span-1">
        <label
          htmlFor="street-address"
          className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
        >
            {translationState?.lan==="En" && language?.relatedCaseNumber[0]} 
            {translationState?.lan==="Am" && language?.relatedCaseNumber[1]}
        </label>
        <div className="mt-2 flex gap-[10px]">
          <input
            required
            disabled
            readOnly
            value={relatedCaseID}
            className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
          />
         
        
        </div>
      </div>
    </div>
       {/* dynamic question */}
       <div className="w-[90%] mx-auto my-[20px] flex flex-col gap-[20px]">
       {findCaseList?.length > 0 && filteredQuestions?.map((q, index) => {
if (q?.inputType === "normal_input") {
return (
  <div key={index} className="w-[100%]">
    <label
      htmlFor="street-address"
      className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
    >
      {translationState?.lan === "En" && q?.name_en}
      {translationState?.lan === "Am" && q?.name_am}
    </label>
    <div className="mt-2">
      <input
        required
        value={formQuestions[index]?.[q?._id] || "-"}
        disabled
        readOnly
        type={q?.dataType === "string" ? "text" : "number"}
        className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
      />
    </div>
  </div>
);
} else if (q?.inputType === "text_area") {
return (
  <div key={index} className="w-[100%]">
    <label
      htmlFor="street-address"
      className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
    >
      {translationState?.lan === "En" && q?.name_en}
      {translationState?.lan === "Am" && q?.name_am}
    </label>
    <div className="mt-2">
      <textarea
        required
        rows={15}
        disabled
        readOnly
        value={formQuestions[index]?.[q?._id] || "-"}
        className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
      ></textarea>
    </div>
  </div>
);
} else {
return (
  <div key={index} className="w-[100%]">
    <label
      htmlFor="street-address"
      className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
    >
      {translationState?.lan === "En" && q?.name_en}
      {translationState?.lan === "Am" && q?.name_am}
    </label>
    <div className="mt-2">
      <select
        required
        disabled
        value={formQuestions[index]?.[q?._id] || "-"}
        className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
      >
        <option value={""}></option>
        {q?.enumValues?.map((eval2, index) => {
          return (
            <option key={index} value={eval2?._id}>
              {translationState?.lan === "En" && eval2?.expectedValues?.value_en}
              {translationState?.lan === "Am" && eval2?.expectedValues?.value_am}
            </option>
          );
        })}
      </select>
    </div>
  </div>
);
}
})}
    </div>
    <div className="w-[90%] mx-auto flex flex-col my-[20px]">
     

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
      <div className="w-[100%]">
        <label
          htmlFor="street-address"
          className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
        >
        {translationState?.lan === "En" && language?.remark[0]}
        {translationState?.lan === "Am" && language?.remark[1]}
        </label>
        <div className="mt-2">
          <textarea
            required
            value={remark}
            disabled
            readOnly
            rows={15}
            className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
          ></textarea>
        </div>
      </div>
    </div>
</div>
  )
}

export default ConfirmCase