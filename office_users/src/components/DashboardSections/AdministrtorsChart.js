import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { chartFun } from "../../utils/data";
import ReactEcharts from "echarts-for-react";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";



function AdministrtorsChart() {
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state)=>state.translation);
  const [officeUsersAnalysis, setOfficeUserAnalysis] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const adminLevel = translationState?.lan==="En" ? language?.level[0] : language?.level[1]
  const adminGender =translationState?.lan==="En" ? language?.gender[0] : language?.gender[1]
  const adminStatus =translationState?.lan==="En" ? language?.status[0] : language?.status[1]

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get("/office_user_api/get_analytics", {
          headers: {
            get_users_api: process.env.REACT_APP_GET_USERS_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setOfficeUserAnalysis(res.data);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  }, [token]);



  const levelAdminCharOptions = chartFun([
    {
      value: officeUsersAnalysis ? officeUsersAnalysis?.mainExectiveUsers : 0,
      name: translationState?.lan==="En" ? language?.mainExecutive[0] : language?.mainExecutive[1],
    },
    {
      value: officeUsersAnalysis ? officeUsersAnalysis?.divisionManagers : 0,
      name: translationState?.lan==="En" ? language?.divisionManagers[0] : language?.divisionManagers[1]
    },
    {
      value: officeUsersAnalysis ? officeUsersAnalysis?.directorUsers : 0,
      name: translationState?.lan==="En" ? language?.director[0] : language?.director[1]
    },
    {
      value: officeUsersAnalysis ? officeUsersAnalysis?.teamLeaderusers : 0,
      name: translationState?.lan==="En" ? language?.teamleaders[0] : language?.teamleaders[1]
    },
    {
      value: officeUsersAnalysis ? officeUsersAnalysis?.professionalusers : 0,
      name: translationState?.lan==="En" ? language?.professsionals[0] : language?.professsionals[1]
    },
  ],adminLevel);

  const genderAdminCharOptions = chartFun([
    {
      value: officeUsersAnalysis ? officeUsersAnalysis?.maleOfficeUsers : 0,
      name: translationState?.lan==="En" ? language?.male[0] : language?.male[1]
    },
    {
      value: officeUsersAnalysis ? officeUsersAnalysis?.femaleOfficeUsers : 0,
      name: translationState?.lan==="En" ? language?.female[0] : language?.female[1]
    },
  ],adminGender);

  const statusAdminCharOptions = chartFun([
    {
      value: officeUsersAnalysis ? officeUsersAnalysis?.activeOfficeusers : 0,
      name: translationState?.lan==="En" ? language?.active[0] : language?.active[1]
    },
    {
      value: officeUsersAnalysis ? officeUsersAnalysis?.inactiveOfficeusers : 0,
      name: translationState?.lan==="En" ? language?.inactive[0] : language?.inactive[1]
    },
  ],adminStatus);

  if (serverError) return <ServerError />;
  return (
    loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> :
    <div className="w-[100%] my-[10px] grid grid-cols-3 gap-[10px]">
      <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[12px]">
       
          {translationState?.lan ==="En" && language?.administratorsLevel[0]}
          {translationState?.lan ==="Am" && language?.administratorsLevel[1]}
        </span>

        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col">
            <ReactEcharts option={levelAdminCharOptions} />
          </div>
        </div>
      </div>
      <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[12px]">
        {translationState?.lan ==="En" && language?.administratorsGender[0]}
        {translationState?.lan ==="Am" && language?.administratorsGender[1]}
        </span>

        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
            <ReactEcharts option={genderAdminCharOptions} />
          </div>
        </div>
      </div>
      <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[12px]">
        {translationState?.lan ==="En" && language?.administratorsStatus[0]}
        {translationState?.lan ==="Am" && language?.administratorsStatus[1]}
        </span>
        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[350px] bg-white p-4 rounded-[20px] flex flex-col ">
            <ReactEcharts option={statusAdminCharOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdministrtorsChart;
