import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDirectorate } from "../../REDUX/slices/directorateSlice";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { useDebounce } from "use-debounce";
import { fetchAllOfficeUsers } from "../../REDUX/slices/getAllOfficeUsersSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import apiRequest from "../../utils/request";
import { language } from "../../utils/part-1lan";

function DivisionDetail() {
  const { id } = useParams();
  const token = sessionStorage.getItem('tID')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state?.translation);
  const officeUsersList = useSelector((state) => state?.getAllOfficeUsers);
  const directorateList = useSelector((state) => state?.directorates);
  const [division,setDivision] = useState({});
  const [name, setName] = useState("");
  const [debouncedName] = useDebounce(name, 500);
  const [status, setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  const [titerError, setTiterError] = useState(false);
  const [signError, setSignError] = useState(false);
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError]  = useState(false);

  useEffect(()=>{
  try {
    setLoading(true)
    apiRequest.get(`/division_api/get_division/${id}`,{headers:{
      get_div_api:process.env.REACT_APP_GET_DIV_API,
      Authorization:`Bearer ${token}`

    }}).then((res)=>{
      setLoading(false)
      setDivision(res.data)
    })
    
  } catch (error) {
    setServerError(true)
    
  }
  },[id,token])

  useEffect(() => {
    dispatch(
      fetchDirectorate({
        page: pageNum,
        sort: sortingNum,
        name: debouncedName,
        division: id,
        status,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, sortingNum, debouncedName, status]);

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= directorateList?.directorates?.totalPages) {
      setPageNum(directorateList?.directorates?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  const findOfficeUser = officeUsersList?.officeUsers?.find(
    (user) => user?._id ===division?.manager?._id
  );


  if (findOfficeUser?._id ==="")
    return (
      <div className="w-[90%] mx-auto min-h-[250px] my-[30px] flex flex-col justify-center items-center gap-[10px] bg-white rounded-[10px]">
        <span className="text-[#0C73B8] text-[14px]">
        {translationState?.lan ==="En" && language?.managerNotAssigned[0]}
        {translationState?.lan ==="Am" && language?.managerNotAssigned[1]}
        </span>
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-4 text-white text-[14px] bg-[#0C73B8] rounded-[5px]"
        >
          {translationState?.lan ==="En" && language?.back[0]}
          {translationState?.lan ==="Am" && language?.back[1]}
        </button>
      </div>
    );

  if (directorateList?.error || officeUsersList?.error || serverError) return <ServerError />;
  return (
   loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"} /> : <div className="w-[100%]">
   <div className="w-[100%] p-2 min-h-[250px] bg-white">
     <div className="w-[90%]  flex items-center justify-start   text-[#0C73B8] my-[30px] mx-auto font-bold">
       <BiChevronLeft
         className="text-[30px] cursor-pointer"
         onClick={() => navigate(-1)}
       />
       <span className="text-[20px]">
       {translationState?.lan ==="En" && language?.divisionInfo[0]}
       {translationState?.lan ==="Am" && language?.divisionInfo[1]}
       </span>
     </div>

     <div className="w-[80%] mx-auto my-[30px] flex items-center  gap-[50px]">
       <div className="w-[200px] h-[200px] bg-[#0C73B8]  rounded-full flex justify-center items-center max-lg2:w-[150px] max-lg2:h-[150px]">
         {findOfficeUser?.picture !== "" ? (
           <img
             src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${findOfficeUser?.picture}`}
             className="w-[100%] h-[100%] object-cover rounded-full"
             alt=""
           />
         ) : (
           <span className="text-white text-[50px] font-bold max-lg2:text-[35px]">
             {findOfficeUser?.firstname?.[0]}
           </span>
         )}
       </div>

       <div className="w-[80%] my-[40px] flex flex-col gap-[20px]">
         <div className="flex my-[10px] items-center gap-[10px]">
           <span className="text-[30px] text-[#0C73B8] font-bold max-lg2:text-[20px]">
             {findOfficeUser?.firstname} {findOfficeUser?.middlename}{" "}
             {findOfficeUser?.lastname}
           </span>
         </div>
         <div className="w-[100%] flex justify-between items-center gap-[50px]">
           <div className="flex flex-col gap-[20px]">
             <span className="flex items-center gap-[10px] max-lg2:text-[12px]">
               <span className="font-bold text-[#0C73B8]">   {translationState?.lan ==="En" && language?.email[0]}
               {translationState?.lan ==="Am" && language?.email[1]}: </span>{" "}
               <span className="text-gray-500">{findOfficeUser?.email}</span>
             </span>
             <span className="text-gray-500 flex items-center gap-[10px]  max-lg2:text-[12px]">
               <span className="font-bold text-[#0C73B8]">   {translationState?.lan ==="En" && language?.phoneNumber[0]}
               {translationState?.lan ==="Am" && language?.phoneNumber[1]}: </span>
               <span>{findOfficeUser?.phone}</span>
             </span>
             <span className="text-gray-500 flex items-center gap-[10px]  max-lg2:text-[12px]">
               <span className="font-bold text-[#0C73B8]">   {translationState?.lan ==="En" && language?.username[0]}
               {translationState?.lan ==="Am" && language?.username[1]}: </span>
               <span>{findOfficeUser?.username}</span>
             </span>
             <span className="text-gray-500 flex items-center gap-[10px]  max-lg2:text-[12px]">
               <span className="font-bold text-[#0C73B8]">   {translationState?.lan ==="En" && language?.gender[0]}
               {translationState?.lan ==="Am" && language?.gender[1]}: </span>
               <span>
                {translationState?.lan ==="En" && findOfficeUser?.gender}
                {translationState?.lan ==="Am" && findOfficeUser?.gender ==="Male" ? language?.male[1]:language?.female[1]}
                  </span>
             </span>
           </div>
           <div className="flex  flex-col gap-[20px]">
             <span className="text-gray-500 flex items-center gap-[10px]  max-lg2:text-[12px]">
               <span className="font-bold text-[#0C73B8]">       {translationState?.lan ==="En" && language?.division[0]}
               {translationState?.lan ==="Am" && language?.division[1]}: </span>
               <span>
               {translationState?.lan ==="En" && division?.name_en}
               {translationState?.lan ==="Am" && division?.name_am}
                </span>
             </span>
             <span className="text-gray-500 flex items-center gap-[10px]  max-lg2:text-[12px]">
               <span className="font-bold text-[#0C73B8]">       {translationState?.lan ==="En" && language?.level[0]}
               {translationState?.lan ==="Am" && language?.level[1]}: </span>
               <span>{findOfficeUser?.level}</span>
             </span>

             <span className="text-gray-500 flex items-center gap-[10px]  max-lg2:text-[12px]">
               <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.position[0]}
               {translationState?.lan ==="Am" && language?.position[1]}: </span>
               <span>{findOfficeUser?.position}</span>
             </span>

             <span className="text-gray-500 flex items-center gap-[10px]  max-lg2:text-[12px]">
               <span className="font-bold text-[#0C73B8]">       {translationState?.lan ==="En" && language?.status[0]}
               {translationState?.lan ==="Am" && language?.status[1]}: </span>
               {findOfficeUser?.status === "active" && (
                 <span
                   className="px-2 py-1 inline-flex  leading-5
                   font-semibold  bg-green-600 text-white rounded-[5px]"
                 >
                       {translationState?.lan ==="En" && language?.active[0]}
                       {translationState?.lan ==="Am" && language?.active[1]}
                 </span>
               )}

               {findOfficeUser?.status === "inactive" && (
                 <span
                   className="px-2 py-1 inline-flex  leading-5
                   font-semibold  bg-red-600 text-white rounded-[5px]"
                 >
                        {translationState?.lan ==="En" && language?.inactive[0]}
                        {translationState?.lan ==="Am" && language?.inactive[1]}
                 </span>
               )}
             </span>
           </div>
         </div>
       </div>
     </div>
   </div>

   <div className="w-[95%] mx-auto grid grid-cols-3 gap-[10px]">
     <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px]">
       <div className="w-[95%] mx-auto">
         <div className="w-[100%] my-[20px] flex justify-between items-center">
           <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
           {translationState?.lan ==="En" && language?.paraph[0]}
           {translationState?.lan ==="Am" && language?.paraph[1]}
           </span>
         </div>
         <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
           {findOfficeUser?.paraph?.length === 0 ? (
             <div className="w-[100%] flex justify-center items-center">
               <span className="font-bold text-center text-[#0C73B8]">
               {translationState?.lan ==="En" && language?.noParaph[0]}
               {translationState?.lan ==="Am" && language?.noParaph[1]}
               </span>
             </div>
           ) : (
             findOfficeUser?.paraph?.map((paraph, index) => (
               <div
                 key={index}
                 className="w-[100%]  flex justify-between items-center gap-[20px] max-lg2:text-[14px]"
               >
                 <li className=" text-gray-500">{paraph?.title}</li>
               </div>
             ))
           )}
         </div>
       </div>
     </div>

    
     {findOfficeUser?.titer && findOfficeUser?.titer !== ""  && (
      <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px]">
        <div className="w-[95%] mx-auto">
          <div className="w-[100%] my-[20px] flex justify-between items-center">
            <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              {translationState?.lan === "En" && language?.titer[0]}
              {translationState?.lan === "Am" && language?.titer[1]}
            </span>
          </div>
          <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
            {!findOfficeUser?.titer && findOfficeUser?.titer === ""  ? (
              <div className="w-[100%] flex justify-center items-center">
                <span className="font-bold text-center text-[#0C73B8]">
                  {translationState?.lan === "En" && language?.titernotUploaded[0]}
                  {translationState?.lan === "Am" && language?.titernotUploaded[1]}
                </span>
              </div>
            ) : (
              <div>
                {!titerError ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserTiters/${findOfficeUser?.titer}`}
                    alt=""
                    onError={() => setTiterError(true)}
                  />
                ) : (
                  <span className="w-[100%] flex justify-center items-center my-[20px] font-bold text-center text-[#0C73B8]">
                    {translationState?.lan === "En" && "The titer could not load"}
                    {translationState?.lan === "Am" && "ቲተር ማግኘት አልተቻለም"}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )}


     {findOfficeUser?.signature && findOfficeUser?.signature !== "" && (
      <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px]">
        <div className="w-[95%] mx-auto">
          <div className="w-[100%] my-[20px] flex justify-between items-center">
            <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              {translationState?.lan === "En" && language?.signiture[0]}
              {translationState?.lan === "Am" && language?.signiture[1]}
            </span>
          </div>
          <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
            {!findOfficeUser?.signature || findOfficeUser?.signature === "" ? (
              <div className="w-[100%] flex justify-center items-center">
                <span className="font-bold text-center text-[#0C73B8]">
                  {translationState?.lan === "En" && language?.signnotUploded[0]}
                  {translationState?.lan === "Am" && language?.signnotUploded[1]}
                </span>
              </div>
            ) : (
              <div>
                {!signError ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserSignatures/${findOfficeUser?.signature}`}
                    alt=""
                    onError={() => setSignError(true)}
                  />
                ) : (
                  <span className="w-[100%] flex justify-center items-center my-[20px] font-bold text-center text-[#0C73B8]">
                    {translationState?.lan === "En" && "The signature could not load"}
                    {translationState?.lan === "Am" && "ፊርማውን ማግኘት አልተቻለም"}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  
   </div>
   <div className="w-[100%] my-[30px] mx-auto">
     <div className="w-[95%] mx-auto h-[82%] my-[30px] p-2 bg-white rounded">
       <div className="w-[95%] mt-[50px] mx-auto">
         <div className="flex items-center justify-between gap-[10px]  text-[#0C73B8]">
           <div className="flex items-center justify-start">
             <span className="text-[20px] font-bold max-lg2:text-[16px]">
             {translationState?.lan ==="En" && language?.directorates[0]}
             {translationState?.lan ==="Am" && language?.directorates[1]}
             </span>
           </div>
         </div>

         <div className="w-[95%]   mx-auto p-2 mt-[20px] grid grid-cols-2 gap-[20px] max-[650px]:justify-between">
           <div className="w-[100%] col-span-1 max-[650px]:flex-1">
           {translationState?.lan ==="En" && <input
               onChange={(e) => setName(e.target.value)}
               className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none max-lg2:py-2 max-lg2:text-[12px]"
               type="text"
               placeholder={language?.searchByDirectorateName[0]}
             />}
         {translationState?.lan ==="Am" && <input
               onChange={(e) => setName(e.target.value)}
               className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none max-lg2:py-2 max-lg2:text-[12px]"
               type="text"
               placeholder={language?.searchByDirectorateName[1]}
             />}
             
           </div>

           <div className="w-[100%] col-span-1">
             <select
               onChange={(e) => setStatus(e.target.value)}
               className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none  max-lg2:py-2 max-lg2:text-[12px]"
               type="text"
             >
                 <option value={""}>
            {translationState?.lan ==="En" && language?.searchByStatus[0]}
            {translationState?.lan ==="Am" && language?.searchByStatus[1]}
            </option>
            <option value={"active"}>
            {translationState?.lan ==="En" && language?.active[0]}
            {translationState?.lan ==="Am" && language?.active[1]}
            </option>
            <option value={"inactive"}>
            {translationState?.lan ==="En" && language?.inactive[0]}
            {translationState?.lan ==="Am" && language?.inactive[1]}
            </option>
             </select>
           </div>
         </div>
         {directorateList?.loading ? (
           <div></div>
         ) : (
           directorateList?.directorates?.directorates?.length > 0 &&
           directorateList?.directorates?.totalPages && (
             <div className="w-[95%] mx-auto flex justify-end items-center my-[20px] gap-5">
               <button
                 onClick={handlePrevious}
                 className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
               >
                 <IoIosArrowBack />
               </button>
               <span className="text-gray-600 font-semibold">
                 {directorateList?.directorates?.currentPage} of{" "}
                 {directorateList?.directorates?.totalPages}
               </span>

               <button
                 onClick={handleNext}
                 className={
                   "mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
                 }
               >
                 <IoIosArrowForward />
               </button>

               <div className="flex items-center gap-2">
                 <select
                   value={sortingNum}
                   onChange={(e) => setSortingNum(e?.target?.value)}
                   className="py-2 px-4 border border-gray-300 rounded-[5px] outline-none text-[14px] font-medium max-lg2:text-[12px]"
                 >
                   <option value={-1}>
                   {translationState?.lan ==="En" && language?.latest[0]}
                   {translationState?.lan ==="Am" && language?.latest[1]}
                   </option>
                   <option value={1}>
                   {translationState?.lan ==="En" && language?.oldest[0]}
                   {translationState?.lan ==="Am" && language?.oldest[1]}
                   </option>
                 </select>
               </div>
             </div>
           )
         )}

         {directorateList?.loading ? (
           <Loading addtionalStyle={"flex justify-center items-center"} />
         ) : directorateList?.directorates?.directorates?.length === 0 ? (
           <div className="w-[90%] mx-auto min-h-[300px] my-[30px] flex justify-center items-center bg-white rounded-[10px]">
             <span className="text-[#0C73B8] text-[14px] font-bold">
             {translationState?.lan ==="En" && language?.noDirectorateFoundDivision[0]}
             {translationState?.lan ==="Am" && language?.noDirectorateFoundDivision[1]}
             </span>
           </div>
         ) : (
           <div className="w-[95%] h-[100%] my-[30px] mx-auto flex justify-between items-center">
             <table className="w-[100%] bg-white">
               <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
                 <tr>
                   <th className="px-2 py-4 border-[2px] border-white">#</th>

                   <th className="px-2 py-4 border-[2px] border-white">
                   {translationState?.lan ==="En" && language?.directorateName[0]}
                   {translationState?.lan ==="Am" && language?.directorateName[1]}
                   </th>
                   <th className="px-2 py-4 border-[2px] border-white">
                   {translationState?.lan ==="En" && language?.manager[0]}
                   {translationState?.lan ==="Am" && language?.manager[1]}
                   </th>
                   <th className="px-2 py-4 border-[2px] border-white">
                   {translationState?.lan ==="En" && language?.createdAt[0]}
                   {translationState?.lan ==="Am" && language?.createdAt[1]}
                   </th>
                   <th className="px-2 py-4 border-[2px] border-white">
                   {translationState?.lan ==="En" && language?.status[0]}
                   {translationState?.lan ==="Am" && language?.status[1]}
                   </th>
                 </tr>
               </thead>
               <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                 {directorateList?.directorates?.directorates?.map(
                   (directorate, index) => {
                  

                     return (
                       <tr
                         key={index}
                         onClick={() =>
                           navigate(`/directorate/${directorate?._id}`)
                         }
                         className="text-center border-b border-gray-300 text-gray-600 text-[14px] cursor-pointer max-lg2:text-[12px]"
                       >
                         <td className="px-2 py-4 border-[2px] border-white">
                           {index + 1}
                         </td>

                         <td className="px-2 py-4 border-[2px] border-white">
                         {translationState?.lan ==="En" && directorate?.name_en}
                         {translationState?.lan ==="Am" && directorate?.name_am}
                       
                         </td>
                         <td className="px-2 py-4 border-[2px] border-white">
                         {directorate?.manager ? `${directorate?.manager?.firstname} ${directorate?.manager?.middlename} ${directorate?.manager?.lastname}` : "Not Assigned"} {directorate?.manager?.firstname} 
                      
                         </td>
                         <td className="px-2 py-4 border-[2px] border-white">
                           {directorate?.createdAt?.split("T")[0]}
                         </td>

                         <td className="px-6 py-2 whitespace-nowrap text-[14px] max-lg2:text-[10px]">
                           {directorate?.status === "active" && (
                             <span
                               className="px-2 py-1 inline-flex leading-5
                   font-semibold  bg-green-600 text-white rounded-[5px]"
                             >
                                {translationState?.lan ==="En" && language?.active[0]}
                                {translationState?.lan ==="Am" && language?.active[1]}
                             </span>
                           )}

                           {directorate?.status === "inactive" && (
                             <span
                               className="px-2 py-1 inline-flex  leading-5
                   font-semibold  bg-red-600 text-white rounded-[5px]"
                             >
                              {translationState?.lan ==="En" && language?.inactive[0]}
                              {translationState?.lan ==="Am" && language?.inactive[1]}
                             </span>
                           )}
                         </td>
                       </tr>
                     );
                   }
                 )}
               </tbody>
             </table>
           </div>
         )}
       </div>
     </div>
   </div>
 </div>
  );
}

export default DivisionDetail;
