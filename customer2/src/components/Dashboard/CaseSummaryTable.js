import React from "react";
import { useNavigate } from "react-router-dom";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";

function CaseSummaryTable({ customerCases }) {
  const navigate = useNavigate();
  const translationState = useSelector((state)=>state.translation)

  if (customerCases.error) return <ServerError />;

  return (
    <div className="w-[100%] max-h-[560px] overflow-auto">
      {customerCases?.loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center my-[30px]"}
        />
      ) : customerCases?.cases?.cases?.length === 0 ? (
        <div className="capitalize w-[80%] h-[300px] my-[50px] mx-auto bg-white rounded-[10px] flex items-center justify-center mt-12">
          <span className="text-lg text-[#0C73B8] font-bold">
          {translationState?.lan==="En" && language?.noAvailableCase[0]}
          {translationState?.lan==="Am" && language?.noAvailableCase[1]}
          </span>
        </div>
      ) : (
        <table className="w-[100%] my-[30px]  bg-white">
          <thead className="bg-[#0C73B8] text-white  text-[14px] rounded-[20px] max-lg2:text-[12px]">
            <tr>
              <th className="px-2 py-4 border-[2px] border-white">#</th>
              <th className="px-2 py-4 border-[2px] border-white">
              {translationState?.lan ==="En" &&  <span>{language?.caseNumber[0]}</span> }
            {translationState?.lan ==="Am" &&  <span>{language?.caseNumber[1]}</span> }
            {translationState?.lan ==="Or" &&  <span>{language?.caseNumber[2]}</span> }
            {translationState?.lan ==="Tg" &&  <span>{language?.caseNumber[3]}</span> }
            {translationState?.lan ==="Sm" &&  <span>{language?.caseNumber[4]}</span> }
            {translationState?.lan ==="Af" &&  <span>{language?.caseNumber[5]}</span> }
              </th>
              <th className="px-2 py-4 border-[2px] border-white">
              {translationState?.lan ==="En" &&  <span>{language?.status[0]}</span> }
            {translationState?.lan ==="Am" &&  <span>{language?.status[1]}</span> }
            {translationState?.lan ==="Or" &&  <span>{language?.status[2]}</span> }
            {translationState?.lan ==="Tg" &&  <span>{language?.status[3]}</span> }
            {translationState?.lan ==="Sm" &&  <span>{language?.status[4]}</span> }
            {translationState?.lan ==="Af" &&  <span>{language?.status[5]}</span> }

              </th>
            </tr>
          </thead>
          <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
            {customerCases?.cases?.cases?.slice(0, 4)?.map((fc, index) => {
              return (
                <tr
                  key={index}
                  onClick={() =>
                    navigate(`/dashboard/case/${fc?._id}`, {
                      state: {
                        case_number: fc?.case_number,
                      },
                    })
                  }
                  className="text-center border-b border-gray-300 text-gray-600 cursor-pointer max-lg2:text-[12px]"
                >
                  <td className="py-4 border">{index + 1}</td>
                  <td className="py-4 border">
                    {fc?.case_number ? fc?.case_number : "-"}
                  </td>
                  <td className="py-4 border text-[14px] font-bold max-lg2:text-[12px]">
                    {fc?.status === "pending" && (
                      <span className="py-2 px-4 bg-gray-300 rounded-[5px]">
                      {translationState?.lan ==="En" &&  <span>{language?.pending[0]}</span> }
            {translationState?.lan ==="Am" &&  <span>{language?.pending[1]}</span> }
            {translationState?.lan ==="Or" &&  <span>{language?.pending[2]}</span> }
            {translationState?.lan ==="Tg" &&  <span>{language?.pending[3]}</span> }
            {translationState?.lan ==="Sm" &&  <span>{language?.pending[4]}</span> }
                      </span>
                    )}
                    {(fc?.status === "ongoing" || fc?.status ==="responded") && (
                      <span className="py-2 px-4 bg-[#FBB042] rounded-[5px] text-white">
                          {translationState?.lan ==="En" &&  <span>{language?.processing[0]}</span> }
            {translationState?.lan ==="Am" &&  <span>{language?.processing[1]}</span> }
            {translationState?.lan ==="Or" &&  <span>{language?.processing[2]}</span> }
            {translationState?.lan ==="Tg" &&  <span>{language?.processing[3]}</span> }
            {translationState?.lan ==="Sm" &&  <span>{language?.processing[4]}</span> }
                      </span>
                    )}
                    {fc?.status === "verified" && (
                      <span className="py-2 px-4 bg-green-600 rounded-[5px] text-white">
                          {translationState?.lan ==="En" &&  <span>{language?.responded[0]}</span> }
            {translationState?.lan ==="Am" &&  <span>{language?.responded[1]}</span> }
            {translationState?.lan ==="Or" &&  <span>{language?.responded[2]}</span> }
            {translationState?.lan ==="Tg" &&  <span>{language?.responded[3]}</span> }
            {translationState?.lan ==="Sm" &&  <span>{language?.responded[4]}</span> }
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CaseSummaryTable;
