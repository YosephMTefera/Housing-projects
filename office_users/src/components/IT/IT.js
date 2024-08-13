import React, { useEffect, useState } from 'react'
import {BiChevronLeft} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { fetchItUsers } from '../../REDUX/slices/itUsersSlice';
import Loading from '../Loading';
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { language } from '../../utils/part-1lan';


function IT() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const translationState = useSelector((state)=>state.translation);
    const itUsersList = useSelector((state)=>state.itUsers);
    const [username,setUsername] = useState("");
    const [debouncedUsername] = useDebounce(username,500);
    const [phone,setPhone] = useState("");
    const [debouncedPhone] = useDebounce(phone,500)
    const [status,setStatus] = useState("")
    const [pageNum, setPageNum] = useState(1);
    const [sortingNum, setSortingNum] = useState(-1);
    

    useEffect(()=>{
      dispatch(fetchItUsers({page:pageNum,sort:sortingNum,username:debouncedUsername,firstname:"",phone:debouncedPhone,status}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pageNum,sortingNum,debouncedUsername,debouncedPhone,status])

    const handlePrevious = () => {
      if (pageNum <= 1) {
        setPageNum(1);
      } else {
        setPageNum(pageNum - 1);
      }
    };
  
    const handleNext = () => {
      if (pageNum >= itUsersList?.itusers?.totalPages) {
        setPageNum(itUsersList?.itusers?.totalPages);
      } else {
        setPageNum(pageNum + 1);
      }
    };
  return (
    <div className="w-[95%] mx-auto min-h-[82%] mt-[30px] relative bg-white rounded">
    <div className="w-[95%] mt-[30px] mx-auto">
      <div className="flex items-center justify-between gap-[10px]  text-[#0C73B8]">
        <div className="flex items-center justify-start">
          <BiChevronLeft className="text-[40px] cursor-pointer" onClick={()=>navigate(-1)} />
          <span className="text-[20px] font-bold max-lg2:text-[16px]">
          {translationState?.lan ==="En" && language?.it[0]}
          {translationState?.lan ==="Am" && language?.it[1]}
          </span>
        </div>


        <div>
          <button
            onClick={() => navigate("/it/create")}
            className="px-4 py-2 text-white bg-[#0C73B8] rounded   transition duration-500 max-lg2:text-[12px]"
          >
            {translationState?.lan ==="En" && language?.createIT[0]}
            {translationState?.lan ==="Am" && language?.createIT[1]}
          </button>
        </div>
      </div>

      <div className="w-[100%]  mx-auto p-2 mt-[20px] grid grid-cols-4 gap-[20px] max-[650px]:justify-between">
        <div className="w-[100%] col-span-1 max-[650px]:flex-1">
        {translationState?.lan ==="En" &&   <input
            onChange={(e)=>setUsername(e.target.value)}
            className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none"
            type="text"
            placeholder={language?.searchByUsername[0]}
          />}
        {translationState?.lan ==="Am" &&   <input
            onChange={(e)=>setUsername(e.target.value)}
            className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none"
            type="text"
            placeholder={language?.searchByUsername[1]}
          />}
         
        </div> 
    

        <div className="w-[100%] max-md2:flex-1">
        {translationState?.lan ==="En" &&  <input
           onChange={(e)=>setPhone(e.target.value)}
            className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none max-lg2:text-[12px]"
            type="text"
            placeholder={language?.searchByPhone[0]}
          />}
        {translationState?.lan ==="Am" &&  <input
           onChange={(e)=>setPhone(e.target.value)}
            className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none max-lg2:text-[12px]"
            type="text"
            placeholder={language?.searchByPhone[1]}
          />}
         
        </div>
        <div className="w-[100%] col-span-1">
          <select
            onChange={(e)=>setStatus(e.target.value)}
            className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none  max-lg2:text-[12px]"
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

      <div className="w-[100%] overflow-auto max-h-[700px]  my-[30px] mx-auto hide-scroll-bar">
     
      
          
      {itUsersList?.loading ? (
        <div></div>
      ) : (
        itUsersList?.itusers?.itusers?.length > 0 &&
        itUsersList?.itusers?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {itUsersList?.itusers?.currentPage} of{" "}
              {itUsersList?.itusers?.totalPages}
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
   
      {itUsersList?.loading ? <Loading addtionalStyle={"flex justify-center items-center"} />: itUsersList?.itusers?.itusers?.length ===0 ?  <div className="w-[100%] my-30px] text-[#0C73B8] flex justify-center  items-center">
        <span className="font-bold">     {translationState?.lan ==="En" && language?.itNotFound[0]}
        {translationState?.lan ==="Am" && language?.itNotFound[1]}</span>
      </div>    :<div className="max-h-[700px] my-[30px]">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 hide-scroll-bar">
                <thead className="bg-[#0C73B8]  whitespace-nowrap ">
                  <tr className="text-[14px] max-lg2:text-[12px]">
                    <th
                      scope="col"
                      className="px-6 py-4 text-center  font-bold text-white  tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                    >
                         {translationState?.lan ==="En" && language?.picture[0]}
                         {translationState?.lan ==="Am" && language?.picture[1]}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                    >
                     {translationState?.lan ==="En" && language?.fullName[0]}
                     {translationState?.lan ==="Am" && language?.fullName[1]}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                    >
                         {translationState?.lan ==="En" && language?.username[0]}
                         {translationState?.lan ==="Am" && language?.username[1]}
                    </th>

                

                    <th
                      scope="col"
                      className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                    >
                       {translationState?.lan ==="En" && language?.phone[0]}
                       {translationState?.lan ==="Am" && language?.phone[1]}
                    </th>

                   
                   

                 

                  
                   
                    <th
                      scope="col"
                      className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                    >
                      {translationState?.lan ==="En" && language?.status[0]}
                      {translationState?.lan ==="Am" && language?.status[1]}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                    >
                        {translationState?.lan ==="En" && language?.action[0]}
                        {translationState?.lan ==="Am" && language?.action[1]}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {itUsersList?.itusers?.itusers?.map((it, index) => {
                
                   
                    return (
                      <tr
                        key={index}
                        className="text-center text-[12px] cursor-pointer"
                          onClick={() => navigate(`/it/${it?._id}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex justify-center items-center">
                            <div>
                              <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-[50px] h-[50px] bg-[#0C73B8]  rounded-full flex justify-center items-center">
            {it?.picture !== "" ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/ITUserImages/${it?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <span className="text-white text-[50px] font-bold">
                {it?.firstname?.[0]}
              </span>
            )}
          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex justify-center items-center">
                            <div>
                              <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                {it?.firstname} {it?.middlename} {it?.lastname}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex justify-center items-center">
                            <div>
                              <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                {it?.username}
                              </div>
                            </div>
                          </div>
                        </td>


                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                          {it?.phone}
                        </td>
                 
                        

                     

                        <td className="px-6 py-2 whitespace-nowrap text-[12px] max-lg2:text-[12px]">
                         {it?.status ==="active" &&  <span
                            className="px-2 py-1 inline-flex  leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px]"
                          >
                         {translationState?.lan ==="En" && language?.active[0]}
                         {translationState?.lan ==="Am" && language?.active[1]}
                          </span>}

                          {it?.status ==="inactive" &&  <span
                            className="px-2 py-1 inline-flex  leading-5
                      font-semibold  bg-red-600 text-white rounded-[5px]"
                          >
                            {translationState?.lan ==="En" && language?.inactive[0]}
                            {translationState?.lan ==="Am" && language?.inactive[1]}
                          </span>}
                         
                         
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-gray-500">
                          <button onClick={(e)=>{e.stopPropagation(); navigate(`/it/edit/${it?._id}`)}} className='py-2 px-4 bg-[#0C73B8] text-white text-[14px] rounded-[5px] max-lg2:text-[12px]'>
                                 {translationState?.lan ==="En" && language?.edit[0]}
                                 {translationState?.lan ==="Am" && language?.edit[1]}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>}
     
        
      </div>
    </div>
  </div>
  )
}

export default IT