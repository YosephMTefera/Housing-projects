import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../utils/request";
import ServerError from "./ServerError";
import Loading from "./Loading";
import {  useDispatch, useSelector } from "react-redux";
import { fetchAllDirectorate } from "../REDUX/slices/allDirectorateSlice";
import { language } from "../utils/part-1lan";
import Footer from "./Footer";

function DivisionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const directorateState = useSelector((state) => state?.directorate);
  const [division, setDivision] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/division_api/get_division/${id}`, {
          headers: {
            get_div_api: process.env.REACT_APP_GET_DIV_API,
          },
        })
        .then((res) => {
          setLoading(false);
          setDivision(res.data);
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
  }, [id]);

  useEffect(() => {
    dispatch(fetchAllDirectorate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterDirectorates = directorateState?.directorates?.filter(
    (directorate) =>
      directorate?.division?._id === id && directorate?.status === "active"
  );

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%]">
      <Navbar />
      {loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center my-[130px]"}
        />
      ) : (
        <div className="w-[100%] min-h-[90vh] mt-[150px] mx-auto max-lg2:mt-[100px]">
          <div className="w-[90%] mx-auto my-[20px] text-[#0C73B8] cursor-pointer flex items-center gap-[10px]">
            <MdOutlineArrowBackIosNew
              onClick={() => navigate(-1)}
              className="text-[20px]"
            />
            <span onClick={() => navigate(-1)} className="font-bold">
                    {translationState?.lan === "En" && language?.back[0]}
                    {translationState?.lan === "Am" && language?.back[1]}
                    {translationState?.lan === "Or" && language?.back[2]}
                    {translationState?.lan === "Tg" && language?.back[3]}
                    {translationState?.lan === "Sm" && language?.back[4]}
                    {translationState?.lan === "Af" && language?.back[5]}
            </span>
          </div>
          <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
            <span className="text-[#0C73B8] font-bold text-[40px] capitalize max-lg2:text-[20px]">
                    {translationState?.lan === "En" && division?.name_en}
                    {translationState?.lan === "Am" && division?.name_am}
                    {translationState?.lan === "Or" && division?.name_or}
                    {translationState?.lan === "Tg" && division?.name_tg}
                    {translationState?.lan === "Sm" && division?.name_sm}
                    {translationState?.lan === "Af" && division?.name_af}
           
            </span>
            <p className="w-[60%] leading-[30px] text-gray-500 max-lg2:w-[70%] max-lg2:text-[12px] max-lg1:w-[100%]">
                    {translationState?.lan === "En" && division?.description_en}
                    {translationState?.lan === "Am" && division?.description_am}
                    {translationState?.lan === "Or" && division?.description_or}
                    {translationState?.lan === "Tg" && division?.description_tg}
                    {translationState?.lan === "Sm" && division?.description_sm}
                    {translationState?.lan === "Af" && division?.description_af}
            
            </p>
          </div>
          {/* Directorates */}
          <div className="w-[70%] my-[30px] mx-auto grid grid-cols-3  gap-[10px] max-lg1:w-[90%]  max-md2:w-[90%] max-md2:grid-cols-2 max-sm1:grid-cols-1">
            <div className="col-span-3 my-[20px] flex flex-col items-center gap-[5px] max-md2:col-span-2 max-sm1:col-span-1">
              <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              {translationState?.lan === "En" && language?.directoratesUnder[0]}
                    {translationState?.lan === "Am" && language?.directoratesUnder[1]}
                    {translationState?.lan === "Or" && language?.directoratesUnder[2]}
                    {translationState?.lan === "Tg" && language?.directoratesUnder[3]}
                    {translationState?.lan === "Sm" && language?.directoratesUnder[4]}
                    {translationState?.lan === "Af" && language?.directoratesUnder[5]}
              </span>
              <div className="w-[7%] h-[5px] bg-[#FBB042]" />
            </div>
            {filterDirectorates?.length > 0 &&
              filterDirectorates?.map((directorate1, index) => {
                return (
                  <div key={index} className="col-span-1 min-h-[200px] flex flex-col items-center justify-center gap-4 border rounded-[10px]">
          
                    <div className="w-[90%] my-[30px] mx-auto flex flex-col justify-center items-center gap-[20px]">
                      <span
                       
                        className="text-[#0C73B8] font-bold capitalize flex justify-center items-center text-center max-lg2:text-[14px]"
                      >
                    {translationState?.lan === "En" && directorate1?.name_en}
                    {translationState?.lan === "Am" && directorate1?.name_am}
                    {translationState?.lan === "Or" && directorate1?.name_or}
                    {translationState?.lan === "Tg" && directorate1?.name_tg}
                    {translationState?.lan === "Sm" && directorate1?.name_sm}
                    {translationState?.lan === "Af" && directorate1?.name_af}
                      
                      </span>
                  
                    
                    </div>
                 
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default DivisionDetail;
