import React, { useEffect, useState } from "react";
import { fetchAllTeams } from "../REDUX/slices/allTeamSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../utils/request";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import ServerError from "./ServerError";
import { language } from "../utils/part-1lan";

function DirectorateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  // const teamState = useSelector((state) => state?.allTeams);
  const [directorate, setDirectorate] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/directorate_api/get_directorate/${id}`, {
          headers: {
            get_direct_api: process.env.REACT_APP_GET_DIRECT_API,
          },
        })
        .then((res) => {
          setLoading(false);
          setDirectorate(res.data);
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
    dispatch(fetchAllTeams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const filterTeams = teamState?.teams?.filter(
  //   (team) => team?.directorate?._id === id && team?.status === "active"
  // );

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%]">
    
      <Navbar />
      {loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center my-[130px]"}
        />
      ) : (
        <div className="w-[100%] my-[130px] mx-auto">
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
       
              {translationState?.lan === "En" && directorate?.name_en}
                    {translationState?.lan === "Am" && directorate?.name_am}
                    {translationState?.lan === "Or" && directorate?.name_or}
                    {translationState?.lan === "Tg" && directorate?.name_tg}
                    {translationState?.lan === "Sm" && directorate?.name_sm}
                    {translationState?.lan === "Af" && directorate?.name_af}
            </span>
            <p className="w-[60%] leading-[40px] text-gray-500 max-lg2:w-[70%] max-lg2:text-[12px] max-md1:w-[100%]">
            {translationState?.lan === "En" && directorate?.description_en}
                    {translationState?.lan === "Am" && directorate?.description_am}
                    {translationState?.lan === "Or" && directorate?.description_or}
                    {translationState?.lan === "Tg" && directorate?.description_tg}
                    {translationState?.lan === "Sm" && directorate?.description_sm}
                    {translationState?.lan === "Af" && directorate?.description_af}
            </p>
          </div>
          {/* Teams */}
          {/* <div className="w-[70%] my-[30px] mx-auto flex flex-col gap-[20px]  max-md2:w-[90%]">
            {filterTeams?.length > 0 &&
              filterTeams?.map((team, index) => {
                return (
                  <div key={index} className="flex gap-8">
                    <div className="w-[10px] bg-[#FBB042]" />
                    <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
                      <span className="text-[#0C73B8] font-bold text-[30px] capitalize max-lg2:text-[20px]">
                   
                    {translationState?.lan === "En" && team?.name_en}
                    {translationState?.lan === "Am" && team?.name_am}
                    {translationState?.lan === "Or" && team?.name_or}
                    {translationState?.lan === "Tg" && team?.name_tg}
                    {translationState?.lan === "Sm" && team?.name_sm}
                    {translationState?.lan === "Af" && team?.name_af}
                      </span>
                      <p className="w-[70%] leading-[40px] text-gray-500 max-lg2:w-[100%] max-lg2:text-[12px]">
              
                    {translationState?.lan === "En" && team?.description_en}
                    {translationState?.lan === "Am" && team?.description_am}
                    {translationState?.lan === "Or" && team?.description_or}
                    {translationState?.lan === "Tg" && team?.description_tg}
                    {translationState?.lan === "Sm" && team?.description_sm}
                    {translationState?.lan === "Af" && team?.description_af}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div> */}
        </div>
      )}
    </div>
  );
}

export default DirectorateDetail;
