import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { language } from "../../utils/part-1lan";
import { useSelector } from "react-redux";
import apiRequest from "../../utils/request";
import Select from "react-select";
import { customStyles } from "../../utils/data";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { ToastContainer, toast } from "react-toastify";

function ArchiveLetter() {
  const token = sessionStorage.getItem("tID");
  const navigate = useNavigate();
  const { id, type } = useParams();
  const translationState = useSelector((state) => state?.translation);
  const [archivalIn, setArchivalIn] = useState([]);
  const [archiveList, setArchiveList] = useState([]);
  const [archivalType, setArchivalType] = useState("");
  const [archivalCategory, setArchivalCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    try {
      apiRequest
        .get("/archival_category_api/get_all_category", {
          headers: {
            get_archcats_api: process.env.REACT_APP_GET_ARCHCATS_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setArchivalCategory(res?.data);
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setServerError(true)
    }
  }, [token]);

  const filterActiveArchivalCategory =
    archivalCategory?.archivalCategories?.filter(
      (arch) => arch?.status === "active"
    );
  const finalArchival = filterActiveArchivalCategory?.filter(
    (arch) => !archivalIn?.some((ain) => ain?._id === arch?._id)
  );


  const getArchivalList = async () => {
    try {
      if (type === "incoming") {
        setArchivalType("incomingLtr");
        setLoading(true);
        apiRequest
          .get(`/archival_category_api/get_arch_bydocId/${id}/incomingLtr`, {
            headers: {
              Authorization: "Token " + token,
              get_docarchcat_api: process.env.REACT_APP_GET_DOCARCHCAT_API,
            },
          })
          .then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              setServerError(false);
              setArchivalIn(res?.data);
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error?.response?.status === 500) {
              setServerError(true);
            }
          });
      }
      if (type === "outgoing") {
        setArchivalType("outgoingLtr");
        setLoading(true);
        apiRequest
          .get(`/archival_category_api/get_arch_bydocId/${id}/outgoingLtr`, {
            headers: {
              Authorization: "Token " + token,
              get_docarchcat_api: process.env.REACT_APP_GET_DOCARCHCAT_API,
            },
          })
          .then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              setServerError(false);
              setArchivalIn(res?.data);
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error?.response?.status === 500) {
              setServerError(true);
            }
          });
      }
      if (type === "internal") {
        setArchivalType("internalLtr");
        setLoading(true);
        apiRequest
          .get(`/archival_category_api/get_arch_bydocId/${id}/internalLtr`, {
            headers: {
              Authorization: "Token " + token,
              get_docarchcat_api: process.env.REACT_APP_GET_DOCARCHCAT_API,
            },
          })
          .then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              setServerError(false);
              setArchivalIn(res?.data);
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error?.response?.status === 500) {
              setServerError(true);
            }
          });
      }
      if (type === "presystem") {
        setArchivalType("presystem");
        setLoading(true);
        apiRequest
          .get(`/archival_category_api/get_arch_bydocId/${id}/presystem`, {
            headers: {
              Authorization: "Token " + token,
              get_docarchcat_api: process.env.REACT_APP_GET_DOCARCHCAT_API,
            },
          })
          .then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              setServerError(false);
              setArchivalIn(res?.data);
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error?.response?.status === 500) {
              setServerError(true);
            }
          });
      }
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  useEffect(() => {
    getArchivalList();

    // eslint-disable-next-line
  }, [id, type]);

  const handleSelectedChange = (selectedOptions) => {
    setArchiveList(selectedOptions?.map((option) => option?._id));
  };

  const addToArchival = async () => {
    try {
      apiRequest
        .put(
          `/archival_category_api/add_mularc_archival_category`,
          {
            addDoc: id,
            idLists: archiveList,
            type: archivalType,
          },
          {
            headers: {
              get_multarchcat_api: process.env.REACT_APP_GET_MULTARCHCAT_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          getArchivalList();
        })
        .catch((error) => {
          if (error?.response.status === 500) {
            setServerError(true);
          }
          translationState?.lan === "En" &&
            toast.error(error?.response?.data?.Message_en);
          translationState?.lan === "Am" &&
            toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setServerError(true);
    }
  };

  const removeDocformArchival = async (archive_id) => {
    try {
      const findCategory = archivalCategory?.archivalCategories?.find(
        (arch) => arch?._id === archive_id
      );
      let findLetterCategory;
      if (type === "incoming") {
        findLetterCategory = findCategory?.incoming_letter?.find(
          (inc) => inc?.incoming_letter_id?._id === id
        );
      }
      if (type === "outgoing") {
        findLetterCategory = findCategory?.outgoing_letter?.find(
          (inc) => inc?.outgoing_letter_id?._id === id
        );
      }
      if (type === "internal") {
        findLetterCategory = findCategory?.internal_letter?.find(
          (inc) => inc?.outgoing_letter_id?._id === id
        );
      }
      if (type === "presystem") {
        findLetterCategory = findCategory?.presystem_letter?.find(
          (inc) => inc?.outgoing_letter_id?._id === id
        );
      }

      setLoading(true);
      apiRequest
        .put(
          `/archival_category_api/remove_document/${archive_id}/${findLetterCategory?._id}`,
          {
            type: archivalType,
          },
          {
            headers: {
              get_rmvarchcat_api: process.env.REACT_APP_GET_RMVARCHCAT_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          getArchivalList();
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response.status === 500) {
            setServerError(true);
          }
          translationState?.lan === "En" &&
            toast.error(error?.response?.data?.Message_en);
          translationState?.lan === "Am" &&
            toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;
  return loading ? (
    <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />
  ) : (
    <div className="w-[90%] mx-auto flex flex-col">
      <ToastContainer theme="light" />
      <div className="my-[30px] flex items-center gap-[5px] font-bold text-[#0C73B8]">
        <IoChevronBack
          onClick={() => navigate(-1)}
          className="text-[30px] cursor-pointer"
        />
        <span>
          {translationState?.lan === "En" && language?.archiveLetter[0]}
          {translationState?.lan === "Am" && language?.archiveLetter[1]} - {id}
        </span>
      </div>
      {/* archived in */}
      {archivalIn?.length > 0 && (
        <div className="w-[80%] mx-auto my-[30px] grid grid-cols-3 gap-[10px]">
          {archivalIn?.map((category, index) => {
            return (
              <div
                key={index}
                className="col-span-1 flex items-center gap-[10px] text-[14px]"
              >
                <span className="font-bold">{index + 1}. </span>
                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span>
                    {translationState?.lan === "En" && category?.name_en}
                    {translationState?.lan === "Am" && category?.name_am}
                  </span>
                  <button
                    onClick={() => removeDocformArchival(category?._id)}
                    className="py-1 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                  >
                    {translationState?.lan === "En" && language?.remove[0]}
                    {translationState?.lan === "Am" && language?.remove[1]}
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div className="w-[80%] h-[1px] mx-auto my-[20px] bg-gray-300" />

      <div className="w-[80%] mx-auto">
        <label className="block text-[14px] p-2 leading-6 text-[#0C73B8] font-bold">
          {translationState?.lan === "En" && language?.chooseArchive[0]}
          {translationState?.lan === "Am" && language?.chooseArchive[1]}
        </label>
        <div className="mt-2">
          {translationState?.lan === "En" && (
            <Select
              options={finalArchival}
              isMulti
              placeholder="Select archive category"
              getOptionLabel={(e) => e?.name_en}
              getOptionValue={(e) => e?._id}
              styles={customStyles}
              onChange={handleSelectedChange}
            />
          )}
          {translationState?.lan === "Am" && (
            <Select
              options={finalArchival}
              isMulti
              placeholder="የመዝገብ መደብ ይምረጡ"
              getOptionLabel={(e) => e?.name_am}
              getOptionValue={(e) => e?._id}
              styles={customStyles}
              onChange={handleSelectedChange}
            />
          )}
        </div>
      </div>

      {loading ? (
        <Loading addtionalStyle={"flex justify-end items-center my-[20px]"} />
      ) : (
        <div className="w-[80%] mx-auto mt-[30px] py-3 flex justify-end items-center gap-[20px]">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md px-3 py-2 text-sm    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
          >
            {translationState?.lan === "En" && language?.cancel[0]}
            {translationState?.lan === "Am" && language?.cancel[1]}
          </button>
          <button
            disabled={loading}
            className={
              loading
                ? "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
                : "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
            }
            onClick={addToArchival}
          >
            {translationState?.lan === "En" && language?.archiveLetter[0]}
            {translationState?.lan === "Am" && language?.archiveLetter[1]}
          </button>
        </div>
      )}
    </div>
  );
}

export default ArchiveLetter;
