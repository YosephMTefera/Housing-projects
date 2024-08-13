import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/request";
import { chartFun } from "../../utils/data";
import ReactEcharts from "echarts-for-react";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { language } from "../../utils/part-1lan";

function CaseStatusAnalysis() {
    const token = sessionStorage.getItem("tID");
    const translationState = useSelector((state)=>state.translation);
    const [caseStatusAnalysis, setCaseStatusAnalyis] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);


    useEffect(() => {
        try {
          setLoading(true);
          apiRequest
            .get("/letter_analysis/get_case_status_analysis", {
              headers: {
                get_gecase_api: process.env.REACT_APP_GET_GECASE_API,
                Authorization: `bearer ${token}`,
              },
            })
            .then((res) => {
              setLoading(false);
              setCaseStatusAnalyis(res.data);
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

      const caseStatusCharOptions = chartFun([
       
        {
          value: caseStatusAnalysis ? caseStatusAnalysis?.responded : 0,
          name: translationState?.lan==="En" ? language?.responded[0] : language?.responded[1],
        },
        {
          value: caseStatusAnalysis ? caseStatusAnalysis?.verified : 0,
          name: translationState?.lan==="En" ? language?.verfied[0] : language?.verfied[1],
        },
       
      ]);

      if(serverError) return <ServerError />
  return (
    loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/>:

<div className='"w-[100%] col-span-1 border py-4 flex flex-col justify-center items-center rounded-[10px]'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
        {translationState?.lan ==="En" && language?.caseAnalysis[0]}
        {translationState?.lan ==="Am" && language?.caseAnalysis[1]}
        </span>

        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex flex-col ">
            <ReactEcharts option={caseStatusCharOptions} />
          </div>
        </div>
      </div>
     
  )
}

export default CaseStatusAnalysis