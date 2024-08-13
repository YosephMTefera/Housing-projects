import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../REDUX/slices/customerSlice";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { language } from "../../utils/part-1lan";

function Customers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation)
  const customerList = useSelector((state) => state.customers);
  const [name,setName] = useState("");
  const [debouncedName] = useDebounce(name,500)
  const [phone,setPhone] = useState("");
  const [debouncedPhone] = useDebounce(phone);
  const [status,setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);

  useEffect(() => {
    dispatch(fetchCustomers({page:pageNum,sort:sortingNum,name:debouncedName,phone:debouncedPhone,status}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum,sortingNum,debouncedName,debouncedPhone,status]);

 
  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= customerList?.customers?.totalPages) {
      setPageNum(customerList?.customers?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };
  if (customerList?.error) return <ServerError />;

  return (
    <div className="w-[90%] mx-auto">
      <div className="w-[100%] my-[20px] flex items-center justify-start   text-[#0C73B8] mt-[50px] mx-auto font-bold">
        <BiChevronLeft
          className="text-[40px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-[20px] max-lg2:text-[16px]">
        {translationState?.lan ==="En" && language?.customers[0]}
        {translationState?.lan ==="Am" && language?.customers[1]}
        </span>
      </div>

      <div className="w-[100%] p-2 bg-white rounded-[10px]">
        <div className="bg-white p-4  my-[30px] rounded-[10px] w-[100%] grid grid-cols-3 gap-[10px]">
          
          <div className="w-[100%] col-span-1 border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
            <CiSearch className="text-[24px] text-gray-500" />
            {translationState?.lan ==="En" &&    <input
              type="text"
              onChange={(e)=>setName(e.target.value)}
              placeholder={language?.searchByCustomerName[0]}
              className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
            />}
        {translationState?.lan ==="Am" &&    <input
              type="text"
              onChange={(e)=>setName(e.target.value)}
              placeholder={language?.searchByCustomerName[1]}
              className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
            />}
         
          </div>
          <div className="w-[100%] col-span-1 border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
            <CiSearch className="text-[24px] text-gray-500" />
            {translationState?.lan ==="En" &&  <input
              type="text"
              placeholder={language?.searchByPhone[0]}
              onChange={(e)=>setPhone(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
            />}
            {translationState?.lan ==="Am" &&  <input
              type="text"
              placeholder={language?.searchByPhone[1]}
              onChange={(e)=>setPhone(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
            />}
            
           
          </div>
          <div className="w-[100%] col-span-1 border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
          <select
            onChange={(e)=>setStatus(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
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

                 
      {customerList?.loading ? (
        <div></div>
      ) : (
        customerList?.customers?.customers?.length > 0 &&
        customerList?.customers?.totalPages && (
          <div className="w-[95%] mx-auto flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {customerList?.customers?.currentPage} of{" "}
              {customerList?.customers?.totalPages}
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

        {customerList?.loading ? (
          <Loading addtionalStyle={"flex justify-center items-center"} />
        ) : customerList?.customers?.customers?.length === 0 ? (
          <div className="w-[100%] flex justify-center items-center my-[20px]">
            <span className="text-[#0C73B8] text-[16px] font-bold max-lg2:text-[14px]">
            {translationState?.lan ==="En" && language?.noCustomerFound[0]}
            {translationState?.lan ==="Am" && language?.noCustomerFound[1]}
            </span>
          </div>
        ) : (
          <div className="w-[95%] mx-auto max-h-[700px] my-[30px] flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#0C73B8]  whitespace-nowrap">
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
                                 {translationState?.lan ==="En" && language?.email[0]}
                                 {translationState?.lan ==="Am" && language?.email[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                                {translationState?.lan ==="En" && language?.phoneNumber[0]}
                                {translationState?.lan ==="Am" && language?.phoneNumber[1]}
                        </th>

                      


                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                               {translationState?.lan ==="En" && language?.status[0]}
                               {translationState?.lan ==="Am" && language?.status[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customerList?.customers?.customers?.map((customer, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center text-[12px] cursor-pointer"
                              onClick={() => navigate(`/customers/${customer?._id}`)}
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
                                {customer?.picture !== "" ? (
                                  <img
                                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/CustomerImages/${customer?.picture}`}
                                    className="w-[100%] h-[100%] object-cover rounded-full"
                                    alt=""
                                  />
                                ) : (
                                  <span className="text-white text-[50px] font-bold">
                                    {customer?.firstname?.[0]}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {customer?.firstname} {customer?.middlename}{" "}
                                    {customer?.lastname}
                                  </div>
                                </div>
                              </div>
                            </td>
                           

                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                              {customer?.email}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                              {customer?.phone}
                            </td>
                         

                            <td className="px-6 py-2 whitespace-nowrap">
                              {customer?.status === "active" && (
                                <span
                                  className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px]"
                                >
                                           {translationState?.lan ==="En" && language?.active[0]}
                                           {translationState?.lan ==="Am" && language?.active[1]}
                                </span>
                              )}

                              {customer?.status === "inactive" && (
                                <span
                                  className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-red-600 text-white rounded-[5px]"
                                >
                                         {translationState?.lan ==="En" && language?.inactive[0]}
                                         {translationState?.lan ==="Am" && language?.inactive[1]}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;
