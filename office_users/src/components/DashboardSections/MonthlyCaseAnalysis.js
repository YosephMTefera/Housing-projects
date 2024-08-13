import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { language } from '../../utils/part-1lan';
import ReactEcharts from "echarts-for-react";
import { chartLetterBarFUn } from '../../utils/data';
import apiRequest from '../../utils/request';
import Loading from '../Loading';
import ServerError from '../ServerError';
function MonthlyCaseAnalysis() {
    const token = sessionStorage.getItem('tID');
    const translationState = useSelector((state)=>state.translation);
    const [monthAxis, setMonthAxis] = useState([]);
    const [noOfLetters, setNoofletters] = useState([]);
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false)

    useEffect(() => {
        try {
          setLoading(true);
          apiRequest
            .get("/letter_analysis/get_monthly_case_analysis", {
              headers: {
                get_incletters_api: process.env.REACT_APP_GET_INCLETTERS_API,
                Authorization: `bearer ${token}`,
              },
            })
            .then((res) => {
              setLoading(false);
              
              const month = Object.keys(res?.data);
              const letters = Object.values(res?.data);
              setMonthAxis(month);
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

      const monthlybaLettersrCharOptions = chartLetterBarFUn(
        monthAxis,
        noOfLetters
      ,'#0C73B8'
      );
      if(serverError) return <ServerError />
  return (
    loading ? <Loading addtionalStyle={"col-span-2 flex justify-center items-center my-[20px]"}/> :
    <div className='w-[100%] col-span-2  py-4 flex flex-col justify-center items-center rounded-[10px]'>
             
        
                <div className="w-[100%]">
                  <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex flex-col ">
                  <span className="font-bold flex justify-center items-center text-[#0C73B8] max-lg2:text-[14px]">
                {translationState?.lan ==="En" && language?.monthlyCaseAnalysis[0]}
                {translationState?.lan ==="Am" && language?.monthlyCaseAnalysis[1]}
                </span>
                    <ReactEcharts option={monthlybaLettersrCharOptions} />
                  </div>
                </div>
              </div>
  )
}

export default MonthlyCaseAnalysis