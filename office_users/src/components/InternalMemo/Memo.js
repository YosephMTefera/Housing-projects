import React from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from "react-router-dom";
import { internalMemo } from '../../utils/data';

function Memo() {
    const navigate = useNavigate();
  return (
    <div className='w-[100%]'>
        <div className='w-[100%] p-2 bg-white min-h-[100px]'>
     <div className='w-[90%] mx-auto flex justify-between items-center'>
     <div className="flex  items-center justify-start  text-[#0C73B8] my-[30px] font-bold">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px]">Memos</span>
        </div>

        <button onClick={()=>navigate('/creatememo')} className='py-2 px-4 rounded-[20px] bg-[#0C73B8] text-[14px] text-white'>Create Memo</button>
     </div>

        </div>
        {/* table */}
       <div className='w-[90%] my-[30px] mx-auto bg-white p-4 rounded-[10px]'>
       <div className="my-[20px] flex justify-between items-center">
          <div className="w-[100%] flex items-center gap-[10px]">
            <div className="w-[30%] border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
              <CiSearch className="text-[24px] text-gray-500" />
              <input
                type="text"
                placeholder="Search by executive name"
                className="flex-1 bg-transparent outline-none text-[14px]"
              />
            </div>
       
          <div className="border border-gray-400 p-3 rounded-[5px]">
              <select className="w-[100%] flex-1 bg-transparent outline-none text-[14px]">
                <option disabled>Filter by status</option>
                <option>Forwarded</option>
                <option>Created</option>
          
              </select>
            </div>
          </div>
    
        </div>
        {/* table */}
        <div className="max-h-[700px] flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#0C73B8]  whitespace-nowrap">
                    <tr className="text-[14px]">
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
                        Created By
                      </th>
                    
                      <th
                        scope="col"
                        className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                      >
                        <span>Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {internalMemo.map((memo, index) => {
                      return (
                        <tr
                          key={index}
                          className="text-center text-[12px]"
                          // onClick={()=>navigate(`/cases/${case1.id}`)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {index + 1}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <div className="ml-4">
                                <div className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                                  {memo.createdby}
                                </div>
                              </div>
                            </div>
                          </td>
                         
                          

                         
                          <td className="px-6 py-2 whitespace-nowrap">
                            <span
                              className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold rounded-[5px] bg-gray-200 text-green-800"
                            >
                              {memo.status}
                            </span>
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap text-center text-sm font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/cases/forward/${memo.id}`);
                              }}
                              className="py-2 px-4 bg-[#0C73B8] text-white text-[14px] font-bold rounded-[5px]"
                            >
                              forward
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
        </div>
       </div>
    </div>
  )
}

export default Memo