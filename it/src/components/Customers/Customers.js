import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../REDUX/slices/customerSlice";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Customers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customers);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [hasLogged,setHasLogged] = useState("");
  const [sortingNum, setSortingNum] = useState(-1);
  const [debouncedPhone] = useDebounce(phone,500)

  useEffect(() => {
    dispatch(fetchCustomers({page:pageNum,sort:sortingNum,status,phone:debouncedPhone,hasLogged}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum,sortingNum,status,debouncedPhone,hasLogged]);



  
  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= customerState?.customers?.totalPages) {
      setPageNum(customerState?.customers?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <div className="w-[95%] mx-auto h-[82%] mt-[30px] relative bg-white rounded">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between gap-[10px]  text-[#FBB042]">
          <div className="flex items-center justify-start">
            <BiChevronLeft
              className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              onClick={() => navigate(-1)}
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">Customers</span>
          </div>
        </div>

        <div className="w-[100%]  mx-auto p-2 mt-[20px] grid grid-cols-3 gap-[20px]">
          
          <div className="w-[100%] col-span-1">
            <input
              onChange={(e) => setPhone(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:py-2"
              type="text"
              placeholder="Search by phone"
            />
          </div>
          <div className="w-[100%] col-span-1">
            <select
              onChange={(e) => setHasLogged(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] text-gray-500 outline-none max-lg2:text-[12px] max-lg2:py-2"
              type="text"
            >
              <option value={""}>Search by Logged In</option>
              <option value={"no"}>No</option>
              <option value={"yes"}>Yes</option>
            </select>
          </div>
          <div className="w-[100%] col-span-1">
            <select
              onChange={(e) => setStatus(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] text-gray-500 outline-none max-lg2:text-[12px] max-lg2:py-2"
              type="text"
            >
              <option value={""}>Search by status</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
          </div>
        </div>

        {customerState?.loading ? (
        <div></div>
      ) : (
        customerState?.customers?.customers?.length > 0 &&
        customerState?.customers?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {customerState?.customers?.currentPage} of{" "}
              {customerState?.customers?.totalPages}
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
                <option value={-1}>Latest</option>
                <option value={1}>Oldest</option>
              </select>
            </div>
          </div>
        )
      )}

        <div className="w-[100%] overflow-auto hide-scroll-bar max-h-[700px]  mt-[30px] mx-auto">
          {customerState?.loading ? (
            <Loading addtionalStyle={"flex justify-center items-center"} />
          ) : customerState?.customers?.customers?.length !== 0 ? (
            <table className="w-[100%]  max-[1250px]:hidden">
              <thead className="bg-[#0C73B8] text-white text-[14px]  sticky top-0 z-10">
                <tr className="max-lg2:text-[12px]">
                  <th className="px-2 py-4 border-[2px] border-white">#</th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Profile
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Full Name
                  </th>

                 
                  <th className="px-2 py-4 border-[2px] border-white">Email</th>
                  <th className="px-2 py-4 border-[2px] border-white">Phone</th>

                  <th className="px-2 py-4 border-[2px] border-white">
                    Gender
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Joined In
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Status
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                {customerState?.customers?.customers?.map((customer, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={()=>navigate(`/customers/${customer?._id}`)}
                          className="text-center border-b border-gray-300 text-gray-600 text-[14px] cursor-pointer max-lg2:text-[12px]"
                        >
                          <td className="py-2">{index + 1}</td>
                          <td className="py-2  flex justify-center items-center">
                            {customer?.picture ? (
                              <div className="w-[50px] h-50px] bg-">
                                <img
                                  className="w-[50px] h-[50px] rounded-full object-cover pointer-events-none"
                                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/CustomerImages/${customer?.picture}`}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <div className="w-[50px] h-[50px] bg-[#0C73B8] rounded-full flex justify-center items-center text-white">
                                <span>{customer?.firstname?.[0]}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-2 border">
                            {customer?.firstname} {customer?.middlename}{" "}
                            {customer?.lastname}
                          </td>

                    
                          <td className="py-2 border">{customer?.email}</td>
                          <td className="py-2 border">{customer?.phone}</td>
                          <td className="py-2 border capitalize">
                            {customer?.gender}
                          </td>
                          <td className="py-2 border">
                            {new Date(customer?.createdAt)?.toDateString()}{" "}
                            {/* {new Date(
                              customer?.createdAt
                            )?.toLocaleTimeString()} */}
                          </td>
                          <td className="py-2 border text-[14px] max-lg2:text-[10px]">
                            {customer?.status === "active" && (
                              <span className="p-2 rounded-[5px] bg-green-600  text-white">
                                active
                              </span>
                            )}
                            {customer?.status === "inactive" && (
                              <span className="p-2 rounded-[5px] bg-red-600  text-white">
                                inactive
                              </span>
                            )}
                          </td>
                          <td className="py-2 border text-[14px] max-lg2:text-[10px]">
                            {/* <button
                              onClick={(e) =>{
                                e.stopPropagation();
                                navigate(
                                  `/customer/customer_status/${customer?._id}`
                                )
                                
                              }
                              }
                              className="bg-[#0C73B8] text-white  py-2 px-4 rounded-[5px]"
                            >
                              Change Status
                            </button> */}

<button
                              onClick={(e) =>{
                                e.stopPropagation();
                                navigate(
                                  `/customer/edit/${customer?._id}`
                                )
                                
                              }
                              }
                              className="bg-[#0C73B8] text-white  py-2 px-4 rounded-[5px]"
                            >
                              Edit
                            </button>
                            
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          ) : (
            <div className="uppercase w-[100%] h-[300px] flex items-center justify-center mt-12">
              <span className="text-[#0C73B8] text-[20px] font-bold">
                No customers available
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customers;
