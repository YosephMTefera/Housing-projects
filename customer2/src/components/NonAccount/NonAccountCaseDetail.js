import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BiChevronLeft } from "react-icons/bi";
import PDFViewer from "../SubComponents/PDFViewer";
import { useSelector, useDispatch } from "react-redux";
import { fetchCaseComplaint } from "../../REDUX/slices/caseComplaintSlice";

function NonAccountCaseDetail({caseNumber,caseInfo,fileURL,setFileURL}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [title, setTitle] = useState("Case Letter");


  const caseComplaintList = useSelector((state) => state?.caseComplaint);

  useEffect(() => {
    dispatch(fetchCaseComplaint({ caseId: caseNumber }));
    // eslint-disable-next-line
  }, [caseNumber]);



  const handleCaseAttachment = (fileAddressSet) => {
    setTitle("Case Letter");
    setFileURL(fileAddressSet);
  };

  const handleResponseFile = (fileAddressSet) => {
    setTitle("Case Response Letter");
    setFileURL(fileAddressSet);
  };

 
  return (
    
    <div className="w-[100%] bg-white">
      <div className="w-[90%] mx-auto">
        <ToastContainer theme="light" />
        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center justify-start gap-[10px] text-[#FDC00D]">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer"
            />
            <span className="text-[20px] font-bold">Case Details/{caseNumber}</span>
          </div>

         
        </div>

        <div className="w-[100%] mx-auto min-h-[80vh] py-4 relative bg-white rounded">
          <div className="w-[90%] mx-auto flex gap-[20px] max-[1200px]:flex-col">
            <div className="w-[50%] mt-[20px] flex flex-col gap-[30px] max-[1200px]:w-[100%] px-2">
              <div className="w-[100%] flex justify-between items-center gap-[20px] max-[600px]:flex-col ">
                <div className="w-[100%] mx-auto flex justify-between items-end gap-4">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Case Number
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?._id ? caseInfo?._id : "-"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-[100%]">
                  <p className="text-[#0C73B8] text-[15px] font-semibold">
                    Status
                  </p>
                  <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                    {caseInfo?.status
                      ? (caseInfo?.status === "new" && <span>new</span>) ||
                        ((caseInfo?.status === "pending" ||
                          caseInfo?.status === "ongoing") && (
                          <span>processing</span>
                        )) ||
                        (caseInfo?.status === "responded" && (
                          <span>responded</span>
                        ))
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="w-[100%] flex justify-between items-center gap-[20px] max-[600px]:flex-col ">
                <div className="w-[100%] mx-auto flex justify-between items-end gap-4">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Related Case Number
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.related_case_id ? (
                        <span>
                          {caseInfo?.related_case_id}{" "}
                          <span
                            className="text-[13px] cursor-pointer text-[#FBB042]"
                            onClick={() =>
                              navigate(
                                `/dashboard/case/${caseInfo?.related_case_id}`
                              )
                            }
                          >
                            (Click to view)
                          </span>
                        </span>
                      ) : (
                        "-"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-[100%]">
                  <p className="text-[#0C73B8] text-[15px] font-semibold">
                    Division
                  </p>
                  <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md capitalize">
                    {caseInfo?.division?.name ? caseInfo?.division?.name : "-"}
                  </p>
                </div>
              </div>

              <div className="w-[100%] flex flex-col gap-[20px]">
                {caseInfo?.customer_id ? (
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Customer Name
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.customer_id
                        ? caseInfo?.customer_id?.firstname +
                          " " +
                          caseInfo?.customer_id?.middlename +
                          " " +
                          caseInfo?.customer_id?.lastname +
                          " - Username: " +
                          caseInfo?.customer_id?.username
                        : "-"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Archival Name
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.archival_user_id
                        ? caseInfo?.archival_user_id?.firstname +
                          " " +
                          caseInfo?.archival_user_id?.middlename +
                          " " +
                          caseInfo?.archival_user_id?.lastname +
                          " - Username: " +
                          caseInfo?.archival_user_id?.username
                        : "-"}
                    </p>
                  </div>
                )}

                {caseInfo?.case_list ? (
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Case Request
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md capitalize">
                      {caseInfo?.case_list?.case_name
                        ? caseInfo?.case_list?.case_name
                        : "-"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Others Case Request
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md capitalize">
                      {caseInfo?.other_case_list
                        ? caseInfo?.other_case_list
                        : "-"}
                    </p>
                  </div>
                )}
              </div>

              <div className="w-[100%] flex flex-col gap-[20px]">
                <div className="flex flex-col gap-2 w-[100%]">
                  <p className="text-[#0C73B8] text-[15px] font-semibold">
                    Title
                  </p>
                  <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                    {caseInfo?.title ? caseInfo?.title : "-"}
                  </p>
                </div>
              </div>

              <div className="w-[100%] mx-auto flex justify-between items-end gap-4">
                <div className="w-[100%]">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Remark
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.remark ? caseInfo?.remark : "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-[100%]">
                <p className="text-[#0C73B8] text-[15px] font-semibold">
                  Case Letter
                </p>
                <p
                  className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] cursor-pointer rounded-md"
                  onClick={() =>
                    handleCaseAttachment(
                      `${process.env.REACT_APP_BACKEND_IMAGES}/CaseFiles/${caseInfo?.case_letter}`
                    )
                  }
                >
                  {caseInfo?.case_letter ? caseInfo?.case_letter : "-"}{" "}
                  <span className="text-[12px] text-[#FBB042] font-semibold">
                    (Click to view)
                  </span>
                </p>
              </div>
              {caseInfo?.response_justification && (
                <div className="flex flex-col gap-2 w-[100%]">
                  <p className="text-[#0C73B8] text-[15px] font-semibold">
                    Response Justifcation
                  </p>
                  <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042]  rounded-md">
                    {caseInfo?.response_justification
                      ? caseInfo?.response_justification
                      : "-"}
                  </p>
                </div>
              )}
              {caseInfo?.response_attachment && (
                <div className="flex flex-col gap-2 w-[100%]">
                  <p className="text-[#0C73B8] text-[15px] font-semibold">
                    Response File
                  </p>
                  <p
                    className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] cursor-pointer rounded-md"
                    onClick={() =>
                      handleResponseFile(
                        `${process.env.REACT_APP_BACKEND_IMAGES}/CaseResponseFiles/${caseInfo?.response_attachment}`
                      )
                    }
                  >
                    {caseInfo?.response_attachment
                      ? caseInfo?.response_attachment
                      : "-"}{" "}
                    <span className="text-[13px] text-[#FBB042] font-semibold">
                      (Click to view)
                    </span>
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2 w-[100%]">
                <p className="text-[#0C73B8] text-[15px] font-semibold">
                  Related Complaint
                </p>
                <div className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md capitalize max-h-[100px] overflow-auto">
                  {caseComplaintList?.data?.length > 0
                    ? caseComplaintList?.data?.map((item, index) => {
                        return (
                          <div key={index} className="flex gap-4 items-center">
                            <span>{index + 1}. </span>
                            <span>
                              {item?._id}{" "}
                              <span
                                className="text-[13px] cursor-pointer text-[#FBB042]"
                                onClick={() =>
                                  navigate(`/dashboard/complaint/${item?._id}`)
                                }
                              >
                                (Click to view)
                              </span>
                            </span>
                          </div>
                        );
                      })
                    : "-"}
                </div>
              </div>

              <div className="w-[100%] flex justify-between items-center gap-[20px] max-[1200px]:flex-col">
                <div className="w-[100%] mx-auto flex justify-between items-end gap-4">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Submitted Date
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.createdAt
                        ? new Date(caseInfo?.createdAt).toDateString()
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="w-[100%] mx-auto flex justify-between items-end gap-4">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Submitted Time
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.createdAt
                        ? new Date(caseInfo?.createdAt).toLocaleTimeString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-[100%] flex justify-between items-center gap-[20px] max-[1200px]:flex-col">
                <div className="w-[100%] mx-auto flex justify-between items-end gap-4">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Processing Start Date
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.pending_date
                        ? new Date(caseInfo?.pending_date).toDateString()
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="w-[100%] mx-auto flex justify-between items-end gap-4">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Processing End Time
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.pending_date
                        ? new Date(caseInfo?.pending_date).toLocaleTimeString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-[100%] flex justify-between items-center gap-[20px] max-[1200px]:flex-col">
                <div className="w-[100%] mx-auto flex justify-between items-end gap-4">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Responded Date
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.responded_date
                        ? new Date(caseInfo?.responded_date).toDateString()
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="w-[100%] mx-auto flex justify-between items-end gap-4">
                  <div className="flex flex-col gap-2 w-[100%]">
                    <p className="text-[#0C73B8] text-[15px] font-semibold">
                      Responded Time
                    </p>
                    <p className="px-6 py-2 bg-gray-50 shadow-md font-semibold text-[15px] text-[#353535] border border-[#FBB042] rounded-md">
                      {caseInfo?.responded_date
                        ? new Date(
                            caseInfo?.responded_date
                          ).toLocaleTimeString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50%] mt-[20px] flex flex-col gap-[20px] max-[1200px]:mt-[0px] max-[1200px]:w-[100%]">
              <div className="w-[95%]  mx-auto">
                <div>
                  <span className="text-[#0C73B8] text-[15px] font-semibold">
                    {title}
                  </span>
                </div>
                <div className="w-[100%] h-[650px] my-4 overflow-y-scroll">
                  <PDFViewer fileUrl={fileURL} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default NonAccountCaseDetail;
