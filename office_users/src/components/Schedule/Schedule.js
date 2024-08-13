import React, { useEffect, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { language } from '../../utils/part-1lan';
import { fetchScheduleDate } from '../../REDUX/slices/dailyScheduleSlice';
import ServerError from '../ServerError';
import Loading from '../Loading';

function Schedule() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const translationState = useSelector((state)=>state?.translation);
    const scheduleDateState = useSelector((state)=>state?.scheduledDate);
    const [date,setDate] = useState("")
   

    useEffect(()=>{
        dispatch(fetchScheduleDate({scheduleDate:date}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[date])

    // console.log("scheduleDateState: ",scheduleDateState);

    if(scheduleDateState?.error) return <ServerError />
  return (
    scheduleDateState?.loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/>:
    <div className="w-[95%] my-[30px] mx-auto rounded-[10px] bg-white">
        <div className="w-[95%] mx-auto flex flex-col">
        <div className="flex my-[20px] justify-between items-center  font-bold text-[#0C73B8]">
          <div className="flex items-center gap-[5px]">
            <IoChevronBack
              onClick={() => navigate(-1)}
              className="text-[30px] cursor-pointer"
            />
            <span className="font-bold">{translationState?.lan === "En" && language?.scheduleList[0]}
            {translationState?.lan === "Am" && language?.scheduleList[1]}</span>
          </div>
         
        </div>
        <div className="w-[100%] h-[1px]  bg-gray-300" />

        <div className="w-[50%] my-[20px]">
                <label
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                            {translationState?.lan === "En" && language?.searchByScheduleDate[0]}
                            {translationState?.lan === "Am" && language?.searchByScheduleDate[1]}
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="date"
                    onChange={(e)=>setDate(e.target.value)}
                    className="block w-full text-[12px] font-bold flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
              <div className='w-[90%] mx-auto my-[20px] flex justify-end items-center'>
              <button onClick={()=>navigate(`/schedule/print`,{state:{
                   currentDate:date

              }})} className="py-2 px-4 bg-[#0C73B8] text-white text-[12px] rounded-[5px] max-lg2:text-[10px]">
                          {translationState?.lan ==="En" && language?.print[0]}
                          {translationState?.lan ==="Am" && language?.print[1]}
                      
                          </button>
              </div>

              <div className="w-[100%] h-[1px]  bg-gray-300" />
              <div className="w-[100%] overflow-auto max-h-[600px] my-[30px] mx-auto hide-scroll-bar max-lg2:max-h-[300px] max-lg2:my-[10px]">
          {scheduleDateState?.scheduleDate?.length === 0 ?  <div className="capitalize w-[100%] h-[300px] flex items-center justify-center">
              <span className="text-xl text-[#0C73B8] font-bold">
              {translationState?.lan === "En" && language?.noSchedule[0]}
              {translationState?.lan === "Am" && language?.noSchedule[1]}  
              </span>
            </div> : (
            <table className="w-[100%]">
              <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
                <tr>
                  <th className="px-2 py-4 border-[2px] border-white">#</th>

                  <th className="px-2 py-4 border-[2px] border-white">
                  {translationState?.lan === "En" && language?.caseNumber[0]}
                  {translationState?.lan === "Am" && language?.caseNumber[1]}
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                  {translationState?.lan === "En" && language?.customerName[0]}
                  {translationState?.lan === "Am" && language?.customerName[1]}
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                  {translationState?.lan === "En" && language?.extended[0]}
                  {translationState?.lan === "Am" && language?.extended[1]}
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                  {translationState?.lan === "En" && language?.appointmentDate[0]}
                  {translationState?.lan === "Am" && language?.appointmentDate[1]}
                  </th>
                  {/* <th className="px-2 py-4 border-[2px] border-white">
                  {translationState?.lan === "En" && language?.action[0]}
                  {translationState?.lan === "Am" && language?.action[1]}
                  </th> */}
                 
                 
                  
                
                </tr>
              </thead>
              <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                {scheduleDateState?.scheduleDate?.map((ul, index) => {
                             
                      return (
                        <tr
                          key={index}
                          onClick={()=>navigate(`/cases/${ul?._id}/forwarded`)}
                          className="text-center border-b border-gray-300 text-gray-600 cursor-pointer text-[14px] max-lg2:text-[12px]"
                        >
                          <td className="py-2 border">{index + 1}</td>
                          <td className="py-2 border">
                          {ul?.case_number}
                          </td>
                          <td className="py-2 border">
                            {ul?.customers_fullname}
                     
                         
                            </td>
                          <td className="py-2 border">
                            {ul?.extended ==="yes" && <>
                                {translationState?.lan === "En" && language?.yes[0]}
                                {translationState?.lan === "Am" && language?.yes[1]}
                            
                            </>}
                            {ul?.extended ==="no" && <>
                                {translationState?.lan === "En" && language?.no[0]}
                                {translationState?.lan === "Am" && language?.no[1]}
                            
                            </>}
                          </td>
                          <td className="py-2 border">
                            {ul?.scheduled_date}
                     
                         
                            </td>
                        
                          {/* <td className="py-2 border">
                          <button onClick={(e)=>{e.stopPropagation();navigate(`/schedule/print/${ul?._id}`,{state:{
                            currentDate:date
                          }})}} className="py-2 px-4 bg-[#0C73B8] text-white text-[12px] rounded-[5px] max-lg2:text-[10px]">
                          {translationState?.lan ==="En" && language?.print[0]}
                          {translationState?.lan ==="Am" && language?.print[1]}
                      
                          </button>
                          </td> */}
                        

                         
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          ) 
           
          }
        </div>
        </div>
    </div>
  )
}

export default Schedule