import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { BiChevronLeft } from "react-icons/bi";

function AccusationDetail() {
  const token = sessionStorage.getItem("tID");
  const { id } = useParams();
  const navigate = useNavigate();
  const [accusation, setAccsation] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const getAccusation = async () => {
    try {
      setLoading(true);
      await apiRequest
        .get(`/accusation_acceptor_api/get_accusations/${id}`, {
          headers: {
            get_accuseth_api: process.env.REACT_APP_GET_ACCUSETH_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false)
          setAccsation(res?.data);
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          toast.error(error?.response?.data?.Message_en);
        });
    } catch (error) {
      setLoading(false)
      setServerError(true);
    }
  };
  useEffect(() => {
    getAccusation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



if(serverError) return <ServerError />
  return (
    <div className="w-[100%]">
      <ToastContainer theme="light" />
      <div className="w-[90%] flex items-center justify-start   text-[#0C73B8] mt-[50px] mx-auto font-bold max-lg2:mt-[20px]">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px] max-lg2:text-[16px]">Back</span>
        </div>
     
     {
      loading ? <Loading addtionalStyle={"my-[20px] flex justify-center items-center"}/>: <div className="w-[90%] my-[30px] mx-auto">
      <div className="w-[100%] col-span-2  flex flex-col  justify-center gap-[10px] border border-dashed border-[#0C73B8] py-6 cursor-pointer  rounded-[10px]">
       
        <div className="w-[90%] mx-auto">
       
          <div className="flex items-center gap-[10px]">
            <span className="font-bold text-[#0C73B8]">{accusation?.subject}</span>
            <div className="bg-gray-300 rounded-[5px] text-[12px] py-1 px-4 max-lg2:text-[10px] ">
              <span className='font-bold  text-gray-600 max-lg2:text-[8px]'>{new Date(accusation?.createdAt).toLocaleTimeString()}</span>
           
            </div>
          </div>
          <div className="mt-[20px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]">
            <p className="text-gray-500">{accusation?.description}</p>
          </div>

          <div className="mt-[10px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]">
            {accusation?.name && accusation.name !=="" &&      <span className='font-bold'>Name: <span className="text-gray-500 font-normal">{accusation?.name}</span></span> }
            

            {accusation?.phone && accusation.phone !=="" && <span className='font-bold'>Phone: <span className="text-gray-500 font-normal">{accusation?.phone}</span></span>}
           
            {accusation?.accused_organizational_part && accusation?.accused_organizational_part!=="" && <span className="font-bold">Accused  department: <span className="text-gray-500 font-normal">{accusation?.accused_organizational_part}</span></span>}
           
          </div>

          <div className="mt-[10px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]">
            <span className='font-bold'>Created date: <span className="text-gray-500 font-normal">{new Date(accusation?.createdAt).toLocaleDateString()}</span></span>
           
          </div>
        </div>
      </div>
      <div className="my-[30px]">
      <div className="w-[100%] my-4 overflow-y-scroll">
            {accusation?.attachment && (
              <embed
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/AccusationAttachments/${accusation?.attachment}`}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            )}
          </div>
      </div>
    </div>
     }
    </div>
  );
}

export default AccusationDetail;
