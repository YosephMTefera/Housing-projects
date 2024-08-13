import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { language } from '../../utils/part-1lan';
import ReactEcharts from "echarts-for-react";
import { chartLetterBarFUn } from '../../utils/data';
import apiRequest from '../../utils/request';
import ServerError from '../ServerError';
import Loading from '../Loading';

function WeeklyOutgoingLetterAnalysis() {
    const token = sessionStorage.getItem('tID');
    const translationState = useSelector((state)=>state.translation);
    const [weeklyLetterData,setWeeklyLetterData] = useState({})
    const [weeklyAxis, setWeeklyAxis] = useState([]);
    const [noOfLetters, setNoofletters] = useState([]);
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false)

    useEffect(() => {
        try {
          setLoading(true);
          apiRequest
            .get("/letter_analysis/weekly_outgoing_letter_analysis", {
              headers: {
                get_incletters_api: process.env.REACT_APP_GET_INCLETTERS_API,
                Authorization: `bearer ${token}`,
              },
            })
            .then((res) => {
              setLoading(false);
              setWeeklyLetterData(res.data);
              const month = Object.keys(res?.data);
              const letters = Object.values(res?.data);
              setWeeklyAxis(month);
              setNoofletters(letters);
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


      const weeklybaLettersrCharOptions = chartLetterBarFUn(
        weeklyAxis,
        noOfLetters
      ,'#0C73B8'
      );
      if(serverError) return <ServerError />
  return (
    loading ? <Loading addtionalStyle={"col-span-1 flex justify-center items-center my-[20px]"} />:
    <div className='"w-[100%] col-span-1 border py-4 flex flex-col justify-center items-center rounded-[10px]'>
            <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
            {translationState?.lan ==="En" && language?.weeklyOutgoingLetters[0]}
            {translationState?.lan ==="Am" && language?.weeklyOutgoingLetters[1]}
            </span>
    
            {(weeklyLetterData?.ስኞ ===0 && weeklyLetterData?.ማክሰኞ ===0 && weeklyLetterData?.ዕሮብ ===0 && weeklyLetterData?.ሃሙስ ===0 && weeklyLetterData?.አርብ ===0) ?  <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex justify-center items-center">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                {translationState?.lan ==="En" && language?.noOutgoingLetterWeek[0]}
                {translationState?.lan ==="Am" && language?.noOutgoingLetterWeek[1]}
                </span>
              </div> : <div className="w-[100%]">
              <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex flex-col ">
                <ReactEcharts option={weeklybaLettersrCharOptions} />
              </div>
            </div>}
          </div>
  )
}

export default WeeklyOutgoingLetterAnalysis