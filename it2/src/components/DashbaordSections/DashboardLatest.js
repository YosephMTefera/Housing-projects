import React,{useEffect} from 'react'
import { VscVerifiedFilled } from "react-icons/vsc";
import {BsPersonWorkspace} from 'react-icons/bs'
import {BsPersonFillExclamation } from "react-icons/bs";
import {FaUsers,FaArchive} from 'react-icons/fa'
import {useDispatch,useSelector} from 'react-redux'
import { fetchOfficeUsers } from '../../REDUX/slices/officeUsersSlice';
import { fetchArchivalUsers } from '../../REDUX/slices/archivalUsersSlice';
import { fetchEthicsUsers } from '../../REDUX/slices/ethicsUsersSlice';
import { fetchWindowUsers } from '../../REDUX/slices/windowUsersSlice';
import { fetchCustomers } from '../../REDUX/slices/customerSlice';
import AdministratorsChart from './AdministratorsChart';
import ArchivalChart from './ArchivalChart';
import WindowServiceChart from './WindowServiceChart';
import EthicsChart from './EthicsChart';
import CustomerChart from './CustomerChart';

function DashboardLatest() {
  const dispatch = useDispatch();
  const officersList = useSelector((state) => state?.officeUsers);
  const archivalsList = useSelector((state) => state?.archivalUsers);
  const ethicsUserList = useSelector((state)=>state?.ethicsUsers);
  const windowUserList = useSelector((state)=>state?.windowServiceUsers);
  const customersList = useSelector((state) => state?.customers);

  useEffect(()=>{
    dispatch(fetchOfficeUsers({page:"",sort:"",status:"",username:"",division:"",level:"",phone:""}));
    dispatch(fetchArchivalUsers({page:"",sort:"",status:"",username:"",phone:""}));
    dispatch(fetchEthicsUsers({page:"",sort:"",status:"",username:"",phone:""}))
    dispatch(fetchWindowUsers({page:"",sort:"",status:"",username:"",phone:""}))
    dispatch(fetchCustomers({page:"",sort:"",status:"",phone:"",hasLogged:""}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  return (
    <div className='w-[100%] bg-gray-100'>
      <div className='w-[90%] mx-auto my-[20px]'>
      <div className="grid grid-cols-5 gap-[20px]">
        <div className="w-[100%] h-[150px] col-span-1 border border-gray-300 bg-white rounded-[10px] flex items-center max-lg2:h-[100px]">
          <div className="w-[80%] mx-auto flex justify-between">
            <div className="flex flex-col gap-[5px]">
              {" "}
              <span className="text-[40px] text-[#0C73B8] font-bold max-lg2:text-[24px]">{officersList?.officeUsers?.totalOfficeUsers}</span>
              <span className="text-[14px] text-gray-500 max-lg2:text-[10px]">Administrators</span>
            </div>
            <div className="w-[50px] h-[50px] bg-[#f3f6f8] text-[#0C73B8] flex justify-center items-center rounded-full">
              <VscVerifiedFilled className="text-[24px] max-lg2:text-[20px]"/>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[150px] col-span-1 border border-gray-300 bg-white rounded-[10px] flex items-center max-lg2:h-[100px]">
          <div className="w-[80%] mx-auto flex justify-between">
            <div className="flex flex-col gap-[5px]">
              {" "}
              <span className="text-[40px] text-[#0C73B8] font-bold max-lg2:text-[24px]">  {archivalsList?.archivalUsers?.totalArchivalUsers}</span>
              <span className="text-[14px] text-gray-500 max-lg2:text-[10px]">Archival</span>
            </div>
            <div className="w-[50px] h-[50px] bg-[#f3f6f8] text-[#0C73B8] flex justify-center items-center rounded-full">
            <FaArchive className="text-[24px] max-lg2:text-[20px]" />
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[150px] col-span-1 border border-gray-300 bg-white rounded-[10px] flex items-center max-lg2:h-[100px]">
          <div className="w-[80%] mx-auto flex justify-between">
            <div className="flex flex-col gap-[5px]">
              {" "}
              <span className="text-[40px] text-[#0C73B8] font-bold max-lg2:text-[24px]">       {windowUserList?.windowUsers?.totalWindowServiceUsers}</span>
              <span className="text-[14px] text-gray-500 max-lg2:text-[10px]">Window service</span>
            </div>
            <div className="w-[50px] h-[50px] bg-[#f3f6f8] text-[#0C73B8] flex justify-center items-center rounded-full">
            <BsPersonWorkspace   className="text-[24px] max-lg2:text-[20px]"/>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[150px] col-span-1 border border-gray-300 bg-white rounded-[10px] flex items-center max-lg2:h-[100px]">
          <div className="w-[80%] mx-auto flex justify-between">
            <div className="flex flex-col gap-[5px]">
              {" "}
              <span className="text-[40px] text-[#0C73B8] font-bold max-lg2:text-[24px]">          {ethicsUserList?.ethicsUsers?.totalAccusationAcceptors}</span>
              <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">Ethics</span>
            </div>
            <div className="w-[50px] h-[50px] bg-[#f3f6f8] text-[#0C73B8] flex justify-center items-center rounded-full">
              <BsPersonFillExclamation className="text-[24px] max-lg2:text-[20px]"/>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[150px] col-span-1 border border-gray-300 bg-white rounded-[10px] flex items-center max-lg2:h-[100px]">
          <div className="w-[80%] mx-auto flex justify-between">
            <div className="flex flex-col gap-[5px]">
              {" "}
              <span className="text-[40px] text-[#0C73B8] font-bold max-lg2:text-[24px]">  {customersList?.customers?.totalCustomers}</span>
              <span className="text-[14px] text-gray-500 max-lg2:text-[10px]">Customers</span>
            </div>
            <div className="w-[50px] h-[50px] bg-[#f3f6f8] text-[#0C73B8] flex justify-center items-center rounded-full">
              <FaUsers className="text-[24px] max-lg2:text-[20px]"/>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <AdministratorsChart />
      <CustomerChart />
      <ArchivalChart />
      <WindowServiceChart />
      <EthicsChart />
      </div>
    </div>
  )
}

export default DashboardLatest