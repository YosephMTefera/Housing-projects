import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/request";
import {  chartLetterFun } from "../../utils/data";
import ReactEcharts from "echarts-for-react";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { language } from "../../utils/part-1lan";

function LateLetterAnalysis() {
    const token = sessionStorage.getItem("tID");
    const translationState = useSelector((state)=>state.translation);
    const [lateLettersAnalysis, setLateLetterAnalyis] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);


    useEffect(() => {
        try {
          setLoading(true);
          apiRequest
            .get("/letter_analysis/get_late_ltr_analysis", {
              headers: {
                get_extsecond_api: process.env.REACT_APP_GET_EXTSECOND_API,
                Authorization: `bearer ${token}`,
              },
            })
            .then((res) => {
              setLoading(false);
              setLateLetterAnalyis(res.data);
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

      const lateLetterIncomingCharOptions = chartLetterFun([
       
        {
          value: lateLettersAnalysis ? lateLettersAnalysis?.totalLateIncomingLtrs : 0,
          name: translationState?.lan==="En" ? language?.totalLateIncomingLetters[0] : language?.totalLateIncomingLetters[1],
        },
        {
          value: lateLettersAnalysis ? lateLettersAnalysis?.currentLateIncomingLtrs : 0,
          name: translationState?.lan==="En" ? language?.currentLateIncomingLetters[0] : language?.currentLateIncomingLetters[1],
        },
       
      ]);
      const lateLetterOutgoingCharOptions = chartLetterFun([
       
        {
          value: lateLettersAnalysis ? lateLettersAnalysis?.totalLateOutgoingLtrs : 0,
          name: translationState?.lan==="En" ? language?.totalOutgoingLetters[0] : language?.totalOutgoingLetters[1],
        },
        {
          value: lateLettersAnalysis ? lateLettersAnalysis?.currentLateOutgoingLtrs: 0,
          name: translationState?.lan==="En" ? language?.currentLateOutgoingLetters[0] : language?.currentLateOutgoingLetters[1],
        },
       
      ]);
      const lateLetterInternalCharOptions = chartLetterFun([
       
        {
          value: lateLettersAnalysis ? lateLettersAnalysis?.totalLateInternalLtrs : 0,
          name: translationState?.lan==="En" ? language?.totalLateInternalLetters[0] : language?.totalLateInternalLetters[1],
        },
        {
          value: lateLettersAnalysis ? lateLettersAnalysis?.currentLateOutgoingLtrs : 0,
          name: translationState?.lan==="En" ? language?.currentLateOutgoingLetters[0] : language?.currentLateInternalLetters[1],
        },
       
      ]);

      if(serverError) return <ServerError />
  return (
    loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/>:<div className="w-[95%] mx-auto grid grid-cols-3 gap-[10px]">
<div className='w-[100%] col-span-1 border py-4 flex flex-col justify-center items-center rounded-[10px]'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
        {translationState?.lan ==="En" && language?.currentLateIncomingLetters[0]}
        {translationState?.lan ==="Am" && language?.currentLateIncomingLetters[1]}
        </span>

        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex flex-col ">
            <ReactEcharts option={lateLetterIncomingCharOptions} />
          </div>
        </div>
      </div>
      <div className='w-[100%] col-span-1 border py-4 flex flex-col justify-center items-center rounded-[10px]'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
        {translationState?.lan ==="En" && language?.currentLateOutgoingLetters[0]}
        {translationState?.lan ==="Am" && language?.currentLateOutgoingLetters[1]}
        </span>

        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex flex-col ">
            <ReactEcharts option={lateLetterOutgoingCharOptions} />
          </div>
        </div>
      </div>
      <div className='w-[100%] col-span-1 border py-4 flex flex-col justify-center items-center rounded-[10px]'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
        {translationState?.lan ==="En" && language?.currentLateInternalLetters[0]}
        {translationState?.lan ==="Am" && language?.currentLateInternalLetters[1]}
        </span>

        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex flex-col ">
            <ReactEcharts option={lateLetterInternalCharOptions} />
          </div>
        </div>
      </div>
    </div>


     
  )
}

export default LateLetterAnalysis