import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/request";
import { chartBarFUn, chartFun } from "../../utils/data";
import ReactEcharts from "echarts-for-react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import { language } from "../../utils/part-1lan";

const Star = ({ filled }) => <span className="text-orange-300 text-[24px]">{filled ? "★" : "☆"}</span>;

function DivisionCaseChart() {
  const token = sessionStorage.getItem("tID");
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const divisionList = useSelector((state) => state.allDivisions);
  const [weeklyAnalysisDays, setWeeklyAnalysisDays] = useState([]);
  const [weeklyAnalysisCases, setWeeklyAnalysisCases] = useState([]);
  const [weeklyDivisionAnalysis, setWeeklyDivisionAnalysis] = useState({});
  const [caseStatusAnalysis, setCaseStatusAnalyis] = useState({});
  const [divisionRating, setDivisionRating] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllDivision());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get("/customer_case_api/get_weekly_case_analysis", {
          headers: {
            get_cawedanays_api: process.env.REACT_APP_GET_CAWEDANAYS_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);

          const days = Object.keys(res?.data);
          const cases = Object.values(res?.data);
          setWeeklyAnalysisDays(days);
          setWeeklyAnalysisCases(cases);
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

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get("/customer_case_api/get_weekly_case_div_analysis", {
          headers: {
            get_cadivwedanays_api: process.env.REACT_APP_GET_CADIVWEDANAYS_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);

       
          setWeeklyDivisionAnalysis(res.data);
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

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get("/customer_case_api/get_case_status_analysis", {
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

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get("/div_rate/get_each_div_rate", {
          headers: {
            get_rtgdiv_api: process.env.REACT_APP_GET_RTGDIV_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setDivisionRating(res.data);
          // ("Div rating: ", res.data);
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

  const weeklybarCharOptions = chartBarFUn(
    weeklyAnalysisDays,
    weeklyAnalysisCases
  );
  const caseStatusCharOptions = chartFun([
    {
      value: caseStatusAnalysis ? caseStatusAnalysis?.pending : 0,
      name: translationState?.lan==="En" ? language?.pending[0] : language?.pending[1],
    },
    {
      value: caseStatusAnalysis ? caseStatusAnalysis?.ongoing : 0,
      name: translationState?.lan==="En" ? language?.ongoing[0] : language?.ongoing[1],
    },
    {
      value: caseStatusAnalysis ? caseStatusAnalysis?.responded : 0,
      name: translationState?.lan==="En" ? language?.responded[0] : language?.responded[1],
    },
    {
      value: caseStatusAnalysis ? caseStatusAnalysis?.verified : 0,
      name: translationState?.lan==="En" ? language?.verfied[0] : language?.verfied[1],
    },
    {
      value: caseStatusAnalysis ? caseStatusAnalysis?.rejected : 0,
      name: translationState?.lan==="En" ? language?.rejected[0] : language?.rejected[1],
    },
  ]);

  const noSpecialDivisionData =  divisionList?.divisions?.filter((divi)=>divi?.special ==="no");


  const weeklyDivisionData = noSpecialDivisionData?.map((divi) => {
    const divData = weeklyDivisionAnalysis[divi?._id];
  
    let weeklydivisionNames, weeklydivisionValues;
    if (divData) {
      weeklydivisionNames = Object.keys(divData);
      weeklydivisionValues = Object.values(divData);
    }

    return chartBarFUn(weeklydivisionNames, weeklydivisionValues);
  });



  if (serverError) return <ServerError />;
  return loading ? (
    <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />
  ) : (
    <div className="w-[100%] my-[20px] grid grid-cols-4 gap-[10px]">
      <div className='"w-[100%] col-span-2 flex flex-col justify-center items-center'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
        {translationState?.lan ==="En" && language?.weeklyCases[0]}
        {translationState?.lan ==="Am" && language?.weeklyCases[1]}
        </span>

        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex flex-col ">
            {(weeklyAnalysisCases[0] ===0 &&weeklyAnalysisCases[1] ===0 && weeklyAnalysisCases[2] ===0 && weeklyAnalysisCases[3] ===0 && weeklyAnalysisCases[4] ===0) ? <div className="w-[100%] h-[100%] mt-[40px] flex justify-center items-center">
              <span className="font-bold text-[#0C73B8]">
              {translationState?.lan ==="En" && language?.noCasesWeek[0]}
              {translationState?.lan ==="Am" && language?.noCasesWeek[1]}
              </span>
            </div>:  <ReactEcharts option={weeklybarCharOptions} />} 
          </div>
        </div>
      </div>
      <div className='"w-[100%] col-span-1 flex flex-col justify-center items-center max-lg2:col-span-2'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
        {translationState?.lan ==="En" && language?.caseStatus[0]}
        {translationState?.lan ==="Am" && language?.caseStatus[1]}
        </span>

        <div className="w-[100%]">
          <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex flex-col ">
            <ReactEcharts option={caseStatusCharOptions} />
          </div>
        </div>
      </div>
      <div className='"w-[100%] min-h-[100px]  col-span-1 flex flex-col  items-center overflow-y-auto hide-scroll-bar max-lg2:col-span-4'>
        <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
        {translationState?.lan ==="En" && language?.divisionRating[0]}
        {translationState?.lan ==="Am" && language?.divisionRating[1]}
        </span>

        <div className="w-[100%] flex flex-col gap-[10px]">
          <div className="w-[100%] mt-[20px]   bg-white p-4 rounded-[20px] flex flex-col ">
            {divisionRating?.length ===0 ? <div>
              <span className="text-[14px] font-bold flex justify-center items-center">
              {translationState?.lan ==="En" && language?.noRatings[0]}
              {translationState?.lan ==="Am" && language?.noRatings[1]}
              </span>
            </div>: <div className="w-[95%] mx-auto my-[10px] flex flex-col gap-[10px]">
              <div className="flex justify-between items-center text-[14px] font-bold">
                <span>
                {translationState?.lan ==="En" && language?.division[0]}
                {translationState?.lan ==="Am" && language?.division[1]}
                </span>
                <span>
                {translationState?.lan ==="En" && language?.ratings[0]}
                {translationState?.lan ==="Am" && language?.ratings[1]}
                </span>
              </div>
              <div className="w-[100%] max-h-[300px] overflow-auto hide-scroll-bar flex flex-col justify-center items-center gap-[5px] text-gray-500 text-[12px]">
                {divisionRating?.map((rate, index) => {
                  const divisionName = divisionList?.divisions?.find(
                    (div) => div?._id === rate.division
                  );
                  const filledStars = Math.floor(rate?.averageRate);
                  const hasHalfStar = rate?.averageRate % 1 !== 0;
                  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

                  return (
                    <div
                      key={index}
                      className="w-[100%] border-b py-2 flex justify-between items-center gap-[5px]"
                    >
                      <span>
                      {translationState?.lan ==="En" && divisionName?.name_en}
                      {translationState?.lan ==="Am" && divisionName?.name_am}
                      </span>
                      <div className="flex justify-end">
                      {[...Array(filledStars)].map((_, index) => (
                        <Star key={index} filled={true} />
                      ))}
                      {hasHalfStar && (
                        <Star filled={true} style={{ opacity: 0.5 }} />
                      )}
                      {[...Array(emptyStars)].map((_, index) => (
                        <Star
                          key={index + filledStars + (hasHalfStar ? 1 : 0)}
                          filled={false}
                        />
                      ))}
                      </div>
                  
                    </div>
                  );
                })}
             
              
             
           
             
              
              </div>
            </div>}
           
          </div>
        </div>
      </div>
      {noSpecialDivisionData?.map((division, index) => {
        

        return (
          <div
            key={index}
            className='"w-[100%] my-[20px] col-span-2 flex flex-col justify-center items-center'
          >
            <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
            {translationState?.lan ==="En" && division?.name_en}
            {translationState?.lan ==="Am" && division?.name_am}
         
            </span>

            {weeklyDivisionData[index]?.series?.[0]?.data ? (
              <div className="w-[100%]">
                <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex flex-col ">
                  <ReactEcharts option={weeklyDivisionData[index]} />
                </div>
              </div>
            ) : (
              <div className="w-[100%] mt-[20px]  min-h-[400px] bg-white p-4 rounded-[20px] flex justify-center items-center">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                {translationState?.lan ==="En" && language?.noCaseDivisionWeek[0]}
                {translationState?.lan ==="Am" && language?.noCaseDivisionWeek[1]}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DivisionCaseChart;
